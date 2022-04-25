import type { DenkyClient } from '../types/Client';

class Task {
  /** The name of the task. */
  name: string;
  /** Run the task every X miliseconds. */
  delay: number;
  constructor() {
    this.name = '';
    this.delay = 0;
  }

  run(client: DenkyClient, interval: NodeJS.Timeout): Promise<any> | any {
    return { client, interval };
  }
}

export { Task };
