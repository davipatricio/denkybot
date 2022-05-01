import type { Guild, User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string[]) => `I don't have the required permissions: ${perms.join(', ')}`,
  'permissions/user/missing': (perms: string[]) => `You don't have the required permissions: ${perms.join(', ')}`,

  // Ping
  'ping/calculating': 'Calculating...',
  'ping/result': (u: User, wsPing: number, apiPing: number, dbPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms\n**Database Ping:** ${dbPing}ms`,

  // AFK
  'afk/enabled': (u: User) => `✅ ${u} **|** Now you are AFK.`,
  'afk/alreadySet': (u: User) => `❌ ${u} **|** You are already AFK.`,
  'afk/notAfk': (u: User) => `❌ ${u} **|** You are not AFK.`,
  'afk/manuallyRemoved': (u: User) => `✅ ${u} **|** You are no longer AFK.`,
  'afk/autoremoved': (u: User, time: number) => `👋 ${u} **|** Welcome back, your AFK has been removed.\n⏰ **|** You stayed AFK <t:${time}:R>`,
  'afk/mentioned': (u: User, time: number, reason?: string) => `${u} got AFK <t:${time}:R>.\n_\`${reason ?? 'No reason given.'}\`_`,

  // Poll
  'poll/create/title': 'Poll',
  'poll/create/footer': (u: string) => `Poll created by ${u}`,
  'poll/create/options': 'Options',
  'poll/create/duplicatedWarning': 'Some options were removed automatically because they were duplicated.',

  // Help
  'help/button/add': 'Add me',
  'help/button/support': 'Support Server',
  'help/button/vote': 'Vote',
  'help/embed/description': (supportClick: string, addClick: string, totalCommands: number) =>
    `❔ My prefix on this server is: \`/\`.\n🚪 Join my support server: [click here](${supportClick}).\n🎉 Add me to your server: [click here](${addClick}).\n\nCurrently I have \`${totalCommands}\` commands.`,
  'help/menu/placeholder': 'Click here to choose the command category.',

  // User info
  'user/info/userTag': 'Discord Tag',
  'user/info/userId': 'Discord ID',
  'user/info/userCreatedAt': 'Account created at',
  'user/info/memberJoinedAt': 'Member joined at',

  // User avatar
  'user/avatar/title': (user: User) => `${user}'s avatar`,
  'user/avatar/browser': 'Open in browser',
  'user/avatar/seeGuildAvatar': 'See guild avatar',
  'user/avatar/seeGlobalAvatar': 'See global avatar',

  // Server icon
  'server/icon/title': (guild: Guild) => `${guild} icon`,
  'server/icon/browser': 'Open in browser',
} as const;
