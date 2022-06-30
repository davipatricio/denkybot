// FIXME: Use Node 18.x fetch instead of axios when @types/node gets the fetch function added to the global namespace
import axios from 'axios';
import type { DenkyClient } from '../../types/Client';

export class Poster {
  client: DenkyClient;
  constructor(client: DenkyClient) {
    this.client = client;
  }

  async post() {
    if (!global.IS_MAIN_PROCESS) return;

    const serverCount = (await this.client.shard?.fetchClientValues('guilds.cache.size')) as number[];
    const totalGuilds = Number(serverCount.reduce((a, b) => a + b, 0));

    await this.#postStatsToTopGG({ totalGuilds }).catch(this.logError);
    await this.#postStatsToDiscords({ totalGuilds }).catch(this.logError);
    await this.#postStatsToDisforge({ totalGuilds }).catch(this.logError);
    await this.#postStatsToBladeList({ totalGuilds }).catch(this.logError);
    await this.#postStatsToFatesList({ totalGuilds }).catch(this.logError);
    await this.#postStatsToDiscordBots({ totalGuilds }).catch(this.logError);
    await this.#postStatsToDiscordBotList({ totalGuilds }).catch(this.logError);
  }

  logError(message: any) {
    if (this.client.config.logs.debug) console.log(message);
  }

  async #postStatsToTopGG({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.TOPGG_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No top.gg API key found! Ignoring...');
      return false;
    }

    const request = await axios('https://top.gg/api/bots/stats', {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        server_count: totalGuilds,
        shard_count: Number(process.env.SHARD_COUNT ?? 1)
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to top.gg!');
    return true;
  }

  async #postStatsToDiscordBots({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.BOTSGG_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No bots.gg API key found! Ignoring...');
      return false;
    }

    const request = await axios(`https://discord.bots.gg/api/v1/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        guildCount: totalGuilds,
        shardCount: Number(process.env.SHARD_COUNT ?? 1)
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to bots.gg!');
    if (this.client.config.logs.debug) console.log('✅ \x1b[34m[VOTES]\x1b[0m', 'Posted stats to bots.gg successfully!');
    return true;
  }

  async #postStatsToDiscords({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISCORDS_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No discords.com API key found! Ignoring...');
      return false;
    }

    const request = await axios(`https://discords.com/bots/api/bot/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        server_count: totalGuilds
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to discords!');
    if (this.client.config.logs.debug) console.log('✅ \x1b[34m[VOTES]\x1b[0m', 'Posted stats to discords.com successfully!');
    return true;
  }

  async #postStatsToDisforge({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISFORGE_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No disforge.com API key found! Ignoring...');
      return false;
    }

    const request = await axios(`https://disforge.com/api/botstats/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        servers: totalGuilds
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to disforge!');
    if (this.client.config.logs.debug) console.log('✅ \x1b[34m[VOTES]\x1b[0m', 'Posted stats to disforge.com successfully!');
    return true;
  }

  async #postStatsToDiscordBotList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISCORDBOTLIST_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No discordbotlist.com API key found! Ignoring...');
      return false;
    }

    const request = await axios(`https://discordbotlist.com/api/v1/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        guilds: totalGuilds
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to discordbotlist.com!');
    if (this.client.config.logs.debug) console.log('✅ \x1b[34m[VOTES]\x1b[0m', 'Posted stats to discordbotlist.com successfully!');
    return true;
  }

  async #postStatsToBladeList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.BLADELIST_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No bladelist.gg API key found! Ignoring...');
      return false;
    }

    const request = await axios(`https://api.bladelist.gg/bots/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${Authorization}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        server_count: totalGuilds,
        shard_count: Number(process.env.SHARD_COUNT ?? 1)
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to bladelist.gg!');
    if (this.client.config.logs.debug) console.log('✅ \x1b[34m[VOTES]\x1b[0m', 'Posted stats to bladelist.gg successfully!');
    return true;
  }

  async #postStatsToFatesList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.FATESLIST_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) console.log('❌ \x1b[31m[VOTES]\x1b[0m', 'No fateslist.xyz API key found! Ignoring...');
      return false;
    }

    const request = await axios(`https://api.fateslist.xyz/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        guild_count: totalGuilds
      })
    });

    if (request.status >= 400) throw new Error('Failed to post stats to fateslist.xyz!');
    if (this.client.config.logs.debug) console.log('✅ \x1b[34m[VOTES]\x1b[0m', 'Posted stats to fateslist.xyz successfully!');
    return true;
  }
}
