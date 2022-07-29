import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType } from 'discord.js';

export default class WikipediaData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.t('a');
    // this.parseData(client, {
    //   this.setName('wikipedia',
    //   .setDMPermission(true)
    //   .setDescription('wikipedia',
    //   options: [
    //     {
    //       this.setName('wikipedia/search',
    //       .setDescription('wikipedia/search',
    //       required: true,
    //       type: ApplicationCommandOptionType.String
    //     }
    //   ]
    // });
  }
}
