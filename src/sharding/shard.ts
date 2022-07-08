import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
import { createLogger } from 'winston';
// @ts-ignore When running GitHub Actions, the config file isnt available
import Configuration from '../../config.json';
import { Initializer } from '../bot/utils/Initializer';

config({ path: '../.env' });

const logger = createLogger({ handleRejections: true, handleExceptions: true });
Initializer.loadWinstonLogger(logger, Configuration, 'Manager');

const sharder = new ShardingManager('./bot/index.js', {
  totalShards: Configuration.shardCount,
  mode: 'process',
  token: process.env.BOT_TOKEN,
  respawn: true
});

sharder.spawn().then(shards => {
  shards.forEach(shard => {
    shard.on('ready', () => {
      logger.debug(`Shard ${shard.id} has been spawned.`);
    });
    shard.on('disconnect', () => {
      logger.error(`Shard ${shard.id} disconnected from Discord Websocket.`);
    });
    shard.on('death', () => {
      logger.error(`Shard ${shard.id} died! Respawning...`);
    });
  });
});
