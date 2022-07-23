/* eslint-disable import/first */
require('module-alias/register');

import { createLogger } from '@logger';
import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
// @ts-ignore When running GitHub Actions, the config file isn't available
import Configuration from '@bot/config';

config({ path: '../.env' });
config({ path: '../../prisma/.env' });
config({ path: '../../logger/.env' });

const logger = createLogger();

const sharder = new ShardingManager('./Denky.js', {
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
