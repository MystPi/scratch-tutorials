import { getAllTutorials } from 'lib/db';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    let tutorials;

    tutorials = await getAllTutorials();

    res.json(tutorials);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
