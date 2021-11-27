import { Client, Intents } from 'discord.js';

const client = new Client({ ws: { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] } });

let ready = client.ws.status === 0;

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
