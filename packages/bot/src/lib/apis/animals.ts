import { request } from 'undici';

export default class AnimalsAPI {
  request: typeof request;

  constructor() {
    this.request = request;
  }

  async getRandomCat(): Promise<string> {
    const data = await this.request('https://aws.random.cat/meow').then(res => res.body.json());

    return data.file;
  }

  async getRandomDog(): Promise<string> {
    const data = await this.request('https://dog.ceo/api/breeds/image/random').then(res => res.body.json());

    return data.message;
  }

  async getRandomBunny(): Promise<string> {
    const data = await this.request('https://api.bunnies.io/v2/loop/random/?media=gif,png').then(res => res.body.json());

    return data.media.gif;
  }

  async getRandomDuck(): Promise<string> {
    const data = await this.request('https://random-d.uk/api/v1/random?type=png').then(res => res.body.json());

    return data.url;
  }

  async getRandomFoxy(): Promise<string> {
    const data = await this.request('https://randomfox.ca/floof/').then(res => res.body.json());

    return data.image;
  }

  async getRandomKoala(): Promise<string> {
    const data = await this.request('https://some-random-api.ml/img/koala').then(res => res.body.json());

    return data.link;
  }

  async getRandomPanda(): Promise<string> {
    const data = await this.request('https://some-random-api.ml/img/panda').then(res => res.body.json());

    return data.link;
  }
}
