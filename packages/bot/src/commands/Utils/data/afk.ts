import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class AfkData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'afk',
      description: 'afk/on',
      dmPermission: true,
      options: [
        {
          name: 'afk/on',
          description: 'afk/on',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'afk/reason',
              type: ApplicationCommandOptionType.String,
              description: 'afk/on/reason'
            }
          ]
        },
        {
          name: 'afk/off',
          description: 'afk/off',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }
}
