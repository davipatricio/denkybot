import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';
import { Initializer } from './lib/utils/Initializer';
import type { DenkyClient } from './types/Client';

config({ path: '../.env' });

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
  failIfNotExists: false,
  allowedMentions: {
    parse: ['users'],
    repliedUser: true
  },
  partials: [Partials.Channel, Partials.User, Partials.GuildMember, Partials.Message, Partials.Reaction],
  ws: {
    compress: true
  }
}) as DenkyClient;

// We should set this, so tasks won't duplicate (giveaways, reminders, etc)
if (client.shard?.ids[0] === 0) global.IS_MAIN_PROCESS = true;

const initializer = new Initializer(client);

initializer.peformPreInitialization().then(() => {
  if (global.IS_MAIN_PROCESS) client.logger.debug('Starting bot...', { tags: ['Bot'] });
  initializer.init();
});
