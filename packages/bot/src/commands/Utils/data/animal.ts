import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class AnimalData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'animal',
      dmPermission: true,
      description: 'animal',
      options: [
        {
          name: 'ignore:panda',
          description: 'animal/panda',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'animal/dog',
          description: 'animal/dog',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'animal/koala',
          description: 'animal/koala',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'animal/bunny',
          description: 'animal/bunny',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'animal/cat',
          description: 'animal/cat',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'animal/duck',
          description: 'animal/duck',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'animal/foxy',
          description: 'animal/foxy',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    });
  }
}
