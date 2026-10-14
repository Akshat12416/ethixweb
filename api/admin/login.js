export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const expected = process.env.ADMIN_SECRET || 'ethix2026';

  if (password === expected) {
    return res.status(200).json({ success: true, token: expected });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin passcode.' });
}
