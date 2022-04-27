/* eslint-disable no-await-in-loop */
import { Collection } from 'discord.js';
import { readdir } from 'node:fs/promises';
import type { DenkyClient } from '../../types/Client';
import type { Command } from '../../structures/Command';
import type { Event } from '../../structures/Event';
import type { Task } from '../../structures/Task';

class Initializer {
  constructor(client: DenkyClient) {
    if (global.IS_MAIN_PROCESS) console.log('[DENKY] Starting bot...');
    this.init(client);
  }

  async init(client: DenkyClient) {
    await this.loadCommands(client);
    await this.loadEvents(client);
    await this.loadModules(client);
    await this.loadTasks(client);
  }

  async loadCommands(client: DenkyClient) {
    client.commands = new Collection();
    const categories = await readdir('./bot/commands/');
    for (const category of categories) {
      const commands = await readdir(`./bot/commands/${category}`);

      for (const command of commands) {
        if (!command.endsWith('.js')) continue;

        const { default: CommandClass }: { default: new () => Command } = await import(`../commands/${category}/${command}`);
        const cmd = new CommandClass();
        client.commands.set(cmd.rawName, cmd);
        if (global.IS_MAIN_PROCESS) console.log(`[DENKY] Loaded command: ${cmd.rawName}`);
      }
    }
  }

  async loadEvents(client: DenkyClient) {
    const events = await readdir('./bot/events/');
    for (const event of events) {
      if (!event.endsWith('.js')) continue;

      const { default: EventClass }: { default: new () => Event } = await import(`../events/${event}`);
      const evt = new EventClass();
      client.on(evt.eventName, (...rest: any[]) => evt.run(client, ...rest));
      if (global.IS_MAIN_PROCESS) console.log(`[DENKY] Loaded event: ${evt.eventName}`);
    }
  }

  async loadModules(client: DenkyClient) {
    const modules = await readdir('./bot/modules/');
    for (const module of modules) {
      if (!module.endsWith('.js')) continue;

      // eslint-disable-next-line no-shadow
      const { default: Module }: { default: new (client: DenkyClient) => unknown } = await import(`../modules/${module}`);
      // eslint-disable-next-line no-new
      new Module(client);
      if (global.IS_MAIN_PROCESS) console.log(`[DENKY] Loaded module: ${module}`);
    }
  }

  async loadTasks(client: DenkyClient) {
    client.tasks = new Collection();
    const tasks = await readdir('./bot/tasks/');
    for (const task of tasks) {
      if (!task.endsWith('.js')) continue;

      const { default: TaskClass }: { default: new () => Task } = await import(`../tasks/${task}`);
      const createdTask = new TaskClass();
      createdTask.interval = setInterval(() => createdTask.run(client), createdTask.delay);
      client.tasks.set(createdTask.name, createdTask);
      if (global.IS_MAIN_PROCESS) console.log(`[DENKY] Loaded task: ${task}`);
    }
  }
}

export { Initializer };
