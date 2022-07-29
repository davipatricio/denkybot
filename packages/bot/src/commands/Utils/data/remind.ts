import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default class ReminderData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:remind'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind')
      },
      type: ApplicationCommandType.ChatInput,
      .setDMPermission(true)
      description: client.languages.manager.get('en_US', 'commandDescriptions:ping'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ping')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:remind/create'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/create')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:remind/create'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/create')
          },
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:remind/create/description'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/create/description')
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('en_US', 'commandDescriptions:remind/create/description'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/create/description')
              },
              required: true,
              maxLength: 120
            },
            {
              name: client.languages.manager.get('en_US', 'commandNames:remind/create/duration'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/create/duration')
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('en_US', 'commandDescriptions:remind/create/duration'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/create/duration')
              },
              required: true,
              minLength: 1,
              maxLength: 20
            }
          ]
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:remind/delete'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/delete')
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:remind/delete'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/delete')
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:remind/delete/reminder'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/delete/reminder')
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('en_US', 'commandDescriptions:remind/delete/reminder'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/delete/reminder')
              },
              required: true,
              autocomplete: true
            }
          ]
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:remind/info'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/info')
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:remind/info'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/info')
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:remind/info/reminder'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:remind/info/reminder')
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('en_US', 'commandDescriptions:remind/info/reminder'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:remind/info/reminder')
              },
              required: true,
              autocomplete: true
            }
          ]
        }
      ]
    };
  }
}
