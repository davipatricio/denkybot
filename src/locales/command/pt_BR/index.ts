import type { Guild, GuildMember, User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string) => `Eu não tenho as permissões necessárias: \`${perms}\``,
  'permissions/user/missing': (perms: string) => `Você não tem as permissões necessárias: \`${perms}\``,
  'errors/commandGuildOnly': 'Este comando só pode ser executado em servidores.',

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

  // User info
  'user/info/userTag': 'Tag do Discord',
  'user/info/userId': 'ID do Discord',
  'user/info/userCreatedAt': 'Conta criada em',
  'user/info/memberJoinedAt': 'Entrou em',

  // User avatar
  'user/avatar/title': (user: User) => `Avatar de ${user}`,
  'user/avatar/browser': 'Abrir avatar no navegador',
  'user/avatar/seeGuildAvatar': 'Ver o avatar do usuário neste servidor',
  'user/avatar/seeGlobalAvatar': 'Ver o avatar do usuário neste servidor',

  // Server icon
  'server/icon/title': (guild: Guild) => `Ícone do servidor ${guild}`,
  'server/icon/browser': 'Abrir ícone no navegador',

  // Server info
  'server/info/embed/owner': (owner: GuildMember) => `👑 **Dono**\n${owner.user.tag} (${owner.user.id})`,
  'server/info/embed/categories': 'Categorias',
  'server/info/embed/textChannels': 'Canais de texto',
  'server/info/embed/voiceChannels': 'Canais de voz',
  'server/info/embed/members': 'Membros',
  'server/info/embed/memberCount': (members: number, bots: number, total: number) => `🙆 **Membros:** ${members}\n🤖 **Bots:** ${bots}\n👥 **Total:** ${total}`,
  'server/info/embed/roles': 'Cargos',
  'server/info/embed/boosts': (boosts: number, level: number) => `🌟 **Impulsos:** ${boosts}\n🌠 **Nível:** ${level}`,
  'server/info/embed/footer': (guild: Guild) => `🔢 ID: ${guild.id} | 📅 Criado em`,

  // Config suggestions
  'config/suggestions/title': 'Painel de configurações | Sugestões',
  'config/suggestions/enable': 'Habilitar',
  'config/suggestions/disable': 'Desabilitar',

  'config/suggestions/pages': 'Páginas',
  'config/suggestions/pages/suggestions': 'Ative ou desativar o sistema de sugestões',
  'config/suggestions/pages/categories': 'Adicione ou exclua categorias de sugestões',
  'config/suggestions/pages/reactions': 'Habilite ou desabilite reações em sugestões',
  'config/suggestions/pages/cooldowns': 'Gerencie cooldowns de sugestões',
  'config/suggestions/pages/threads': "Ative ou desative o uso de tópicos 'threads' em sugestões",

  'config/suggestions/pages/suggestions/title': 'Sugestões',
  'config/suggestions/pages/categories/title': 'Categorias',
  'config/suggestions/pages/reactions/title': 'Reações',
  'config/suggestions/pages/cooldowns/title': 'Cooldowns',
  'config/suggestions/pages/threads/title': 'Tópicos',

  'config/suggestions/disabled': 'O sistema de sugestões está atualmente desativado.',
  'config/suggestions/enabled': 'O sistema de sugestões está atualmente habilitado.',

  'config/suggestions/noCategories': 'Não há categorias configuradas',

  'config/suggestions/actions/enabled': 'O sistema de sugestões foi habilitado com sucesso! Agora, você precisa adicionar categorias para finalizar o processo.',
} as const;
