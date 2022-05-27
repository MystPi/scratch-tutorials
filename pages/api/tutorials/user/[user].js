import { getAllTutorialsByUser } from 'lib/db';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const tutorials = await getAllTutorialsByUser(
      req.query.user,
      req.query.page,
      req.query.sort,
      req.query.search
    );

    if (tutorials) {
      res.json(tutorials);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
