import { request } from 'undici';

export default class AnimalsAPI {
  request: typeof request;

  constructor() {
    this.request = request;
  }

  async getRandomCat() {
    const data = await this.request('https://aws.random.cat/meow').then(res => res.body.json());

    return data.file;
  }
}
