import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandSubCommandData } from 'discord.js';

export default class TextData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    const baseTextOption: ApplicationCommandSubCommandData['options'] = [
      {
        name: 'text',
        type: ApplicationCommandOptionType.String,
        required: true,
        description: 'text/text'
      }
    ];

    this.parseData(client, {
      name: 'text',
      dmPermission: true,
      description: 'text',
      options: [
        {
          name: 'text/claps',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'text/claps',
          options: baseTextOption
        },
        {
          name: 'ignore:emojify',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'text/emojify',
          options: baseTextOption
        },
        {
          name: 'text/invert',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'text/invert',
          options: baseTextOption
        },
        {
          name: 'ignore:vaporwave',
          type: ApplicationCommandOptionType.Subcommand,
          description: 'text/vaporwave',
          options: baseTextOption
        }
      ]
    });
  }
}
