import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';

export default class HelpData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName(this.t('commandNames:help'))
      .setNameLocalizations(this.localizations('commandNames:help'))
      .setDMPermission(true)
      .setDescription(this.t('commandDescriptions:help'))
      .setDescriptionLocalizations(this.localizations('commandDescriptions:help'));
  }
}
