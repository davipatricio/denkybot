import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption } from 'discord.js';

export default class WikipediaData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.setName('wikipedia')
      .setDMPermission(true)
      .setDescription(this.t('en_US', 'commandDescriptions:wikipedia'))
      .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:wikipedia'))
      .addStringOption(
        new SlashCommandStringOption()
          .setName(this.t('en_US', 'commandNames:wikipedia/search'))
          .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:wikipedia/search'))
          .setDescription(this.t('en_US', 'commandDescriptions:wikipedia/search'))
          .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:wikipedia/search'))
          .setMaxLength(100)
          .setRequired(true)
      );
  }
}
