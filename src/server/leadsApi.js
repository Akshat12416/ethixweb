import { neon } from '@neondatabase/serverless';

const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://user:password@ep-sample-pooler.region.aws.neon.tech/neondb?sslmode=require';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'ethix2026';

let sqlClient = null;
function getSql() {
  if (!sqlClient) {
    sqlClient = neon(DATABASE_URL);
  }
  return sqlClient;
}

// In-memory rate limiting map: ip -> array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Verify admin authorization header (Bearer <secret> or raw token)
function verifyAdmin(authHeader) {
  if (!authHeader) return false;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
  return token === ADMIN_SECRET;
}

/**
 * Handle new lead submission with validation and spam protection
 */
export async function handleCreateLead(body, clientIp = '') {
  const {
    name,
    email,
    phone = '',
    company = '',
    service = 'General Inquiry',
    budget = 'Not specified',
    timeline = 'Flexible',
    message = '',
    source = 'website_contact',
    // Honeypot fields
    company_website_url = '',
    _gotcha = '',
    // Timestamp check: client sends timestamp when form was rendered
    _ts = 0,
  } = body;

  // 1. Spam check: Honeypot trap
  if (company_website_url || _gotcha) {
    console.warn('[SPAM DETECTED] Honeypot filled by bot:', { clientIp });
    // Silently succeed to fool spambots
    return { success: true, leadId: 999999, message: 'Inquiry received' };
  }

  // 2. Spam check: Submission speed check (humans take at least 1.2s to fill the form)
  if (_ts) {
    const elapsed = Date.now() - Number(_ts);
    if (elapsed < 1200) {
      console.warn('[SPAM DETECTED] Submission too fast (< 1.2s):', { elapsed, clientIp });
      return { success: true, leadId: 999999, message: 'Inquiry received' };
    }
  }

  // 3. Spam check: Rate limiting per IP
  if (isRateLimited(clientIp)) {
    throw new Error('Too many requests. Please wait a few minutes before submitting another inquiry.');
  }

  // 4. Data validation
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanMessage = String(message || '').trim();

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Please provide your full name (at least 2 characters).');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    throw new Error('Please provide a valid business email address.');
  }

  if (!cleanMessage || cleanMessage.length < 5) {
    throw new Error('Please include a brief description of your project or requirements.');
  }

  // 5. Insert lead into PostgreSQL
  const sql = getSql();
  const rows = await sql`
    INSERT INTO ethix_leads (
      name, email, phone, company, service, budget, timeline, message, source, status, ip_address
    ) VALUES (
      ${cleanName}, ${cleanEmail}, ${String(phone).trim()}, ${String(company).trim()},
      ${String(service).trim()}, ${String(budget).trim()}, ${String(timeline).trim()},
      ${cleanMessage}, ${String(source).trim()}, 'new', ${clientIp}
    )
    RETURNING id, name, email, created_at;
  `;

  const lead = rows[0];
  return {
    success: true,
    leadId: lead.id,
    createdAt: lead.created_at,
    message: 'Your inquiry has been submitted. A senior engineer will review it and contact you within one business day.',
  };
}

/**
 * Handle fetching leads for protected admin dashboard
 */
export async function handleGetLeads(authHeader, { status, search, limit = 100 } = {}) {
  if (!verifyAdmin(authHeader)) {
    const err = new Error('Unauthorized access. Invalid or missing admin credentials.');
    err.status = 401;
    throw err;
  }

  const sql = getSql();
  let query = 'SELECT * FROM ethix_leads';
  const conditions = [];

  if (status && status !== 'all') {
    conditions.push(`status = '${status.replace(/'/g, "''")}'`);
  }

  if (search && search.trim()) {
    const s = search.trim().replace(/'/g, "''");
    conditions.push(`(name ILIKE '%${s}%' OR email ILIKE '%${s}%' OR company ILIKE '%${s}%' OR service ILIKE '%${s}%')`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ` ORDER BY created_at DESC LIMIT ${Math.min(Number(limit) || 100, 200)};`;

  const res = await sql.query(query);
  const rows = res.rows || res;
  return { success: true, leads: rows, count: rows.length };
}

/**
 * Handle updating a lead's status or notes
 */
export async function handleUpdateLead(id, body, authHeader) {
  if (!verifyAdmin(authHeader)) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const leadId = Number(id);
  if (!leadId) throw new Error('Invalid lead ID');

  const { status, notes } = body;
  const sql = getSql();

  if (status) {
    const validStatuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'archived'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
  }

  const rows = await sql`
    UPDATE ethix_leads
    SET 
      status = COALESCE(${status || null}, status),
      notes = COALESCE(${notes !== undefined ? notes : null}, notes)
    WHERE id = ${leadId}
    RETURNING *;
  `;

  if (!rows || rows.length === 0) {
    throw new Error('Lead not found');
  }

  return { success: true, lead: rows[0] };
}

/**
 * Handle deleting / archiving a lead
 */
export async function handleDeleteLead(id, authHeader) {
  if (!verifyAdmin(authHeader)) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const leadId = Number(id);
  if (!leadId) throw new Error('Invalid lead ID');

  const sql = getSql();
  await sql`DELETE FROM ethix_leads WHERE id = ${leadId};`;
  return { success: true, message: `Lead #${leadId} deleted.` };
}

/**
 * Get aggregate statistics for admin KPI widgets
 */
export async function handleGetStats(authHeader) {
  if (!verifyAdmin(authHeader)) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const sql = getSql();
  const totalRows = await sql`SELECT COUNT(*)::int as count FROM ethix_leads;`;
  const newRows = await sql`SELECT COUNT(*)::int as count FROM ethix_leads WHERE status = 'new';`;
  const qualifiedRows = await sql`SELECT COUNT(*)::int as count FROM ethix_leads WHERE status = 'qualified';`;
  const wonRows = await sql`SELECT COUNT(*)::int as count FROM ethix_leads WHERE status = 'won';`;
  const servicesRows = await sql`
    SELECT service, COUNT(*)::int as count 
    FROM ethix_leads 
    GROUP BY service 
    ORDER BY count DESC 
    LIMIT 5;
  `;

  return {
    success: true,
    stats: {
      total: totalRows[0]?.count || 0,
      new: newRows[0]?.count || 0,
      qualified: qualifiedRows[0]?.count || 0,
      won: wonRows[0]?.count || 0,
      topServices: servicesRows,
    },
  };
}
