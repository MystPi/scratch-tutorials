import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute((req, res) => {
  if (!req.session.user) {
    const redirect = Buffer.from(
      `${req.headers.host}/api/auth/handle`
    ).toString('base64');
    res.redirect(
      `https://auth.itinerary.eu.org/auth/?redirect=${redirect}&name=Scratch Tutorials`
    );
  } else {
    res.redirect('/');
  }
});
