import { handleGetStats } from '../../src/server/leadsApi.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const authHeader = req.headers['authorization'] || req.headers['x-admin-key'] || '';

  try {
    const result = await handleGetStats(authHeader);
    return res.status(200).json(result);
  } catch (err) {
    const statusCode = err.status || 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Server error',
    });
  }
}
