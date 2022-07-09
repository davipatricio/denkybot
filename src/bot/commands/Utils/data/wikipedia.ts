import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class WikipediaData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: 'wikipedia',
      type: ApplicationCommandType.ChatInput,
      dmPermission: true,
      description: client.languages.manager.get('en_US', 'commandDescriptions:wikipedia'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:wikipedia')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:wikipedia/search'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:wikipedia/search')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:wikipedia/search'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:wikipedia/search')
          },
          required: true,
          type: ApplicationCommandOptionType.String
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:wikipedia/language'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:wikipedia/language')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:wikipedia/language'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:wikipedia/language')
          },
          type: ApplicationCommandOptionType.String
        }
      ]
    };
  }
}
