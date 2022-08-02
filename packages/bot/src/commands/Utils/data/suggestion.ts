import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class SuggestionData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:suggestion/name'))
      .setNameLocalizations(this.localizations('commandNames:suggestion/name'))
      .setDMPermission(false)
      .setDescription('suggestions')
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/send'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/send'))
          .setDescription(this.t('commandDescriptions:suggestion/send'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/send'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/accept'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/accept'))
          .setDescription(this.t('commandDescriptions:suggestion/accept'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/accept'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('commandDescriptions:suggestion/accept/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/accept/id'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName(this.t('commandNames:suggestion/accept/reason'))
              .setNameLocalizations(this.localizations('commandNames:suggestion/accept/reason'))
              .setDescription(this.t('commandDescriptions:suggestion/accept/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/accept/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/deny'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/deny'))
          .setDescription(this.t('commandDescriptions:suggestion/deny'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/deny'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('commandDescriptions:suggestion/deny/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/deny/id'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName(this.t('commandNames:suggestion/deny/reason'))
              .setNameLocalizations(this.localizations('commandNames:suggestion/deny/reason'))
              .setDescription(this.t('commandDescriptions:suggestion/deny/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/deny/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:suggestion/edit'))
          .setNameLocalizations(this.localizations('commandNames:suggestion/edit'))
          .setDescription(this.t('commandDescriptions:suggestion/edit'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/edit'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('commandDescriptions:suggestion/edit/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:suggestion/edit/id'))
          )
      );
  }
}
