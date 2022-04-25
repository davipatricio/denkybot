import type { DenkyClient } from '../../types/Client';
import { DatabaseManager } from '../managers/DatabaseManager';

export default class Database {
  client: DenkyClient;
  /** Stores server configurations */
  config: DatabaseManager;
  constructor(client: DenkyClient) {
    this.client = client;
    this.client.databases = this;
    this.loadDatabases();
  }

  loadDatabases() {
    this.config = new DatabaseManager('config');
  }
}
