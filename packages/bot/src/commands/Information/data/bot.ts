import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { SlashCommandSubcommandBuilder } from 'discord.js';

export default class BotData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('bot')
      .setDMPermission(true)
      .setDescription(this.t('commandDescriptions:bot'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:bot'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:bot/invite'))
          .setNameLocalizations(this.localizations('commandNames:bot/invite'))
          .setDescription(this.t('commandDescriptions:bot/invite'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:bot/invite'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:bot/vote'))
          .setNameLocalizations(this.localizations('commandNames:bot/vote'))
          .setDescription(this.t('commandDescriptions:bot/vote'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:bot/vote'))
      );
  }
}
