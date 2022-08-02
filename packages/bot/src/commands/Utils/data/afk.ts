import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class AfkData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('afk')
      .setDescription(this.t('commandDescriptions:afk/on'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:afk/on'))
      .setDMPermission(true)
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:afk/on'))
          .setNameLocalizations(this.localizations('commandNames:afk/on'))
          .setDescription(this.t('commandDescriptions:afk/on'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:afk/on'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:afk/reason'))
              .setNameLocalizations(this.localizations('commandNames:afk/reason'))
              .setDescription(this.t('commandDescriptions:afk/on/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:afk/on/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:afk/off'))
          .setNameLocalizations(this.localizations('commandNames:afk/off'))
          .setDescription(this.t('commandDescriptions:afk/off'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:afk/off'))
      );
  }
}
