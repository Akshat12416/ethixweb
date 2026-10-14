import React, { useState, useEffect, useCallback } from 'react';
import {
  Lock,
  Search,
  RefreshCw,
  Download,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Trash2,
  X,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import '../styles/landing.css';

const STATUS_COLORS = {
  new: 'bg-[#1c1c1c] text-[#ffffff]',
  contacted: 'bg-[#e2e8f0] text-[#1e293b]',
  qualified: 'bg-[#dbeafe] text-[#1e40af]',
  proposal: 'bg-[#fef3c7] text-[#92400e]',
  won: 'bg-[#dcfce7] text-[#166534]',
  archived: 'bg-[#f1f5f9] text-[#64748b]',
};

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('ethix_admin_token') || '');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const fetchLeadsAndStats = useCallback(async (authToken) => {
    if (!authToken) return;
    setIsLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch('/api/leads', {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch('/api/leads/stats', {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (!leadsRes.ok || !statsRes.ok) {
        if (leadsRes.status === 401) {
          sessionStorage.removeItem('ethix_admin_token');
          setToken('');
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error('Failed to load leads data');
      }

      const leadsData = await leadsRes.json();
      const statsData = await statsRes.json();

      setLeads(leadsData.leads || []);
      setStats(statsData.stats || null);
    } catch (err) {
      console.error(err);
      setLoginError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchLeadsAndStats(token);
    }
  }, [token, fetchLeadsAndStats]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Incorrect passcode');
      }

      sessionStorage.setItem('ethix_admin_token', data.token);
      setToken(data.token);
      showToast('Welcome to Ethixweb Operations Hub');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ethix_admin_token');
    setToken('');
    setLeads([]);
    setStats(null);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update status');

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
      showToast(`Lead #${leadId} moved to ${newStatus.toUpperCase()}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes: adminNotes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save notes');

      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: adminNotes } : l))
      );
      setSelectedLead((prev) => ({ ...prev, notes: adminNotes }));
      showToast('Internal note saved successfully');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm(`Are you sure you want to permanently delete lead #${leadId}?`)) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete lead');
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
      showToast(`Lead #${leadId} deleted`);
    } catch (err) {
      alert(err.message);
    }
  };

  const exportToCSV = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Message'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.created_at).toISOString(),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ethixweb_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      lead.name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.company?.toLowerCase().includes(query) ||
      lead.service?.toLowerCase().includes(query) ||
      lead.message?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <TopBar />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[100000] bg-[#1c1c1c] text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-3 animate-fade-in border border-white/20">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LOGIN VIEW (IF NOT AUTHENTICATED) */}
      {!token ? (
        <div className="pt-32 pb-24 px-6 max-w-md mx-auto flex flex-col items-center justify-center min-h-[75vh]">
          <div className="w-full bg-[#f4f4f2] border border-[#1c1c1c]/15 rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] text-white flex items-center justify-center mb-6">
              <Lock size={22} strokeWidth={2} />
            </div>

            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777777] block mb-1">
                Restricted Access
              </span>
              <h1 className="font-display text-2xl font-bold text-[#1c1c1c]">
                Ethixweb Operations Hub
              </h1>
              <p className="text-xs text-[#666666] mt-1">
                Enter your administrative key to view and manage client inquiries and pipeline.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: ethix2026)"
                  className="w-full px-4 py-3 bg-white border border-[#1c1c1c]/20 rounded-xl text-sm focus:outline-none focus:border-[#1c1c1c] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-[#1c1c1c] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                {isLoggingIn ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#1c1c1c]/10 text-center">
              <button
                type="button"
                onClick={() => {
                  setPasscode('ethix2026');
                }}
                className="text-xs text-[#777777] hover:text-[#1c1c1c] underline underline-offset-4"
              >
                Click to prefill demo passcode (ethix2026)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* AUTHENTICATED DASHBOARD VIEW */
        <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-20">
          {/* TOP OPERATIONS BAR */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#1c1c1c]/15">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                  Neon PostgreSQL Active · Global Hub
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Client Inquiries &amp; Pipeline
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchLeadsAndStats(token)}
                disabled={isLoading}
                className="px-4 py-2.5 bg-white border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-xs font-medium rounded-full flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                <span>Sync</span>
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2.5 bg-white border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-xs font-medium rounded-full flex items-center gap-2 transition-colors shadow-sm"
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-[#1c1c1c] hover:bg-black text-white text-xs font-medium rounded-full transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* KPI STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/10 rounded-2xl p-5 shadow-sm">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider block mb-1">
                Total Inquiries
              </span>
              <div className="font-display text-3xl font-bold text-[#1c1c1c]">
                {stats?.total ?? leads.length}
              </div>
              <span className="text-[11px] text-[#666666] mt-1 block">Live in PostgreSQL</span>
            </div>

            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/10 rounded-2xl p-5 shadow-sm">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider block mb-1">
                New Actionable
              </span>
              <div className="font-display text-3xl font-bold text-amber-600">
                {stats?.new ?? leads.filter((l) => l.status === 'new').length}
              </div>
              <span className="text-[11px] text-[#666666] mt-1 block">Pending initial review</span>
            </div>

            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/10 rounded-2xl p-5 shadow-sm">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider block mb-1">
                Qualified Leads
              </span>
              <div className="font-display text-3xl font-bold text-blue-600">
                {stats?.qualified ?? leads.filter((l) => l.status === 'qualified').length}
              </div>
              <span className="text-[11px] text-[#666666] mt-1 block">Scope &amp; architecture call</span>
            </div>

            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/10 rounded-2xl p-5 shadow-sm">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider block mb-1">
                Won / Deployed
              </span>
              <div className="font-display text-3xl font-bold text-emerald-600">
                {stats?.won ?? leads.filter((l) => l.status === 'won').length}
              </div>
              <span className="text-[11px] text-[#666666] mt-1 block">Active operations team</span>
            </div>
          </div>

          {/* FILTER & SEARCH STRIP */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {['all', 'new', 'contacted', 'qualified', 'proposal', 'won', 'archived'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors shrink-0 ${
                    statusFilter === st
                      ? 'bg-[#1c1c1c] text-white'
                      : 'bg-[#f4f4f2] text-[#666666] hover:text-[#1c1c1c]'
                  }`}
                >
                  {st}
                  {st === 'new' && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded-full">
                      {leads.filter((l) => l.status === 'new').length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]"
              />
              <input
                type="text"
                placeholder="Search leads, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#1c1c1c]/15 rounded-full text-xs focus:outline-none focus:border-[#1c1c1c] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#1c1c1c]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* LEADS DATA TABLE */}
          <div className="bg-[#f4f4f2] border border-[#1c1c1c]/15 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#e9e9e6] border-b border-[#1c1c1c]/10 text-[#666666] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Budget / Timeline</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1c1c]/10">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#777777]">
                        {isLoading ? 'Syncing leads from database...' : 'No inquiries match this criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setAdminNotes(lead.notes || '');
                        }}
                        className="hover:bg-white/80 cursor-pointer transition-colors group"
                      >
                        <td className="py-4 px-4 font-mono text-[#777777]">#{lead.id}</td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-[#1c1c1c]">{lead.name}</div>
                          <div className="text-[11px] text-[#666666] flex items-center gap-1.5 mt-0.5">
                            <Mail size={11} />
                            <span>{lead.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-[#1c1c1c]">
                            {lead.company || '—'}
                          </div>
                          {lead.phone && (
                            <div className="text-[11px] text-[#777777] flex items-center gap-1 mt-0.5">
                              <Phone size={11} />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2.5 py-1 bg-white border border-[#1c1c1c]/10 rounded-md font-mono text-[11px]">
                            {lead.service || 'General'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[#555555]">
                          <div>{lead.budget || 'Flexible'}</div>
                          <div className="text-[10px] text-[#888888]">{lead.timeline || 'Open'}</div>
                        </td>
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status || 'new'}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/10 cursor-pointer focus:outline-none ${
                              STATUS_COLORS[lead.status] || STATUS_COLORS.new
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="proposal">Proposal</option>
                            <option value="won">Won</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-[#999999] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete lead"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* LEAD INSPECTION MODAL / DRAWER */}
          {selectedLead && (
            <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-[#f4f4f2] border border-[#1c1c1c]/20 w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto animate-fade-in relative">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-[#1c1c1c]/15">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#777777]">
                        LEAD #{selectedLead.id}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          STATUS_COLORS[selectedLead.status] || STATUS_COLORS.new
                        }`}
                      >
                        {selectedLead.status}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[#1c1c1c]">
                      {selectedLead.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1.5 text-[#777777] hover:text-[#1c1c1c] rounded-full hover:bg-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 my-6 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#1c1c1c]/10">
                    <span className="text-[#777777] block text-[10px] uppercase font-mono mb-1">
                      Email
                    </span>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="font-medium text-[#1c1c1c] hover:underline flex items-center gap-1.5"
                    >
                      <Mail size={13} />
                      <span>{selectedLead.email}</span>
                    </a>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#1c1c1c]/10">
                    <span className="text-[#777777] block text-[10px] uppercase font-mono mb-1">
                      Phone Number
                    </span>
                    {selectedLead.phone ? (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="font-medium text-[#1c1c1c] hover:underline flex items-center gap-1.5"
                      >
                        <Phone size={13} />
                        <span>{selectedLead.phone}</span>
                      </a>
                    ) : (
                      <span className="text-[#888888]">Not provided</span>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#1c1c1c]/10">
                    <span className="text-[#777777] block text-[10px] uppercase font-mono mb-1">
                      Company / Organization
                    </span>
                    <span className="font-medium text-[#1c1c1c] flex items-center gap-1.5">
                      <Building2 size={13} />
                      <span>{selectedLead.company || 'Direct Founder / Individual'}</span>
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#1c1c1c]/10">
                    <span className="text-[#777777] block text-[10px] uppercase font-mono mb-1">
                      Requested Service
                    </span>
                    <span className="font-medium text-[#1c1c1c]">
                      {selectedLead.service || 'General Digital Operations'}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#1c1c1c]/10">
                    <span className="text-[#777777] block text-[10px] uppercase font-mono mb-1">
                      Budget &amp; Timeline
                    </span>
                    <span className="font-medium text-[#1c1c1c]">
                      {selectedLead.budget || 'Flexible'} · {selectedLead.timeline || 'Standard'}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#1c1c1c]/10">
                    <span className="text-[#777777] block text-[10px] uppercase font-mono mb-1">
                      Received Timestamp
                    </span>
                    <span className="font-mono text-[#555555]">
                      {new Date(selectedLead.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] block mb-2">
                    Inquiry Narrative / Requirements
                  </span>
                  <div className="p-4 bg-white border border-[#1c1c1c]/15 rounded-xl text-sm leading-relaxed text-[#2c2c2c] whitespace-pre-wrap font-sans">
                    {selectedLead.message || 'No description provided.'}
                  </div>
                </div>

                {/* Admin Internal Notes */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] block mb-2">
                    Internal Engineering Notes (Saved to Database)
                  </span>
                  <textarea
                    rows={3}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add operational notes, kickoff meeting dates, technical requirements..."
                    className="w-full p-3 bg-white border border-[#1c1c1c]/20 rounded-xl text-xs focus:outline-none focus:border-[#1c1c1c] transition-colors"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-4 py-2 bg-[#1c1c1c] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSavingNotes ? 'Saving...' : 'Update Notes'}
                    </button>
                  </div>
                </div>

                {/* Status Switcher & Close */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1c1c1c]/15">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#666666]">Change status:</span>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                      className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 bg-white border border-[#1c1c1c]/20 rounded-lg"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="won">Won</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-5 py-2 bg-white border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-xs font-medium rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
