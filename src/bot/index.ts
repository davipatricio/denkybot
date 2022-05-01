import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';
import type { DenkyClient } from '../types/Client';
import { Initializer } from './utils/Initializer';

config({ path: '../.env' });

// @ts-ignore
const client: DenkyClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
  failIfNotExists: false,
  allowedMentions: {
    parse: ['users'],
    repliedUser: true,
  },
  partials: [Partials.Channel, Partials.User, Partials.GuildMember, Partials.Message, Partials.Reaction],
});

// We should set this, so tasks won't duplicate (giveaways, reminders, etc)
if (client.shard?.ids[0] === 0) global.IS_MAIN_PROCESS = true;

// eslint-disable-next-line no-new
new Initializer(client);
