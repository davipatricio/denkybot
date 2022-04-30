import { EmbedBuilder, Guild, WebhookClient } from 'discord.js';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';

export default class GuildCreateEvent extends Event {
  /** Webhook used to log server joins */
  webhookServerLogs: WebhookClient;
  constructor() {
    super();
    this.eventName = 'guildCreate';
  }

  override run(client: DenkyClient, guild: Guild) {
    if (!client.config.shouldLogServers || !process.env.DISCORD_SERVERLOGS_WEBHOOK_URL) return;

    if (!this.webhookServerLogs)
      this.webhookServerLogs = new WebhookClient({
        url: process.env.DISCORD_SERVERLOGS_WEBHOOK_URL,
      });

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('➕ Added in a new server')
      .addFields([
        {
          name: 'Server info',
          value: `Name: ${guild.name} (${guild.id})\nMembers: ${guild.memberCount}\nOwner: <@${guild.ownerId}> (${guild.ownerId})\nDiscord partner: ${guild.partnered ? 'Yes' : 'No'}\nVerified: ${
            guild.verified ? 'Yes' : 'No'
          }`,
        },
      ]);

    this.webhookServerLogs.send({ embeds: [embed] });
  }
}
