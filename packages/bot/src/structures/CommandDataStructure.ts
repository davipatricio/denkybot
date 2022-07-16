import type { DenkyClient } from '#types/Client';
import type { ChatInputApplicationCommandData } from 'discord.js';

export class CommandDataStructure {
  data: ChatInputApplicationCommandData;
  constructor(client: DenkyClient);
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}
}
