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
      .addSubcommandGroup(
        new SlashCommandSubcommandGroupBuilder()
          .setName('autorole')
          .setDescription('Assigns a role to a user when they join the server')
          .addSubcommand(
            new SlashCommandSubcommandBuilder()
              .setName('enable')
              .setDescription('Assigns a role to a user when they join the server')
              .addRoleOption(new SlashCommandRoleOption().setName('role').setDescription('Cargo para adicionar quando membros entrarem no servidor').setRequired(true))
              .addBooleanOption(new SlashCommandBooleanOption().setName('ignore-bots').setDescription('Bots deverão receber o cargo quando forem adicionados?'))
              .addStringOption(
                new SlashCommandStringOption().setName('delay').setDescription('Tempo de espera para adicionar o cargo ao usuário').addChoices(
                  {
                    name: '15 segundos',
                    value: '15s'
                  },
                  {
                    name: '30 segundos',
                    value: '30s'
                  },
                  {
                    name: '1 minuto',
                    value: '1m'
                  },
                  {
                    name: '5 minutos',
                    value: '5m'
                  }
                )
              )
              .addRoleOption(new SlashCommandRoleOption().setName('role2').setDescription('Cargo adicional para adicionar quando membros entrarem no servidor'))
              .addRoleOption(new SlashCommandRoleOption().setName('role3').setDescription('Cargo adicional para adicionar quando membros entrarem no servidor'))
              .addRoleOption(new SlashCommandRoleOption().setName('role4').setDescription('Cargo adicional para adicionar quando membros entrarem no servidor'))
              .addRoleOption(new SlashCommandRoleOption().setName('role5').setDescription('Cargo adicional para adicionar quando membros entrarem no servidor'))
          )
          .addSubcommand(new SlashCommandSubcommandBuilder().setName('enable').setDescription('Desativa os cargos automáticos'))
      );
  }
}
