// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import DiscordClient from '@/utils/discord-client';

export async function getOnlineUsers(verbose: boolean = false) {
  const client = await DiscordClient();

  return client.guilds.cache.map(({ name, voiceStates }) => {
    const active = verbose
      ? voiceStates.cache
          .filter((vs) => !!vs.channel)
          .map((vs) => ({
            user: vs.member,
            channel: vs.channel,
            status: vs,
          }))
      : voiceStates.cache
          .filter((vs) => !!vs.channel)
          .map((vs) => ({
            user: vs.member?.displayName,
            channel: vs.channel?.name,
          }));
    return {
      name,
      active,
    };
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const online = await getOnlineUsers(!!req.query.verbose);

  res.json(online);
}
