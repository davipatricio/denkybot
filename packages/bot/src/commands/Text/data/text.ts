import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class TextData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    const baseTextOption = new SlashCommandStringOption()
      .setName(this.t('commandNames:text'))
      .setNameLocalizations(this.localizations('commandNames:text'))
      .setDescription(this.t('commandDescriptions:text'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:text'))
      .setMaxLength(100)
      .setRequired(true);

    this.setName('text')
      .setDMPermission(true)
      .setDescription(this.t('commandDescriptions:text'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:text'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:text/claps'))
          .setNameLocalizations(this.localizations('commandNames:text/claps'))
          .setDescription(this.t('commandDescriptions:text/claps'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:text/claps'))
          .addStringOption(baseTextOption)
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('emojify')
          .setDescription(this.t('commandDescriptions:text/emojify'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:text/emojify'))
          .addStringOption(baseTextOption)
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:text/invert'))
          .setNameLocalizations(this.localizations('commandNames:text/invert'))
          .setDescription(this.t('commandDescriptions:text/invert'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:text/invert'))
          .addStringOption(baseTextOption)
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('vaporwave')
          .setDescription(this.t('commandDescriptions:text/vaporwave'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:text/vaporwave'))
          .addStringOption(baseTextOption)
      );
  }
}
