import { request } from 'undici';

export default class AnimalsAPI {
  request: typeof request;

  constructor() {
    this.request = request;
  }

  /** Get a random image of a cat */
  async getRandomCat(): Promise<string> {
    const data = await this.request('https://aws.random.cat/meow').then(res => res.body.json());

    return data.file;
  }

  /** Get a random image of a dog */
  async getRandomDog(): Promise<string> {
    const data = await this.request('https://dog.ceo/api/breeds/image/random').then(res => res.body.json());

    return data.message;
  }

  /** Get a random gif of a bunny */
  async getRandomBunny(): Promise<string> {
    const data = await this.request('https://api.bunnies.io/v2/loop/random/?media=gif,png').then(res => res.body.json());

    return data.media.gif;
  }

  /** Get a random image of a duck */
  async getRandomDuck(): Promise<string> {
    const data = await this.request('https://random-d.uk/api/v1/random?type=png').then(res => res.body.json());

    return data.url;
  }

  /** Get a random image of a foxy */
  async getRandomFoxy(): Promise<string> {
    const data = await this.request('https://randomfox.ca/floof/').then(res => res.body.json());

    return data.image;
  }

  /** Get a random image of a koala */
  async getRandomKoala(): Promise<string> {
    const data = await this.request('https://some-random-api.ml/img/koala').then(res => res.body.json());

    return data.link;
  }

  /** Get a random image of a panda */
  async getRandomPanda(): Promise<string> {
    const data = await this.request('https://some-random-api.ml/img/panda').then(res => res.body.json());

    return data.link;
  }
}
