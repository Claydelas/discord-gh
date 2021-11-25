import { Client, Intents } from 'discord.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

let ready = client.isReady();

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
