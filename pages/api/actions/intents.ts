import { actionssdk, SimpleResponse } from 'actions-on-google';
import { getOnlineUsers } from '../in-voice';
import type { NextApiRequest, NextApiResponse } from 'next';

const app = actionssdk({ debug: false });

app.intent('actions.intent.MAIN', async (conv) => {
  const online = (await getOnlineUsers()).flatMap((guild) =>
    guild.active.map((user) => user.user)
  );
  conv.close(
    new SimpleResponse({
      speech: online
        ? `Online people include: ${online.join(', ')}`
        : "There aren't any users online right now.",
    })
  );
});

app.fallback((conv) => {
  conv.close(
    new SimpleResponse({ speech: "I'm not sure I can help with that yet." })
  );
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const out = await app.handler(req.body, req.headers);
  if (out.headers) {
    Object.entries(out.headers).forEach(
      ([header, value]) => value && res.setHeader(header, value)
    );
  }
  res.json(out.body);
}
