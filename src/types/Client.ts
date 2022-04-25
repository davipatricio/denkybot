import type { Client, Collection } from 'discord.js';
import type Database from '../bot/modules/Database';
import type { Command } from '../structures/Command';

export interface DenkyClient extends Client<boolean> {
  /** Cached bot commands */
  commands: Collection<string, Command>;
  /** Bot databases */
  databases: Database;
}
