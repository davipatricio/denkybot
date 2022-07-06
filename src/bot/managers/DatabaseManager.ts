import { PrismaClient } from '@prisma/client';

export interface SuggestionConfig {
  guildId: string;
  addReactions?: boolean;
  categories?: string[];
  cooldown?: number;
  useThreads?: boolean;
}

export type FullSuggestionConfig = Required<SuggestionConfig>;

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
    return this.suggestion.findFirst({
      where: {
        guildId
      }
    });
  }

  deleteSuggestion(guildId: string) {
    return this.suggestion.delete({
      where: {
        guildId
      }
    });
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
}
