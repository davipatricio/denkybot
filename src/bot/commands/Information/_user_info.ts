import { EmbedBuilder, GuildMember, PermissionFlagsBits, Util } from 'discord.js';
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
      guildOnly: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const user = interaction.options.getUser('user') ?? interaction.user;

    const tempMember = interaction.options.getMember('user') as GuildMember;
    const member = user.id === tempMember?.id ? tempMember : undefined;

    const cleanUsername = Util.escapeMarkdown(user.username);

    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle(cleanUsername)
      .addFields([
        {
          name: `🔖 ${t('command:user/info/userTag')}`,
          value: cleanUsername === user.username ? `\`${user.tag}\`` : `${cleanUsername}#${user.discriminator}`,
          inline: true,
        },
        {
          name: `📡 ${t('command:user/info/userId')}`,
          value: `\`${user.id}\``,
          inline: true,
        },
        {
          name: `📅 ${t('command:user/info/userCreatedAt')}`,
          value: `<t:${Math.round(user.createdTimestamp / 1000)}:F> (<t:${Math.round(user.createdTimestamp / 1000)}:R>)`,
          inline: true,
        },
      ]);

    if (member && member.joinedTimestamp) {
      embed.addFields([
        {
          name: `🌟 ${t('command:user/info/memberJoinedAt')}`,
          value: `<t:${Math.round(member.joinedTimestamp / 1000)}:F> (<t:${Math.round(member.joinedTimestamp / 1000)}:R>)`,
        },
      ]);
    }

    const tempUser = await user.fetch();
    embed.setImage(tempUser.bannerURL({ size: 2048 }) ?? null);
    embed.setThumbnail(user.displayAvatarURL({ size: 1024 }));

    interaction.editReply({ content: interaction.user.toString(), embeds: [embed] });
  }
}
