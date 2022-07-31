import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('ping').setDMPermission(true).setDescription(this.t('commandDescriptions:ping')).setDescriptionLocalizations(this.localizations('commandDescriptions:ping'));
  }
}
