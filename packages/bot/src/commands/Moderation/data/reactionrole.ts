import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class ReactionRoleData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:reactionroles/name'))
      .setNameLocalizations(this.localizations('commandNames:reactionroles/name'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
      .setDescription(this.t('commandDescriptions:reactionroles'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionroles'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:reactionroles/add'))
          .setNameLocalizations(this.localizations('commandNames:reactionroles/add'))
          .setDescription(this.t('commandDescriptions:reactionroles/add'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionroles/add'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:reactionroles/add/type'))
              .setNameLocalizations(this.localizations('commandNames:reactionroles/add/type'))
              .setDescription(this.t('commandDescriptions:reactionroles/add/type'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionroles/add/type'))
              .setRequired(true)
              .addChoices(
                {
                  name: this.t('commandNames:reactionroles/add/choice/toggle'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:reactionroles/add/choice/toggle') },
                  value: 'Toggle'
                },
                {
                  name: this.t('commandNames:reactionroles/add/choice/add'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:reactionroles/add/choice/add') },
                  value: 'Add'
                },
                {
                  name: this.t('commandNames:reactionroles/add/choice/remove'),
                  name_localizations: { 'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:reactionroles/add/choice/remove') },
                  value: 'Remove'
                }
              )
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:reactionroles/add/role'))
              .setNameLocalizations(this.localizations('commandNames:reactionroles/add/role'))
              .setDescription(this.t('commandDescriptions:reactionroles/add/role'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionroles/add/role'))
              .setRequired(true)
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:reactionroles/add/message-id'))
              .setNameLocalizations(this.localizations('commandNames:reactionroles/add/message-id'))
              .setDescription(this.t('commandDescriptions:reactionroles/add/message-id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:reactionroles/add/message-id'))
              .setRequired(true)
          )
      );
  }
}
