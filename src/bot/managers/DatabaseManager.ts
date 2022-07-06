import { PrismaClient } from '@prisma/client';

export interface SuggestionConfig {
  guildId: string;
  addReactions?: boolean;
  categories?: string[];
  cooldown?: number;
  useThreads?: boolean;
}
export type FullSuggestionConfig = Required<SuggestionConfig>;

export interface AFKConfig {
  userId: string;
  guildId?: string;
  reason?: string;
  originalNick?: string;
  startTime: number;
}
export type FullAFKConfig = Required<AFKConfig>;

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

  updateSuggestion(config: FullSuggestionConfig) {
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

  updateAfk(config: FullAFKConfig) {
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
}
