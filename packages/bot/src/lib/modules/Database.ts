import type { DenkyClient } from '#types/Client';
import { DatabaseManager } from '../managers/DatabaseManager';

export default class Database {
  constructor(client: DenkyClient) {
    client.databases = new DatabaseManager();
  }
}
