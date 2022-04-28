import type { User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string[]) => `I don't have the required permissions: ${perms.join(', ')}`,
  'permissions/user/missing': (perms: string[]) => `You don't have the required permissions: ${perms.join(', ')}`,

  // Ping
  'ping/calculating': 'Calculating...',
  'ping/result': (u: User, wsPing: number, apiPing: number, dbPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms\n**Database Ping:** ${dbPing}ms`,
} as const;
