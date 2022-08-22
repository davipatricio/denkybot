export default {
  // Ping
  ping: 'Get the ping for Denky in your server',

  // AFK
  afk: 'Set an AFK status to display when you are mentioned',
  'afk/on': 'Set an AFK status to display when you are mentioned',
  'afk/on/reason': 'Reason for being AFK',
  'afk/off': 'Disables your AFK mode',

  // Poll
  poll: 'Create polls with up to 9 options',
  'poll/create': 'Creates a poll in this channel',
  'poll/create/permanent': 'Should this poll be permanent?',
  'poll/create/option1': '1st poll option',
  'poll/create/option2': '2nd poll option',
  'poll/create/option3': '3rd poll option',
  'poll/create/option4': '4th poll option',
  'poll/create/option5': '5th poll option',
  'poll/create/option6': '6th poll option',
  'poll/create/option7': '7th poll option',
  'poll/create/option8': '8th poll option',
  'poll/create/option9': '9th poll option',

  // Help
  help: 'Shows the bot commands',

  // User
  user: 'Shows user information',
  'user/avatar': 'Shows the user avatar',
  'user/avatar/user': 'The user to get the avatar of',
  'user/info': 'Shows user information',
  'user/info/user': 'The user to show information for',
  'user/banner': 'Shows the user banner',
  'users/banner/user': 'The user to get the banner of',

  // Server
  server: 'Shows server information',
  'server/info': 'View information about a server',
  'server/icon': 'See a server icon',
  'server/banner': 'See a server banner',

  // Bot
  bot: 'Shows bot information',
  'bot/invite': 'Invite Denky to your server',
  'bot/vote': 'Informs the link to vote for me',

  // Text
  text: 'Translates or edits text in different ways',
  'text/text': 'Text to edit',
  'text/claps': 'Sends 👏 a 👏 text 👏 with 👏 claps',
  'text/invert': 'Inverts a text',
  'text/emojify': 'Emojifies a text',
  'text/vaporwave': 'Creates a V A P O R W A V E text',

  // Config
  config: 'Configure Denky features on your server',
  'config/suggestions': "Configure Denky's suggestion system",

  // Suggestions
  suggestion: 'Send suggestions to the server',
  'suggestion/send': 'Send suggestions to the server',
  'suggestion/edit': 'Edit a suggestion you previously submitted',
  'suggestion/edit/id': 'ID of your suggestion',
  'suggestion/accept': 'Accepts a suggestion that was previously submitted',
  'suggestion/accept/id': 'ID of the suggestion to accept',
  'suggestion/accept/reason': 'The reason for accepting the suggestion',
  'suggestion/deny': 'Denies a suggestion that was previously submitted',
  'suggestion/deny/id': 'ID of the suggestion to deny',
  'suggestion/deny/reason': 'The reason for denying the suggestion',

  // Ban
  ban: 'Command to view ban information',
  'ban/user': 'Bans a user from the server',
  'ban/user/user': 'The user to ban',
  'ban/delete_messages': 'Whether or not to delete the messages of the banned user',
  'ban/reason': 'The reason for the ban',
  'ban/info': 'Shows information about a ban',
  'ban/info/user': 'The user to get information about',
  'ban/remove': 'Removes a user ban',
  'ban/remove/user': 'The user to remove the ban',
  'ban/remove/reason': 'The reason for removing the ban',
  'ban/list': 'Shows a list of all bans',

  // Wikipedia
  wikipedia: 'Search Wikipedia for a term',
  'wikipedia/search': 'Term to search for',

  // Mute
  mute: 'Mutes a user from the server',
  'mute/user': 'The user to mute',
  'mute/time': 'The time for the mute',
  'mute/reason': 'The reason for the mute',

  // Kick
  kick: 'Kicks a user from the server',
  'kick/user': 'The user to kick',
  'kick/reason': 'The reason for the kick',

  // Animal
  animal: 'See a random image of an animal',
  'animal/panda': 'See a random image of a panda',
  'animal/cat': 'See a random image of a cat',
  'animal/dog': 'See a random image of a dog',
  'animal/fox': 'See a random image of a fox',
  'animal/bunny': 'See a random image of a bunny',
  'animal/koala': 'See a random image of a koala',
  'animal/duck': 'See a random image of a duck',

  // Giveaway
  giveaway: 'Creae, delete, or edit a giveaway',
  'giveaway/create': 'Create a giveaway in this channel',
  'giveaway/create/title': 'The title of the giveaway',
  'giveaway/create/winners': 'Number of people to be drawn',
  'giveaway/create/duration': 'Duration of the giveaway (1d, 5d 2h, 14/07 20:00, 05:00 etc)',
  'giveaway/create/description': 'Detailed description of the giveaway',
  'giveaway/create/channel': 'Channel where the giveaway will be created',
  'giveaway/create/requiredRole': 'What role do members need to have in order to participate of the giveaway?',
  'giveaway/end': 'Ends an ongoing giveaway and chooses a winner',
  'giveaway/end/id': 'ID of the giveaway to end',

  // Lockdown
  lockdown: 'Blocks all channels members can chat',
  'lockdown/enable': 'Blocks all channels members can chat',
  'lockdown/disable': 'Unblocks all channels that have been blocked by me',
  'lockdown/schedule': 'Schedule a time to unlock channels',
  'lockdown/schedule/unlockdown': 'Schedule a time to unlock channels',
  'lockdown/schedule/unlockdown/duration': 'When should I unlock it? (1d, 5d 2h, 14/07 20:00, 05:00 etc)',

  // Reminder
  remind: 'Create a reminder',
  'remind/create': 'Create a reminder to remember something',
  'remind/create/description': 'Reminder description',
  'remind/create/duration': 'When should I remind you? (1d, 5d 2h, 14/07 20:00, 05:00 etc)',
  'remind/delete': 'Delete a reminder you created earlier',
  'remind/delete/reminder': 'Choose a reminder to delete',
  'remind/info': 'Get information about a reminder',
  'remind/info/reminder': 'Choose a reminder to see information',

  // Button Roles
  buttonroles: 'Create buttons that give or remove roles',
  'buttonroles/create': 'Create buttons that give or remove roles',
  'buttonroles/create/type': 'What action should this button perform?',
  'buttonroles/create/embed/description': 'Message description',
  'buttonroles/create/button/label': 'The label of the button',
  'buttonroles/create/button/color': 'The color of the button',
  'buttonroles/create/role': 'Role to add or remove when button is clicked'
} as const;
