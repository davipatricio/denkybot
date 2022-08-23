import type { DenkyClient } from '#types/Client';
import type { Awaitable, ClientEvents } from 'discord.js';

class Event {
  /** The event name to listen to */
  eventName: keyof ClientEvents | '';
  constructor() {
    this.eventName = '';
  }

  run(client: DenkyClient, ...rest: any[]): Awaitable<any> {
    return { client, rest };
  }
}

export { Event };
