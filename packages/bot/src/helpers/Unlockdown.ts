import type { DenkyClient } from '#types/Client';
import type { UnlockdownTask } from '@prisma-client';
import { PermissionFlagsBits } from 'discord.js';

export async function checkSingleEndedLockdown(client: DenkyClient, unlockdown: UnlockdownTask) {
  const { endTimestamp, guildId } = unlockdown;
  if (Date.now() < endTimestamp) return;
  await client.databases.unlockdownTask.delete({ where: { guildId } });
  const lockdownData = await client.databases.getLockdown(guildId);
  if (!lockdownData) return;
  const { blockedChannels } = lockdownData;

  await client.databases.deleteLockdown(guildId);
  const guild = await client.guilds.fetch(guildId).catch(() => null);
  if (!guild) return;

  const channels = (await guild.channels.fetch()).filter(channel => blockedChannels.includes(channel.id));
  if (!channels.size) return;

  for (const channel of channels.values()) {
    if (!channel.manageable) continue;

    const permissionCached = channel.permissionOverwrites.cache.get(guild.id);
    if (!permissionCached) {
      channel.permissionOverwrites.create(guild.id, { SendMessages: false, Connect: false }).catch(() => {});
      continue;
    }

    if (permissionCached.deny.has(PermissionFlagsBits.SendMessages) || permissionCached.deny.has(PermissionFlagsBits.Connect)) {
      permissionCached.edit({ SendMessages: null, Connect: null }).catch(() => {});
    }
  }
}

export async function checkEndedLockdowns(client: DenkyClient) {
  const lockdownArray = await client.databases.unlockdownTask.findMany();
  for (const lockdown of lockdownArray) checkSingleEndedLockdown(client, lockdown);
}
