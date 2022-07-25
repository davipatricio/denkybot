import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class LockdownData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      name: 'lockdown',
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild],
      description: 'lockdown',
      options: [
        {
          name: 'lockdown/enable',
          description: 'lockdown/enable',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'lockdown/disable',
          description: 'lockdown/disable',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'lockdown/schedule',
          description: 'lockdown/schedule',
          type: ApplicationCommandOptionType.SubcommandGroup,
          options: [
            {
              name: 'lockdown/schedule/unlockdown',
              description: 'lockdown/schedule',
              type: ApplicationCommandOptionType.Subcommand,
              options: [
                {
                  name: 'lockdown/schedule/unlockdown/duration',
                  description: 'lockdown/schedule/unlockdown/duration',
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
