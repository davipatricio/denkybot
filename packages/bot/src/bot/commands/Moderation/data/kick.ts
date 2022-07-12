import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class KickData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:kick'),
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.KickMembers],
      description: client.languages.manager.get('en_US', 'commandDescriptions:kick'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:kick')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:kick/user'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:kick/user')
          },
          type: ApplicationCommandOptionType.User,
          required: true,
          description: client.languages.manager.get('en_US', 'commandDescriptions:kick/user'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:kick/user')
          }
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:kick/reason'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:kick/reason')
          },
          type: ApplicationCommandOptionType.String,
          description: client.languages.manager.get('en_US', 'commandDescriptions:kick/reason'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:kick/reason')
          },
          minLength: 1,
          maxLength: 100
        }
      ]
    };
  }
}
