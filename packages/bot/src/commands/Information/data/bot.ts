import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class BotData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'bot',
      dmPermission: true,
      description: 'bot',
      options: [
        {
          name: 'bot/invite',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'bot/invite'
        },
        {
          name: 'bot/vote',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'bot/vote'
        }
      ]
    });
  }
}
