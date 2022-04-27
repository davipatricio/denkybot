import dbots from 'dbots';
import { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';

export default class ExampleTask extends Task {
  poster: dbots.Poster;
  constructor() {
    super();
    this.name = 'Post bot stats automatically';
    this.delay = 2.7e6 /* 45 minutes */;
    this.interval = null;
  }

  override run(client: DenkyClient): Promise<any> | any {
    if (!global.IS_MAIN_PROCESS) return;
    console.log(`[DENKY] Running task ${this.name} now!`);
    if (!this.poster)
      this.poster = new dbots.Poster({
        client,
        apiKeys: {
          discordbotsgg: process.env.BOTSGG_STATS_KEY as string,
          bladebotlist: process.env.BLADELIST_STATS_KEY as string,
          discordbotlist: process.env.DISCORDBOTLIST_STATS_KEY as string,
          discords: process.env.DISCORDS_STATS_KEY as string,
          disforge: process.env.DISFORGE_STATS_KEY as string,
          fateslist: process.env.FATESLIST_STATS_KEY as string,
          topgg: process.env.BOTSGG_STATS_KEY as string,
        },
        clientLibrary: 'discord.js',
      });

    this.poster.post().catch(err => {
      console.log(`Failed to post bot stats: ${err}`);
    });
  }
}
