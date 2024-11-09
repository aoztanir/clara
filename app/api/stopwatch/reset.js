// /pages/api/stopwatch/reset.js

import { resetStopwatch } from '../../../lib/stopwatch';

export default function handler(req, res) {
  if (req.method === 'POST') {
    resetStopwatch();
    res.status(200).json({ message: 'Stopwatch reset.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
