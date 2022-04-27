import type { DenkyClient } from '../types/Client';

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

  run(client: DenkyClient): Promise<any> | any {
    return { client };
  }
}

export { Task };
