import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class UserBannerSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false,
      guildOnly: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const user = await (interaction.options.getUser('user') ?? interaction.user).fetch();
    const userBanner = user.bannerURL({ size: 2048, extension: 'png' });

    if (!userBanner) {
      interaction.editReply(t('command:user/banner/noBanner'));
      return;
    }

    const embed = new EmbedBuilder().setTitle(t('command:user/banner/title', user.username)).setImage(userBanner).setColor('Blurple');

    const button = new ButtonBuilder().setURL(userBanner).setStyle(ButtonStyle.Link).setLabel(t('command:user/banner/browser'));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
