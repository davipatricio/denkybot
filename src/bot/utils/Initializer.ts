import { Collection } from 'discord.js';
import { readdir, readFile } from 'node:fs/promises';
import type { Command } from '../../structures/Command';
import type { CommandDataStructure } from '../../structures/CommandDataStructure';
import type { Event } from '../../structures/Event';
import type { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';
import { InteractionsWebserver } from '../webserver/server';
import { Logger } from './Logger';

type DefaultClass<T> = { default: new (...args: any[]) => T };

class Initializer {
  constructor(client: DenkyClient) {
    this.peformPreInitialization(client).then(() => {
      if (global.IS_MAIN_PROCESS) client.logger.log('Starting bot...', 'DENKY');
      this.init(client);
    });
  }

  async init(client: DenkyClient) {
    await this.loadModules(client);
    await this.loadCommands(client);
    await this.loadCommandData(client);
    await this.loadEvents(client);
    await this.loadTasks(client);
    // Log bot in after loading everything
    client.login(process.env.BOT_TOKEN);
  }

  async loadCommands(client: DenkyClient) {
    client.commands = new Collection();
    const categories = await readdir('./bot/commands/');
    for await (const category of categories) {
      const commands = await readdir(`./bot/commands/${category}`);

      for await (const command of commands) {
        if (!command.endsWith('.js')) continue;
        const commandWithoutExtension = command.replace('.js', '');

        const { default: CommandClass }: DefaultClass<Command> = await import(`../commands/${category}/${command}`);
        const cmd = new CommandClass(client);
        client.commands.set(commandWithoutExtension, cmd);

        if (global.IS_MAIN_PROCESS) client.logger.log(`Loaded command: ${commandWithoutExtension}`, 'COMMANDS');
      }
    }
  }

  async loadCommandData(client: DenkyClient) {
    const categories = await readdir('./bot/commands/');
    for await (const category of categories) {
      const commands = await readdir(`./bot/commands/${category}/data`);

      for await (const command of commands) {
        if (!command.endsWith('.js')) continue;
        const commandDataWithoutExtension = command.replace('.js', '');

        const { default: CommandDataClass }: DefaultClass<CommandDataStructure> = await import(`../commands/${category}/data/${command}`);
        const cachedCommand = client.commands.get(commandDataWithoutExtension);
        if (cachedCommand) cachedCommand.options = new CommandDataClass(client).data;
      }
    }
  }

  async loadEvents(client: DenkyClient) {
    const events = await readdir('./bot/events/');
    for await (const event of events) {
      if (!event.endsWith('.js')) continue;

      const { default: EventClass }: DefaultClass<Event> = await import(`../events/${event}`);
      const evt = new EventClass();
      client.on(evt.eventName, (...rest: any[]) => evt.run(client, ...rest));
      if (global.IS_MAIN_PROCESS) client.logger.log(`Loaded event: ${evt.eventName}`, 'EVENTS');
    }
  }

  async loadModules(client: DenkyClient) {
    const modules = await readdir('./bot/modules/');
    for await (const module of modules) {
      if (!module.endsWith('.js')) continue;
      const moduleWithoutExtension = module.replace('.js', '');

      // eslint-disable-next-line no-shadow
      const { default: Module }: DefaultClass<unknown> = await import(`../modules/${module}`);
      // eslint-disable-next-line no-new
      new Module(client);
      if (global.IS_MAIN_PROCESS) client.logger.log(`Loaded module: ${moduleWithoutExtension}`, 'MODULES');
    }
  }

  async loadTasks(client: DenkyClient) {
    client.tasks = new Collection();
    const tasks = await readdir('./bot/tasks/');
    for await (const task of tasks) {
      if (!task.endsWith('.js')) continue;
      const taskWithoutExtension = task.replace('.js', '');

      const { default: TaskClass }: DefaultClass<Task> = await import(`../tasks/${task}`);
      const createdTask = new TaskClass();
      createdTask.interval = setInterval(() => createdTask.run(client), createdTask.delay);
      client.tasks.set(createdTask.name, createdTask);
      client.logger.log(`Loaded task: ${taskWithoutExtension}`, 'TASKS');
    }
  }

  async loadBotConfiguration(client: DenkyClient) {
    const configData = await readFile('../config.json');
    client.config = JSON.parse(configData.toString());
    if (global.IS_MAIN_PROCESS) client.logger.log('Loaded bot configuration file.', 'CONFIGURATION');
  }

  async peformPreInitialization(client: DenkyClient) {
    client.logger = new Logger();
    await this.loadBotConfiguration(client);
    this.loadWebserver(client);
  }

  loadWebserver(client: DenkyClient) {
    if (global.IS_MAIN_PROCESS) {
      const { port, publicKey, useHttpServer } = client.config.interactions;
      if (useHttpServer && publicKey && port) {
        client.logger.log('Starting webserver to listen to interactions...', 'INTERACTIONS');
        const webserver = new InteractionsWebserver(client);
        webserver.start({ port, publicKey });
      }
    }
  }
}

export { Initializer };
