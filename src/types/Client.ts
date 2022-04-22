import type { Client, Collection } from 'discord.js';
import type { Command } from '../structures/Command';

export interface DenkyClient extends Client<boolean> {
  commands: Collection<string, Command>;
}
