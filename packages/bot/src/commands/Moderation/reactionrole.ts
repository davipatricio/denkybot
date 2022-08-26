import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits } from 'discord.js';

export enum ReactionRoleType {
  Add,
  Remove,
  Toggle
}

export default class ReactionRoleCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'REACTIONROLES';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ManageRoles] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(true)) {
      case 'add':
        this.#addReactionRole({ t, interaction });
        break;
    }
  }

  async #addReactionRole({ t, interaction }: CommandRunOptions) {
    const actionType = interaction.options.getString('type', true) as keyof typeof ReactionRoleType;
    const role = interaction.options.getRole('role', true);
    const messageId = interaction.options.getString('message_id', true);
    if (role.managed || role.id === interaction.guild!.id) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reactionrole/managed-role')}`);
      return;
    }

    if (role.position >= interaction.guild!.members.me!.roles.highest.position) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reactionrole/higher-role')}`);
      return;
    }

    const finalMessage = await interaction.channel!.messages.fetch(messageId).catch(() => null);
    if (!finalMessage) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reactionrole/unknown-messageid')}`);
      return;
    }

    const message = await interaction.editReply(`➕ ${interaction.user} **|** ${t('command:reactionrole/choose-emoji')}`);
    const collector = finalMessage.createReactionCollector({
      time: 60000,
      max: 1,
      filter: (_, user) => user.id === interaction.user.id
    });

    collector.on('collect', async reaction => {
      await finalMessage.react(reaction.emoji.identifier);

      const alreadyExists = await this.client.databases.reactionRole
        .findFirst({ where: { emojiId: reaction.emoji.identifier, messageId: finalMessage.id } })
        .then(() => true)
        .catch(() => false);
      if (alreadyExists) {
        interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reactionrole/existing-emoji')}`);
        return;
      }

      await this.client.databases.reactionRole.create({
        data: {
          emojiId: reaction.emoji.identifier,
          roleId: role.id,
          guildId: interaction.guild!.id,
          messageId: finalMessage.id,
          type: ReactionRoleType[actionType]
        }
      });
      interaction.editReply(`✅ ${interaction.user} **|** ${t('command:reactionrole/created')}`);
    });

    collector.on('end', collected => {
      if (!collected.size) {
        message.edit(`❌ ${interaction.user} **|** ${t('command:reactionrole/not-answered')}`);
      }
    });
  }
}
