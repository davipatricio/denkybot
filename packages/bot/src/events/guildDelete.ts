import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';
import { Colors, EmbedBuilder, Guild, WebhookClient } from 'discord.js';

export default class GuildDeleteEvent extends Event {
  /** Webhook used to log server deletions */
  webhookServerLogs: WebhookClient;
  constructor() {
    super();
    this.eventName = 'guildDelete';
  }

  override run(client: DenkyClient, guild: Guild) {
    this.deleteData(client, guild);

    if (!client.config.webhooks.serverLogs || !process.env.DISCORD_SERVERLOGS_WEBHOOK_URL || !guild || !guild.name) return;
    if (!this.webhookServerLogs)
      this.webhookServerLogs = new WebhookClient({
        url: process.env.DISCORD_SERVERLOGS_WEBHOOK_URL
      });

    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle('➖ Removed from a server')
      .addFields([
        {
          name: 'Server info',
          value: `Name: ${guild.name} (${guild.id})\nMembers: ${guild.memberCount}\nOwner: <@${guild.ownerId}> (${guild.ownerId})\nDiscord partner: ${guild.partnered ? 'Yes' : 'No'}\nVerified: ${
            guild.verified ? 'Yes' : 'No'
          }`
        }
      ]);

    this.webhookServerLogs.send({ embeds: [embed] });
  }

  async deleteData(client: DenkyClient, guild: Guild) {
    await client.databases.giveaway
      .deleteMany({
        where: {
          guildId: guild.id
        }
      })
      .catch(() => {});
    await client.databases.buttonRole
      .deleteMany({
        where: {
          guildId: guild.id
        }
      })
      .catch(() => {});
    await client.databases.suggestion
      .deleteMany({
        where: {
          guildId: guild.id
        }
      })
      .catch(() => {});
    await client.databases.unlockdownTask
      .deleteMany({
        where: {
          guildId: guild.id
        }
      })
      .catch(() => {});
  }
}
