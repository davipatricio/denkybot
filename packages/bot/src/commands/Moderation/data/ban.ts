import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class BanData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      name: 'ban',
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      description: 'ban',
      options: [
        {
          name: 'ban/user',
          type: ApplicationCommandOptionType.User,
          required: true,
          description: 'ban/user'
        },
        {
          name: 'ban/delete_messages',
          description: 'ban/delete_messages',
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
          name: 'ban/reason',
          type: ApplicationCommandOptionType.String,
          description: 'ban/reason',
          minLength: 1,
          maxLength: 100
        }
      ]
    });
  }
}
