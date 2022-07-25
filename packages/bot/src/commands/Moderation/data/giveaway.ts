import { CommandDataStructure } from '@bot/src/structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ApplicationCommandOptionType, ChannelType, PermissionFlagsBits } from 'discord.js';

export default class GiveawayData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      name: 'giveaway',
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
      description: 'giveaway',
      options: [
        {
          name: 'giveaway/create',
          description: 'giveaway/create',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'giveaway/create/title',
              description: 'giveaway/create/title',
              type: ApplicationCommandOptionType.String,
              required: true,
              maxLength: 40
            },
            {
              name: 'giveaway/create/winners',
              description: 'giveaway/create/winners',
              type: ApplicationCommandOptionType.Number,
              required: true,
              minValue: 1,
              maxValue: 100
            },
            {
              name: 'giveaway/create/duration',
              description: 'giveaway/create/duration',
              type: ApplicationCommandOptionType.String,
              required: true,
              minValue: 2,
              maxValue: 15
            },
            {
              name: 'giveaway/create/description',
              description: 'giveaway/create/description',
              type: ApplicationCommandOptionType.String,
              required: false,
              maxLength: 300
            },
            {
              name: 'giveaway/create/channel',
              description: 'giveaway/create/channel',
              type: ApplicationCommandOptionType.Channel,
              required: false,
              channelTypes: [ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread]
            }
          ]
        },
        {
          name: 'giveaway/end',
          description: 'giveaway/end',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'giveaway/end/id',
              description: 'giveaway/end/id',
              required: true,
              type: ApplicationCommandOptionType.String,
              minLength: 19,
              maxLength: 21
            }
          ]
        }
      ]
    });
  }
}
