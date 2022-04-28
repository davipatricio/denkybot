import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';

export default class ReadyEvent extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  override run(client: DenkyClient) {
    console.log('✅ \x1b[34m[SHARDS]\x1b[0m', `Shard ${client.shard?.ids[0]} connected.`);
  }
}
