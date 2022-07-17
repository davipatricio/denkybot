import type { Guild, GuildMember, GuildTextBasedChannel, User } from 'discord.js';

export default {
  // General errors
  'permissions/bot/missing': (perms: string) => `I don't have the required permissions: ${perms}`,
  'permissions/user/missing': (perms: string) => `You don't have the required permissions: ${perms}`,

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
  'help/embed/description': (support: string, add: string, totalCommands: number) =>
    `❔ My prefix on this server is: \`/\`.\n🚪 Join my support server: [click here](${support}).\n🎉 Add me to your server: [click here](${add}).\n\nCurrently I have \`${totalCommands}\` commands.`,
  'help/menu/placeholder': 'Click here to choose the command category.',
  'help/warn/guildonly-commands': '⚠️ **|** Some commands may be restricted to run only on servers and are therefore not available here.',

  // User info
  'user/info/userTag': 'Discord Tag',
  'user/info/userId': 'Discord ID',
  'user/info/userCreatedAt': 'Account created at',
  'user/info/memberJoinedAt': 'Member joined at',

  // User avatar
  'user/avatar/title': (user: string) => `${user}'s avatar`,
  'user/avatar/browser': 'Open in browser',
  'user/avatar/seeGuildAvatar': 'See guild avatar',
  'user/avatar/seeGlobalAvatar': 'See global avatar',

  // User Banner
  'user/banner/noBanner': 'This user no  has banner.',
  'user/banner/title': (user: string) => `${user}'s banner`,
  'user/banner/browser': 'Open in browser',

  // Server icon
  'server/icon/title': (guild: string) => `${guild} icon`,
  'server/icon/browser': 'Open in browser',
  'server/icon/noIcon': 'This server no has icon.',

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

  // Bot invite
  'bot/invite/invite': (user: User, invite: string) => `😊 ${user} | Click [here](${invite}) to add me to your server!`,

  // Bot vote
  'bot/vote/vote': (user: User, voteUrl: string) => `😊 ${user} | Click [here](${voteUrl}) to vote for me.`,

  // Config suggestions
  'config/suggestions/title': 'Settings Panel | Suggestions',

  'config/suggestions/buttons/enable': 'Enable',
  'config/suggestions/buttons/disable': 'Disable',
  'config/suggestions/buttons/addCategory': 'Add category',
  'config/suggestions/buttons/delCategory': 'Remove category',
  'config/suggestions/buttons/enableReact': 'Enable reactions',
  'config/suggestions/buttons/disableReact': 'Disable reactions',
  'config/suggestions/buttons/enableThreads': 'Enable threads',
  'config/suggestions/buttons/disableThreads': 'Disable threads',
  'config/suggestions/buttons/enableNotices': 'Enable notifications',
  'config/suggestions/buttons/disableNotices': 'Disable notifications',

  'config/suggestions/pages/suggestions': 'Enable or disable the suggestion system',
  'config/suggestions/pages/categories': 'Add or delete suggestion categories',
  'config/suggestions/pages/reactions': 'Enable or disable reactions on suggestions',
  'config/suggestions/pages/cooldowns': 'Manage suggestion cooldowns',
  'config/suggestions/pages/threads': 'Enable or disable the use of threads',
  'config/suggestions/pages/notices': 'Notify members in DM when their suggestions are accepted and declined',

  'config/suggestions/pages': 'Pages',
  'config/suggestions/pages/suggestions/title': 'Suggestions',
  'config/suggestions/pages/categories/title': 'Categories',
  'config/suggestions/pages/reactions/title': 'Reactions',
  'config/suggestions/pages/cooldowns/title': 'Cooldowns',
  'config/suggestions/pages/threads/title': 'Threads',
  'config/suggestions/pages/notices/title': 'Notifications',

  'config/suggestions/disabled': 'The suggestion system is currently disabled.',
  'config/suggestions/enabled': 'The suggestion system is currently enabled.',
  'config/suggestions/reactions': (status: boolean) => `Reactions are currently: ${status ? 'enabled' : 'disabled'}.`,
  'config/suggestions/threads': (status: boolean) => `Threads are currently: ${status ? 'enabled' : 'disabled'}.`,
  'config/suggestions/notices': (status: boolean) =>
    status ? "I'm notifying members when their suggestions are accepted or declined." : "I'm not notifying members when their suggestions are accepted or declined.",
  'config/suggestions/cooldown': 'Choose cooldown time',
  'config/suggestions/cooldowns': 'The cooldown is currently at:',
  'config/suggestions/cooldowns/no-cooldown': 'No cooldown',
  'config/suggestions/cooldowns/no-cooldown/about': 'Members will not need to wait for a cooldown before making a suggestion',
  'config/suggestions/cooldowns/15s-cooldown': '15 seconds',
  'config/suggestions/cooldowns/15s-cooldown/about': 'Members must wait 15 seconds before suggesting again',
  'config/suggestions/cooldowns/30s-cooldown': '30 seconds',
  'config/suggestions/cooldowns/30s-cooldown/about': 'Members must wait 30 seconds to suggest consecutively',
  'config/suggestions/cooldowns/1m-cooldown': '1 minute',
  'config/suggestions/cooldowns/1m-cooldown/about': 'Members must wait 1 minute to suggest consecutively',
  'config/suggestions/cooldowns/15m-cooldown': '15 minutes',
  'config/suggestions/cooldowns/15m-cooldown/about': 'Members must wait 15 minutes to suggest consecutively',

  'config/suggestions/noCategories': 'No categories have been created yet',

  'config/suggestions/actions/enabled': 'The suggestion system has been successfully enabled! Now, you need to add categories to finish the process.',

  'config/suggestions/actions/category/askToAdd': (channel: GuildTextBasedChannel) => `Send a message mentioning a channel to add it to the category list. Example: ${channel}`,
  'config/suggestions/actions/category/added': 'Category added successfully!',
  'config/suggestions/actions/category/addError': "Unable to add category because you didn't send a message mentioning a channel!",

  'config/suggestions/actions/category/askToRemove': (channel: GuildTextBasedChannel) => `Send a message mentioning a channel to remove it from the category list. Example: ${channel}`,
  'config/suggestions/actions/category/removed': 'Category removed successfully!',
  'config/suggestions/actions/category/delError': "Unable to remove category because you didn't send a message mentioning a channel!",

  'config/suggestions/actions/reactions/enabled': 'Reactions enabled successfully!',
  'config/suggestions/actions/reactions/enabledTip': '**Tip**: you can add automatic custom reactions by using `config autoreact`.',
  'config/suggestions/actions/reactions/disabled': 'Reactions disabled successfully!',

  'config/suggestions/actions/threads/enabled': 'Threads enabled successfully!',
  'config/suggestions/actions/threads/disabled': 'Threads disabled successfully!',

  'config/suggestions/actions/cooldowns/set': 'Cooldown successfully set to',

  // Server Banner
  'server/banner/noBanner': 'This server no has banner.',
  'server/banner/title': (guild: string) => `${guild} banner`,
  'server/banner/browser': 'Open in browser',

  // Suggestions
  'suggestions/not-enabled': 'This server has not yet set up the suggestion system. Ask an administrator to configure it.',
  'suggestions/no-categories': 'This server has not yet added a category for suggestions. Ask an admin to add one.',
  'suggestions/unknown-category': 'Could not find the selected category, probably the category no longer exists.',
  'suggestions/embed/title': 'New suggestion',
  'suggestions/invalid-id': 'This suggestion ID does not exist in this category.',
  'suggestions/not-same-member': 'You cannot edit suggestions from other members.',
  // Send
  'suggestions/send/modal/title': 'Send suggestion sent',
  'suggestions/send/modal/label': 'Enter the text of your suggestion',
  'suggestions/send/modal/placeholder': 'My suggestion is...',

  'suggestions/send/in-cooldown': (n: string) => `Calm down there! A server administrator has asked members to wait at least ${n} to submit another suggestion in this category.`,
  'suggestions/send/small-suggestion': 'Your suggestion must be at least 5 characters long.',
  'suggestions/send/choose-a-category': 'Choose a category to submit your suggestion',
  'suggestions/send/sent': (url: string) => `Your suggestion has been successfully sent! Check it out [here](${url}).`,
  'suggestions/send/thread-name': 'Feedback',

  // Edit
  'suggestions/edit/modal/title': 'Edit suggestion',
  'suggestions/edit/embed/edited': 'edited',
  'suggestions/edit/edited': (url: string) => `Your suggestion has been successfully edited! Check it out [here](${url}).`,
  'suggestions/edit/choose-category': 'Choose the category your suggestion was submitted to',

  // Management
  'suggestions/management/embed/answer': 'Answer',
  'suggestions/management/embed/answer/empty': 'No answer was provided.',
  'suggestions/management/buttons/move/yes': 'Yes, move',
  'suggestions/management/buttons/move/no': "Don't move",
  'suggestions/management/answered': 'This suggestion has been answered previously by a team member',
  'suggestions/management/accept/embed/title': 'New suggestion sent [accepted]',
  'suggestions/management/accept/memberdm': (desc: string, user: User, url: string) => `Your suggestion \`${desc}\` was accepted by ${user}! Check it out [here](${url}).`,
  'suggestions/management/accept/accepted': 'The suggestion was successfully accepted!',
  'suggestions/management/accept/accepted/move': '✅ **|** The suggestion was successfully accepted\n➡️ **|** Do you want to move the suggestion to this channel?',
  'suggestions/management/accept/accepted/moved': 'The suggestion was successfully accepted and moved to this channel!',

  'suggestions/management/deny/embed/title': 'New suggestion sent [denied]',
  'suggestions/management/deny/memberdm': (desc: string, user: User, url: string) => `Your suggestion \`${desc}\` was denied by ${user}. Check it out [here](${url}).`,
  'suggestions/management/deny/denied': 'The suggestion was successfully denied!',
  'suggestions/management/deny/denied/move': '✅ **|** The suggestion was successfully denied\n➡️ **|** Do you want to move the suggestion to this channel?',
  'suggestions/management/deny/denied/moved': 'The suggestion was successfully denied and moved to this channel!',

  // Ban
  'ban/user/no-reason': 'No reason.',
  'ban/user/punished-by': 'Punished by:',
  'ban/user/complete': (user: User | string) => `The user ${user} was banned from the server.`,
  'ban/user/error/ban-bot': 'I can not ban myself.',
  'ban/user/error/ban-self': 'You can not ban yourself.',
  'ban/user/error/not-bannable': "I can not punish this user because my highest role is below or equal to the user's highest role.",
  'ban/user/error/no-permissions': "You cannot punish this user as their highest rank is below or in the same rank as the member's highest role.",
  'ban/user/error/unknown-member': 'Unknown member.',
  'ban/user/error/unknown-error': 'There was an error banning the user.',
  'ban/user/error/maximum-bans': 'This server has already banned many members who never joined the server.',

  // Wikipedia
  'wikipedia/error/no-results': '❌ **|** No results found.',
  'wikipedia/error/disambiguation': '❌ **|** Your search is a disambiguation.',
  'wikipedia/embeds/fields/title': '📖 More information',
  'wikipedia/embeds/fields/value': (pageUrl: string, pageId: number) => `🔗 Click **[here](${pageUrl})** to access the Wikipedia page.\n🔢 Page Id: **${pageId}**`,

  // Mute
  'mute/no-reason': 'No reason.',
  'mute/punished-by': 'Punished by:',
  'mute/complete': (user: User | string) => `The user ${user} was muted successfully.`,
  'mute/error/mute-bot': 'I can not mute myself.',
  'mute/error/mute-self': 'You can not mute yourself.',
  'mute/error/not-member': 'You can not mute a user who is not a member of this server.',
  'mute/error/not-moderatable': "I can not mute this user because my highest role is below or equal to the user's highest role.",
  'mute/error/no-permissions': "You cannot mute this user as their highest rank is below or in the same rank as the member's highest role.",
  'mute/error/unknown-member': 'Unknown member.',
  'mute/error/unknown-error': 'There was an error muting the user.',

  // Kick
  'kick/no-reason': 'No reason.',
  'kick/punished-by': 'Punished by:',
  'kick/complete': (user: User | GuildMember | string) => `The user ${user} was kicked successfully.`,
  'kick/error/kick-bot': 'I can not kick myself.',
  'kick/error/kick-self': 'You can not kick yourself.',
  'kick/error/not-member': 'You can not kick a user who is not a member of this server.',
  'kick/error/not-kickable': "I can not kick this user because my highest role is below or equal to the user's highest role.",
  'kick/error/no-permissions': "You cannot kick this user as their highest rank is below or in the same rank as the member's highest role.",
  'kick/error/unknown-error': 'There was an error kicking the user.',

  // Animals
  'animal/panda': "Here's a picture of a panda 🐼",
  'animal/dog': "Here's a picture of a dog 🐶",
  'animal/koala': "Here's a picture of a koala 🐨",
  'animal/bunny': "Here's a picture of a bunny 🐰",
  'animal/cat': "Here's a picture of a cat 🐱",
  'animal/duck': "Here's a picture of a duck 🦆",
  'animal/foxy': "Here's a picture of a foxy 🦊",

  // Ban info
  'ban/info/error/noGuildBans': 'This server does not have bans.',
  'ban/info/error/userNotFound': 'User not found.',
  'ban/info/error/userNotBanned': 'User is not banned.',
  'ban/info/noReason': 'No reason.',
  'ban/info/embed/title': (user: User) => `Ban information from ${user.username}`,
  'ban/info/embed/description': (reason: string) => `📖 Ban reason: **${reason}**`,
  'ban/info/embed/field/name': '💁 User information',
  'ban/info/autocomplete/noBans': 'No bans found.',
  'ban/info/embed/field/value': (user: User) => `🔢 User Id: **${user.id}**\n🏷 Discord Tag: **${user.tag}**\n🤖 Bot: **${user.bot ? 'Yes' : 'No'}**`
} as const;
