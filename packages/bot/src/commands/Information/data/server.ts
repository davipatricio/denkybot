import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandSubcommandBuilder } from 'discord.js';

export default class ServerData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('server')
      .setDMPermission(false)
      .setDescription(this.t('commandDescriptions:server'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:server'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:server/info'))
          .setNameLocalizations(this.localizations('commandNames:server/info'))
          .setDescription(this.t('commandDescriptions:server/info'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:server/info'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:server/icon'))
          .setNameLocalizations(this.localizations('commandNames:server/icon'))
          .setDescription(this.t('commandDescriptions:server/icon'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:server/icon'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:server/banner'))
          .setNameLocalizations(this.localizations('commandNames:server/banner'))
          .setDescription(this.t('commandDescriptions:server/banner'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:server/banner'))
      );
  }
}
