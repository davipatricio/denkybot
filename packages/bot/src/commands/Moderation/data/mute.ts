import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandStringOption, SlashCommandUserOption } from 'discord.js';

export default class MuteData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:mute'))
      .setNameLocalizations(this.localizations('commandNames:mute'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
      .setDescription(this.t('commandDescriptions:mute'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:mute'))
      .addUserOption(
        new SlashCommandUserOption()
          .setName(this.t('commandNames:mute/user'))
          .setNameLocalizations(this.localizations('commandNames:mute/user'))
          .setDescription(this.t('commandDescriptions:mute/user'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:mute/user'))
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName(this.t('commandNames:mute/time'))
          .setNameLocalizations(this.localizations('commandNames:mute/time'))
          .setDescription(this.t('commandDescriptions:mute/time'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:mute/time'))
          .setRequired(true)
          .setChoices(
            {
              name: `🤐 1 ${client.languages.manager.get('en_US', 'commandNames:mute/time/minute')}`,
              nameLocalizations: {
                'pt-BR': `🤐 1 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/minute')}`
              },
              value: '1m'
            },
            {
              name: `🤐 5 ${client.languages.manager.get('en_US', 'commandNames:mute/time/minutes')}`,
              nameLocalizations: {
                'pt-BR': `🤐 5 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/minutes')}`
              },
              value: '5m'
            },
            {
              name: `🤐 10 ${client.languages.manager.get('en_US', 'commandNames:mute/time/minutes')}`,
              nameLocalizations: {
                'pt-BR': `🤐 10 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/minutes')}`
              },
              value: '10m'
            },
            {
              name: `🤐 1 ${client.languages.manager.get('en_US', 'commandNames:mute/time/hour')}`,
              nameLocalizations: {
                'pt-BR': `🤐 1 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/hour')}`
              },
              value: '1h'
            },
            {
              name: `🤐 5 ${client.languages.manager.get('en_US', 'commandNames:mute/time/hours')}`,
              nameLocalizations: {
                'pt-BR': `🤐 5 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/hours')}`
              },
              value: '5h'
            },
            {
              name: `🤐 1 ${client.languages.manager.get('en_US', 'commandNames:mute/time/day')}`,
              nameLocalizations: {
                'pt-BR': `🤐 1 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/day')}`
              },
              value: '1d'
            },
            {
              name: `🤐 28 ${client.languages.manager.get('en_US', 'commandNames:mute/time/days')}`,
              nameLocalizations: {
                'pt-BR': `🤐 28 ${client.languages.manager.get('pt_BR', 'commandNames:mute/time/days')}`
              },
              value: '28d'
            }
          )
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName(this.t('commandNames:mute/reason'))
          .setNameLocalizations(this.localizations('commandNames:mute/reason'))
          .setDescription(this.t('commandDescriptions:mute/reason'))
          .setDescriptionLocalizations(this.localizations('commandDescriptions:mute/reason'))
      );
  }
}
