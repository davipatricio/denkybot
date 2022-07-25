import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class KickData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      name: 'kick',
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.KickMembers],
      description: 'kick',
      options: [
        {
          name: 'kick/user',
          type: ApplicationCommandOptionType.User,
          required: true,
          description: 'kick/user'
        },
        {
          name: 'kick/reason',
          type: ApplicationCommandOptionType.String,
          description: 'kick/reason',
          minLength: 1,
          maxLength: 100
        }
      ]
    });
  }
}
