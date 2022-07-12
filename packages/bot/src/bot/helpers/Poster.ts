// FIXME: Use Node 18.x fetch instead of undici when @types/node gets the fetch function added to the global namespace
import { request } from 'undici';
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
    if (this.client.config.logs.debug) this.client.logger.error(message, { tags: ['Votes'] });
  }

  async #postStatsToTopGG({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.TOPGG_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug)
        this.client.logger.warn('No top.gg API key found! Ignoring...', {
          tags: ['Votes']
        });
      return false;
    }

    const req = await request('https://top.gg/api/bots/stats', {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        server_count: totalGuilds,
        shard_count: Number(process.env.SHARD_COUNT ?? 1)
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to top.gg!');
    if (this.client.config.logs.debug)
      this.client.logger.debug('Posted stats to top.gg successfully!', {
        tags: ['Votes']
      });
    return true;
  }

  async #postStatsToDiscordBots({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.BOTSGG_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug)
        this.client.logger.warn('No bots.gg API key found! Ignoring...', {
          tags: ['Votes']
        });
      return false;
    }

    const req = await request(`https://discord.bots.gg/api/v1/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guildCount: totalGuilds,
        shardCount: Number(process.env.SHARD_COUNT ?? 1)
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to bots.gg!');
    if (this.client.config.logs.debug)
      this.client.logger.debug('Posted stats to bots.gg successfully!', {
        tags: ['Votes']
      });
    return true;
  }

  async #postStatsToDiscords({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISCORDS_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug)
        this.client.logger.warn('No discords.com API key found! Ignoring...', {
          tags: ['Votes']
        });
      return false;
    }

    const req = await request(`https://discords.com/bots/api/bot/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        server_count: totalGuilds
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to discords!');
    if (this.client.config.logs.debug)
      this.client.logger.debug('Posted stats to discords.com successfully!', {
        tags: ['Votes']
      });
    return true;
  }

  async #postStatsToDisforge({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISFORGE_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug)
        this.client.logger.warn('No disforge.com API key found! Ignoring...', {
          tags: ['Votes']
        });
      return false;
    }

    const req = await request(`https://disforge.com/api/botstats/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        servers: totalGuilds
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to disforge!');
    if (this.client.config.logs.debug)
      this.client.logger.debug('Posted stats to disforge.com successfully!', {
        tags: ['Votes']
      });
    return true;
  }

  async #postStatsToDiscordBotList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISCORDBOTLIST_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug) this.client.logger.warn('No discordbotlist.com API key found! Ignoring...', { tags: ['Votes'] });
      return false;
    }

    const req = await request(`https://discordbotlist.com/api/v1/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guilds: totalGuilds
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to discordbotlist.com!');
    if (this.client.config.logs.debug) this.client.logger.debug('Posted stats to discordbotlist.com successfully!', { tags: ['Votes'] });
    return true;
  }

  async #postStatsToBladeList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.BLADELIST_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug)
        this.client.logger.warn('No bladelist.gg API key found! Ignoring...', {
          tags: ['Votes']
        });
      return false;
    }

    const req = await request(`https://api.bladelist.gg/bots/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${Authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        server_count: totalGuilds,
        shard_count: Number(process.env.SHARD_COUNT ?? 1)
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to bladelist.gg!');
    if (this.client.config.logs.debug)
      this.client.logger.debug('Posted stats to bladelist.gg successfully!', {
        tags: ['Votes']
      });
    return true;
  }

  async #postStatsToFatesList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.FATESLIST_STATS_KEY;
    if (!Authorization) {
      if (this.client.config.logs.debug)
        this.client.logger.warn('No fateslist.xyz API key found! Ignoring...', {
          tags: ['Votes']
        });
      return false;
    }

    const req = await request(`https://api.fateslist.xyz/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guild_count: totalGuilds
      })
    });

    if (req.statusCode >= 400) throw new Error('Failed to post stats to fateslist.xyz!');
    if (this.client.config.logs.debug)
      this.client.logger.debug('Posted stats to fateslist.xyz successfully!', {
        tags: ['Votes']
      });
    return true;
  }
}
