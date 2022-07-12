import type { DenkyClient } from '../../types/Client';
import { LanguageManager } from '../managers/LanguageManager';

export default class Languages {
  client: DenkyClient;
  manager: LanguageManager;
  constructor(client: DenkyClient) {
    this.client = client;
    this.client.languages = this;

    this.manager = new LanguageManager(this.client);
    this.manager.loadLocales();
  }
}
