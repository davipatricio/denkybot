import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'suggestion',
      dmPermission: false,
      description: 'suggestions',
      options: [
        {
          name: 'suggestion/send',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'suggestions/send'
        },
        {
          name: 'suggestion/edit',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'suggestions/edit',
          options: [
            {
              name: 'id',
              description: 'suggestions/edit/id',
              type: ApplicationCommandOptionType.String,
              required: true,
              minLength: 18,
              maxLength: 21
            }
          ]
        },
        {
          name: 'suggestion/accept',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'suggestions/accept',
          options: [
            {
              name: 'suggestion/accept/id',
              description: 'suggestions/accept/id',
              type: ApplicationCommandOptionType.String,
              required: true,
              minLength: 18,
              maxLength: 21
            },
            {
              name: 'suggestion/accept/reason',
              description: 'suggestions/accept/reason',
              type: ApplicationCommandOptionType.String,
              required: false,
              maxLength: 1024
            }
          ]
        },
        {
          name: 'suggestion/deny',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'suggestions/deny',
          options: [
            {
              name: 'suggestion/deny/id',
              description: 'suggestions/deny/id',
              type: ApplicationCommandOptionType.String,
              required: true,
              minLength: 18,
              maxLength: 21
            },
            {
              name: 'suggestion/deny/reason',
              description: 'suggestions/deny/reason',
              type: ApplicationCommandOptionType.String,
              required: false,
              maxLength: 1024
            }
          ]
        }
      ]
    });
  }
}
