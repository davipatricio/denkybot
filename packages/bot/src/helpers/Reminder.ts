import type { CommandLocale } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import type { Reminder } from '@prisma-client';
import { GuildTextBasedChannel, User } from 'discord.js';
import type { SupportedLocales } from '../lib/managers/LanguageManager';

export async function checkSingleEndedReminder(client: DenkyClient, remind: Reminder) {
  const { authorId, channelId, endTimestamp, text, id } = remind;
  if (Date.now() < endTimestamp) return;

  await client.databases.deleteReminder(id);

  let channel = channelId ? await client.channels.fetch(channelId) : await client.users.fetch(authorId);
  channel = channel instanceof User ? await channel.createDM().catch(() => null) : (channel as GuildTextBasedChannel);

  const t: CommandLocale = (path: Parameters<CommandLocale>[0], ...args: any) => {
    return client.languages.manager.get(client.config.defaultLanguage as SupportedLocales, path, ...args);
  };

  channel?.send(`⏲️ <@!${authorId}> **|** ${t('command:reminders/notify', authorId, text)}`);
}

export async function checkEndedReminders(client: DenkyClient) {
  const reminderArray = await client.databases.reminder.findMany({ take: 2000 });
  for (const reminder of reminderArray) checkSingleEndedReminder(client, reminder);
}
