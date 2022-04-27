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
    if (!global.IS_MAIN_PROCESS) return;
    console.log(`[DENKY] Running task ${this.name} now!`);
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
