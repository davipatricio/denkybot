import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, Util } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class UserCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'USER';
    this.rawCategory = 'INFO';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
      guildOnly: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };

    this.addRawOptions({
      name: 'user',
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:user'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user'),
      },
      options: [
        {
          name: 'info',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:user/info'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/info'),
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:user/info/user'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:user/info/user'),
              },
              type: ApplicationCommandOptionType.User,
              required: false,
              description: client.languages.manager.get('en_US', 'commandDescriptions:user/info/user'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/info/user'),
              },
            },
          ],
        },
        {
          name: 'avatar',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:user/avatar'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/avatar'),
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:user/avatar/user'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:user/avatar/user'),
              },
              type: ApplicationCommandOptionType.User,
              required: false,
              description: client.languages.manager.get('en_US', 'commandDescriptions:user/avatar/user'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/avatar/user'),
              },
            },
          ],
        },
      ],
    });
  }

  override async run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'avatar': {
        const user = interaction.options.getUser('user') ?? interaction.user;

        const userAvatar = user.displayAvatarURL({ size: 2048, extension: 'png' });
        const guildAvatar =
          (user.id !== interaction.user.id
            ? (interaction.options.getMember('user') as GuildMember)?.avatarURL({ size: 2048, extension: 'png' })
            : (interaction.member as GuildMember).avatarURL({ size: 2048, extension: 'png' })) ?? undefined;

        const row = new ActionRowBuilder<ButtonBuilder>();
        const row2 = new ActionRowBuilder<ButtonBuilder>();
        row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel('Ver o avatar do usuário neste servidor').setDisabled(!guildAvatar).setStyle(ButtonStyle.Secondary)]);
        row2.setComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Abrir avatar no navegador')
            .setURL(guildAvatar ?? userAvatar),
        ]);

        const embed = new EmbedBuilder()
          .setTitle(`Avatar de ${user.username}`)
          .setImage(guildAvatar ?? userAvatar)
          .setColor('Green');
        const message = (await interaction.editReply({ content: interaction.user.toString(), embeds: [embed], components: [row, row2] })) as Message;

        if (guildAvatar) {
          const collector = message.createMessageComponentCollector({ time: 30000, filter: m => m.user.id === interaction.user.id });
          collector.on('collect', async m => {
            await m.deferUpdate();

            if (embed.data.image?.url === guildAvatar) {
              row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel('Ver o avatar do usuário no Discord').setDisabled(!guildAvatar).setStyle(ButtonStyle.Secondary)]);
              row2.setComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Abrir avatar no navegador').setURL(userAvatar)]);
              m.editReply({ embeds: [embed.setImage(userAvatar)], components: [row, row2] });
            } else {
              row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel('Ver o avatar do usuário no servidor').setDisabled(!guildAvatar).setStyle(ButtonStyle.Secondary)]);
              row2.setComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Abrir avatar no navegador').setURL(guildAvatar)]);
              m.editReply({ embeds: [embed.setImage(guildAvatar)], components: [row, row2] });
            }
          });

          collector.on('end', () => {
            row.setComponents([new ButtonBuilder().setCustomId('guild-avatar').setLabel('Ver o avatar do usuário neste servidor').setDisabled(true).setStyle(ButtonStyle.Danger)]);
            if (embed.data.image?.url) row2.setComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Abrir avatar no navegador').setURL(embed.data.image?.url)]);
            message.edit({ embeds: [embed], components: [row, row2] });
          });
        }

        break;
      }

      case 'info': {
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
        break;
      }
    }
  }
}
