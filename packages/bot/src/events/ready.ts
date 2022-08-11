import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';

export default class ReadyEvent extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  override async run(client: DenkyClient) {
    client.logger.info(`Shard ${client.shard?.ids[0]} connected.`, { tags: ['Bot'] });

    if (client.config.features.preventCrashes) {
      client.on('error', (err): any => client.logger.error(err as any, { tags: ['Bot'] }));
      process.on('unhandledRejection', err => client.logger.error(err as any, { tags: ['Process'] }));
      process.on('uncaughtException', err => client.logger.error(err as any, { tags: ['Process'] }));
    }

    // Publish cached commands to Discord
    if (!global.IS_MAIN_PROCESS) return;

    const mappedCommands = client.commands.filter(c => c.isSubcommand && c.config.showInHelp === true).map(c => c.options.toJSON());
    await client.application!.commands.set(mappedCommands);
    client.logger.info(`Posted ${mappedCommands.length} commands to Discord!`, {
      tags: ['Commands']
    });
  }
}
