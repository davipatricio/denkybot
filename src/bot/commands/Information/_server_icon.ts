import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class ServerIconSubCommand extends Command {
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
    const guildIcon = interaction.guild.iconURL({ size: 2048, extension: 'png' });
    if (!guildIcon) {
      interaction.reply({ content: t('command:server/icon/noIcon'), ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder().setColor('Blurple').setTitle(t('command:server/icon/title', interaction.guild.name)).setImage(guildIcon);

    const button = new ButtonBuilder().setURL(guildIcon).setStyle(ButtonStyle.Link).setLabel(t('command:server/icon/browser'));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
