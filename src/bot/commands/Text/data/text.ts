import { ApplicationCommandOptionType, ApplicationCommandSubCommandData, ApplicationCommandType } from 'discord.js';
import { CommandDataStructure } from '../../../../structures/CommandDataStructure';
import type { DenkyClient } from '../../../../types/Client';

export default class TextData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    const baseTextOption: ApplicationCommandSubCommandData['options'] = [
      {
        name: client.languages.manager.get('en_US', 'commandNames:text'),
        nameLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text')
        },
        type: ApplicationCommandOptionType.String,
        required: true,
        description: client.languages.manager.get('en_US', 'commandDescriptions:text/text'),
        descriptionLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/text')
        }
      }
    ];

    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:text'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text')
      },
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:text'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:text/claps'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text/claps')
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/claps'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/claps')
          },
          options: baseTextOption
        },
        {
          name: 'emojify',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/emojify'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/emojify')
          },
          options: baseTextOption
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:text/invert'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text/invert')
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/invert'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/invert')
          },
          options: baseTextOption
        },
        {
          name: 'vaporwave',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/vaporwave'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/vaporwave')
          },
          options: baseTextOption
        }
      ]
    };
  }
}
