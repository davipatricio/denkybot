import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class PingCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'AFK';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
      guildOnly: true,
    };
    this.permissions = { bot: [], user: [] };

    this.addRawOptions({
      name: 'afk',
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:afk/on'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:afk/on'),
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:afk/on'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:afk/on'),
          },
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:afk/reason'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:afk/reason'),
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('en_US', 'commandDescriptions:afk/on/reason'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:afk/on/reason'),
              },
            },
          ],
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:afk/off'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:afk/off'),
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:afk/off'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:afk/off'),
          },
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      description: client.languages.manager.get('en_US', 'commandNames:afk/on'),
    });
  }

  override async run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'on': {
        if (this.client.databases.afk.get(interaction.user.id)) {
          interaction.editReply(t('command:afk/alreadySet', interaction.user));
          break;
        }

        await this.client.databases.afk.set(interaction.user.id, {
          guild: interaction.guild?.id,
          reason: interaction.options.getString('reason'),
          originalNick: (interaction.member as GuildMember).nickname as string,
          startTime: Math.round(Date.now() / 1000),
        });

        const originalNick = (interaction.member as GuildMember).nickname ?? interaction.user.username;

        (interaction.member as GuildMember).setNickname(`[AFK] ${originalNick.slice(0, 19)}`, 'AFK').catch(() => {});
        interaction.editReply(t('command:afk/enabled', interaction.user));
        break;
      }

      case 'off': {
        const data = this.client.databases.afk.get(interaction.user.id);
        if (!data) {
          interaction.editReply(t('command:afk/notAfk', interaction.user));
          break;
        }

        await this.client.databases.afk.delete(interaction.user.id);
        (interaction.member as GuildMember).setNickname(data.o).catch(() => {});
        interaction.editReply(t('command:afk/manuallyRemoved', interaction.user));
        break;
      }
    }
  }
}
