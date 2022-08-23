import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

type PollAcceptableOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export default class PollData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    const baseSubcommand = new SlashCommandSubcommandBuilder()
      .setName(this.t('commandNames:poll/create'))
      .setNameLocalizations(this.localizations('commandNames:poll/create'))
      .setDescription(this.t('commandDescriptions:poll/create'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:poll/create'));

    for (let i = 1 as PollAcceptableOptions; i <= 9; i++) {
      baseSubcommand.addStringOption(
        new SlashCommandStringOption()
          .setName(this.t(`commandNames:poll/create/option${i}`))
          .setNameLocalizations(this.localizations(`commandNames:poll/create/option${i}`))
          .setDescription(this.t(`commandDescriptions:poll/create/option${i}`))
          .setDescriptionLocalizations(this.localizations(`commandDescriptions:poll/create/option${i}`))
          .setRequired(i === 1)
          .setMaxLength(100)
      );
    }

    this.setName(this.t('commandNames:poll/name'))
      .setNameLocalizations(this.localizations('commandNames:poll/name'))
      .setDMPermission(false)
      .setDescription(this.t('commandDescriptions:poll'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:poll'))
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addSubcommand(baseSubcommand);
  }
}
