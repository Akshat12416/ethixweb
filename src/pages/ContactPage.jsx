import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Mail,
  MapPin,
  Sparkles,
  Calendar,
  AlertCircle,
  Send,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import MiddleNav from '../components/MiddleNav';
import PageCurtain from '../components/PageCurtain';
import { useLanguage, BUDGET_RUPEES_OPTIONS } from '../context/LanguageContext';
import '../styles/landing.css';

const SERVICES_OPTIONS = [
  { en: 'AI Booking & Voice Agents', hi: 'एआई बुकिंग व वॉइस एजेंट्स' },
  { en: 'Headless Web & Cloud Platform', hi: 'हेडलेस वेब व क्लाउड प्लेटफॉर्म' },
  { en: 'Performance SEO & Direct Revenue', hi: 'परफॉरमेंस एसईओ व रेवेन्यू' },
  { en: 'High-Ticket CRM & Workflows', hi: 'हाई-टिकट सीआरएम वर्कफ़्लो' },
  { en: 'Full-Stack Digital Operations', hi: 'फुल-स्टैक डिजिटल ऑपरेशंस' },
];

const TIMELINE_OPTIONS = [
  { en: 'Immediate (2–4 weeks)', hi: 'तत्काल (२–४ सप्ताह)' },
  { en: 'Within 6–8 weeks', hi: '६–८ सप्ताह में' },
  { en: 'Next Quarter', hi: 'अगली तिमाही' },
  { en: 'Exploratory', hi: 'प्रारंभिक चर्चा' },
];

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Booking & Voice Agents',
    budget: '₹5L – ₹15L',
    timeline: 'Immediate (2–4 weeks)',
    message: '',
    company_website_url: '',
  });

  const [formStartTime, setFormStartTime] = useState(() => Date.now());
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid work email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please provide a brief description of your requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        source: 'contact_page',
        _ts: formStartTime,
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry. Please try again.');
      }

      setSubmittedLead({
        id: data.leadId,
        name: formData.name,
        service: formData.service,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white flex flex-col justify-between">
      <PageCurtain />
      <TopBar />
      <MiddleNav />

      <main className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-28 md:pt-36 pb-24">
        {/* HEADER BADGE */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            Live Engineering Intake · Sub-Hour SLA
          </span>
        </div>

        {/* SECTION TITLE */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1c1c] leading-[1.05]">
            Start a project with a senior team.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4a4a50] leading-relaxed font-sans">
            Three details is all we need to get started: your name, phone number, and project goals.
            You will speak directly with the senior engineers designing your system—never an account manager.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: DIRECT VALUE PROPOSITION & CHANNELS */}
          <div className="lg:col-span-5 space-y-8">
            {/* SLA & PROMISES CARD */}
            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777777] block">
                Ethixweb Delivery Guarantee
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1c1c1c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#1c1c1c]">Sub-Hour Response Time</h3>
                    <p className="text-xs text-[#666666] mt-0.5">
                      Inquiries during business hours are reviewed by a lead engineer in under 60 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1c1c1c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#1c1c1c]">Fixed-Scope Pricing Upfront</h3>
                    <p className="text-xs text-[#666666] mt-0.5">
                      No surprise billable hours or open retainers. We commit to deliverables in writing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1c1c1c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#1c1c1c]">Dual-Shore Velocity</h3>
                    <p className="text-xs text-[#666666] mt-0.5">
                      US legal accountability and client leadership backed by top 1% Indian senior systems engineers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DIRECT CHANNELS */}
            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/15 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs text-xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#777777] block">
                Direct Contact Lines
              </span>

              <div className="space-y-3">
                <a
                  href="mailto:info@ethixweb.com"
                  className="flex items-center justify-between p-3 bg-white border border-[#1c1c1c]/10 rounded-xl hover:border-[#1c1c1c] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#666666] group-hover:text-[#1c1c1c]" />
                    <span className="font-medium text-[#1c1c1c]">info@ethixweb.com</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[#888888] group-hover:text-[#1c1c1c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://calendly.com/ethixweb-agency/30min?month=2026-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white border border-[#1c1c1c]/10 rounded-xl hover:border-[#1c1c1c] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#666666] group-hover:text-[#1c1c1c]" />
                    <div>
                      <span className="font-medium text-[#1c1c1c] block">Book 30-Min Kickoff Call</span>
                      <span className="text-[10px] text-[#777777]">Fast-track direct calendar sync</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-[#888888] group-hover:text-[#1c1c1c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="p-3 bg-white border border-[#1c1c1c]/10 rounded-xl flex items-start gap-3">
                  <MapPin size={16} className="text-[#666666] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1c1c1c] block">Kent, Washington, USA</span>
                    <span className="text-[11px] text-[#777777]">
                      Ethixweb USA LLC · Dual-Shore Lab in Bangalore, India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WORKING ENQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="bg-[#f4f4f2] border border-[#1c1c1c]/15 rounded-2xl p-6 sm:p-10 shadow-sm relative">
              {submittedLead ? (
                /* SUCCESS RECEIPT STATE */
                <div className="py-10 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                      Inquiry Saved · Reference #{submittedLead.id}
                    </span>
                    <h2 className="font-display text-3xl font-bold text-[#1c1c1c]">
                      Thank you, {submittedLead.name}.
                    </h2>
                    <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                      Your requirements for{' '}
                      <strong className="text-[#1c1c1c]">{submittedLead.service}</strong> have been
                      logged directly into our engineering pipeline. A senior lead will review your
                      stack and call you within one business day.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="https://calendly.com/ethixweb-agency/30min?month=2026-06"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#1c1c1c] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>Fast-Track onto Calendar</span>
                      <ArrowUpRight size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedLead(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          service: 'AI Booking & Voice Agents',
                          budget: '$10k – $25k',
                          timeline: 'Immediate (2–4 weeks)',
                          message: '',
                          company_website_url: '',
                        });
                        setFormStartTime(Date.now());
                      }}
                      className="px-6 py-3 bg-white border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-xs font-medium rounded-full transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* LIVE FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from real users, caught by spambots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_website_url">Leave this empty</label>
                    <input
                      type="text"
                      id="company_website_url"
                      name="company_website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company_website_url}
                      onChange={(e) =>
                        setFormData({ ...formData, company_website_url: e.target.value })
                      }
                    />
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* NAME & EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        {t('contactLabelName', 'Your Full Name')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t('contactPlaceholderName', 'e.g. Alex Morgan / राहुल शर्मा')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-[#1c1c1c]/20 focus:border-[#1c1c1c]'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-600 mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        {t('contactLabelEmail', 'Work Email')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder={t('contactPlaceholderEmail', 'alex@company.com')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-[#1c1c1c]/20 focus:border-[#1c1c1c]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* PHONE & COMPANY */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        {t('contactLabelPhone', 'Phone Number')}
                      </label>
                      <input
                        type="tel"
                        placeholder={t('contactPlaceholderPhone', '+91 98765 43210')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1c1c1c]/20 rounded-xl text-sm focus:outline-none focus:border-[#1c1c1c] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        {t('contactLabelCompany', 'Company or Current Website')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('contactPlaceholderCompany', 'Acme Corp / acme.com')}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1c1c1c]/20 rounded-xl text-sm focus:outline-none focus:border-[#1c1c1c] transition-colors"
                      />
                    </div>
                  </div>

                  {/* SERVICE CATEGORY SELECTOR */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                      {t('contactLabelService', 'Primary Service Focus')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_OPTIONS.map((srv) => (
                        <button
                          key={srv.en}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.en })}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                            formData.service === srv.en
                              ? 'bg-[#1c1c1c] text-white shadow-xs'
                              : 'bg-white border border-[#1c1c1c]/15 text-[#444444] hover:border-[#1c1c1c]'
                          }`}
                        >
                          {lang === 'hi' ? srv.hi : srv.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BUDGET & TIMELINE SELECTORS (RUPEE PRICING) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        {t('contactLabelBudget', 'Estimated Budget (INR ₹)')}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1c1c1c]/20 rounded-xl text-xs focus:outline-none focus:border-[#1c1c1c] transition-colors font-medium text-[#1c1c1c]"
                      >
                        {BUDGET_RUPEES_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {lang === 'hi' ? opt.labelHi : opt.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        {t('contactLabelTimeline', 'Target Timeline')}
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1c1c1c]/20 rounded-xl text-xs focus:outline-none focus:border-[#1c1c1c] transition-colors"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt.en} value={opt.en}>
                            {lang === 'hi' ? opt.hi : opt.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* PROJECT MESSAGE */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                      {t('contactLabelMessage', 'Project Goals & Current Bottlenecks')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t('contactPlaceholderMessage', 'Tell us what you are trying to build, automate, or fix...')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-colors font-sans ${
                        errors.message
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-[#1c1c1c]/20 focus:border-[#1c1c1c]'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#c0272d] hover:bg-[#a01f25] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t('contactSubmittingBtn', 'Logging to Neon PostgreSQL Database...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contactSubmitBtn', 'Submit Project Inquiry')}</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-[#777777] text-center mt-3">
                      🔒 {t('spamShieldNotice', 'Protected by 3-tier spam shield & Neon PostgreSQL. Zero spam guarantee.')}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
