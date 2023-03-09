import { config } from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { settings } from '../server/config';
import { client as mongo } from '../server/database';

config();

const prefix = <string>process.env.PREFIX;

const channels = {
  botShit: <string>process.env.BOT_SHIT,
  raidTimer: <string>process.env.RAID_TIMER
};

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

export {
  prefix,
  channels,
  client,
  settings,
  mongo
};
 