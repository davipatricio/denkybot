import { checkEndedGiveaways, deleteOldGiveaways } from '@bot/src/helpers/Giveaway';
import { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';

export default class GiveawayTask extends Task {
  constructor() {
    super();
    this.name = 'Check for ended giveaways';
    this.delay = 15000;
    this.interval = null;
  }

  override run(client: DenkyClient) {
    if (!global.IS_MAIN_PROCESS) return;

    if (!client.isReady()) return;
    checkEndedGiveaways(client);
    deleteOldGiveaways(client);
  }
}
