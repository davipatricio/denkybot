import type { DenkyClient } from '#types/Client';
import type { Awaitable } from 'discord.js';

class Task {
  /** The name of the task. */
  name: string;
  /** Run the task every X miliseconds. */
  delay: number;
  /** The interval object of this task */
  interval: NodeJS.Timeout | null;
  constructor() {
    this.name = '';
    this.delay = 0;
    this.interval = null;
  }

  run(client: DenkyClient): Awaitable<any> {
    return { client };
  }
}

export { Task };
