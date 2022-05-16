import { withSessionRoute } from 'lib/withSession';
import { getTutorial, updateTutorial, deleteTutorial } from 'lib/db';

export default withSessionRoute(async (req, res) => {
  if (req.method === 'GET') {
    const tutorial = await getTutorial(req.query.id);
    res.json(tutorial);
  } else if (req.method === 'PUT' || req.method === 'DELETE') {
    if (!req.session.user) {
      return res
        .status(401)
        .json({ error: 'You must be logged in to edit tutorials.' });
    }

    const tutorial = await getTutorial(req.query.id);

    if (req.session.user.username !== tutorial.by) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to edit this tutorial' });
    }

    if (tutorial) {
      if (req.method === 'PUT') {
        const body = JSON.parse(req.body);

        if (!body.title || !body.contents) {
          return res.status(400).json({ error: 'Missing title or contents' });
        }

        const updated = await updateTutorial(
          req.query.id,
          body.title,
          body.contents
        );
        res.json(updated);
      } else {
        const deleted = await deleteTutorial(req.query.id);
        res.json(deleted);
      }
    } else {
      res.status(404).json({ error: 'Tutorial not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});
