import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:suggestion'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:suggestion')
      },
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      description: client.languages.manager.get('en_US', 'commandDescriptions:suggestions'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:suggestions')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:suggestion/send'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:suggestion/send')
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:suggestions/send'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:suggestions/send')
          }
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:suggestion/edit'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:suggestion/edit')
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:suggestions/edit'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:suggestions/edit')
          },
          options: [
            {
              name: 'id',
              description: client.languages.manager.get('en_US', 'commandDescriptions:suggestions/edit/id'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:suggestions/edit/id')
              },
              type: ApplicationCommandOptionType.String,
              required: true
            }
          ]
        }
      ]
    };
  }
}
