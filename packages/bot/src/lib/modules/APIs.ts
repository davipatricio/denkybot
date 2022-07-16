import Animals from '#apis/animals';
import type { DenkyClient } from '#types/Client';

export default class APIs {
  client: DenkyClient;
  animals: Animals;

  constructor(client: DenkyClient) {
    this.client = client;
    this.client.apis = this;

    this.animals = new Animals();
  }
}
