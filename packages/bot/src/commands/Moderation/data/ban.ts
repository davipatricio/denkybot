import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class BanData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.parseData(client, {
      this.setName('ban/name',
      .setDMPermission(false),
      defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      .setDescription('ban',
      options: [
        {
          this.setName('ban/user',
          .setDescription('ban/user',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              this.setName('ban/user',
              type: ApplicationCommandOptionType.User,
              required: true,
              .setDescription('ban/user/user'
            },
            {
              this.setName('ban/delete_messages',
              .setDescription('ban/delete_messages',
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
              this.setName('ban/reason',
              type: ApplicationCommandOptionType.String,
              .setDescription('ban/reason',
              minLength: 1,
              maxLength: 100
            }
          ]
        },
        {
          this.setName('ban/info',
          .setDescription('ban/info',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              this.setName('ban/info/user',
              .setDescription('ban/info/user',
              type: ApplicationCommandOptionType.String,
              required: true,
              autocomplete: true
            }
          ]
        },
        {
          this.setName('ban/remove',
          .setDescription('ban/remove',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              this.setName('ban/remove/user',
              .setDescription('ban/remove/user',
              type: ApplicationCommandOptionType.String,
              required: true,
              autocomplete: true
            },
            {
              this.setName('ban/remove/reason',
              .setDescription('ban/remove/reason',
              type: ApplicationCommandOptionType.String,
              required: false,
              minLength: 2,
              maxLength: 100
            }
          ]
        },
        {
          this.setName('ban/list',
          .setDescription('ban/list',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }
}
