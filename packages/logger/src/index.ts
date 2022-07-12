import type { DenkyClient } from '@bot/src/types/Client';
import { inspect } from 'node:util';
import { createLogger as createWinstonLogger, format, Logger, LoggerOptions } from 'winston';
import { Console, File } from 'winston/lib/winston/transports';
// @ts-ignore When running GitHub Actions, the config file isn't available
import Configuration from '@bot/config.json';
import { SentryTransporter } from './transporters/Sentry';
import { WebhookTransporter } from './transporters/Webhook';

type BotConfiguration = typeof import('@bot/config.example.json');

function loadWinstonLogger(logger: Logger, config: BotConfiguration, shardId: string | number = 'Manager') {
  logger
    .add(
      new Console({
        level: 'silly',
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf(info => {
            const tags = info.tags?.map(t => `\x1B[36m${t}\x1B[39m`).join(', ') ?? '';
            const shardPrefix = `--- [\x1B[36mShard ${shardId}\x1B[39m, ${tags}]:`;
            const levelPrefix = info.level.includes('info') || info.level.includes('warn') ? `${info.level} ` : info.level;
            return `${info.timestamp} ${levelPrefix} ${shardPrefix} ${info.message instanceof Error ? inspect(info.message, { depth: 0 }) : info.message}`;
          })
        )
      })
    )
    .add(
      new File({
        level: 'debug',
        filename: typeof shardId === 'number' ? `shard${shardId}.log` : 'manager.log',
        dirname: './logs',
        format: format.combine(
          format.timestamp(),
          format.uncolorize(),
          format.printf(info => {
            const tags = info.tags?.map(t => `\x1B[36m${t}\x1B[39m`).join(', ') ?? '';
            const levelPrefix = info.level.includes('info') || info.level.includes('warn') ? `${info.level} ` : info.level;
            return `${info.timestamp} ${levelPrefix} --- [Shard ${shardId}, ${tags}]: ${info.message instanceof Error ? inspect(info.message, { depth: 0 }) : info.message}`;
          })
        )
      })
    );

  if (!config.logs.sentry) logger.warn('Sentry config is set to false. Skipping Sentry configuration.', { tags: ['Sentry'] });
  if (config.logs.sentry && process.env.SENTRY_DSN) {
    logger.add(new SentryTransporter(process.env.SENTRY_DSN));
    logger.info('Sentry loaded.', { tags: ['Sentry'] });
  }
  if (config.webhooks.errorLogs && process.env.DISCORD_ERRORLOGS_WEBHOOK_URL) logger.add(new WebhookTransporter(process.env.DISCORD_ERRORLOGS_WEBHOOK_URL));
}

function createLogger(options?: LoggerOptions, client?: DenkyClient) {
  const logger = createWinstonLogger({
    handleExceptions: options?.handleExceptions ?? true,
    handleRejections: options?.handleRejections ?? true,
    exitOnError: !(client?.config.features.preventCrashes ?? Configuration.features.preventCrashes)
  });
  loadWinstonLogger(logger, client?.config ?? Configuration, client?.shard?.ids[0] ?? 'Manager');

  return logger;
}

export { Logger, createLogger };
