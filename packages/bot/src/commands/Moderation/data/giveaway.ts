import { CommandDataStructure } from '@bot/src/structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default class GiveawayData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.data = {
      name: 'giveaway',
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      description: 'Crie, delete, edite ou encerre um sorteio',
      options: [
        {
          name: 'criar',
          description: 'Cria um sorteio',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'titulo',
              description: 'Título do sorteio',
              type: ApplicationCommandOptionType.String,
              required: true,
              maxLength: 40
            },
            {
              name: 'descricao',
              description: 'Descrição do sorteio',
              type: ApplicationCommandOptionType.String,
              required: false,
              maxLength: 300
            },
            {
              name: 'ganhadores',
              description: 'Número de ganhadores',
              type: ApplicationCommandOptionType.Number,
              required: true,
              minValue: 1,
              maxValue: 100
            }
          ]
        }
      ]
    };
  }
}
