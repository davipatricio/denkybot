import { Afk, PrismaClient, Suggestion } from '@prisma/client';

export type SuggestionConfig = Partial<Suggestion> & Pick<Suggestion, 'guildId'>;
export type FullSuggestionConfig = Suggestion;

export type AFKConfig = Partial<Afk> & Pick<Afk, 'userId' | 'startTime'>;
export type FullAFKConfig = Afk;

export class DatabaseManager extends PrismaClient {
  // #region Suggestion
  createSuggestion(config: SuggestionConfig) {
    return this.suggestion.create({
      data: {
        guildId: config.guildId,
        addReactions: config.addReactions,
        categories: config.categories,
        cooldown: config.cooldown,
        useThreads: config.useThreads
      }
    });
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

  updateSuggestion(config: SuggestionConfig) {
    return this.suggestion.update({
      where: {
        guildId: config.guildId
      },
      data: {
        addReactions: config.addReactions,
        categories: config.categories,
        cooldown: config.cooldown,
        useThreads: config.useThreads
      }
    });
  }
  // #endregion

  // #region Afk
  createAfk(config: AFKConfig) {
    return this.afk.create({
      data: {
        userId: config.userId,
        guildId: config.guildId,
        reason: config.reason,
        originalNick: config.originalNick,
        startTime: config.startTime
      }
    });
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

  updateAfk(config: AFKConfig) {
    return this.afk.update({
      where: {
        userId: config.userId
      },
      data: {
        guildId: config.guildId,
        reason: config.reason,
        originalNick: config.originalNick,
        startTime: config.startTime
      }
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
