import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute((req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
