import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class ServerData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: 'server',
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:server'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:server'),
      },
      options: [
        {
          name: 'info',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:server/info'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:server/info'),
          },
        },
        {
          name: 'icon',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:server/icon'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:server/icon'),
          },
        },
      ],
    };
  }
}
