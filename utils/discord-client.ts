import { Client, Intents } from 'discord.js';

const client = new Client({ ws: { intents: [Intents.FLAGS.GUILDS] } });

let ready = !!client.readyTimestamp;

if (!ready) client.login(process.env.BOT_TOKEN);

export default async function DiscordClient() {
  if (!ready) {
    ready = await new Promise((resolve) =>
      client.once('ready', () => {
        resolve(true);
      })
    );
  }
  return client;
}
