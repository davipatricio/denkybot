import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandSubcommandBuilder } from 'discord.js';

export default class AnimalData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('animal')
      .setDMPermission(true)
      .setDescription(this.t('commandDescriptions:animal'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:animal'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('panda')
          .setDescription(this.t('commandDescriptions:animal/panda'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/panda'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:animal/dog'))
          .setNameLocalizations(this.localizations('commandNames:animal/dog'))
          .setDescription(this.t('commandDescriptions:animal/dog'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/dog'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:animal/koala'))
          .setNameLocalizations(this.localizations('commandNames:animal/koala'))
          .setDescription(this.t('commandDescriptions:animal/koala'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/koala'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:animal/bunny'))
          .setNameLocalizations(this.localizations('commandNames:animal/bunny'))
          .setDescription(this.t('commandDescriptions:animal/bunny'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/bunny'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:animal/cat'))
          .setNameLocalizations(this.localizations('commandNames:animal/cat'))
          .setDescription(this.t('commandDescriptions:animal/cat'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/cat'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:animal/duck'))
          .setNameLocalizations(this.localizations('commandNames:animal/duck'))
          .setDescription(this.t('commandDescriptions:animal/duck'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/duck'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:animal/fox'))
          .setNameLocalizations(this.localizations('commandNames:animal/fox'))
          .setDescription(this.t('commandDescriptions:animal/fox'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:animal/fox'))
      );
  }
}
