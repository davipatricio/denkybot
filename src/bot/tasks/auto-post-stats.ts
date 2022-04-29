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
    if (!client.config.shouldPublishBotStats) {
      console.log('✅ \x1b[34m[TASKS]\x1b[0m', `Cancelling task ${this.name} because 'shouldPublishBotStats' is disabled.`);
      if (this.interval) clearInterval(this.interval);
      client.tasks.delete(this.name);
      return;
    }

    if (!global.IS_MAIN_PROCESS) return;
    console.log('✅ \x1b[34m[TASKS]\x1b[0m', `Running task ${this.name} now!`);
    if (!this.poster) this.poster = new Poster(client);

    if (!client.isReady() && !this.#isPedingReadyRetry) {
      client.once('ready', () => {
        this.#isPedingReadyRetry = false;
        this.poster.post().catch(err => console.log(`Failed to post bot stats: ${err}`));
      });
      this.#isPedingReadyRetry = true;
      return;
    }

    this.poster.post().catch(err => console.log(`Failed to post bot stats: ${err}`));
  }
}
