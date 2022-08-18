import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';
import type { Message } from 'discord.js';

export default class MessageDeleteEvent extends Event {
  constructor() {
    super();
    this.eventName = 'messageDelete';
  }

  override run(client: DenkyClient, message: Message) {
    this.deleteExistingButtonRole(client, message);
  }

  async deleteExistingButtonRole(client: DenkyClient, message: Message) {
    await client.databases.buttonRole
      .delete({
        where: {
          messageId: message.id
        }
      })
      .catch(() => {});
  }
}
