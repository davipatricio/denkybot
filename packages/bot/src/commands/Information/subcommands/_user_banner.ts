import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';

export default class UserBannerSubCommand extends SubCommand {
  async run({ t, interaction }: CommandRunOptions) {
    const user = await (interaction.options.getUser('user') ?? interaction.user).fetch();
    const userBanner = user.bannerURL({ size: 2048, extension: 'png' });

    if (!userBanner) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:user/banner/noBanner')}`);
      return;
    }

    const embed = new EmbedBuilder().setTitle(t('command:user/banner/title', user.username)).setImage(userBanner).setColor(Colors.Blurple);
    const button = new ButtonBuilder().setURL(userBanner).setStyle(ButtonStyle.Link).setLabel(t('command:user/banner/browser'));
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
