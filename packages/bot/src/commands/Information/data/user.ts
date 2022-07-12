import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../types/Client';

export default class UserData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: 'user',
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      description: client.languages.manager.get('en_US', 'commandDescriptions:user'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user')
      },
      options: [
        {
          name: 'info',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:user/info'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/info')
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:user/info/user'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:user/info/user')
              },
              type: ApplicationCommandOptionType.User,
              required: false,
              description: client.languages.manager.get('en_US', 'commandDescriptions:user/info/user'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/info/user')
              }
            }
          ]
        },
        {
          name: 'avatar',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:user/avatar'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/avatar')
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:user/avatar/user'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:user/avatar/user')
              },
              type: ApplicationCommandOptionType.User,
              required: false,
              description: client.languages.manager.get('en_US', 'commandDescriptions:user/avatar/user'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/avatar/user')
              }
            }
          ]
        },
        {
          name: 'banner',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:user/banner'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/banner')
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:user/banner/user'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:user/banner/user')
              },
              type: ApplicationCommandOptionType.User,
              required: false,
              description: client.languages.manager.get('en_US', 'commandDescriptions:user/banner/user'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/banner/user')
              }
            }
          ]
        }
      ]
    };
  }
}
