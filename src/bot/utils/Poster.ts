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

    await this.#postStatsToTopGG({ totalGuilds }).catch(console.log);
    await this.#postStatsToDiscords({ totalGuilds }).catch(console.log);
    await this.#postStatsToDisforge({ totalGuilds }).catch(console.log);
    await this.#postStatsToBladeList({ totalGuilds }).catch(console.log);
    await this.#postStatsToFatesList({ totalGuilds }).catch(console.log);
    await this.#postStatsToDiscordBots({ totalGuilds }).catch(console.log);
    await this.#postStatsToDiscordBotList({ totalGuilds }).catch(console.log);
  }

  async #postStatsToTopGG({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.TOPGG_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No top.gg API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://top.gg/api/bots/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server_count: totalGuilds,
        shard_count: Number(process.env.SHARD_COUNT ?? 1),
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to top.gg!');
    console.log('Posted stats to top.gg successfully!');
    return true;
  }

  async #postStatsToDiscordBots({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.BOTSGG_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No bots.gg API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://discord.bots.gg/api/v1/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guildCount: totalGuilds,
        shardCount: Number(process.env.SHARD_COUNT ?? 1),
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to bots.gg!');
    console.log('Posted stats to bots.gg successfully!');
    return true;
  }

  async #postStatsToDiscords({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISCORDS_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No discords.com API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://discords.com/bots/api/bot/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server_count: totalGuilds,
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to discords!');
    console.log('Posted stats to discords.com successfully!');
    return true;
  }

  async #postStatsToDisforge({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISFORGE_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No disforge.com API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://disforge.com/api/botstats/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        servers: totalGuilds,
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to disforge!');
    console.log('Posted stats to disforge.com successfully!');
    return true;
  }

  async #postStatsToDiscordBotList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.DISCORDBOTLIST_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No discordbotlist.com API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://discordbotlist.com/api/v1/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guilds: totalGuilds,
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to discordbotlist.com!');
    console.log('Posted stats to discordbotlist.com successfully!');
    return true;
  }

  async #postStatsToBladeList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.BLADELIST_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No bladelist.gg API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://api.bladelist.gg/bots/${this.client.user?.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${Authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server_count: totalGuilds,
        shard_count: Number(process.env.SHARD_COUNT ?? 1),
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to bladelist.gg!');
    console.log('Posted stats to bladelist.gg successfully!');
    return true;
  }

  async #postStatsToFatesList({ totalGuilds }: { totalGuilds: number }) {
    const Authorization = process.env.FATESLIST_STATS_KEY;
    if (!Authorization) {
      console.log(`[DENKY] No fateslist.xyz API key found! Ignoring...`);
      return false;
    }

    const request = await fetch(`https://api.fateslist.xyz/bots/${this.client.user?.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guild_count: totalGuilds,
      }),
    });

    if (request.status >= 400) throw new Error('Failed to post stats to fateslist.xyz!');
    console.log('Posted stats to fateslist.xyz successfully!');
    return true;
  }
}
