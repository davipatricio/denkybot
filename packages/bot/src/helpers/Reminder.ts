import type { DenkyClient } from '#types/Client';
import type { Reminder } from '@prisma-client';
import { User, GuildTextBasedChannel } from 'discord.js';

export async function checkSingleEndedReminder(client: DenkyClient, remind: Reminder) {
  const { authorId, channelId, endTimestamp, text, id } = remind;
  if (Date.now() < endTimestamp) return;

  await client.databases.deleteReminder(id);

  let channel = channelId ? await client.channels.fetch(channelId) : await client.users.fetch(authorId);
  channel = channel instanceof User ? await channel.createDM().catch(() => null) : (channel as GuildTextBasedChannel);

  channel?.send(`⏲️ <@!${authorId}> **|** ó o lembreteeeee ${text}`);
}

export async function checkEndedReminders(client: DenkyClient) {
  const reminderArray = await client.databases.reminder.findMany({ take: 2000 });
  for (const reminder of reminderArray) checkSingleEndedReminder(client, reminder);
}
