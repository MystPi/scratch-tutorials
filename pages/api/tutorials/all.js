import { getAllTutorials } from 'lib/db';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const tutorials = await getAllTutorials(
      req.query.page,
      req.query.sort,
      req.query.search
    );

    res.json(tutorials);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
