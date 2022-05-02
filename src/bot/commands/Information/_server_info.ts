import { ChannelType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class ServerInfoSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false,
      guildOnly: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    if (!interaction.guild) return;

    const guildOwner = await interaction.guild.fetchOwner();

    const categories = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size.toString();

    const textChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size.toString();

    const voiceChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size.toString();

    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() as string })
      .setThumbnail(interaction.guild.iconURL({ size: 2048 }))
      .setDescription(t('command:server/info/embed/owner', guildOwner))
      .addFields([
        {
          name: t('command:server/info/embed/categories'),
          value: categories,
          inline: true,
        },
        {
          name: t('command:server/info/embed/textChannels'),
          value: textChannels,
          inline: true,
        },
        {
          name: t('command:server/info/embed/voiceChannels'),
          value: voiceChannels,
          inline: true,
        },
        {
          name: t('command:server/info/embed/members'),
          value: t('command:server/info/embed/memberCount', interaction.guild.members.cache.filter(x => x.user.bot).size, interaction.guild.members.cache.size, interaction.guild.memberCount),
          inline: true,
        },
        {
          name: t('command:server/info/embed/roles'),
          value: interaction.guild.roles.cache.size.toString() as string,
          inline: true,
        },
        {
          name: 'Boosts',
          value: t('command:server/info/embed/boosts', interaction.guild.premiumSubscriptionCount, interaction.guild.premiumTier),
          inline: true,
        },
      ])
      .setFooter({ text: t('command:server/info/embed/footer', interaction.guild) })
      .setTimestamp(interaction.guild.createdTimestamp);

    interaction.editReply({ embeds: [embed] });
  }
}
