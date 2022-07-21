import { Colors, EmbedBuilder, WebhookClient } from 'discord.js';
import { inspect } from 'util';
import type { LogCallback, LogEntry } from 'winston';
import Transport from 'winston-transport';

export class WebhookTransporter extends Transport {
  private readonly webhook: WebhookClient;
  constructor(url: string) {
    super({ level: 'error' });
    this.webhook = new WebhookClient({ url });
  }

  override log(info: LogEntry, callback: LogCallback) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setAuthor({
        name: info.level.includes('warn') ? '⚠ WARN' : '❌ ERROR'
      })
      .setDescription(`\`\`\`js\n${inspect(info.message, { depth: 0 })}\`\`\``)
      .setFooter({ text: 'Denky Logger' })
      .setTimestamp(info.timestamp);

    this.webhook.send({ embeds: [embed] }).catch(() => {});
    this.emit('logged', info);

    callback();
  }
}
