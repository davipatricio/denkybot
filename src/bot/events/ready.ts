import type { ChatInputApplicationCommandData } from 'discord.js';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';

export default class ReadyEvent extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  override async run(client: DenkyClient) {
    client.logger.log(`Shard ${client.shard?.ids[0]} connected.`, 'SHARDS');

    if (client.config.features.preventCrashes) {
      client.on('error', err => {
        client.logger.error(err, 'DENKY');
      });

      process.on('unhandledRejection', err => {
        client.logger.error(err, 'PROCESS');
      });

      process.on('uncaughtException', err => {
        client.logger.error(err, 'PROCESS');
      });
    }

    // Publish cached commands to Discord
    if (!global.IS_MAIN_PROCESS) return;
    const mappedCommands = client.commands.filter(c => c.options && c.config.showInHelp === true).map(c => c.options) as ChatInputApplicationCommandData[];

    await client.application?.commands.set(mappedCommands);
    client.logger.log(`Posted ${mappedCommands.length} commands to Discord!`, 'COMMANDS');
  }
}
