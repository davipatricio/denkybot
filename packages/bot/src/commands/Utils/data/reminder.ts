import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default class ReminderData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: 'remind',
      type: ApplicationCommandType.ChatInput,
      dmPermission: true,
      description: client.languages.manager.get('en_US', 'commandDescriptions:ping'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ping')
      },
      options: [
        {
          name: 'create',
          description: 'Create a reminder',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'text',
              type: ApplicationCommandOptionType.String,
              description: 'Texto do lembrete',
              required: true,
              maxLength: 100
            },
            {
              name: 'duration',
              type: ApplicationCommandOptionType.String,
              description: 'Duração',
              required: true,
              minLength: 1,
              maxLength: 20
            }
          ]
        },
        {
          name: 'delete',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'Delete a reminder',
          options: [
            {
              name: 'id',
              type: ApplicationCommandOptionType.String,
              description: 'Reminder ID',
              required: true,
              autocomplete: true
            }
          ]
        },
        {
          name: 'info',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'Get info about a reminder',
          options: [
            {
              name: 'id',
              type: ApplicationCommandOptionType.String,
              description: 'Reminder ID',
              required: true,
              autocomplete: true
            }
          ]
        }
      ]
    };
  }
}
