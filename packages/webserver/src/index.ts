/* eslint-disable import/first */
import mAlias from 'module-alias';

mAlias(`${__dirname}/../package.json`);

import type { DenkyClient } from '#types/Client';
import cors from '@fastify/cors';
import crypto from 'crypto';
import { verify } from 'discord-verify/node';
import { APIInteraction, InteractionResponseType, InteractionType } from 'discord.js';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

type DiscordIncomingRequest = FastifyRequest<{
  Body: APIInteraction;
  Headers: {
    'x-signature-ed25519': string;
    'x-signature-timestamp': string;
  };
}>;

export class InteractionsWebserver {
  client: DenkyClient;
  router: FastifyInstance;

  constructor(client: DenkyClient) {
    this.client = client;
    this.router = fastify({ logger: false, trustProxy: 1 });
  }

  start({ port }: { port: number; publicKey: string }) {
    this.router.register(cors, {
      origin: '*',
      methods: ['GET', 'POST']
    });
    this.router.get('/', (_, res) => res.redirect('https://github.com/denkylabs/denkybot'));
    this.router.post('/interactions', (request: DiscordIncomingRequest, response) => this.#handleInteractionRequest(request, response));

    this.router.get('/stats', async (_, response) => {
      const guilds = await this.client.shard?.fetchClientValues('guilds.cache.size').then((g: number[]) => g.reduce((a, b) => a + b, 0));
      const users = await this.client.shard?.broadcastEval(c => c.guilds.cache.reduce((a, b) => a + b.memberCount, 0)).then(g => g.reduce((a, b) => a + b, 0));
      const commands = this.client.commands.size;

      response.status(200).send({
        guilds,
        users,
        commands
      });
    });

    this.router.get('/popular-guilds', async (_, response) => {
      const guilds =
        (await this.client.shard
          ?.broadcastEval(c => {
            return c.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(g => g)
              .slice(0, 10)
              .map(g => ({ id: g.id, name: g.name, memberCount: g.memberCount, iconURL: g.iconURL({ size: 2048 }) }));
          })
          .then(g => g.reduce((a, b) => a.concat(b), []))
          .catch(() => [])) ?? [];

      response.status(200).send(guilds.slice(0, 10));
    });

    this.router.listen({ port, host: '0.0.0.0' }, err => {
      if (err) throw err;
      this.client.logger.info(`Started webserver on port ${port}`, { tags: ['Interactions'] });
    });
  }

  async #handleInteractionRequest(request: DiscordIncomingRequest, response: FastifyReply) {
    const signature = request.headers['x-signature-ed25519'];
    const timestamp = request.headers['x-signature-timestamp'];
    const rawBody = JSON.stringify(request.body);

    const isValid = await verify(rawBody, signature, timestamp, this.client.config.interactions.publicKey, crypto.webcrypto.subtle);
    if (!isValid) return response.code(401).send('Invalid signature');

    const interaction = request.body;

    switch (interaction.type) {
      case InteractionType.Ping:
        response.status(200).send({ type: InteractionResponseType.Pong });
        break;
    }

    // @ts-expect-error ActionsManager is private
    return this.client.actions.InteractionCreate?.handle(interaction);
  }
}
