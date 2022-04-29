import type { Client, Collection } from 'discord.js';
import type Database from '../bot/modules/Database';
import type Languages from '../bot/modules/Languages';
import type { Command } from '../structures/Command';
import type { Task } from '../structures/Task';

export interface DenkyClient extends Client<boolean> {
  /** Cached bot commands */
  commands: Collection<string, Command>;
  /** Cached bot tasks */
  tasks: Collection<string, Task>;
  /** Bot databases */
  databases: Database;
  /** Bot languages */
  languages: Languages;
  /** Bot configuration */
  config: typeof import('../../config.json');
}
