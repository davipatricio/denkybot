import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, PermissionsBitField, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js';

export default class LockdownData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('lockdown')
      .setDMPermission(false)
      .setDefaultMemberPermissions(new PermissionsBitField().add([PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild]).bitfield)
      .setDescription(this.t('commandDescriptions:lockdown'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:lockdown'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:lockdown/enable'))
          .setNameLocalizations(this.localizations('commandNames:lockdown/enable'))
          .setDescription(this.t('commandDescriptions:lockdown/enable'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:lockdown/enable'))
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:lockdown/disable'))
          .setNameLocalizations(this.localizations('commandNames:lockdown/disable'))
          .setDescription(this.t('commandDescriptions:lockdown/disable'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:lockdown/disable'))
      )
      .addSubcommandGroup(
        new SlashCommandSubcommandGroupBuilder()
          .setName(this.t('commandNames:lockdown/schedule'))
          .setNameLocalizations(this.localizations('commandNames:lockdown/schedule'))
          .setDescription(this.t('commandDescriptions:lockdown/schedule'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:lockdown/schedule'))
          .addSubcommand(
            new SlashCommandSubcommandBuilder()
              .setName(this.t('commandNames:lockdown/schedule/unlockdown'))
              .setNameLocalizations(this.localizations('commandNames:lockdown/schedule/unlockdown'))
              .setDescription(this.t('commandDescriptions:lockdown/schedule/unlockdown'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:lockdown/schedule/unlockdown'))
              .addStringOption(
                new SlashCommandStringOption()
                  .setName(this.t('commandNames:lockdown/schedule/unlockdown/duration'))
                  .setNameLocalizations(this.localizations('commandNames:lockdown/schedule/unlockdown/duration'))
                  .setDescription(this.t('commandDescriptions:lockdown/schedule/unlockdown/duration'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:lockdown/schedule/unlockdown/duration'))
                  .setRequired(true)
                  .setMinLength(2)
                  .setMaxLength(15)
              )
          )
      );
  }
}
