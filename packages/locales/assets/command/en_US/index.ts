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
  'afk/autoremoved': (u: User, time: bigint) => `👋 ${u} **|** Welcome back, your AFK has been removed.\n⏰ **|** You stayed AFK <t:${time}:R>`,
  'afk/mentioned': (u: User, time: bigint, reason?: string) => `${u} got AFK <t:${time}:R>.\n_\`${reason ?? 'No reason given.'}\`_`,

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
  'ban/info/embed/title': (user: User) => `${user.bot ? '<:botTag:230105988211015680>' : ''} Ban information from ${user.username}`,
  'ban/info/embed/description': (reason: string) => `📖 Ban reason: **${reason}**`,
  'ban/info/embed/field/name': '💁 User information',
  'ban/info/autocomplete/noBans': 'No bans found.',
  'ban/info/embed/field/value': (user: User) => `🔢 User Id: **${user.id}**\n🏷 Discord Tag: **${user.tag}**`,

  // Ban remove
  'ban/remove/noReason': 'No reason.',
  'ban/remove/unbanned-by': 'Unbanned by:',
  'ban/remove/error/noGuildBans': 'This server does not have bans.',
  'ban/remove/error/noUserBanned': 'This user is not banned.',
  'ban/remove/error/unknownError': 'There was an error removing the ban.',
  'ban/remove/complete': (userId: string) => `The ban on \`${userId}\` id was removed.`,
  'ban/remove/autocomplete/noBans': 'No bans found.',

  // Ban list
  'ban/list/error/noGuildBans': 'This server does not have bans.',
  'ban/list/embed/title': (guildName: string) => `🔨 ${guildName}'s bans`,
  'ban/list/noReason': 'No reason.',

  // Giveaway
  'giveaway/create/no-description': 'Giveaway without description.',
  'giveaway/create/invalid-time': 'The entered duration is invalid, please try again.',
  'giveaway/create/time-big': 'The entered duration is too long. Please choose a duration between 30 seconds and 1 year.',
  'giveaway/create/time-low': 'The entered duration is too small. Please choose a duration between 30 seconds and 1 year.',
  'giveaway/create/buttons/partipate': 'Participate',
  'giveaway/create/buttons/desist': 'Desist',
  'giveaway/create/embed/winners': 'Winners',
  'giveaway/create/embed/ends-in': 'Ends',
  'giveaway/create/created': (url: string) => `Giveaway created successfully! Check it out [here](${url})`,
  'giveaway/end/not-found': 'Unknown giveaway.',
  'giveaway/end/already-ended': 'This giveaway already ended.',
  'giveaway/end/ended': 'Giveaway ended successfully.',
  'giveaway/helper/error/alreadyParticipating': 'You are already participating in the giveaway.',
  'giveaway/helper/error/notParticipating': 'You are not participating of this giveaway.',
  'giveaway/helper/participate': 'You are participating in the giveaway. Good luck!',
  'giveaway/helper/exitGiveaway': 'You are no longer participating of this giveaway.',
  'giveaway/helper/embed/description': (description: string, winnerAmount: number, date: number) => `${description}\n\n🔢 **Winners**: ${winnerAmount}\n⏲️ **Finalizado**: <t:${date}:R>`,
  'giveaway/helper/embed/footer': 'Giveaway ended!',
  'giveaway/helper/embed/field/name': 'Winners',
  'giveaway/helper/embed/fieldTwo/value': 'There were not enough participants.',
  'giveaway/helper/embed/fieldThree/value': 'There were no participants in this giveaway.',
  'giveaway/helper/button/placeholder': 'Additional options',
  'giveaway/helper/button/label': 'New winner',
  'giveaway/helper/button/description': 'Click to choose a new winner',
  'giveaway/helper/endmessage': (title: string) => `The giveaway \`${title}\` has ended!`,
  'giveaway/helper/endmessage/singular': (winner: string) => `The winner is **${winner}**!`,
  'giveaway/helper/endmessage/plural': (winners: string) => `The winners are **${winners}**!`,
  'giveaway/helper/endmessage/congratulations': 'Congratulations! 🎉',
  'giveaway/helper/endmessage/noWinners': 'There were no winners. 😢',
  'giveaway/helper/reroll': 'The new chosen winner is:',

  // Lockdown
  'lockdown/no-answer': "You didn't respond in enough time.",
  'lockdown/buttons/yes': 'Yes',
  'lockdown/buttons/no': 'No',

  'lockdown/enable/blocked': 'The server is already blocked.',
  'lockdown/enable/cooldown': (time: string) => `The server performed a lockdown/unlockdown recently. Wait ${time} to block it.`,
  'lockdown/enable/ask/line1': 'Are you sure you want to block **all channels** that members can currently send messages to? This action cannot be interrupted once started.',
  'lockdown/enable/ask/line2': 'It will be possible to reverse this action using `/lockdown disable`.',
  'lockdown/enable/ask/line3': 'It is possible to initiate 1 lockdown or undo 1 lockdown every 5 minutes.',
  'lockdown/enable/cancelled': 'You have decided not to lockdown.',
  'lockdown/enable/locking': 'Blocking channels that members can send messages to, please wait...',
  'lockdown/enable/nochannels': 'Não há canais para bloquear.',
  'lockdown/enable/auditlog': (user: string) => `[Lockdown] Blocking channels | Started by: ${user}`,
  'lockdown/enable/embed/empty': 'None.',
  'lockdown/enable/embed/title': 'The following channels have been blocked:',
  'lockdown/enable/embed/couldnot-block': 'The following channels could not be blocked:',
  'lockdown/enable/embed/already-blocked': 'The following channels were already blocked:',
  'lockdown/enable/embed/no-permission': "I don't have permission to edit channels:",
  'lockdown/enable/embed/footer/done': 'It will be possible to undo this action in 5 minutes.',
  'lockdown/enable/embed/footer/nochannels': 'No channels have been blocked.',
  'lockdown/enable/done': (blockedAmount: number) => `${blockedAmount} channels were successfully blocked.`,
  'lockdown/enable/done2': 'You can schedule automatic unlocking using: `/lockdown schedule unlock`.',

  'lockdown/disable/blocked': 'The server is not blocked.',
  'lockdown/disable/cooldown': (time: string) => `The server performed a lockdown/unlockdown recently. Wait for ${time} to unlock it.`,
  'lockdown/disable/ask/line1': 'Are you sure you want to unblock **all channels** that were blocked through lockdown? This action cannot be interrupted once started.',
  'lockdown/disable/ask/line2': 'It is possible to initiate 1 lockdown or undo 1 lockdown every 5 minutes.',
  'lockdown/disable/ask/line3': (lockedAmount: number) => `${lockedAmount} channels are currently locked by lockdown.`,
  'lockdown/disable/cancelled': 'You have decided not to undo the lockdown.',
  'lockdown/disable/unlocking': 'Unblocking channels that were blocked by the lockdown, please wait...',
  'lockdown/disable/nochannels': 'There are currently no channels blocked by the lockdown.',
  'lockdown/disable/auditlog': (user: string) => `[Lockdown] Unblocking Channels | Started by: ${user}`,
  'lockdown/disable/embed/empty': 'None.',
  'lockdown/disable/embed/title': 'The following channels have been unlocked:',
  'lockdown/disable/embed/couldnot-unblock': 'The following channels could not be unlocked:',
  'lockdown/disable/embed/already-unblocked': 'The following channels were already unlocked:',
  'lockdown/disable/embed/no-permission': "I don't have permission to edit channels:",
  'lockdown/disable/embed/footer/done': 'To block again, use /lockdown enable',
  'lockdown/disable/embed/footer/nochannels': 'No channels have been unlocked.',
  'lockdown/disable/done': (unblockedAmout: number) => `${unblockedAmout} channels were successfully unblocked.`,

  'lockdown/sched/no-lockdown': 'This server must have an active lockdown in order to schedule an unlock.',
  'lockdown/sched/deleted': 'There was already an unlockdown scheduled for this server, so we canceled the unlockdown.',
  'lockdown/sched/done': 'Successfully scheduled unlockdown. To cancel, use `/lockdown schedule unlock` again.',

  // Reminders
  'reminders/notify': (text: string) => `Reminder! \`${text}\``,
  'reminders/create/time-big': 'The entered duration is too long. Please choose a duration between 1 second and 1 year.',
  'reminders/create/time-low': 'The entered duration is too small. Please choose a duration between 1 second and 1 year.',
  'reminders/create/created': (timestamp: number) => `Reminder created succesfully. I'll remember you at <t:${timestamp}>`,
  'reminders/info/not-found': "This reminder doesn't exist.",
  'reminders/info/embed/title': 'Reminder information',
  'reminders/info/embed/description': 'Description:',
  'reminders/info/embed/ends-at': 'Ends at:',
  'reminders/delete/deleted': 'Reminder deleted successfully.'
} as const;
