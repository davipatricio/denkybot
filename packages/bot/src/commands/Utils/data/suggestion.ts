import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class SuggestionData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:suggestion'))
      .setNameLocalizations(this.localizations('commandNames:suggestion'))
      .setDMPermission(false)
      .setDescription('suggestions')
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/send'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/send'))
          .setDescription(this.t('commandDescriptions:suggestions/send'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/send'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/accept'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/accept'))
          .setDescription(this.t('commandDescriptions:suggestions/accept'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/accept'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('commandDescriptions:suggestions/accept/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/accept/id'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName(this.t('commandNames:suggestion/accept/reason'))
              .setNameLocalizations(this.localizations('commandNames:suggestion/accept/reason'))
              .setDescription(this.t('commandDescriptions:suggestions/accept/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/accept/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/deny'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/deny'))
          .setDescription(this.t('commandDescriptions:suggestions/deny'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/deny'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('commandDescriptions:suggestions/deny/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/deny/id'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName(this.t('commandNames:suggestion/deny/reason'))
              .setNameLocalizations(this.localizations('commandNames:suggestion/deny/reason'))
              .setDescription(this.t('commandDescriptions:suggestions/deny/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/deny/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/edit'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/edit'))
          .setDescription(this.t('commandDescriptions:suggestions/edit'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/edit'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('commandDescriptions:suggestions/edit/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestions/edit/id'))
          )
      );
  }
}
