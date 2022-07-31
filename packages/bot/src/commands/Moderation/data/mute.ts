import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class MuteData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    
      this.setName('mute',
      .setDMPermission(false),
      defaultMemberPermissions: [PermissionFlagsBits.ModerateMembers],
      .setDescription('mute',
      options: [
        {
          this.setName('mute/user',
          .setDescription('mute/user',
          required: true,
          type: ApplicationCommandOptionType.User
        },
        {
          this.setName('mute/time',
          .setDescription('mute/time',
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
          this.setName('mute/reason',
          .setDescription('mute/reason',
          required: false,
          type: ApplicationCommandOptionType.String
        }
      ]
  }
}
