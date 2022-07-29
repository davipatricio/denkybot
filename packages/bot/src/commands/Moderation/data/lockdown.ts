import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class LockdownData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      this.setName('lockdown',
      .setDMPermission(false),
      defaultMemberPermissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild],
      .setDescription('lockdown',
      options: [
        {
          this.setName('lockdown/enable',
          .setDescription('lockdown/enable',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('lockdown/disable',
          .setDescription('lockdown/disable',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('lockdown/schedule',
          .setDescription('lockdown/schedule',
          type: ApplicationCommandOptionType.SubcommandGroup,
          options: [
            {
              this.setName('lockdown/schedule/unlockdown',
              .setDescription('lockdown/schedule',
              type: ApplicationCommandOptionType.Subcommand,
              options: [
                {
                  this.setName('lockdown/schedule/unlockdown/duration',
                  .setDescription('lockdown/schedule/unlockdown/duration',
                  type: ApplicationCommandOptionType.String,
                  required: true,
                  minLength: 2,
                  maxLength: 15
                }
              ]
            }
          ]
        }
      ]
    });
  }
}
