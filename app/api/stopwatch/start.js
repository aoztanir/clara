// /pages/api/stopwatch/start.js

import { startStopwatch } from '../../../lib/stopwatch';

export default function handler(req, res) {
  if (req.method === 'POST') {
    startStopwatch();
    res.status(200).json({ message: 'Stopwatch started.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
