import type { Guild, GuildMember, User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string) => `I don't have the required permissions: ${perms}`,
  'permissions/user/missing': (perms: string) => `You don't have the required permissions: ${perms}`,
  'errors/commandGuildOnly': 'This command can only be used in servers.',

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

  // Server info
  'server/info/embed/owner': (owner: GuildMember) => `👑 **Owner**\n${owner.user.tag} (${owner.user.id})`,
  'server/info/embed/categories': 'Categories',
  'server/info/embed/textChannels': 'Text channels',
  'server/info/embed/voiceChannels': 'Voice channels',
  'server/info/embed/members': 'Members',
  'server/info/embed/memberCount': (members: number, bots: number, total: number) => `🙆 **Members:** ${members}\n🤖 **Bots:** ${bots}\n👥 **Total:** ${total}`,
  'server/info/embed/roles': 'Roles',
  'server/info/embed/boosts': (boosts: number, level: number) => `🌟 **Boosts:** ${boosts}\n🌠 **Level:** ${level}`,
  'server/info/embed/footer': (guild: Guild) => `🔢 ID: ${guild.id} | 📅 Created at`,

  // Config suggestions
  'config/suggestions/title': 'Settings Panel | Suggestions',
  'config/suggestions/enable': 'Enable',
  'config/suggestions/disable': 'Disable',

  'config/suggestions/pages/suggestions': 'Enable or disable the suggestion system',
  'config/suggestions/pages/categories': 'Add or delete suggestion categories',
  'config/suggestions/pages/reactions': 'Enable or disable reactions on suggestions',
  'config/suggestions/pages/cooldowns': 'Manage suggestion cooldowns',
  'config/suggestions/pages/threads': 'Enable or disable the use of threads',

  'config/suggestions/pages': 'Pages',
  'config/suggestions/pages/suggestions/title': 'Suggestions',
  'config/suggestions/pages/categories/title': 'Categories',
  'config/suggestions/pages/reactions/title': 'Reactions',
  'config/suggestions/pages/cooldowns/title': 'Cooldowns',
  'config/suggestions/pages/threads/title': 'Threads',

  'config/suggestions/disabled': 'The suggestion system is currently disabled.',
  'config/suggestions/enabled': 'The suggestion system is currently enabled.',

  'config/suggestions/noCategories': 'No categories have been created yet',

  'config/suggestions/actions/enabled': 'The suggestion system has been successfully enabled! Now, you need to add categories to finish the process.',
} as const;
