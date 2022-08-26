import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, PermissionFlagsBits, Role } from 'discord.js';

export enum ButtonRoleType {
  Add,
  Remove,
  Toggle
}

export default class ButtonRoleCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'BUTTONROLES';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(true)) {
      case 'create':
        this.#createButtonRole({ t, interaction });
        break;
    }
  }

  async #createButtonRole({ t, interaction }: CommandRunOptions) {
    const actionType = interaction.options.getString('type', true) as keyof typeof ButtonRoleType;
    const buttonColor = interaction.options.getString('color', true) as keyof typeof ButtonStyle;
    const embedDescription = interaction.options.getString('description', true);

    const role = interaction.options.getRole('role', true);
    const role2 = interaction.options.getRole('role2');
    const role3 = interaction.options.getRole('role3');
    const role4 = interaction.options.getRole('role4');
    const role5 = interaction.options.getRole('role5');
    const roles = [role, role2, role3, role4, role5].filter(Boolean) as Role[];
    if (roles.some(r => r.managed) || roles.some(r => r.id === interaction.guild!.id)) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:buttonroles/managed-role')}`);
      return;
    }

    if (roles.some(r => r.position > interaction.guild!.members.me!.roles.highest.position)) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:buttonroles/higher-role')}`);
      return;
    }

    let emoji = '➰';
    switch (ButtonRoleType[actionType]) {
      case ButtonRoleType.Add:
        emoji = '➕';
        break;
      case ButtonRoleType.Remove:
        emoji = '➖';
        break;
    }
    const buttonLabel = interaction.options.getString('title') ?? roles.length === 1 ? `"${role.name}"` : t('command:buttonroles/default-label');
    const embed = new EmbedBuilder().setColor(Colors.Yellow).setDescription(embedDescription);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel(buttonLabel).setCustomId('button_role_single').setEmoji(emoji).setStyle(ButtonStyle[buttonColor]));

    await interaction.editReply(`✅ ${interaction.user} **|** ${t('command:buttonroles/created')}`);
    const message = await interaction.channel!.send({ embeds: [embed], components: [row] });

    await this.client.databases.buttonRole.create({
      data: {
        messageId: message.id,
        guildId: interaction.guild!.id,
        roles: roles.map(r => r.id),
        type: ButtonRoleType[actionType]
      }
    });
  }
}
