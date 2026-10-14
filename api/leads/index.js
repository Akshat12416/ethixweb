import { handleCreateLead, handleGetLeads } from '../../src/server/leadsApi.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const authHeader = req.headers['authorization'] || req.headers['x-admin-key'] || '';
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '';

  try {
    if (req.method === 'POST') {
      const result = await handleCreateLead(req.body, clientIp);
      return res.status(201).json(result);
    }

    if (req.method === 'GET') {
      const { status = '', search = '', limit = 100 } = req.query || {};
      const result = await handleGetLeads(authHeader, { status, search, limit });
      return res.status(200).json(result);
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err) {
    const statusCode = err.status || 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Server error',
    });
  }
}
