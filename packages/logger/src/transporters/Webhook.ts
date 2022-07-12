import { EmbedBuilder, WebhookClient } from 'discord.js';
import { inspect } from 'util';
import type { LogCallback, LogEntry } from 'winston';
import Transport from 'winston-transport';

export class WebhookTransporter extends Transport {
  private readonly webhook: WebhookClient;

  constructor(url: string) {
    super({ level: 'error' });

    if (!url) throw new TypeError('Missing webhook url.');

    this.webhook = new WebhookClient({ url });
  }

  override log(info: LogEntry, callback: LogCallback) {
    setImmediate(async () => {
      const embed = new EmbedBuilder()
        .setColor('Purple')
        .setAuthor({
          name: info.level.includes('warn') ? '⚠ WARN' : '❌ ERROR'
        })
        .setDescription(`\`\`\`js\n${inspect(info.message, { depth: 0 })}\`\`\``)
        .setFooter({ text: 'Denky Logger' })
        .setTimestamp(info.timestamp);

      await this.webhook.send({ embeds: [embed] });
      this.emit('logged', info);
    });

    callback();
  }
}
