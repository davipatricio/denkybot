import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import { CommandDataStructure } from '../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../types/Client';

export default class MuteData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:mute'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:mute')
      },
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ModerateMembers],
      description: client.languages.manager.get('en_US', 'commandDescriptions:mute'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:mute')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:mute/user'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:mute/user')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:mute/user'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:mute/user')
          },
          required: true,
          type: ApplicationCommandOptionType.User
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:mute/time'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:mute/time')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:mute/time'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:mute/time')
          },
          required: true,
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: `🤐 1 ${client.languages.manager.get('en_US', 'commandNames:mute/time/minute')}`,
              nameLocalizations: {
                'pt-BR': `🤐 1 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/minute')}`
              },
              value: '1m'
            },
            {
              name: `🤐 5 ${client.languages.manager.get('en_US', 'commandNames:mute/time/minutes')}`,
              nameLocalizations: {
                'pt-BR': `🤐 5 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/minutes')}`
              },
              value: '5m'
            },
            {
              name: `🤐 10 ${client.languages.manager.get('en_US', 'commandNames:mute/time/minutes')}`,
              nameLocalizations: {
                'pt-BR': `🤐 10 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/minutes')}`
              },
              value: '10m'
            },
            {
              name: `🤐 1 ${client.languages.manager.get('en_US', 'commandNames:mute/time/hour')}`,
              nameLocalizations: {
                'pt-BR': `🤐 1 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/hour')}`
              },
              value: '1h'
            },
            {
              name: `🤐 5 ${client.languages.manager.get('en_US', 'commandNames:mute/time/hours')}`,
              nameLocalizations: {
                'pt-BR': `🤐 5 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/hours')}`
              },
              value: '5h'
            },
            {
              name: `🤐 1 ${client.languages.manager.get('en_US', 'commandNames:mute/time/day')}`,
              nameLocalizations: {
                'pt-BR': `🤐 1 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/day')}`
              },
              value: '1d'
            },
            {
              name: `🤐 28 ${client.languages.manager.get('en_US', 'commandNames:mute/time/days')}`,
              nameLocalizations: {
                'pt-BR': `🤐 28 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/days')}`
              },
              value: '28d'
            }
          ]
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:mute/reason'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:mute/reason')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:mute/reason'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:mute/reason')
          },
          required: false,
          type: ApplicationCommandOptionType.String
        }
      ]
    };
  }
}
