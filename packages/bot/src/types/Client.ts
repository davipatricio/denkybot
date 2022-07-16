import type { DatabaseManager } from '#lib/managers/DatabaseManager';
import type APIs from '#lib/modules/APIs';
import type Languages from '#lib/modules/Languages';
import type { Command } from '#structures/Command';
import type { Task } from '#structures/Task';
import type { Logger } from '@logger';
import type { Client, Collection } from 'discord.js';

export interface DenkyClient extends Client<boolean> {
  /** Cached bot commands */
  commands: Collection<string, Command>;
  /** Bot configuration */
  config: typeof import('../../config.example.json');
  /** Bot databases */
  databases: DatabaseManager;
  /** Cached bot tasks */
  tasks: Collection<string, Task>;
  /** Bot languages */
  languages: Languages;
  /** Logger to send useful information to the console */
  logger: Logger;
  /** Class to make requests to external services */
  apis: APIs;
}
