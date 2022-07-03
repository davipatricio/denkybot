import { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';
import { Poster } from '../utils/Poster';

export default class ExampleTask extends Task {
  poster: Poster;
  #isPedingReadyRetry: boolean;
  constructor() {
    super();
    this.name = 'Post bot stats automatically';
    this.delay = 2.7e6 /* 45 minutes */;
    this.interval = null;
    this.#isPedingReadyRetry = false;
  }

  override run(client: DenkyClient) {
    if (!client.config.features.publishStats) {
      client.logger.log(`Cancelling task ${this.name} because 'shouldPublishBotStats' is disabled.`, 'TASKS');
      if (this.interval) clearInterval(this.interval);
      client.tasks.delete(this.name);
      return;
    }

    if (!global.IS_MAIN_PROCESS) return;
    client.logger.log(`Running task ${this.name} now!`, 'TASKS');
    if (!this.poster) this.poster = new Poster(client);

    if (!client.isReady() && !this.#isPedingReadyRetry) {
      client.once('ready', () => {
        this.#isPedingReadyRetry = false;
        this.poster.post().catch(err => client.logger.error(`Failed to post bot stats: ${err}`, 'TASKS'));
      });
      this.#isPedingReadyRetry = true;
      return;
    }

    this.poster.post().catch(err => client.logger.error(`Failed to post bot stats: ${err}`, 'TASKS'));
  }
}
