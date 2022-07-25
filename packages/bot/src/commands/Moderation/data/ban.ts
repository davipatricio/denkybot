import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class BanData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      name: 'ban/name',
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      description: 'ban',
      options: [
        {
          name: 'ban/user',
          description: 'ban/user',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'ban/user',
              type: ApplicationCommandOptionType.User,
              required: true,
              description: 'ban/user/user'
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
        },
        {
          name: 'ban/info',
          description: 'ban/info',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'ban/info/user',
              description: 'ban/info/user',
              type: ApplicationCommandOptionType.String,
              required: true,
              autocomplete: true
            }
          ]
        },
        {
          name: 'ban/remove',
          description: 'ban/remove',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'ban/remove/user',
              description: 'ban/remove/user',
              type: ApplicationCommandOptionType.String,
              required: true,
              autocomplete: true
            },
            {
              name: 'ban/remove/reason',
              description: 'ban/remove/reason',
              type: ApplicationCommandOptionType.String,
              required: false,
              minLength: 2,
              maxLength: 100
            }
          ]
        },
        {
          name: 'ban/list',
          description: 'ban/list',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }
}
