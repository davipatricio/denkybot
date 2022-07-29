import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class AnimalData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      this.setName('animal',
      .setDMPermission(true)
      .setDescription('animal',
      options: [
        {
          this.setName('ignore:panda',
          .setDescription('animal/panda',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('animal/dog',
          .setDescription('animal/dog',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('animal/koala',
          .setDescription('animal/koala',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('animal/bunny',
          .setDescription('animal/bunny',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('animal/cat',
          .setDescription('animal/cat',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('animal/duck',
          .setDescription('animal/duck',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          this.setName('animal/foxy',
          .setDescription('animal/foxy',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }
}
