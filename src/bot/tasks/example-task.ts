import { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';

export default class ExampleTask extends Task {
  constructor() {
    super();
    this.name = 'example-task';
    this.delay = 1500;
    this.interval = null;
  }

  override run(client: DenkyClient): Promise<any> | any {
    console.log("Running task 'Example task' now!");
    if (this.interval) clearInterval(this.interval);
    return client;
  }
}
