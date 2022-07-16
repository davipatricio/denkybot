import { CommandDataStructure } from '@bot/src/structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, PermissionFlagsBits } from 'discord.js';

export default class GiveawayData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:giveaway'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway')
      },
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
      description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:giveaway/create'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway/create')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway/create'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway/create')
          },
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:giveaway/create/title'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway/create/title')
              },
              description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway/create/title'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway/create/title')
              },
              type: ApplicationCommandOptionType.String,
              required: true,
              maxLength: 40
            },
            {
              name: client.languages.manager.get('en_US', 'commandNames:giveaway/create/winners'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway/create/winners')
              },
              description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway/create/winners'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway/create/winners')
              },
              type: ApplicationCommandOptionType.Number,
              required: true,
              minValue: 1,
              maxValue: 100
            },
            {
              name: client.languages.manager.get('en_US', 'commandNames:giveaway/create/duration'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway/create/duration')
              },
              description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway/create/duration'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway/create/duration')
              },
              type: ApplicationCommandOptionType.String,
              required: true,
              minValue: 1,
              maxValue: 20
            },
            {
              name: client.languages.manager.get('en_US', 'commandNames:giveaway/create/description'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway/create/description')
              },
              description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway/create/description'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway/create/description')
              },
              type: ApplicationCommandOptionType.String,
              required: false,
              maxLength: 300
            },
            {
              name: client.languages.manager.get('en_US', 'commandNames:giveaway/create/channel'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:giveaway/create/channel')
              },
              description: client.languages.manager.get('en_US', 'commandDescriptions:giveaway/create/channel'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:giveaway/create/channel')
              },
              type: ApplicationCommandOptionType.Channel,
              required: false,
              channelTypes: [ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread]
            }
          ]
        }
      ]
    };
  }
}
