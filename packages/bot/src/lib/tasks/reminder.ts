import { Task } from '#structures/Task';
import type { DenkyClient } from '#types/Client';
import { checkEndedReminders } from '@bot/src/helpers/Reminder';

export default class ReminderTask extends Task {
  constructor() {
    super();
    this.name = 'Check for ended reminders';
    this.delay = 15000;
    this.interval = null;
  }

  override run(client: DenkyClient) {
    if (!global.IS_MAIN_PROCESS) {
      if (this.interval) clearInterval(this.interval);
      client.tasks.delete(this.name);
      return;
    }

    if (!client.isReady()) return;
    checkEndedReminders(client);
  }
}
