import { APIInteraction, InteractionResponseType, InteractionType } from 'discord.js';
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
    this.router.get('/', (_, res) => res.redirect('https://github.com/denkylabs/denkybot'));
    this.router.post('/interactions', (request, response) => this.#handleRequest(request, response));

    this.router.listen({ port, host: '0.0.0.0' }, err => {
      if (err) throw err;
      this.client.logger.log(`Started webserver to listen to interactions on port ${port}`, 'INTERACTIONS');
    });
  }

  #handleRequest(request: FastifyRequest, response: FastifyReply) {
    const signature = request.headers['x-signature-ed25519'] as string;
    const timestamp = request.headers['x-signature-timestamp'] as string;
    const body = JSON.stringify(request.body);

    const isValidRequest = nacl.sign.detached.verify(Buffer.from(timestamp + body), Buffer.from(signature, 'hex'), Buffer.from(this.client.config.interactions.publicKey, 'hex'));
    if (!isValidRequest) return response.code(401).send('Invalid signature');

    const interaction = request.body as APIInteraction;

    switch (interaction.type) {
      case InteractionType.Ping:
        response.status(200).send({ type: InteractionResponseType.Pong });
        break;
    }

    // @ts-expect-error ActionsManager is private
    return this.client.actions.InteractionCreate?.handle(interaction);
  }
}
