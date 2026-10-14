import { handleUpdateLead, handleDeleteLead } from '../../src/server/leadsApi.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.query;
  const authHeader = req.headers['authorization'] || req.headers['x-admin-key'] || '';

  try {
    if (req.method === 'PATCH') {
      const result = await handleUpdateLead(id, req.body, authHeader);
      return res.status(200).json(result);
    }

    if (req.method === 'DELETE') {
      const result = await handleDeleteLead(id, authHeader);
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
