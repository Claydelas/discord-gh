// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (code) {
    try {
      const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID ?? '',
          client_secret: process.env.CLIENT_SECRET ?? '',
          code: code as string,
          grant_type: 'authorization_code',
          redirect_uri: `http://localhost:3000/api/auth`,
          scope: 'identify guilds guilds.members.read',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const oauthData = await oauthResult.json();
      const cookies = new Cookies(req, res);
      cookies.set('Token', oauthData.access_token, {
        sameSite: true,
        maxAge: oauthData.expires_in,
      });
      res.json(oauthData);
    } catch (error) {
      console.error(error);
      res.status(401);
    }
  }
  res.status(400).send('F');
}
