import type { DenkyClient } from '#types/Client';
import { Afk, Giveaway, Lockdown, PrismaClient, Suggestion } from '@prisma-client';
import Redis from 'ioredis';
import type Prisma from 'prisma';
import { createPrismaRedisCache } from 'prisma-redis-middleware';

export type SuggestionConfig = Partial<Suggestion> & Pick<Suggestion, 'guildId'>;
export type AFKConfig = Partial<Afk> & Pick<Afk, 'userId' | 'startTime'>;
export type GiveawayConfig = Giveaway;
export type LockdownConfig = Lockdown;

export class DatabaseManager extends PrismaClient {
  constructor(client: DenkyClient) {
    super();
    if (client.config.cache.prismaQueries) {
      if (!process.env.REDIS_CACHE_URL) {
        process.env.REDIS_CACHE_URL = '';

        if (client.config.cache.type === 'redis') {
          client.logger.warn('No Redis cache URL provided, falling back to in-memory cache.', { tags: ['Cache'] });
          client.config.cache.type = 'memory';
        }
      }

      const storage =
        client.config.cache.type === 'redis'
          ? {
              type: 'redis' as const,
              options: {
                client: new Redis(process.env.REDIS_CACHE_URL),
                invalidation: { referencesTTL: client.config.cache.lifetime }
              }
            }
          : { type: 'memory' as const, options: { invalidation: true } };

      const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
        models: [{ model: 'Suggestion' }, { model: 'Afk', cacheTime: 2500 }, { model: 'Giveaway' }],
        storage,
        cacheTime: client.config.cache.lifetime,
        onError: error => {
          client.logger.error(error, { tags: 'Cache' });
        }
      });

      this.$use(cacheMiddleware);
    }
    this.$connect();
  }

  // #region Lockdown
  createLockdown(data: Lockdown) {
    return this.lockdown.create({ data });
  }

  getLockdown(guildId: string) {
    return this.lockdown.findFirst({ where: { guildId } }).catch(() => undefined);
  }

  deleteLockdown(guildId: string) {
    return this.lockdown.delete({ where: { guildId } });
  }
  // #endregion

  // #region Giveaway
  createGiveaway(data: GiveawayConfig) {
    return this.giveaway.create({ data });
  }

  getGiveaway(messageId: string) {
    return this.giveaway
      .findFirst({
        where: {
          messageId
        }
      })
      .catch(() => undefined);
  }

  deleteGiveaway(messageId: string) {
    return this.giveaway
      .delete({
        where: {
          messageId
        }
      })
      .catch(() => {});
  }

  updateGiveaway(data: GiveawayConfig) {
    return this.giveaway.update({
      where: {
        messageId: data.messageId
      },
      data
    });
  }

  fetchGiveaways() {
    return this.giveaway.findMany({
      where: {
        ended: false
      },
      take: 100
    });
  }

  fetchGiveaway(messageId: string) {
    return this.giveaway
      .findFirst({
        where: {
          messageId
        }
      })
      .catch(() => undefined);
  }
  // #endregion

  // #region Suggestion
  createSuggestion(data: SuggestionConfig) {
    return this.suggestion.create({ data });
  }

  getSuggestion(guildId: string) {
    return this.suggestion
      .findFirst({
        where: {
          guildId
        }
      })
      .catch(() => undefined);
  }

  deleteSuggestion(guildId: string) {
    return this.suggestion
      .delete({
        where: {
          guildId
        }
      })
      .catch(() => {});
  }

  updateSuggestion(data: SuggestionConfig) {
    return this.suggestion.update({
      where: {
        guildId: data.guildId
      },
      data
    });
  }
  // #endregion

  // #region Afk
  createAfk(data: AFKConfig) {
    return this.afk.create({ data });
  }

  getAfk(userId: string) {
    return this.afk
      .findFirst({
        where: {
          userId
        }
      })
      .catch(() => undefined);
  }

  deleteAfk(userId: string) {
    return this.afk
      .delete({
        where: {
          userId
        }
      })
      .catch(() => {});
  }

  updateAfk(data: AFKConfig) {
    return this.afk.update({
      where: {
        userId: data.userId
      },
      data
    });
  }
  // #endregion

  async getPing(userId: string) {
    const date = Date.now();
    try {
      await this.getAfk(userId);
      return Date.now() - date;
    } catch {
      return Date.now() - date;
    }
  }
}
