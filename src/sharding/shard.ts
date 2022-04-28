import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
import Configuration from '../../config.json';

config({ path: '../.env' });

const sharder = new ShardingManager('./bot/index.js', {
  totalShards: Configuration.shardCount,
  mode: 'process',
  token: process.env.BOT_TOKEN,
  respawn: true,
});

sharder.spawn().then(shards => {
  shards.forEach(shard => {
    console.log('✅ \x1b[34m[SHARDS]\x1b[0m', `Shard ${shard.id} has been spawned.`);
    shard.on('ready', () => console.log('✅ \x1b[34m[SHARDS]\x1b[0m', `Shard ${shard.id} is ready.`));
    shard.on('disconnect', () => console.log('❌ \x1b[31m[SHARDS]\x1b[0m', `Shard ${shard.id} disconnected from Discord Websocket.`));
    shard.on('death', () => console.log('❌ \x1b[31m[SHARDS]\x1b[0m', `Shard ${shard.id} died! Respawning...`));
  });
});
