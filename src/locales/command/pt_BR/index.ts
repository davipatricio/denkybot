import type { User } from 'discord.js';

export default {
  'ping:calculating': 'Calculando...',
  'ping:result': (u: User, wsPing: number, apiPing: number, dbPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms\n**Database Ping:** ${dbPing}ms`,
} as const;
