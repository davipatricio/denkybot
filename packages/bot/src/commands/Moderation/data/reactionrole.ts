import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class ReactionRoleData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:reactionrole/name'))
      .setNameLocalizations(this.localizations('commandNames:reactionrole/name'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
      .setDescription(this.t('commandDescriptions:reactionrole'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionrole'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:reactionrole/add'))
          .setNameLocalizations(this.localizations('commandNames:reactionrole/add'))
          .setDescription(this.t('commandDescriptions:reactionrole/add'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionrole/add'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:reactionrole/add/type'))
              .setNameLocalizations(this.localizations('commandNames:reactionrole/add/type'))
              .setDescription(this.t('commandDescriptions:reactionrole/add/type'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionrole/add/type'))
              .setRequired(true)
              .addChoices(
                {
                  name: this.t('commandNames:reactionrole/add/choice/toggle'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:reactionrole/add/choice/toggle') },
                  value: 'Toggle'
                },
                {
                  name: this.t('commandNames:reactionrole/add/choice/add'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:reactionrole/add/choice/add') },
                  value: 'Add'
                },
                {
                  name: this.t('commandNames:reactionrole/add/choice/remove'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:reactionrole/add/choice/remove') },
                  value: 'Remove'
                }
              )
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:reactionrole/add/role'))
              .setNameLocalizations(this.localizations('commandNames:reactionrole/add/role'))
              .setDescription(this.t('commandDescriptions:reactionrole/add/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionrole/add/role'))
              .setRequired(true)
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:reactionrole/add/message-id'))
              .setNameLocalizations(this.localizations('commandNames:reactionrole/add/message-id'))
              .setDescription(this.t('commandDescriptions:reactionrole/add/message-id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionrole/add/message-id'))
              .setRequired(true)
          )
      );
  }
}
