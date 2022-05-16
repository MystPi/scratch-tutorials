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
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
