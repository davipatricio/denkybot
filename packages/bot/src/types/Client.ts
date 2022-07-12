import type { Logger } from '#logger';
import type { Client, Collection } from 'discord.js';
import type { DatabaseManager } from '../bot/managers/DatabaseManager';
import type Helpers from '../bot/modules/Helpers';
import type Languages from '../bot/modules/Languages';
import type { Command } from '../structures/Command';
import type { Task } from '../structures/Task';

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
  /** Bot helpers (internal API) */
  helpers: Helpers;
}
