// /pages/api/stopwatch/stop.js

import { stopStopwatch } from '../../../lib/stopwatch';

export default function handler(req, res) {
  if (req.method === 'POST') {
    stopStopwatch();
    res.status(200).json({ message: 'Stopwatch stopped.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
