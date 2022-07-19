import type { CommandLocale } from '#structures/Command';
import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';
import type { Message } from 'discord.js';
import { recommendLocale } from '#helpers/Locale';

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

  async verifyAFK(client: DenkyClient, message: Message) {
    const data = await client.databases.getAfk(message.author.id);
    if (!data) return;

    const t: CommandLocale = (path: Parameters<CommandLocale>[0], ...args: any) => {
      return client.languages.manager.get(recommendLocale(message.guild?.preferredLocale), path, ...args);
    };

    await client.databases.deleteAfk(message.author.id);
    message.member?.setNickname(data.originalNick).catch(() => {});
    message.reply(t('command:afk/autoremoved', message.author, data.startTime)).then(msg => {
      if (msg.channel) setTimeout(() => msg.delete(), 5000);
    });
  }

  async verifyAFKMention(client: DenkyClient, message: Message) {
    if (message.mentions.users.size === 0) return;

    const t: CommandLocale = (path: Parameters<CommandLocale>[0], ...args: any) => {
      return client.languages.manager.get(recommendLocale(message.guild?.preferredLocale), path, ...args);
    };

    for await (const user of message.mentions.users.first(5).values()) {
      if (user.id === message.author.id) continue;
      const data = await client.databases.getAfk(user.id);
      if (!data) return;
      message
        .reply({
          content: t('command:afk/mentioned', user, data.startTime, data.reason ?? undefined),
          allowedMentions: {
            parse: [],
            users: [message.author.id]
          }
        })
        .then(msg => {
          if (msg.channel) setTimeout(() => msg.delete(), 5000);
        });
    }
  }
}
