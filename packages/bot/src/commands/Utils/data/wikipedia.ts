import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption } from 'discord.js';

export default class WikipediaData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('wikipedia')
      .setDMPermission(true)
      .setDescription(this.t('commandDescriptions:wikipedia'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:wikipedia'))
      .addStringOption(
        new SlashCommandStringOption()
          .setName(this.t('commandNames:wikipedia/search'))
          .setNameLocalizations(this.localizations('commandNames:wikipedia/search'))
          .setDescription(this.t('commandDescriptions:wikipedia/search'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:wikipedia/search'))
          .setMaxLength(100)
          .setRequired(true)
      );
  }
}
