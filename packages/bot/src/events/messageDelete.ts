import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';
import type { Message } from 'discord.js';

export default class MessageDeleteEvent extends Event {
  constructor() {
    super();
    this.eventName = 'messageDelete';
  }

  override run(client: DenkyClient, message: Message) {
    this.deleteData(client, message);
  }

  async deleteData(client: DenkyClient, message: Message) {
    await client.databases.buttonRole.delete({ where: { messageId: message.id } }).catch(() => {});
    await client.databases.giveaway.delete({ where: { messageId: message.id } }).catch(() => {});
    await client.databases.reactionRole.findFirst({ where: { messageId: message.id } }).then(async data => {
      if (data) await client.databases.reactionRole.delete({ where: { id: data.id } }).catch(() => {});
    });
  }
}
