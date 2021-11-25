// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import DiscordClient from '@/utils/discord-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await DiscordClient();

  const online = client.guilds.cache.map(({ name, channels }) => {
    let voiceChannels = channels.cache.filter(
      (channel) => channel.type == 'voice' && !!channel.members.size
    );

    return {
      name,
      channels: voiceChannels.map((channel) => ({
        name: channel.name,
        members: channel.members ?? [], //.map(member => member.user.username),
      })),
    };
  });

  res.json(online);
}
