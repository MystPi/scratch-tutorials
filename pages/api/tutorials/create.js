import { withSessionRoute } from 'lib/withSession';
import { createTutorial } from 'lib/db';

export default withSessionRoute(async (req, res) => {
  if (req.method === 'PUT') {
    if (!req.session.user) {
      return res
        .status(401)
        .json({ error: 'You must be logged in to create tutorials.' });
    }

    const body = JSON.parse(req.body);

    if (!body.title || !body.contents) {
      return res.status(400).json({ error: 'Missing title or contents' });
    }

    const created = await createTutorial(
      req.session.user.username,
      body.title,
      body.contents
    );
    res.json(created);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});
