import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async (req, res) => {
  if (req.method === 'GET') {
    if (req.session.user) {
      return res.json({
        ...req.session.user,
        isLoggedIn: true,
      });
    } else {
      return res.json({
        isLoggedIn: false,
      });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
});
