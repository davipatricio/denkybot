import type { DenkyClient } from '#types/Client';
import { ChatInputApplicationCommandData, SlashCommandBuilder } from 'discord.js';
import type { LanguageManager } from '../lib/managers/LanguageManager';

export class CommandDataStructure extends SlashCommandBuilder {
  client: DenkyClient;
  data: ChatInputApplicationCommandData;
  t: LanguageManager['get'];
  constructor(client: DenkyClient);
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor(client: DenkyClient) {
    super();
    this.t = client.languages.manager.get;
    this.client = client;
  }
}
