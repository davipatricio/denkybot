import { Task } from '#structures/Task';
import type { DenkyClient } from '#types/Client';
import { checkEndedLockdowns } from '@bot/src/helpers/Unlockdown';

export default class UnlockdownTask extends Task {
  constructor() {
    super();
    this.name = 'Check for ended lockdowns';
    this.delay = 5000;
    this.interval = null;
  }

  override run(client: DenkyClient) {
    if (!global.IS_MAIN_PROCESS) {
      if (this.interval) clearInterval(this.interval);
      client.tasks.delete(this.name);
      return;
    }

    if (!client.isReady()) return;
    checkEndedLockdowns(client);
  }
}
