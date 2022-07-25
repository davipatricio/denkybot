import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class ServerData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'server',
      dmPermission: false,
      description: 'server',
      options: [
        {
          name: 'server/info',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'server/info'
        },
        {
          name: 'server/icon',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'server/icon'
        },
        {
          name: 'server/banner',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'server/banner'
        }
      ]
    });
  }
}
