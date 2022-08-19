import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class ButtonRoleData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('buttonrole')
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
      .setDescription(this.t('commandDescriptions:buttonroles'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:buttonroles/create'))
          .setNameLocalizations(this.localizations('commandNames:buttonroles/create'))
          .setDescription(this.t('commandDescriptions:buttonroles/create'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:buttonroles/create/type'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/type'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/type'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/type'))
              .setRequired(true)
              .addChoices(
                {
                  name: this.t('commandNames:buttonroles/create/choice/toggle'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/toggle') },
                  value: 'Toggle'
                },
                {
                  name: this.t('commandNames:buttonroles/create/choice/add'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/add') },
                  value: 'Add'
                },
                {
                  name: this.t('commandNames:buttonroles/create/choice/remove'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/remove') },
                  value: 'Remove'
                }
              )
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:buttonroles/create/button/color'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/button/color'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/button/color'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/button/color'))
              .setRequired(true)
              .addChoices(
                {
                  name: this.t('commandNames:buttonroles/create/choice/danger'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/danger') },
                  value: 'Danger'
                },
                {
                  name: this.t('commandNames:buttonroles/create/choice/primary'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/primary') },
                  value: 'Primary'
                },
                {
                  name: this.t('commandNames:buttonroles/create/choice/secondary'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/secondary') },
                  value: 'Secondary'
                },
                {
                  name: this.t('commandNames:buttonroles/create/choice/success'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:buttonroles/create/choice/success') },
                  value: 'Success'
                }
              )
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:buttonroles/create/embed/description'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/embed/description'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/embed/description'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/embed/description'))
              .setRequired(true)
              .setMinLength(10)
              .setMaxLength(1024)
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:buttonroles/create/role'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/role'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/role'))
              .setRequired(true)
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:buttonroles/create/role2'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/role2'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/role'))
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:buttonroles/create/role3'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/role3'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/role'))
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:buttonroles/create/role4'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/role4'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/role'))
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:buttonroles/create/role5'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/role5'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/role'))
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:buttonroles/create/button/label'))
              .setNameLocalizations(this.localizations('commandNames:buttonroles/create/button/label'))
              .setDescription(this.t('commandDescriptions:buttonroles/create/button/label'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:buttonroles/create/button/label'))
              .setMinLength(1)
              .setMaxLength(80)
          )
      );
  }
}
