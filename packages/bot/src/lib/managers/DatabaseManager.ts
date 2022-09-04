import { Afk as AFKConfig, Giveaway as GiveawayConfig, Lockdown, PrismaClient, Suggestion as SuggestionConfig } from '@prisma-client';

export class DatabaseManager extends PrismaClient {
  constructor() {
    super();
    this.$connect();
  }

  // #region Reminder
  getReminder(id: string) {
    return this.reminder.findFirst({ where: { id } });
  }

  getReminders(authorId: string) {
    return this.reminder.findMany({ where: { authorId } });
  }

  deleteReminder(id: string) {
    return this.reminder.delete({ where: { id } });
  }
  // #endregion

  // #region Lockdown
  createLockdown(data: Lockdown) {
    return this.lockdown.create({ data });
  }

  getLockdown(guildId: string) {
    return this.lockdown.findFirst({ where: { guildId } });
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
    return this.giveaway.findFirst({ where: { messageId } });
  }

  deleteGiveaway(messageId: string) {
    return this.giveaway.delete({ where: { messageId } }).catch(() => {});
  }

  updateGiveaway(data: GiveawayConfig) {
    return this.giveaway.update({ where: { messageId: data.messageId }, data });
  }

  fetchGiveaways() {
    return this.giveaway.findMany({ where: { ended: false }, take: 5000 });
  }

  fetchGiveaway(messageId: string) {
    return this.giveaway.findFirst({ where: { messageId } });
  }
  // #endregion

  // #region Suggestion
  createSuggestion(data: SuggestionConfig) {
    return this.suggestion.create({ data });
  }

  getSuggestion(guildId: string) {
    return this.suggestion.findFirst({ where: { guildId } });
  }

  deleteSuggestion(guildId: string) {
    return this.suggestion.delete({ where: { guildId } }).catch(() => {});
  }

  updateSuggestion(data: SuggestionConfig) {
    return this.suggestion.update({ where: { guildId: data.guildId }, data });
  }
  // #endregion

  // #region Afk
  createAfk(data: AFKConfig) {
    return this.afk.create({ data });
  }

  getAfk(userId: string) {
    return this.afk.findFirst({ where: { userId } });
  }

  deleteAfk(userId: string) {
    return this.afk.delete({ where: { userId } }).catch(() => {});
  }

  updateAfk(data: AFKConfig) {
    return this.afk.update({ where: { userId: data.userId }, data });
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
