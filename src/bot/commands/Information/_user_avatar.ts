import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class UserAvatarSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false,
      guildOnly: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const user = interaction.options.getUser('user') ?? interaction.user;

    const userAvatar = user.displayAvatarURL({ size: 2048, extension: 'png' });
    const guildAvatar =
      (user.id !== interaction.user.id
        ? (interaction.options.getMember('user') as GuildMember)?.avatarURL({ size: 2048, extension: 'png' })
        : (interaction.member as GuildMember).avatarURL({ size: 2048, extension: 'png' })) ?? undefined;

    const row = new ActionRowBuilder<ButtonBuilder>();
    const row2 = new ActionRowBuilder<ButtonBuilder>();
    row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel(t('command:user/avatar/seeGuildAvatar')).setDisabled(!guildAvatar).setStyle(ButtonStyle.Secondary)]);
    row2.setComponents([
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(t('command:user/avatar/browser'))
        .setURL(guildAvatar ?? userAvatar)
    ]);

    const embed = new EmbedBuilder()
      .setTitle(t('command:user/avatar/title', user.username))
      .setImage(guildAvatar ?? userAvatar)
      .setColor('Green');
    const message = await interaction.editReply({ content: interaction.user.toString(), embeds: [embed], components: [row, row2] });

    if (guildAvatar) {
      const collector = message.createMessageComponentCollector({ time: 30000, filter: m => m.user.id === interaction.user.id });
      collector.on('collect', async m => {
        await m.deferUpdate();

        if (embed.data.image?.url === guildAvatar) {
          row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel(t('command:user/avatar/seeGlobalAvatar')).setDisabled(!guildAvatar).setStyle(ButtonStyle.Secondary)]);
          row2.setComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(t('command:user/avatar/browser')).setURL(userAvatar)]);
          m.editReply({ embeds: [embed.setImage(userAvatar)], components: [row, row2] });
        } else {
          row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel(t('command:user/avatar/seeGuildAvatar')).setDisabled(!guildAvatar).setStyle(ButtonStyle.Secondary)]);
          row2.setComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(t('command:user/avatar/browser')).setURL(guildAvatar)]);
          m.editReply({ embeds: [embed.setImage(guildAvatar)], components: [row, row2] });
        }
      });

      collector.on('end', () => {
        row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel(t('command:user/avatar/seeGuildAvatar')).setDisabled(true).setStyle(ButtonStyle.Danger)]);
        if (embed.data.image?.url) row2.setComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(t('command:user/avatar/browser')).setURL(embed.data.image?.url)]);
        message.edit({ embeds: [embed], components: [row, row2] });
      });
    }
  }
}
