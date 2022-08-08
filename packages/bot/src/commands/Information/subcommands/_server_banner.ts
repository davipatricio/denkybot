import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';

export default class ServerBannerSubCommand extends SubCommand {
  run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;

    const guildBanner = interaction.guild.bannerURL({
      size: 2048,
      extension: 'png'
    });

    if (!guildBanner) {
      interaction.reply({
        content: t('command:server/banner/noBanner'),
        ephemeral: true
      });
      return;
    }

    const embed = new EmbedBuilder().setColor(Colors.Blurple).setTitle(t('command:server/banner/title', interaction.guild.name)).setImage(guildBanner);
    const button = new ButtonBuilder().setURL(guildBanner).setStyle(ButtonStyle.Link).setLabel(t('command:server/banner/browser'));
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
