import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';
import type { MessageReaction, User } from 'discord.js';
import { ReactionRoleType } from '../commands/Moderation/reactionrole';

export default class MessageReactionRemoveEvent extends Event {
  constructor() {
    super();
    this.eventName = 'messageReactionRemove';
  }

  override run(client: DenkyClient, messageReaction: MessageReaction, user: User) {
    this.handleReactionRole(client, messageReaction, user);
  }

  async handleReactionRole(client: DenkyClient, reaction: MessageReaction, user: User) {
    const data = await client.databases.reactionRole.findFirst({ where: { messageId: reaction.message.id } }).catch(() => undefined);
    if (!data) return;

    const { emojiId, roleId, type } = data;

    // eslint-disable-next-line no-param-reassign
    if (reaction.partial) reaction = await reaction.fetch();
    if (reaction.emoji.identifier !== emojiId) return;

    const member = reaction.message.guild!.members.cache.get(user.id) ?? (await reaction.message.guild!.members.fetch(user.id));

    switch (type) {
      case ReactionRoleType.Add:
        if (!member.roles.cache.has(roleId)) member.roles.add(roleId, 'Reaction Role');
        break;
      case ReactionRoleType.Remove:
        if (member.roles.cache.has(roleId)) member.roles.remove(roleId, 'Reaction Role');
        break;
      case ReactionRoleType.Toggle:
        if (!member.roles.cache.has(roleId)) member.roles.add(roleId, 'Reaction Role');
        break;
    }
  }
}
