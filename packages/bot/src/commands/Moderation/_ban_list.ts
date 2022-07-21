import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class BanListSubCommand extends Command {
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

    const bans = await interaction.guild.bans.fetch().catch(() => undefined);

    if (!bans || bans.size === 0) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/list/error/noGuildBans')}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(t('command:ban/list/embed/title', interaction.guild.name))
      .setColor('Purple')
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp()
      .setDescription(
        bans
          .map(x => `${x.user.tag} - ${x.reason?.slice(0, 50) ?? t('command:ban/list/noReason')}`)
          .slice(0, 20)
          .join('\n')
      );

    interaction.editReply({ embeds: [embed] });
  }
}
