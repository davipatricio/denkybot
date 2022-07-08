import { ApplicationCommandType } from 'discord.js';
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
      }
    };
  }
}
