import { Client, GatewayIntentBits } from 'discord.js';
import env from 'dotenv';
import type { DenkyClient } from '../types/Client';
import { Initializer } from './utils/Initializer';

env.config({ path: '../.env' });

// @ts-ignore
const client: DenkyClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
  failIfNotExists: false,
  allowedMentions: {
    parse: ['users'],
    repliedUser: true,
  },
});

// We should set this, so tasks won't duplicate (giveaways, reminders, etc)
if (client.shard?.ids[0] === 0) global.IS_MAIN_PROCESS = true;

client.login(process.env.BOT_TOKEN);

// eslint-disable-next-line no-new
new Initializer(client);
