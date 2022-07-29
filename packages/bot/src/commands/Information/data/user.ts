import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class UserData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      this.setName('user',
      .setDMPermission(false),
      .setDescription('user',
      options: [
        {
          this.setName('user/info',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('user/info',
          options: [
            {
              this.setName('user/info/user',
              type: ApplicationCommandOptionType.User,
              required: false,
              .setDescription('user/info/user'
            }
          ]
        },
        {
          this.setName('user/avatar',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('user/avatar',
          options: [
            {
              this.setName('user/avatar/user',
              type: ApplicationCommandOptionType.User,
              required: false,
              .setDescription('user/avatar/user'
            }
          ]
        },
        {
          this.setName('user/banner',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('user/banner',
          options: [
            {
              this.setName('user/banner/user',
              type: ApplicationCommandOptionType.User,
              required: false,
              .setDescription('user/banner/user'
            }
          ]
        }
      ]
    });
  }
}
