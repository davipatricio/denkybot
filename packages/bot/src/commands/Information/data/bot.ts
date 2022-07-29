import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class BotData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      this.setName('bot',
      .setDMPermission(true)
      .setDescription('bot',
      options: [
        {
          this.setName('bot/invite',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('bot/invite'
        },
        {
          this.setName('bot/vote',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('bot/vote'
        }
      ]
    });
  }
}
