import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class SuggestionData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.setName(this.t('en_US', 'commandNames:suggestion'))
      .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion'))
      .setDMPermission(false)
      .setDescription('suggestions')
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('en_US', 'commandNames:suggestion/send'))
          .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion/send'))
          .setDescription(this.t('en_US', 'commandDescriptions:suggestions/send'))
          .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/send'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('en_US', 'commandNames:suggestion/accept'))
          .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion/accept'))
          .setDescription(this.t('en_US', 'commandDescriptions:suggestions/accept'))
          .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/accept'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('en_US', 'commandDescriptions:suggestions/accept/id'))
              .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/accept/id'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName(this.t('en_US', 'commandNames:suggestion/accept/reason'))
              .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion/accept/reason'))
              .setDescription(this.t('en_US', 'commandDescriptions:suggestions/accept/reason'))
              .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/accept/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('en_US', 'commandNames:suggestion/deny'))
          .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion/deny'))
          .setDescription(this.t('en_US', 'commandDescriptions:suggestions/deny'))
          .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/deny'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('en_US', 'commandDescriptions:suggestions/deny/id'))
              .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/deny/id'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName(this.t('en_US', 'commandNames:suggestion/deny/reason'))
              .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion/deny/reason'))
              .setDescription(this.t('en_US', 'commandDescriptions:suggestions/deny/reason'))
              .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/deny/reason'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('en_US', 'commandNames:suggestion/edit'))
          .setNameLocalization('pt-BR', this.t('pt_BR', 'commandNames:suggestion/edit'))
          .setDescription(this.t('en_US', 'commandDescriptions:suggestions/edit'))
          .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/edit'))
          .addStringOption(
            new SlashCommandStringOption()
              .setMinLength(18)
              .setMaxLength(21)
              .setName('id')
              .setDescription(this.t('en_US', 'commandDescriptions:suggestions/edit/id'))
              .setDescriptionLocalization('pt-BR', this.t('pt_BR', 'commandDescriptions:suggestions/edit/id'))
          )
      );
  }
}
