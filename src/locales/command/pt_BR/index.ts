import type { User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string[]) => `Eu não tenho as permissões necessárias: ${perms.join(', ')}`,
  'permissions/user/missing': (perms: string[]) => `Você não tem as permissões necessárias: ${perms.join(', ')}`,

  // Ping
  'ping/calculating': 'Calculando...',
  'ping/result': (u: User, wsPing: number, apiPing: number, dbPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms\n**Database Ping:** ${dbPing}ms`,

  // AFK
  'afk/enabled': (u: User) => `✅ ${u} **|** Agora você está ausente.`,
  'afk/alreadySet': (u: User) => `❌ ${u} **|** Você já está ausente.`,
  'afk/notAfk': (u: User) => `❌ ${u} **|** Você não está ausente.`,
  'afk/manuallyRemoved': (u: User) => `✅ ${u} **|** Você não está mais ausente.`,
  'afk/autoremoved': (u: User, time: number) => `👋 ${u} **|** Bem-vindo novamente, seu AFK foi removido.\n⏰ **|** Você ficou ausente <t:${time}:R>`,
  'afk/mentioned': (u: User, time: number, reason?: string) => `${u} ficou ausente <t:${time}:R>.\n_\`${reason ?? 'Sem motivo informado.'}\`_`,

  // Poll
  'poll/create/title': 'Enquete',
  'poll/create/footer': (u: string) => `Enquete criada por ${u}`,
  'poll/create/options': 'Opções',
  'poll/create/duplicatedWarning': 'Algumas opções foram removidas automaticamente de sua enquete por serem repetidas.',

  // Help
  'help/button/add': 'Ne adicione',
  'help/button/support': 'Servidor de Suporte',
  'help/button/vote': 'Vote',
  'help/embed/description': (supportClick: string, addClick: string, totalCommands: string) =>
    `❔ Meu prefixo neste servidor é: \`/.\`\n🚪 Entre em meu servidor de suporte: [clique aqui](${supportClick}).\n🎉 Me adicione em seu servidor: [clique aqui](${addClick}).\n\nAtualmente eu possuo \`${totalCommands}\` comandos.`,
  'help/menu/placeholder': 'Clique aqui para escolher a categoria de comandos.',
} as const;
