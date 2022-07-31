import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class ReminderData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:remind'))
      .setNameLocalizations(this.localizations('commandNames:remind'))
      .setDMPermission(true)
      .setDescription(this.t('commandDescriptions:remind'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:remind'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:remind/create'))
          .setNameLocalizations(this.localizations('commandNames:remind/create'))
          .setDescription(this.t('commandDescriptions:remind/create'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/create'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:remind/create/description'))
              .setNameLocalizations(this.localizations('commandNames:remind/create/description'))
              .setDescription(this.t('commandDescriptions:remind/create/description'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/create/description'))
              .setRequired(true)
              .setMinLength(4)
              .setMaxLength(120)
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:remind/create/duration'))
              .setNameLocalizations(this.localizations('commandNames:remind/create/duration'))
              .setDescription(this.t('commandDescriptions:remind/create/duration'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/create/duration'))
              .setRequired(true)
              .setMinLength(1)
              .setMaxLength(20)
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:remind/delete'))
          .setNameLocalizations(this.localizations('commandNames:remind/delete'))
          .setDescription(this.t('commandDescriptions:remind/delete'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/delete'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:remind/delete/reminder'))
              .setNameLocalizations(this.localizations('commandNames:remind/delete/reminder'))
              .setDescription(this.t('commandDescriptions:remind/delete/reminder'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/delete/reminder'))
              .setRequired(true)
              .setAutocomplete(true)
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:remind/info'))
          .setNameLocalizations(this.localizations('commandNames:remind/info'))
          .setDescription(this.t('commandDescriptions:remind/info'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/info'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:remind/info/reminder'))
              .setNameLocalizations(this.localizations('commandNames:remind/info/reminder'))
              .setDescription(this.t('commandDescriptions:remind/info/reminder'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:remind/info/reminder'))
              .setRequired(true)
              .setAutocomplete(true)
          )
      );
  }
}
