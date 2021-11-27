import { conversation, Simple } from '@assistant/conversation';
import { getOnlineUsers } from '../in-voice';
import type { NextApiRequest, NextApiResponse } from 'next';

const app = conversation({ debug: false });

app.handle('onlineUsers', async (conv) => {
  const online = (await getOnlineUsers()).flatMap((guild) =>
    guild.active.map((user) => user.user)
  );
  conv.add(
    new Simple({
      speech:
        online.length > 0
          ? `Online users include: ${online.join(', ')}`
          : "There aren't any users online right now.",
    })
  );
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const out = await app.handler(req.body, req.headers);
    if (out.headers) {
      Object.entries(out.headers).forEach(
        ([header, value]) => value && res.setHeader(header, value)
      );
    }
    res.status(out.status).json(out.body);
  } catch (error) {
    res.status(500).send(error);
  }
}
