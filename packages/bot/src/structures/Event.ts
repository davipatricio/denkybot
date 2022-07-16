import type { DenkyClient } from '#types/Client';
import type { Awaitable } from 'discord.js';

class Event {
  /** The event name to listen to */
  eventName: string;
  constructor() {
    this.eventName = '';
  }

  run(client: DenkyClient, ...rest: any[]): Awaitable<any> {
    return { client, rest };
  }
}

export { Event };
