import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {
  handleCreateLead,
  handleGetLeads,
  handleUpdateLead,
  handleDeleteLead,
  handleGetStats,
} from './src/server/leadsApi.js';

function getJsonBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function leadsApiMiddleware() {
  return async (req, res, next) => {
    const urlObj = new URL(req.url, 'http://localhost');
    const pathname = urlObj.pathname;

    if (!pathname.startsWith('/api/')) {
      return next();
    }

    const authHeader = req.headers['authorization'] || req.headers['x-admin-key'] || '';
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '';

    try {
      // 1. Health check
      if (pathname === '/api/health' && req.method === 'GET') {
        return sendJson(res, 200, { status: 'healthy', database: 'PostgreSQL (Neon)' });
      }

      // 2. Admin Login
      if (pathname === '/api/admin/login' && req.method === 'POST') {
        const body = await getJsonBody(req);
        const expected = process.env.ADMIN_SECRET || 'ethix2026';
        if (body.password === expected) {
          return sendJson(res, 200, { success: true, token: expected });
        }
        return sendJson(res, 401, { success: false, message: 'Invalid admin passcode.' });
      }

      // 3. Admin stats
      if (pathname === '/api/leads/stats' && req.method === 'GET') {
        const result = await handleGetStats(authHeader);
        return sendJson(res, 200, result);
      }

      // 4. Create lead
      if (pathname === '/api/leads' && req.method === 'POST') {
        const body = await getJsonBody(req);
        const result = await handleCreateLead(body, clientIp);
        return sendJson(res, 201, result);
      }

      // 5. List leads
      if (pathname === '/api/leads' && req.method === 'GET') {
        const status = urlObj.searchParams.get('status') || '';
        const search = urlObj.searchParams.get('search') || '';
        const limit = urlObj.searchParams.get('limit') || 100;
        const result = await handleGetLeads(authHeader, { status, search, limit });
        return sendJson(res, 200, result);
      }

      // 6. Update single lead: /api/leads/:id
      const idMatch = pathname.match(/^\/api\/leads\/(\d+)$/);
      if (idMatch && req.method === 'PATCH') {
        const id = idMatch[1];
        const body = await getJsonBody(req);
        const result = await handleUpdateLead(id, body, authHeader);
        return sendJson(res, 200, result);
      }

      // 7. Delete single lead: /api/leads/:id
      if (idMatch && req.method === 'DELETE') {
        const id = idMatch[1];
        const result = await handleDeleteLead(id, authHeader);
        return sendJson(res, 200, result);
      }

      return sendJson(res, 404, { error: 'API endpoint not found' });
    } catch (err) {
      console.error('[API ERROR]', err);
      const statusCode = err.status || 400;
      return sendJson(res, statusCode, {
        success: false,
        message: err.message || 'Internal server error',
      });
    }
  };
}

function apiPlugin() {
  return {
    name: 'leads-api-plugin',
    configureServer(server) {
      server.middlewares.use(leadsApiMiddleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(leadsApiMiddleware());
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react(), apiPlugin()],
});
