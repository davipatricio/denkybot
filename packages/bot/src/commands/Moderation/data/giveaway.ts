import { CommandDataStructure } from '@bot/src/structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ApplicationCommandOptionType, ChannelType, PermissionFlagsBits } from 'discord.js';

export default class GiveawayData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    
      this.setName('giveaway',
      .setDMPermission(false),
      defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
      .setDescription('giveaway',
      options: [
        {
          this.setName('giveaway/create',
          .setDescription('giveaway/create',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              this.setName('giveaway/create/title',
              .setDescription('giveaway/create/title',
              type: ApplicationCommandOptionType.String,
              required: true,
              maxLength: 40
            },
            {
              this.setName('giveaway/create/winners',
              .setDescription('giveaway/create/winners',
              type: ApplicationCommandOptionType.Number,
              required: true,
              minValue: 1,
              maxValue: 100
            },
            {
              this.setName('giveaway/create/duration',
              .setDescription('giveaway/create/duration',
              type: ApplicationCommandOptionType.String,
              required: true,
              minValue: 2,
              maxValue: 15
            },
            {
              this.setName('giveaway/create/description',
              .setDescription('giveaway/create/description',
              type: ApplicationCommandOptionType.String,
              required: false,
              maxLength: 300
            },
            {
              this.setName('giveaway/create/channel',
              .setDescription('giveaway/create/channel',
              type: ApplicationCommandOptionType.Channel,
              required: false,
              channelTypes: [ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread]
            }
          ]
        },
        {
          this.setName('giveaway/end',
          .setDescription('giveaway/end',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              this.setName('giveaway/end/id',
              .setDescription('giveaway/end/id',
              required: true,
              type: ApplicationCommandOptionType.String,
              minLength: 19,
              maxLength: 21
            }
          ]
        }
      ]
  }
}
