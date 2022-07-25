import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';

export default class PingData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.parseData(client, {
      name: 'ping',
      dmPermission: true,
      description: 'ping'
    });
  }
}
