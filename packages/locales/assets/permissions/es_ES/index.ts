import type { PermissionsString } from 'discord.js';

const PERMISSIONS: Record<PermissionsString, string> = {
  AddReactions: 'Add Reactions',
  BanMembers: 'Ban Members',
  ChangeNickname: 'Change Nickname',
  Connect: 'Connect',
  CreateInstantInvite: 'Create Instant Invite',
  DeafenMembers: 'Deafen Members',
  EmbedLinks: 'Embed Links',
  KickMembers: 'Kick Members',
  ManageChannels: 'Manage channels',
  ManageEmojisAndStickers: 'Manage emojis and stickers',
  ManageGuild: 'Manage servidor',
  ManageMessages: 'Manage messages',
  ManageNicknames: 'Manage nicknames',
  ManageRoles: 'Manage roles',
  ManageWebhooks: 'Manage webhooks',
  MuteMembers: 'Mute members',
  PrioritySpeaker: 'Priority Speaker',
  ReadMessageHistory: 'Read message history',
  SendMessages: 'Send messages',
  Speak: 'Speak',
  Stream: 'Stream',
  ViewAuditLog: 'View audit log',
  ViewChannel: 'View channels',
  Administrator: 'Administrator',
  AttachFiles: 'Attach files',
  CreatePrivateThreads: 'Create private threads',
  CreatePublicThreads: 'Create public threads',
  ManageEvents: 'Manage events',
  ManageThreads: 'Manage threads',
  MentionEveryone: 'Mention everyone',
  MoveMembers: 'Move members',
  ModerateMembers: 'Moderate members',
  RequestToSpeak: 'Request to speak',
  UseExternalEmojis: 'Use external emojis',
  SendMessagesInThreads: 'Send messages in threads',
  SendTTSMessages: 'Send TTS Messages',
  UseApplicationCommands: 'Use application commands',
  UseEmbeddedActivities: 'Use activities',
  UseExternalStickers: 'Use external stickers',
  UseVAD: 'Use Voice Activity',
  ViewGuildInsights: 'See guild insights'
};
export default PERMISSIONS;