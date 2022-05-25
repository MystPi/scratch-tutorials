import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'authtoken',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute((req, res) => {
    const banned = process.env.BANS.split(',').includes(
      req.session?.user?.username
    );

    if (banned) {
      return res.status(403).json({ error: 'You are banned' });
    }

    return handler(req, res);
  }, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
