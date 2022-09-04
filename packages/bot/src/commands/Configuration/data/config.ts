import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import {
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBooleanOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder
} from 'discord.js';

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
      )
      .addSubcommand(new SlashCommandSubcommandBuilder().setName('reports').setDescription('Configura o sistema de denuncias'))
      .addSubcommandGroup(
        new SlashCommandSubcommandGroupBuilder()
          .setName(this.t('commandNames:config/autorole'))
          .setNameLocalizations(this.localizations('commandNames:config/autorole'))
          .setDescription(this.t('commandDescriptions:config/autorole'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole'))
          .addSubcommand(
            new SlashCommandSubcommandBuilder()
              .setName(this.t('commandNames:config/autorole/enable'))
              .setNameLocalizations(this.localizations('commandNames:config/autorole/enable'))
              .setDescription(this.t('commandDescriptions:config/autorole'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole'))
              .addRoleOption(
                new SlashCommandRoleOption()
                  .setName(this.t('commandNames:config/autorole/enable/role'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/role'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/role'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/role'))
                  .setRequired(true)
              )
              .addBooleanOption(
                new SlashCommandBooleanOption()
                  .setName(this.t('commandNames:config/autorole/enable/ignore-bots'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/ignore-bots'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/ignore-bots'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/ignore-bots'))
              )
              .addStringOption(
                new SlashCommandStringOption()
                  .setName(this.t('commandNames:config/autorole/enable/delay'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/delay'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/delay'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/delay'))
                  .addChoices(
                    {
                      name: `5 ${this.t('commandNames:config/autorole/enable/seconds')}`,
                      name_localizations: {
                        'pt-BR': `5 ${client.languages.manager.get('pt_BR', 'commandNames:config/autorole/enable/seconds')}`
                      },
                      value: '15s'
                    },
                    {
                      name: `30 ${this.t('commandNames:config/autorole/enable/seconds')}`,
                      name_localizations: {
                        'pt-BR': `30 ${client.languages.manager.get('pt_BR', 'commandNames:config/autorole/enable/seconds')}`
                      },
                      value: '30s'
                    },
                    {
                      name: `1 ${this.t('commandNames:config/autorole/enable/minute')}`,
                      name_localizations: {
                        'pt-BR': `1 ${client.languages.manager.get('pt_BR', 'commandNames:config/autorole/enable/minute')}`
                      },
                      value: '1m'
                    },
                    {
                      name: `5 ${this.t('commandNames:config/autorole/enable/minutes')}`,
                      name_localizations: {
                        'pt-BR': `5 ${client.languages.manager.get('pt_BR', 'commandNames:config/autorole/enable/minutes')}`
                      },
                      value: '5m'
                    }
                  )
              )
              .addRoleOption(
                new SlashCommandRoleOption()
                  .setName(this.t('commandNames:config/autorole/enable/role2'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/role2'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/optional-role'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/optional-role'))
              )
              .addRoleOption(
                new SlashCommandRoleOption()
                  .setName(this.t('commandNames:config/autorole/enable/role3'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/role3'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/optional-role'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/optional-role'))
              )
              .addRoleOption(
                new SlashCommandRoleOption()
                  .setName(this.t('commandNames:config/autorole/enable/role4'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/role4'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/optional-role'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/optional-role'))
              )
              .addRoleOption(
                new SlashCommandRoleOption()
                  .setName(this.t('commandNames:config/autorole/enable/role5'))
                  .setNameLocalizations(this.localizations('commandNames:config/autorole/enable/role5'))
                  .setDescription(this.t('commandDescriptions:config/autorole/enable/optional-role'))
                  .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/enable/optional-role'))
              )
          )
          .addSubcommand(
            new SlashCommandSubcommandBuilder()
              .setName(this.t('commandNames:config/autorole/disable'))
              .setNameLocalizations(this.localizations('commandNames:config/autorole/disable'))
              .setDescription(this.t('commandDescriptions:config/autorole/disable'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:config/autorole/disable'))
          )
      );
  }
}
