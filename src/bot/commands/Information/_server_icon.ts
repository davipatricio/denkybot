import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class ServerIconSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false,
      guildOnly: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.guild) return;

    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle(t('command:server/icon/title', interaction.guild.name))
      .setImage(interaction.guild.iconURL({ size: 2048, extension: 'png' }) as string);

    const button = new ButtonBuilder()
      .setURL(interaction.guild.iconURL({ size: 2048, extension: 'png' }) as string)
      .setStyle(ButtonStyle.Link)
      .setLabel(t('command:server/icon/browser'));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
