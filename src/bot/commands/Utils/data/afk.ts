import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class AfkData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: 'afk',
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:afk/on'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:afk/on')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:afk/on'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:afk/on')
          },
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:afk/reason'),
              nameLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:afk/reason')
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('en_US', 'commandDescriptions:afk/on/reason'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:afk/on/reason')
              }
            }
          ]
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:afk/off'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:afk/off')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:afk/off'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:afk/off')
          },
          type: ApplicationCommandOptionType.Subcommand
        }
      ],
      description: client.languages.manager.get('en_US', 'commandNames:afk/on')
    };
  }
}
