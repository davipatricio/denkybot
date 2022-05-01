import type { Locale } from 'discord.js';
import type { DenkyClient } from '../../types/Client';

export default class Helpers {
  /** The client that instantiated this module */
  client: DenkyClient;
  constructor(client: DenkyClient) {
    client.helpers = this;
    this.client = client;
  }

  recommendLanguage(locale?: Locale) {
    if (!locale) return this.client.config.defaultLanguage;
    return locale.replace('-', '_');
  }
}
