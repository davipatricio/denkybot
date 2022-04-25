import { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';

export default class ExampleTask extends Task {
  constructor() {
    super();
    this.name = 'example-task';
    this.delay = 1500;
  }

  override run(_client: DenkyClient, interval: NodeJS.Timeout): Promise<any> | any {
    console.log("Running task 'Example task' now!");
    clearInterval(interval);
  }
}
