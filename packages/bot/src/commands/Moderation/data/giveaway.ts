import { CommandDataStructure } from '@bot/src/structures/CommandDataStructure';
import type { DenkyClient } from '@bot/src/types/Client';
import { ChannelType, PermissionFlagsBits, SlashCommandChannelOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class GiveawayData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:giveaway'))
      .setNameLocalizations(this.localizations('commandNames:giveaway'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .setDescription('commandDescriptions:giveaway')
      .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway'))
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:giveaway/create'))
          .setNameLocalizations(this.localizations('commandNames:giveaway/create'))
          .setDescription(this.t('commandDescriptions:giveaway/create'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/create'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:giveaway/create/title'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/create/title'))
              .setDescription(this.t('commandDescriptions:giveaway/create/title'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/create/title'))
              .setRequired(true)
              .setMaxLength(40)
          )
          .addNumberOption(
            new SlashCommandNumberOption()
              .setName(this.t('commandNames:giveaway/create/winners'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/create/winners'))
              .setDescription(this.t('commandDescriptions:giveaway/create/winners'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/create/winners'))
              .setRequired(true)
              .setMinValue(1)
              .setMaxValue(100)
          )
          .addNumberOption(
            new SlashCommandNumberOption()
              .setName(this.t('commandNames:giveaway/create/duration'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/create/duration'))
              .setDescription(this.t('commandDescriptions:giveaway/create/duration'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/create/duration'))
              .setRequired(true)
              .setMinValue(2)
              .setMaxValue(15)
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:giveaway/create/description'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/create/description'))
              .setDescription(this.t('commandDescriptions:giveaway/create/description'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/create/description'))
              .setMaxLength(300)
          )
          .addChannelOption(
            new SlashCommandChannelOption()
              .setName(this.t('commandNames:giveaway/create/channel'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/create/channel'))
              .setDescription(this.t('commandDescriptions:giveaway/create/channel'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/create/channel'))
              .addChannelTypes(ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread)
          )
          .addRoleOption(
            new SlashCommandRoleOption()
              .setName(this.t('commandNames:giveaway/create/requiredRole'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/create/requiredRole'))
              .setDescription(this.t('commandNames:giveaway/create/requiredRole'))
              .setDescriptionLocalizations(this.localizations('commandNames:giveaway/create/requiredRole'))
          )
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName(this.t('commandNames:giveaway/end'))
          .setNameLocalizations(this.localizations('commandNames:giveaway/end'))
          .setDescription(this.t('commandDescriptions:giveaway/end'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/end'))
          .addStringOption(
            new SlashCommandStringOption()
              .setName(this.t('commandNames:giveaway/end/id'))
              .setNameLocalizations(this.localizations('commandNames:giveaway/end/id'))
              .setDescription(this.t('commandDescriptions:giveaway/end/id'))
              .setDescriptionLocalizations(this.localizations('commandDescriptions:giveaway/end/id'))
              .setRequired(true)
              .setMinLength(19)
              .setMaxLength(21)
          )
      );
  }
}
