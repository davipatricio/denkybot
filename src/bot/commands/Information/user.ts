import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
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
      guildOnly: false,
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

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'avatar': {
        this.client.commands.get('_user_avatar')?.run({ t, interaction });
        break;
      }

      case 'info': {
        this.client.commands.get('_user_info')?.run({ t, interaction });
        break;
      }
    }
  }
}
