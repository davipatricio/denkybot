import type { DenkyClient } from '../../types/Client';
import { DatabaseManager } from '../managers/DatabaseManager';

export default class Database {
  client: DenkyClient;
  /** Stores server configurations */
  config: DatabaseManager;
  /** Stores afk states */
  afk: DatabaseManager;
  constructor(client: DenkyClient) {
    client.databases = this;
    this.loadDatabases();
  }

  loadDatabases() {
    this.config = new DatabaseManager('config');
    this.afk = new DatabaseManager('afk');
  }
}
