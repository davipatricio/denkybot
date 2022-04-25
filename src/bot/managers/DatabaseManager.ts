import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

class DatabaseManager {
  conteudo!: { [key: string]: any };
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
      this.conteudo = JSON.parse(data.toString());
    } catch (e) {
      throw new Error(`Erro ao carregar banco de dados ${this.local}\n${e}`);
    }
  }

  // Listagem
  get storage() {
    return this.conteudo;
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

  // Geral
  set(nome: string, valor: any) {
    this.conteudo[nome] = valor;
    return this.#escrever();
  }

  delete(nome: string) {
    delete this.conteudo[nome];
    return this.#escrever();
  }

  get(nome: string) {
    return this.#obter(nome);
  }

  // Array
  push(nome: string, valor: any) {
    if (!Array.isArray(this.conteudo[nome])) {
      throw new Error('O valor já definido não é uma array ou não foi definido.');
    }
    this.conteudo[nome].push(valor);
    this.#escrever();
  }

  pull(nome: string, valor: any) {
    if (!Array.isArray(this.conteudo[nome])) {
      throw new Error('O valor já definido não é uma array ou não foi definido.');
    }
    this.conteudo[nome] = this.conteudo[nome].filter((i: any) => i !== valor);
    this.#escrever();
  }

  includes(nome: string, valor: any) {
    if (!Array.isArray(this.conteudo[nome])) {
      throw new Error('O valor já definido não é uma array ou não foi definido.');
    }
    return this.#obter(nome).includes(valor);
  }

  // Outros
  ping() {
    const inicio = Date.now();
    this.set(`((((((PING))))))_internal_denkydb${inicio}`, 0);
    this.delete(`((((((PING))))))_internal_denkydb${inicio}`);
    return Date.now() - inicio;
  }

  deleteAll() {
    this.conteudo = {};
    this.#escrever();
  }

  #escrever() {
    return writeFile(`./databases/${this.local}.json`, JSON.stringify(this.conteudo));
  }

  #obter(nome: string) {
    return this.conteudo[nome];
  }
}

export { DatabaseManager };
