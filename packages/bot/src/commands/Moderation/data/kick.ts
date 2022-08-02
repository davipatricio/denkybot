import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandStringOption, SlashCommandUserOption } from 'discord.js';

export default class KickData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('kick')
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
      .setDescription(this.t('commandDescriptions:kick'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:kick'))
      .addUserOption(
        new SlashCommandUserOption()
          .setName(this.t('commandNames:kick/user'))
          .setNameLocalizations(this.localizations('commandNames:kick/user'))
          .setDescription(this.t('commandDescriptions:kick/user'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:kick/user'))
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName(this.t('commandNames:kick/reason'))
          .setNameLocalizations(this.localizations('commandNames:kick/reason'))
          .setDescription(this.t('commandDescriptions:kick/reason'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:kick/reason'))
          .setMinLength(4)
          .setMaxLength(255)
      );
  }
}
