export default {
  // Ping
  ping: 'ping',

  // AFK
  afk: 'afk ativar | desativar',
  'afk/on': 'ativar',
  'afk/off': 'desativar',
  'afk/reason': 'motivo',

  // Poll
  poll: 'enquete',
  'poll/create': 'criar',
  'poll/create/permanent': 'permanente',
  'poll/create/option1': 'opcao1',
  'poll/create/option2': 'opcao2',
  'poll/create/option3': 'opcao3',
  'poll/create/option4': 'opcao4',
  'poll/create/option5': 'opcao5',
  'poll/create/option6': 'opcao6',
  'poll/create/option7': 'opcao7',
  'poll/create/option8': 'opcao8',
  'poll/create/option9': 'opcao9',

  // Help
  help: 'ajuda',

  // User
  user: 'user avatar | info | banner',
  'user/info': 'info',
  'user/avatar': 'avatar',
  'user/banner': 'banner',
  'user/info/user': 'usuario',
  'user/avatar/user': 'usuario',
  'user/banner/user': 'usuario',

  // Server
  server: 'server avatar | icon | banner',
  'server/info': 'info',
  'server/icon': 'icon',
  'server/banner': 'banner',

  // Bot
  bot: 'bot info | invite | vote',
  'bot/invite': 'convidar',
  'bot/vote': 'votar',

  // Text
  text: 'texto emojify | vaporwave | palmas | inverter',
  'text/name': 'texto',
  'text/claps': 'palmas',
  'text/invert': 'inverter',

  // Config
  config: 'config sugestoes',
  'config/suggestions': 'sugestoes',

  // Suggestions
  suggestions: 'sugestoes',
  suggestion: 'sugestao | enviar | editar | aceitar | recusar',
  'suggestion/name': 'sugestao',
  'suggestion/send': 'enviar',
  'suggestion/edit': 'editar',
  'suggestion/accept': 'aceitar',
  'suggestion/accept/reason': 'motivo',
  'suggestion/deny': 'recusar',
  'suggestion/deny/reason': 'motivo',

  // Ban
  ban: 'ban usuario | info | lista',
  'ban/name': 'banir',
  'ban/user': 'usuario',
  'ban/delete_messages': 'deletar_mensagens',
  'ban/delete_messages/day': 'dia',
  'ban/delete_messages/days': 'dias',
  'ban/reason': 'motivo',
  'ban/info': 'info',
  'ban/info/user': 'usuario',
  'ban/remove': 'remover',
  'ban/remove/user': 'usuario',
  'ban/remove/reason': 'motivo',
  'ban/list': 'lista',

  // Wikipedia
  wikipedia: 'wikipedia',
  'wikipedia/search': 'pesquisa',

  // Mute
  mute: 'silenciar',
  'mute/user': 'usuario',
  'mute/time': 'tempo',
  'mute/time/minute': 'minuto',
  'mute/time/minutes': 'minutos',
  'mute/time/day': 'dia',
  'mute/time/days': 'dias',
  'mute/time/hour': 'hora',
  'mute/time/hours': 'horas',
  'mute/reason': 'motivo',

  // Kick
  kick: 'expulsar',
  'kick/user': 'usuario',
  'kick/reason': 'motivo',

  // Animal
  animal: 'animal cachorro | coala | coelho | gato | pato | raposa',
  'animal/dog': 'cachorro',
  'animal/koala': 'coala',
  'animal/bunny': 'coelho',
  'animal/cat': 'gato',
  'animal/duck': 'pato',
  'animal/fox': 'raposa',

  // Giveaway
  giveaway: 'sorteio',
  'giveaway/create': 'criar',
  'giveaway/create/title': 'título',
  'giveaway/create/winners': 'ganhadores',
  'giveaway/create/duration': 'duração',
  'giveaway/create/description': 'descrição',
  'giveaway/create/channel': 'canal',
  'giveaway/end': 'encerrar',
  'giveaway/end/id': 'id_sorteio',

  // Lockdown
  lockdown: 'lockdown',
  'lockdown/enable': 'ativar',
  'lockdown/disable': 'desativar',
  'lockdown/schedule': 'agendar',
  'lockdown/schedule/unlockdown': 'desbloqueio',
  'lockdown/schedule/unlockdown/duration': 'duração',

  // Reminder
  remind: 'lembrete',
  'remind/create': 'criar',
  'remind/create/description': 'descrição',
  'remind/create/duration': 'duração',
  'remind/delete': 'excluir',
  'remind/delete/reminder': 'lembrete',
  'remind/info': 'info',
  'remind/info/reminder': 'lembrete',

  // Button Roles
  buttonroles: 'buttonroles',
  'buttonroles/create': 'criar',
  'buttonroles/create/type': 'tipo',
  'buttonroles/create/choice/add': 'Adicionar - Apenas adicionar o cargo ao usuário',
  'buttonroles/create/choice/remove': 'Remover - Apenas remover o cargo do usuário',
  'buttonroles/create/choice/toggle': 'Alternar - Adicionar ou remover o cargo do usuário',
  'buttonroles/create/choice/danger': 'Vermelho',
  'buttonroles/create/choice/primary': 'Azul',
  'buttonroles/create/choice/secondary': 'Cinza',
  'buttonroles/create/choice/success': 'Verde',
  'buttonroles/create/embed/description': 'descrição',
  'buttonroles/create/button/label': 'rótulo',
  'buttonroles/create/button/color': 'cor',
  'buttonroles/create/role': 'cargo',
  'buttonroles/create/role2': 'cargo2',
  'buttonroles/create/role3': 'cargo3',
  'buttonroles/create/role4': 'cargo4',
  'buttonroles/create/role5': 'cargo5'
} as const;
