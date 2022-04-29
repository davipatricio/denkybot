import type { Message } from 'discord.js';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';
import type { AllLocalePaths, SupportedLocales } from '../managers/LanguageManager';

export default class MessageCreateEvent extends Event {
  constructor() {
    super();
    this.eventName = 'messageCreate';
  }

  override run(client: DenkyClient, message: Message) {
    if (message.author.bot) return;

    this.verifyAFK(client, message);
    this.verifyAFKMention(client, message);
  }

  verifyAFK(client: DenkyClient, message: Message) {
    const data = client.databases.afk.get(`afk${message.author.id}`);
    if (!data) return;

    const t = (path: AllLocalePaths, ...args: unknown[]) => {
      return client.languages.manager.get((message.guild?.preferredLocale.replace('-', '_') ?? client.config.defaultLanguage) as SupportedLocales, path, ...args);
    };

    client.databases.afk.delete(message.author.id);
    message.member?.setNickname(data.o).catch(() => {});
    message.reply(t('command:afk/autoremoved', message.author, data.t)).then(msg => setTimeout(msg.delete, 5000));
  }

  verifyAFKMention(client: DenkyClient, message: Message) {
    if (message.mentions.users.size === 0) return;

    const t = (path: AllLocalePaths, ...args: unknown[]) => {
      return client.languages.manager.get((message.guild?.preferredLocale.replace('-', '_') ?? client.config.defaultLanguage) as SupportedLocales, path, ...args);
    };

    for (const user of message.mentions.users.first(5).values()) {
      const data = client.databases.afk.get(message.author.id);
      if (!data) return;
      message.reply(t('command:afk/mentioned', user, data.t, data.m)).then(msg => setTimeout(msg.delete, 5000));
    }
  }
}
