import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class BanInfoSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false
    };
    this.permissions = { bot: [PermissionFlagsBits.BanMembers] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;

    const user = interaction.options.getUser('user');
    if (!user) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/info/error/userNotFound')}`);
      return;
    }

    const ban = await interaction.guild.bans.fetch(user.id);
    if (!ban) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/info/error/userNotBanned')}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setColor('Purple')
      .setThumbnail(user.displayAvatarURL({ extension: 'png', size: 1024 }))
      .setTitle(t('command:ban/embed/title', user))
      .setDescription(t('command:ban/embed/description', ban.reason ?? t('command:ban/noReason')))
      .addFields([
        {
          name: t('command:ban/embed/field/name'),
          value: t('command:ban/embed/field/value', user)
        }
      ])
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

    interaction.editReply({ embeds: [embed] });
  }
}
