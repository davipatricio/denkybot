import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

export default class ServerBannerSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.guild) return;

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

    const embed = new EmbedBuilder().setColor('Blurple').setTitle(t('command:server/banner/title')).setImage(guildBanner);

    const button = new ButtonBuilder().setURL(guildBanner).setStyle(ButtonStyle.Link).setLabel(t('command:server/banner/browser'));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
