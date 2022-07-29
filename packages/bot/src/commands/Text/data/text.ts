import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandSubCommandData } from 'discord.js';

export default class TextData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    const baseTextOption: ApplicationCommandSubCommandData['options'] = [
      {
        this.setName('text',
        type: ApplicationCommandOptionType.String,
        required: true,
        .setDescription('text/text'
      }
    ];

    this.parseData(client, {
      this.setName('text',
      .setDMPermission(true)
      .setDescription('text',
      options: [
        {
          this.setName('text/claps',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('text/claps',
          options: baseTextOption
        },
        {
          this.setName('ignore:emojify',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('text/emojify',
          options: baseTextOption
        },
        {
          this.setName('text/invert',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('text/invert',
          options: baseTextOption
        },
        {
          this.setName('ignore:vaporwave',
          type: ApplicationCommandOptionType.Subcommand,
          .setDescription('text/vaporwave',
          options: baseTextOption
        }
      ]
    });
  }
}
