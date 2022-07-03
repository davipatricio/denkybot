import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
// @ts-ignore When running GitHub Actions, the config file isnt available
import Configuration from '../../config.json';
import { Logger } from '../bot/utils/Logger';

config({ path: '../.env' });

const logger = new Logger();

const sharder = new ShardingManager('./bot/index.js', {
  totalShards: Configuration.shardCount,
  mode: 'process',
  token: process.env.BOT_TOKEN,
  respawn: true
});

sharder.spawn().then(shards => {
  shards.forEach(shard => {
    shard.on('ready', () => logger.log(`Shard ${shard.id} has been spawned.`, 'SHARDS'));
    shard.on('disconnect', () => logger.error(`Shard ${shard.id} disconnected from Discord Websocket.`, 'SHARDS'));
    shard.on('death', () => logger.error(`Shard ${shard.id} died! Respawning...`, 'SHARDS'));
  });
});
