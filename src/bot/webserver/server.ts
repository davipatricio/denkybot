import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import nacl from 'tweetnacl';
import type { DenkyClient } from '../../types/Client';

export class InteractionsWebserver {
  client: DenkyClient;
  router: FastifyInstance;
  constructor(client: DenkyClient) {
    this.client = client;
    this.router = fastify({ logger: false, trustProxy: 1 });
  }

  start({ port }: { port: number; publicKey: string }) {
    this.router.get('/', (_, res) => res.send('express vivo'));

    this.router.post('/interactions', (request, response) => this.#handleRequest(request, response));

    this.router.listen({ port, host: '0.0.0.0' }, err => {
      if (err) throw err;
      console.log(`✅ \x1b[34m[DENKY]\x1b[0m', 'Started webserver to listen to interactions on port ${port}`);
    });
  }

  #handleRequest(request: FastifyRequest, response: FastifyReply) {
    const signature = request.headers['x-signature-ed25519'] as string;
    const timestamp = request.headers['x-signature-timestamp'] as string;
    const body = JSON.stringify(request.body);

    const isValidRequest = nacl.sign.detached.verify(Buffer.from(timestamp + body), Buffer.from(signature, 'hex'), Buffer.from(this.client.config.interactions.publicKey, 'hex'));
    if (!isValidRequest) return response.code(401).send('Invalid signature');

    // @ts-expect-error
    return this.client.actions.InteractionCreate?.handle(request.body);
  }
}
