import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandUserOption } from 'discord.js';

export default class BanData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('ban')
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .setDescription(this.t('commandDescriptions:ban'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:ban'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:ban/user'))
          .setNameLocalizations(this.localizations('commandNames:ban/user'))
          .setDescription(this.t('commandDescriptions:ban/user'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/user'))
          .addUserOption(
            new SlashCommandUserOption()
              .setName(this.t('commandNames:ban/user'))
              .setNameLocalizations(this.localizations('commandNames:ban/user'))
              .setDescription(this.t('commandDescriptions:ban/user/user'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/user/user'))
              .setRequired(true)
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:ban/delete_messages'))
              .setNameLocalizations(this.localizations('commandNames:ban/delete_messages'))
              .setDescription(this.t('commandDescriptions:ban/delete_messages'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/delete_messages'))
              .setChoices(
                {
                  name: `🗑️ 1 ${this.t('commandNames:ban/delete_messages/day')}`,
                  name_localizations: {
                    'pt-BR': `🗑️ 1 ${client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages/day')}`
                  },
                  value: '1'
                },
                {
                  name: `🗑️ 5 ${this.t('commandNames:ban/delete_messages/days')}`,
                  name_localizations: {
                    'pt-BR': `🗑️ 5 ${client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages/days')}`
                  },
                  value: '5'
                },
                {
                  name: `🗑️ 7 ${this.t('commandNames:ban/delete_messages/days')}`,
                  name_localizations: {
                    'pt-BR': `🗑️ 7 ${client.languages.manager.get('pt_BR', 'commandNames:ban/delete_messages/days')}`
                  },
                  value: '7'
                }
              )
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:ban/reason'))
              .setNameLocalizations(this.localizations('commandNames:ban/reason'))
              .setDescription(this.t('commandDescriptions:ban/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/reason'))
              .setMinLength(1)
              .setMaxLength(255)
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:ban/info'))
          .setNameLocalizations(this.localizations('commandNames:ban/info'))
          .setDescription(this.t('commandDescriptions:ban/info'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/info'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:ban/info/user'))
              .setNameLocalizations(this.localizations('commandNames:ban/info/user'))
              .setDescription(this.t('commandDescriptions:ban/info/user'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/info/user'))
              .setRequired(true)
              .setAutocomplete(true)
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:ban/remove'))
          .setNameLocalizations(this.localizations('commandNames:ban/remove'))
          .setDescription(this.t('commandDescriptions:ban/remove'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/remove'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:ban/remove/user'))
              .setNameLocalizations(this.localizations('commandNames:ban/remove/user'))
              .setDescription(this.t('commandDescriptions:ban/remove/user'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/remove/user'))
              .setRequired(true)
              .setAutocomplete(true)
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:ban/remove/reason'))
              .setNameLocalizations(this.localizations('commandNames:ban/remove/reason'))
              .setDescription(this.t('commandDescriptions:ban/remove/reason'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/remove/reason'))
              .setMinLength(2)
              .setMaxLength(100)
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:ban/list'))
          .setNameLocalizations(this.localizations('commandNames:ban/list'))
          .setDescription(this.t('commandDescriptions:ban/list'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:ban/list'))
      );
  }
}
