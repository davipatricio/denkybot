import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class UserData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'user',
      dmPermission: false,
      description: 'user',
      options: [
        {
          name: 'user/info',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'user/info',
          options: [
            {
              name: 'user/info/user',
              type: ApplicationCommandOptionType.User,
              required: false,
              description: 'user/info/user'
            }
          ]
        },
        {
          name: 'user/avatar',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'user/avatar',
          options: [
            {
              name: 'user/avatar/user',
              type: ApplicationCommandOptionType.User,
              required: false,
              description: 'user/avatar/user'
            }
          ]
        },
        {
          name: 'user/banner',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'user/banner',
          options: [
            {
              name: 'user/banner/user',
              type: ApplicationCommandOptionType.User,
              required: false,
              description: 'user/banner/user'
            }
          ]
        }
      ]
    });
  }
}
