import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class AfkData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      this.setName('afk',
      .setDescription('afk/on',
      .setDMPermission(true)
      options: [
        {
          this.setName('afk/on',
          .setDescription('afk/on',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              this.setName('afk/reason',
              type: ApplicationCommandOptionType.String,
              .setDescription('afk/on/reason'
            }
          ]
        },
        {
          this.setName('afk/off',
          .setDescription('afk/off',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }
}
