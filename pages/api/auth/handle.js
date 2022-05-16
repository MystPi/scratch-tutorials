import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async (req, res) => {
  const privateCode = req.query.privateCode;

  const response = await fetch(
    `https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`
  );
  const json = await response.json();

  if (json.valid) {
    const scratchUserResponse = await fetch(
      `https://api.scratch.mit.edu/users/${json.username}/`
    );
    const scratchUserData = await scratchUserResponse.json();
    const username = scratchUserData.username;

    req.session.user = {
      username,
    };

    await req.session.save();
    res.redirect('/');
  } else {
    res.redirect('/login-failed');
  }
});
