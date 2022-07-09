import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

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
          choices: []
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
