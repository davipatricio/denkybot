import { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';
import { Poster } from '../utils/Poster';

export default class ExampleTask extends Task {
  poster: Poster;
  constructor() {
    super();
    this.name = 'Post bot stats automatically';
    this.delay = 2.7e6 /* 45 minutes */;
    this.interval = null;
  }

  override run(client: DenkyClient) {
    if (!global.IS_MAIN_PROCESS) return;
    console.log(`[DENKY] Running task ${this.name} now!`);
    if (!this.poster) this.poster = new Poster(client);

    this.poster.post().catch(err => console.log(`Failed to post bot stats: ${err}`));
  }
}
