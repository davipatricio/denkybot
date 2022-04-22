import type { DenkyClient } from '../types/Client';

class Task {
  /** The name of the task. */
  name: string;
  /** Run the task every X miliseconds. */
  delay: number;
  constructor(options?: { name: string; delay: number }) {
    this.name = options?.name ?? '';
    this.delay = options?.delay ?? 0;
  }

  run(client: DenkyClient, interval: NodeJS.Timeout): Promise<any> | any {
    return { client, interval };
  }
}

export { Task };
