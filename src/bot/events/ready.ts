import type { ChatInputApplicationCommandData } from 'discord.js';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';

export default class ReadyEvent extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  override async run(client: DenkyClient) {
    console.log('✅ \x1b[34m[DENKY]\x1b[0m', `Shard ${client.shard?.ids[0]} connected.`);

    if (client.config.features.preventCrashes) {
      client.on('error', err => {
        console.error('❌ \x1b[31m[DENKY]\x1b[0m', err);
      });

      process.on('unhandledRejection', err => {
        console.error('❌ \x1b[31m[DENKY]\x1b[0m', err);
      });

      process.on('uncaughtException', err => {
        console.error('❌ \x1b[31m[DENKY]\x1b[0m', err);
      });
    }

    // Publish cached commands to Discord
    if (!global.IS_MAIN_PROCESS) return;
    const mappedCommands = client.commands.filter(c => c.options && c.config.showInHelp === true).map(c => c.options) as ChatInputApplicationCommandData[];

    await client.application?.commands.set(mappedCommands);
    console.log('✅ \x1b[34m[COMMANDS]\x1b[0m', `Posted ${mappedCommands.length} commands to Discord!`);
  }
}
