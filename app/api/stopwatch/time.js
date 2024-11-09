// /pages/api/stopwatch/time.js

import { getTime } from '../../../lib/stopwatch';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const currentTime = getTime();
    res.status(200).json({ currentTime });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
