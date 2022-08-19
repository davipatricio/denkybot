import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { SlashCommandSubcommandBuilder, SlashCommandUserOption } from 'discord.js';

export default class UserData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('user')
      .setDescription(this.t('commandDescriptions:user'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:user'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('info')
          .setDescription(this.t('commandDescriptions:user/info'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:user/info'))
          .addUserOption(
            new SlashCommandUserOption()
              .setName(this.t('commandNames:user/info/user'))
              .setNameLocalizations(this.localizations('commandNames:user/info/user'))
              .setDescription(this.t('commandDescriptions:user/info/user'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:user/info/user'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('avatar')
          .setDescription(this.t('commandDescriptions:user/avatar'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:user/avatar'))
          .addUserOption(
            new SlashCommandUserOption()
              .setName(this.t('commandNames:user/avatar/user'))
              .setNameLocalizations(this.localizations('commandNames:user/avatar/user'))
              .setDescription(this.t('commandDescriptions:user/avatar/user'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:user/avatar/user'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('banner')
          .setDescription(this.t('commandDescriptions:user/banner'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:user/banner'))
          .addUserOption(
            new SlashCommandUserOption()
              .setName(this.t('commandNames:user/banner/user'))
              .setNameLocalizations(this.localizations('commandNames:user/banner/user'))
              .setDescription(this.t('commandDescriptions:user/banner/user'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:user/banner/user'))
          )
      );
  }
}
