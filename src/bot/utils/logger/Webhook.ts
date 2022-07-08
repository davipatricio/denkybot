import { EmbedBuilder, WebhookClient } from 'discord.js';
import Transport from 'winston-transport';
import type { LogCallback, LogEntry } from 'winston';
import { inspect } from 'util';

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
        .setColor('Blurple')
        .setTimestamp(info.timestamp)
        .setFooter({ text: 'Denky Logger' })
        .setAuthor({ name: info.level.includes('warn') ? 'WARN' : 'ERROR' })
        .setDescription(`\`\`\`js\n${inspect(info.message, { depth: 0 })}\`\`\``);

      await this.webhook.send({ embeds: [embed] });
      this.emit('logged', info);
    });

    callback();
  }
}
