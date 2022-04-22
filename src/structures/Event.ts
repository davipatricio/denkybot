import type { DenkyClient } from '../types/Client';

class Event {
  /** The event name to listen to */
  eventName: string;
  constructor() {
    this.eventName = '';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(client: DenkyClient, ...rest: any[]): Promise<any> | any {
    return { client, rest };
  }
}

export { Event };
