import type { DenkyClient } from '#types/Client';
import type { Awaitable } from 'discord.js';
import type { AutocompleteRunOptions, CommandRunOptions } from './Command';

interface SubCommandMethods {
  /** The client that instanced this command */
  client: DenkyClient;

  run?({ t, interaction }: CommandRunOptions): Awaitable<void>;
  runAutocomplete?({ t, interaction }: AutocompleteRunOptions): Awaitable<void>;
}

export abstract class SubCommand implements SubCommandMethods {
  /** The client that instanced this command */
  client: DenkyClient;

  constructor(client: DenkyClient) {
    this.client = client;
  }
}
