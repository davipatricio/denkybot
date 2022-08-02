import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, PermissionsBitField, SlashCommandSubcommandBuilder } from 'discord.js';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('config')
      .setDMPermission(false)
      .setDefaultMemberPermissions(new PermissionsBitField().add([PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ManageChannels]).bitfield)
      .setDescription(this.t('commandDescriptions:config'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:config'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:config/suggestions'))
          .setNameLocalizations(this.localizations('commandNames:config/suggestions'))
          .setDescription(this.t('commandDescriptions:config/suggestions'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:config/suggestions'))
      );
  }
}
