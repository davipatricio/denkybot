import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'config',
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ManageChannels],
      description: 'config',
      options: [
        {
          name: 'config/suggestions',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'config/suggestions'
        }
      ]
    });
  }
}
