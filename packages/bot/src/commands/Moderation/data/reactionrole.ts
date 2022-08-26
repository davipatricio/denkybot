import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class ReactionRoleData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('reactionrole')
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
      .setDescription('Reaction Role')
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('add')
          .setDescription('adicionar')
          .addStringOption(
            new SlashCommandStringOption().setName('type').setDescription('tipoo').setRequired(true).addChoices(
              {
                name: 'Adicionar e remover',
                value: 'Toggle'
              },
              {
                name: 'Adicionar adicionar',
                value: 'Add'
              },
              {
                name: 'Apenas remover',
                value: 'Remove'
              }
            )
          )
          .addRoleOption(new SlashCommandRoleOption().setName('role').setDescription('cargo').setRequired(true))
          .addStringOption(new SlashCommandStringOption().setName('message_id').setDescription('id da mensagem').setRequired(true))
      );
  }
}
