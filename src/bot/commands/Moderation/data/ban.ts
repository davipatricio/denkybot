import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class BanData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:ban'),
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      description: client.languages.manager.get('en_US', 'commandDescriptions:ban'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ban')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:ban/user'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:ban/user')
          },
          type: ApplicationCommandOptionType.User,
          required: true,
          description: client.languages.manager.get('en_US', 'commandDescriptions:ban/user'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ban/user')
          }
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:ban/delete_messages'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:ban/delete_messages'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ban/delete_messages')
          },
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: `🗑️ 1 ${client.languages.manager.get('en_US', 'commandNames:ban/delete_messages/day')}`,
              nameLocalizations: {
                'pt-BR': `🗑️ 1 ${client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages/day')}`
              },
              value: '1'
            },
            {
              name: `🗑️ 5 ${client.languages.manager.get('en_US', 'commandNames:ban/delete_messages/days')}`,
              nameLocalizations: {
                'pt-BR': `🗑️ 5 ${client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages/days')}`
              },
              value: '5'
            },
            {
              name: `🗑️ 7 ${client.languages.manager.get('en_US', 'commandNames:ban/delete_messages/days')}`,
              nameLocalizations: {
                'pt-BR': `🗑️ 7 ${client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages/days')}`
              },
              value: '7'
            }
          ]
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:ban/reason'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:ban/reason')
          },
          type: ApplicationCommandOptionType.String,
          description: client.languages.manager.get('en_US', 'commandDescriptions:ban/reason'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ban/reason')
          },
          maxLength: 100
        }
      ]
    };
  }
}
