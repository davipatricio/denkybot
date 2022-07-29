import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class ServerData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      this.setName('server',
      .setDMPermission(false),
      .setDescription('server',
      options: [
        {
          this.setName('server/info',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('server/info'
        },
        {
          this.setName('server/icon',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('server/icon'
        },
        {
          this.setName('server/banner',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('server/banner'
        }
      ]
    });
  }
}
