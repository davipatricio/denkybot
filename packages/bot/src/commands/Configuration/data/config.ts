import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      this.setName('config',
      .setDMPermission(false),
      defaultMemberPermissions: [PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ManageChannels],
      .setDescription('config',
      options: [
        {
          this.setName('config/suggestions',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('config/suggestions'
        }
      ]
    });
  }
}
