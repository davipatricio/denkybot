import type { User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string[]) => `Eu não tenho as permissões necessárias: ${perms.join(', ')}`,
  'permissions/user/missing': (perms: string[]) => `Você não tem as permissões necessárias: ${perms.join(', ')}`,

  // Ping
  'ping/calculating': 'Calculando...',
  'ping/result': (u: User, wsPing: number, apiPing: number, dbPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms\n**Database Ping:** ${dbPing}ms`,
} as const;
