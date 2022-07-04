import type { Guild, GuildMember, TextChannel, User } from 'discord.js';

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

  // User Banner
  'user/banner/noBanner': 'Este usuário não tem um banner.',
  'user/banner/title': (user: User) => `Banner de ${user}`,
  'user/banner/browser': 'Abrir banner no navegador',

  // Server icon
  'server/icon/title': (guild: Guild) => `Ícone do servidor ${guild}`,
  'server/icon/browser': 'Abrir ícone no navegador',
  'server/icon/noIcon': 'Este servidor não tem um ícone.',

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

  // Bot invite
  'bot/invite/invite': (user: User, invite: string) => `😊 ${user} | Clique [aqui](${invite}) para me adicionar em seu servidor!`,

  // Bot vote
  'bot/vote/vote': (user: User, voteUrl: string) => `😊 ${user} | Clique [aqui](${voteUrl}) para votar em mim.`,

  // Config suggestions
  'config/suggestions/title': 'Painel de configurações | Sugestões',

  'config/suggestions/buttons/enable': 'Habilitar',
  'config/suggestions/buttons/disable': 'Desabilitar',
  'config/suggestions/buttons/addCategory': 'Adicionar categoria',
  'config/suggestions/buttons/delCategory': 'Remover categoria',
  'config/suggestions/buttons/enableReact': 'Habilitar reações',
  'config/suggestions/buttons/disableReact': 'Desabilitar reações',
  'config/suggestions/buttons/enableThreads': 'Habilitar tópicos',
  'config/suggestions/buttons/disableThreads': 'Desabilitar tópicos',

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
  'config/suggestions/reactions': (status: boolean) => `As reações estão atualmente: ${status ? 'ativadas' : 'desativadas'}.`,
  'config/suggestions/threads': (status: boolean) => `Os tópicos estão atualmente: ${status ? 'ativados' : 'desativados'}.`,
  'config/suggestions/cooldowns': 'O cooldown atualmente está em:',

  'config/suggestions/noCategories': 'Não há categorias configuradas',

  'config/suggestions/actions/enabled': 'O sistema de sugestões foi habilitado com sucesso! Agora, você precisa adicionar categorias para finalizar o processo.',

  'config/suggestions/actions/category/askToAdd': (channel: TextChannel) => `Envie uma mensagem mencionando um canal para o adicionar a lista de categorias. Exemplo: ${channel}`,
  'config/suggestions/actions/category/added': 'Categoria adicionada com sucesso!',
  'config/suggestions/actions/category/addError': 'Não foi possível adicionar a categoria pois você não enviou uma mensagem mencionando um canal!',

  'config/suggestions/actions/category/askToRemove': (channel: TextChannel) => `Envie uma mensagem mencionando um canal para o remover da lista de categorias. Exemplo: ${channel}`,
  'config/suggestions/actions/category/removed': 'Categoria removida com sucesso!',
  'config/suggestions/actions/category/delError': 'Não foi possível remover a categoria pois você não enviou uma mensagem mencionando um canal!',

  'config/suggestions/actions/reactions/enabled': 'Reações habilitadas com sucesso!',
  'config/suggestions/actions/reactions/enabledTip': '**Dica**: você pode configurar reações automáticas utilizando `/config autoreact`.',
  'config/suggestions/actions/reactions/disabled': 'Reações desabilitadas com sucesso!',

  'config/suggestions/actions/threads/enabled': 'Tópicos habilitados com sucesso!',
  'config/suggestions/actions/threads/disabled': 'Tópicos desabilitados com sucesso!',

  'config/suggestions/actions/cooldowns/set': 'Cooldown definido com sucesso para',

  // Server Banner
  'server/banner/noBanner': 'Este servidor não tem um banner.',
  'server/banner/title': (guild: Guild) => `Banner do servidor ${guild}`,
  'server/banner/browser': 'Abrir banner no navegador',

  // Suggestions
  'suggestions/not-enabled': 'Este servidor ainda não configurou o sistema de sugestões. Peça para um administrador o configurar.',
  'suggestions/no-categories': 'Este servidor ainda não adicionou uma categoria para sugestões. Peça para um administrador adicionar uma.',
  'suggestions/unknown-category': 'Não foi possível encontrar a categoria selecionada, provavelmente a categoria não existe mais.',
  'suggestions/embed/title': 'Nova sugestão enviada',
  'suggestions/invalid-id': 'Esse ID de sugestão não existe nesta categoria.',
  'suggestions/not-same-member': 'Você não pode editar sugestões de outros membros.',
  // Send
  'suggestions/send/modal/title': 'Enviar sugestão',
  'suggestions/send/modal/label': 'Insira o texto de sua sugestão',
  'suggestions/send/modal/placeholder': 'A minha sugestão é...',

  'suggestions/send/in-cooldown': (n: string) => `Calma lá! Um administrador do servidor pediu que membros aguardem ao menos ${n} para enviar outra sugestão nesta categoria.`,
  'suggestions/send/small-suggestion': 'Sua sugestão deve ter pelo menos 5 caracteres.',
  'suggestions/send/choose-a-category': 'Escolha uma categoria para enviar sua sugestão',
  'suggestions/send/sent': (url: string) => `Sugestão enviada com sucesso! Confira-a [aqui](${url}).`,
  'suggestions/send/thread-name': 'Comentários',

  // Edit
  'suggestions/edit/modal/title': 'Editar sugestão',
  'suggestions/edit/embed/edited': 'editada',
  'suggestions/edit/edited': (url: string) => `Sua sugestão foi editada com sucesso! Confira-a [aqui](${url}).`,
  'suggestions/edit/choose-category': 'Escolha a categoria que sua sugestão foi enviada',

  // Management
  'suggestions/management/embed/answer': 'Resposta',
  'suggestions/management/embed/answer/empty': 'Nenhuma resposta inserida.',
  'suggestions/management/buttons/move/yes': 'Sim, mover',
  'suggestions/management/buttons/move/no': 'Não over',
  'suggestions/management/answered': 'Essa sugestão já foi respondida anteriormente por um membro da equipe',
  'suggestions/management/accept/embed/title': 'Nova sugestão enviada [aceita]',
  'suggestions/management/accept/accepted': 'A sugestão foi aceita com sucesso!',
  'suggestions/management/accept/accepted/move': '✅ **|** A sugestão foi aceita com sucesso!\n➡️ **|** Você deseja mover a sugestão para este canal?',
  'suggestions/management/accept/accepted/moved': 'A sugestão foi aceita com sucesso e movida para este canal!'
} as const;
