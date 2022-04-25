import type { Awaitable } from 'discord.js';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';

export default class ReadyEvent extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  override run(client: DenkyClient): Awaitable<any> {
    console.log(`Bot ${client.user?.tag} online!`);
  }
}
