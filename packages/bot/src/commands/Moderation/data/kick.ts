import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class KickData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      this.setName('kick',
      .setDMPermission(false),
      defaultMemberPermissions: [PermissionFlagsBits.KickMembers],
      .setDescription('kick',
      options: [
        {
          this.setName('kick/user',
          type: ApplicationCommandOptionType.User,
          required: true,
          .setDescription('kick/user'
        },
        {
          this.setName('kick/reason',
          type: ApplicationCommandOptionType.String,
          .setDescription('kick/reason',
          minLength: 1,
          maxLength: 100
        }
      ]
    });
  }
}
