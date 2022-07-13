/* eslint-disable no-await-in-loop */
import { createLogger } from '@logger';
import { InteractionsWebserver } from '@webserver';
import { Collection } from 'discord.js';
import { readdir, readFile } from 'node:fs/promises';
import type { Command } from '../../structures/Command';
import type { CommandDataStructure } from '../../structures/CommandDataStructure';
import type { Event } from '../../structures/Event';
import type { Task } from '../../structures/Task';
import type { DenkyClient } from '../../types/Client';

type DefaultClass<T> = { default: new (...args: any[]) => T };

export class Initializer {
  client: DenkyClient;
  constructor(client: DenkyClient) {
    this.client = client;
  }

  async init() {
    await this.loadModules();
    await this.loadCommands();
    await this.loadCommandData();
    await this.loadEvents();
    await this.loadTasks();
    // Log bot in after loading everything
    this.client.login(process.env.BOT_TOKEN).then(() => this.client.logger.info('Bot successfully started.', { tags: ['Bot'] }));
  }

  async loadCommands() {
    this.client.commands = new Collection();
    const categories = await readdir('./commands/');
    let totalCommands = 0;

    for (const category of categories) {
      const commands = (await readdir(`./commands/${category}`)).filter(file => file.endsWith('.js'));
      totalCommands += commands.length;
      for (const command of commands) {
        const commandWithoutExtension = command.replace('.js', '');

        const { default: CommandClass }: DefaultClass<Command> = await import(`../../commands/${category}/${command}`);
        const cmd = new CommandClass(this.client);
        this.client.commands.set(commandWithoutExtension, cmd);
      }
    }

    if (global.IS_MAIN_PROCESS)
      this.client.logger.info(`Loaded ${totalCommands} commands successfully.`, {
        tags: ['Commands']
      });
  }

  async loadCommandData() {
    const categories = await readdir('./commands/');
    for await (const category of categories) {
      const commands = (await readdir(`./commands/${category}/data`)).filter(file => file.endsWith('.js'));

      for await (const command of commands) {
        const commandDataWithoutExtension = command.replace('.js', '');

        const { default: CommandDataClass }: DefaultClass<CommandDataStructure> = await import(`../../commands/${category}/data/${command}`);
        const cachedCommand = this.client.commands.get(commandDataWithoutExtension);
        if (cachedCommand) cachedCommand.options = new CommandDataClass(this.client).data;
      }
    }
  }

  async loadEvents() {
    const events = (await readdir('./events/')).filter(file => file.endsWith('.js'));
    for await (const event of events) {
      const { default: EventClass }: DefaultClass<Event> = await import(`../../events/${event}`);
      const evt = new EventClass();
      this.client.on(evt.eventName, (...rest) => evt.run(this.client, ...rest));
    }

    if (global.IS_MAIN_PROCESS)
      this.client.logger.info(`Loaded ${events.length} events successfully.`, {
        tags: ['Events']
      });
  }

  async loadModules() {
    const modules = (await readdir('./lib/modules/')).filter(file => file.endsWith('.js'));
    for await (const module of modules) {
      const { default: Module }: DefaultClass<unknown> = await import(`../modules/${module}`);
      // eslint-disable-next-line no-new
      new Module(this.client);
    }

    if (global.IS_MAIN_PROCESS)
      this.client.logger.info(`Loaded ${modules.length} modules successfully.`, {
        tags: ['Modules']
      });
  }

  async loadTasks() {
    this.client.tasks = new Collection();
    const tasks = (await readdir('./lib/tasks/')).filter(file => file.endsWith('.js'));
    for await (const task of tasks) {
      const { default: TaskClass }: DefaultClass<Task> = await import(`../tasks/${task}`);
      const createdTask = new TaskClass();
      createdTask.interval = setInterval(() => createdTask.run(this.client), createdTask.delay);

      this.client.tasks.set(createdTask.name, createdTask);
    }

    if (global.IS_MAIN_PROCESS)
      this.client.logger.info(`Loaded ${tasks.length} tasks successfully.`, {
        tags: ['Tasks']
      });
  }

  async loadBotConfiguration() {
    const configData = await readFile('../config.json');
    this.client.config = JSON.parse(configData.toString());
  }

  loadWebserver() {
    if (!global.IS_MAIN_PROCESS) return;
    const { port, publicKey, useHttpServer } = this.client.config.interactions;
    if (useHttpServer && publicKey && port) {
      this.client.logger.info('Starting webserver to listen to interactions...', {
        tags: ['Interactions']
      });
      const webserver = new InteractionsWebserver(this.client);
      webserver.start({ port, publicKey });
    }
  }

  async peformPreInitialization() {
    await this.loadBotConfiguration();
    this.client.logger = createLogger(
      {
        handleExceptions: true,
        handleRejections: true
      },
      this.client
    );
    if (global.IS_MAIN_PROCESS)
      this.client.logger.info('Loaded Bot configuration file.', {
        tags: ['Configuration']
      });
    this.loadWebserver();
  }
}
