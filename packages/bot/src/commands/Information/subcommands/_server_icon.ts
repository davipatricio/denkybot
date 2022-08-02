import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';

export default class ServerIconSubCommand extends SubCommand {
  run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;

    const guildIcon = interaction.guild.iconURL({
      size: 2048,
      extension: 'png'
    });
    if (!guildIcon) {
      interaction.reply({
        content: t('command:server/icon/noIcon'),
        ephemeral: true
      });
      return;
    }

    const embed = new EmbedBuilder().setColor(Colors.Blurple).setTitle(t('command:server/icon/title', interaction.guild.name)).setImage(guildIcon);
    const button = new ButtonBuilder().setURL(guildIcon).setStyle(ButtonStyle.Link).setLabel(t('command:server/icon/browser'));
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}
