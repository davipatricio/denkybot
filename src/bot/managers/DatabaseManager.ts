import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

export class DatabaseManager {
  content!: { [key: string]: any };
  local: string;
  constructor(local: string) {
    this.local = local;
    this.prepareDatabase();
  }

  async prepareDatabase() {
    const { local } = this;
    if (!existsSync('./databases')) {
      await mkdir('./databases');
    }
    if (!existsSync(`./databases/${local}.json`)) {
      await writeFile(`./databases/${local}.json`, '{}');
    }
    try {
      const data = await readFile(`databases/${local}.json`);
      this.content = JSON.parse(data.toString());
    } catch (e) {
      throw new Error(`Error loading database ${this.local}\n${e}`);
    }
  }

  // Listing
  get storage() {
    return this.content;
  }

  get length() {
    return Object.keys(this.storage).length;
  }

  all() {
    return Object.keys(this.storage).map(i => ({ ID: i, data: this.storage[i] }));
  }

  keyArray() {
    return Object.keys(this.storage);
  }

  // General
  set(name: string, value: any) {
    this.content[name] = value;
    return this.#write();
  }

  delete(name: string) {
    delete this.content[name];
    return this.#write();
  }

  get(name: string) {
    return this.#get(name);
  }

  // Array
  push(name: string, value: any) {
    if (!Array.isArray(this.content[name])) {
      throw new Error('The value already set is not an Array or has not been set.');
    }
    (this.content[name] as any[]).push(value);
    this.#write();
  }

  pull(name: string, value: any) {
    if (!Array.isArray(this.content[name])) {
      throw new Error('The value already set is not an Array or has not been set.');
    }
    this.content[name] = (this.content[name] as any[]).filter((val: any) => val !== value);
    this.#write();
  }

  includes(name: string, value: any) {
    if (!Array.isArray(this.content[name])) {
      throw new Error('The value already set is not an Array or has not been set.');
    }
    return this.#get(name).includes(value);
  }

  // Others
  async ping() {
    const start = Date.now();
    await this.set(`((((((PING))))))_internal_denkydb${start}`, 0);
    this.delete(`((((((PING))))))_internal_denkydb${start}`);
    return Date.now() - start;
  }

  deleteAll() {
    this.content = {};
    this.#write();
  }

  #write() {
    return writeFile(`./databases/${this.local}.json`, JSON.stringify(this.content, null, 4));
  }

  #get(name: string) {
    return this.content[name];
  }
}
