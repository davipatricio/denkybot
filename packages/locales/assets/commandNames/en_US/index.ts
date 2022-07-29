export default {
  // Ping
  ping: 'ping',

  // AFK
  afk: 'afk on | off',
  'afk/on': 'on',
  'afk/off': 'off',
  'afk/reason': 'reason',

  // Poll
  poll: 'poll',
  'poll/create': 'create',
  'poll/create/permanent': 'permanent',
  'poll/create/option1': 'option1',
  'poll/create/option2': 'option2',
  'poll/create/option3': 'option3',
  'poll/create/option4': 'option4',
  'poll/create/option5': 'option5',
  'poll/create/option6': 'option6',
  'poll/create/option7': 'option7',
  'poll/create/option8': 'option8',
  'poll/create/option9': 'option9',

  // Help
  help: 'help',

  // User
  user: 'user avatar | info | banner',
  'user/info': 'user info',
  'user/avatar': 'user avatar',
  'user/banner': 'user banner',
  'user/info/user': 'user',
  'user/avatar/user': 'user',
  'user/banner/user': 'user',

  // Server
  server: 'server avatar | icon | banner',
  'server/info': 'server info',
  'server/icon': 'server icon',
  'server/banner': 'server banner',

  // Bot
  bot: 'bot info | convidar | votar',
  'bot/invite': 'invite',
  'bot/vote': 'vote',

  // Text
  text: 'text',
  'text/claps': 'claps',
  'text/invert': 'invert',

  // Config
  config: 'config | suggestions',
  'config/suggestions': 'suggestions',

  // Suggestions
  suggestions: 'suggestions',
  suggestion: 'suggestion',
  'suggestion/send': 'send',
  'suggestion/edit': 'edit',
  'suggestion/accept': 'accept',
  'suggestion/accept/reason': 'reason',
  'suggestion/deny': 'deny',
  'suggestion/deny/reason': 'reason',

  // Ban
  ban: 'ban user | info | list',
  'ban/name': 'ban',
  'ban/user': 'user',
  'ban/delete_messages': 'delete_messages',
  'ban/delete_messages/day': 'day',
  'ban/delete_messages/days': 'days',
  'ban/reason': 'reason',
  'ban/info': 'info',
  'ban/info/user': 'user',
  'ban/remove': 'remove',
  'ban/remove/user': 'user',
  'ban/remove/reason': 'reason',
  'ban/list': 'list',

  // Wikipedia
  wikipedia: 'wikipedia',
  'wikipedia/search': 'search',

  // Mute
  mute: 'mute',
  'mute/user': 'user',
  'mute/time': 'time',
  'mute/time/minute': 'minute',
  'mute/time/minutes': 'minutes',
  'mute/time/day': 'day',
  'mute/time/days': 'days',
  'mute/time/hour': 'hour',
  'mute/time/hours': 'hours',
  'mute/reason': 'reason',

  // Kick
  kick: 'kick',
  'kick/user': 'user',
  'kick/reason': 'reason',

  // Animal
  animal: 'animal dog | koala | bunny | cat | duck | foxy',
  'animal/dog': 'dog',
  'animal/koala': 'koala',
  'animal/bunny': 'bunny',
  'animal/cat': 'cat',
  'animal/duck': 'duck',
  'animal/foxy': 'foxy',

  // Giveaway
  giveaway: 'giveaway',
  'giveaway/create': 'create',
  'giveaway/create/title': 'title',
  'giveaway/create/winners': 'winners',
  'giveaway/create/duration': 'duration',
  'giveaway/create/description': 'description',
  'giveaway/create/channel': 'channel',
  'giveaway/end': 'end',
  'giveaway/end/id': 'id_giveaway',

  // Lockdown
  lockdown: 'lockdown',
  'lockdown/enable': 'enable',
  'lockdown/disable': 'disable',
  'lockdown/schedule': 'schedule',
  'lockdown/schedule/unlockdown': 'unlock',
  'lockdown/schedule/unlockdown/duration': 'duration',

  // Reminder
  remind: 'remind',
  'remind/create': 'create',
  'remind/create/description': 'description',
  'remind/create/duration': 'duration',
  'remind/delete': 'delete',
  'remind/delete/reminder': 'reminder',
  'remind/info': 'info',
  'remind/info/reminder': 'reminder'
} as const;
