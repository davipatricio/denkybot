import { request } from 'undici';

export default class AnimalsAPI {
  request: typeof request;
  constructor() {
    this.request = request;
  }

  /** Get a random image of a cat */
  async getRandomCat() {
    const data = await this.request('https://aws.random.cat/meow').then(res => res.body.json());

    return data.file as string;
  }

  /** Get a random image of a dog */
  async getRandomDog() {
    const data = await this.request('https://dog.ceo/api/breeds/image/random').then(res => res.body.json());

    return data.message as string;
  }

  /** Get a random gif of a bunny */
  async getRandomBunny() {
    const data = await this.request('https://api.bunnies.io/v2/loop/random/?media=gif,png').then(res => res.body.json());

    return data.media.gif as string;
  }

  /** Get a random image of a duck */
  async getRandomDuck() {
    const data = await this.request('https://random-d.uk/api/v1/random?type=png').then(res => res.body.json());

    return data.url as string;
  }

  /** Get a random image of a foxy */
  async getRandomFoxy() {
    const data = await this.request('https://randomfox.ca/floof/').then(res => res.body.json());

    return data.image as string;
  }

  /** Get a random image of a koala */
  async getRandomKoala() {
    const data = await this.request('https://some-random-api.ml/img/koala').then(res => res.body.json());

    return data.link as string;
  }

  /** Get a random image of a panda */
  async getRandomPanda() {
    const data = await this.request('https://some-random-api.ml/img/panda').then(res => res.body.json());

    return data.link as string;
  }
}
