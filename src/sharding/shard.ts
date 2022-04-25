import { ShardingManager } from 'discord.js';
import env from 'dotenv';

env.config({ path: '../.env' });

const sharder = new ShardingManager('./bot/index.js', {
  totalShards: Number(process.env.SHARD_COUNT ?? 4),
  mode: 'process',
  token: process.env.BOT_TOKEN,
  respawn: true,
});

sharder.spawn().then(shards => {
  shards.forEach(shard => {
    console.log(`[DENKY] Shard ${shard.id} has been spawned.`);
    shard.on('ready', () => console.log(`[DENKY] Shard ${shard.id} is ready.`));
    shard.on('disconnect', () => console.log(`[DENKY] Shard ${shard.id} disconnected from Discord Websocket.`));
    shard.on('death', () => console.log(`[DENKY] Shard ${shard.id} died! Respawning...`));
  });
});
