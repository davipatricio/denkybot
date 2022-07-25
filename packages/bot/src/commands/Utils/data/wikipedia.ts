import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class WikipediaData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'wikipedia',
      dmPermission: true,
      description: 'wikipedia',
      options: [
        {
          name: 'wikipedia/search',
          description: 'wikipedia/search',
          required: true,
          type: ApplicationCommandOptionType.String
        }
      ]
    });
  }
}
