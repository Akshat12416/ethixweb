# Ethixweb — Digital Operations & Web Engineering

> **"We run the tech. You run the business."**  
> A senior-led digital operations agency delivering headless cloud platforms, autonomous AI booking agents, and direct-revenue systems for US businesses and founders.

---

## 📖 Design Rationale

### 1. What Makes It India-Specific

#### The Dual-Shore Superpower: Our 24-Hour Velocity Engine
Traditional offshore outsourcing has a reputation for endless email relays, junior delegation, and lack of accountability. Ethixweb deliberately inverts this model:
- **Follow-the-Sun Engineering**: The 12.5-hour time difference between Seattle, WA (Pacific Time) and Bangalore, Karnataka (India Standard Time) is transformed into an around-the-clock delivery cycle.
  - **09:00 – 17:00 PST**: US clients collaborate directly with executive leadership in Washington for kickoff calls, strategic roadmapping, and UX reviews.
  - **17:00 – 18:00 PST**: Asynchronous daily handoff with recorded Loom walkthroughs and GitHub issues.
  - **18:00 – 04:00 PST (Bangalore Day Shift)**: Bangalore’s senior engineering squad enters deep focus mode—writing clean React/TypeScript code, training AI voice models, running automated tests, and deploying to staging.
  - **08:30 PST**: US founders wake up to shipped pull requests, staging links, and documented progress ready for production.
- **Bangalore Tech Hub Engineering Depth**: Rather than subcontracting to low-cost commodity BPO shops, Ethixweb maintains its own core senior engineering hub in Bangalore—the Silicon Valley of Asia. Every engineer has a minimum of 6+ years of production experience building high-scale distributed systems.
- **Live Dual-Timezone Telemetry**: The site interface embeds active real-time clocks for both **Seattle HQ (PST/PDT)** and **Bangalore Hub (IST)** in the global footer and on the About page. This transparency highlights global operational strength rather than hiding the engineering origin.
- **US Legal Sovereignty & Accountability**: All contracts, master service agreements (MSAs), NDAs, intellectual property assignments, and payments are executed under US corporate law through **Ethixweb USA LLC** (registered in Wyoming, with operations in Kent, WA). Clients gain the velocity of a global 24/7 team with complete US legal protection.

---

### 2. What Was Improved Over the Current / Original Site

1. **Typographic Hierarchy & Editorial Taste**:
   - Replaced generic sans-serif fonts with an editorial typographic system combining **Roobert** (for clean geometric UI, micro-labels, and tabular data) and **Roxborough CF** italic serif (for high-status accentuation of core concepts and emotional weight).
   - Designed on a refined `#ebebeb` stone paper background with `#1c1c1c` carbon typography, crisp `#ffffff` cards, and selective `#c0272d` crimson accents.

2. **3D Interactive Spiderweb Network**:
   - Replaced the clunky retro computer model with an interactive vector spiderweb network that dynamically responds to cursor physics and serves as a visual metaphor for connected digital operations.

3. **Preloader & Cinematic Shutter Page Transitions**:
   - Designed a blank canvas preloader where the 3D web is centered and drops smoothly into the hero tier as bottom copy blocks emerge from behind it.
   - Built full-height expanding shutter transitions in Harmond font that collapse vertically inward into the middle nav row, mirroring the exact portfolio transition choreography.

4. **Live Neon PostgreSQL Lead Pipeline**:
   - Replaced broken or simulated static forms with a real, audited PostgreSQL database on Neon (`ethix_leads`).
   - Form submissions capture name, email, phone, company, service requested, budget tier, timeline, message, IP address, and status.

5. **Three-Tier Spam Protection**:
   - **Honeypot Trap**: Invisible field (`company_website_url`) that silent-traps automated bots without interrupting real users.
   - **Human Velocity Verification**: Measures keystroke and form completion timing (`_ts`); submittals completed under 1.5 seconds are rejected as automated bots.
   - **IP Rate Limiting**: Enforces strict burst caps per client IP to eliminate flooding attacks.

6. **Protected Admin Management Portal (`/admin`)**:
   - Passcode-authenticated administrative dashboard (`ethix2026`).
   - Live KPI widgets: Total Leads, New Inquiries, Qualified Deals, Closed/Won Volume.
   - Status workflow: `New` ➔ `Contacted` ➔ `Qualified` ➔ `Proposal` ➔ `Won` ➔ `Archived`.
   - Lead detail inspection modal with internal notes editor and timestamp history.
   - One-click CSV data export for external CRM analysis.

7. **Comprehensive Multi-Page Design System**:
   - Unified Home, Services (full 22-service operating catalog), About (India story & dual-shore superpower), and Contact (live enquiry form) pages with consistent perimeter navigation, smooth scrolling (Lenis), and zero layout shifts.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 8 |
| **Routing** | React Router v7 |
| **Styling** | Vanilla CSS + Tailwind CSS v4 |
| **Motion & Physics** | GSAP 3 (ScrollTrigger, Timelines) + Motion |
| **Smooth Scrolling** | Lenis |
| **Typography** | Roobert (Geometric Sans), Roxborough CF (Editorial Serif), Harmond (Display) |
| **Icons** | Lucide React |
| **Database** | Neon Serverless PostgreSQL |
| **Backend API** | Node.js Vite Server Middleware |

---

## 🗄️ Database Schema (`ethix_leads`)

```sql
CREATE TABLE IF NOT EXISTS ethix_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(255),
  budget VARCHAR(100),
  timeline VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT DEFAULT '',
  ip_address VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ethix_leads_created_at ON ethix_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ethix_leads_status ON ethix_leads(status);
```

---

## 🔐 Admin Portal Credentials

- **URL**: `http://localhost:5173/admin`
- **Passcode**: `ethix2026`
- **Features**: Real-time lead management, KPI cards, status transitions, notes editor, CSV export.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter
```bash
npm run lint
```

---

## 📍 Legal & Corporate Entity

- **Entity**: Ethixweb USA LLC
- **Registration**: Wyoming, United States
- **Operations Base**: Kent, WA & Bangalore, India
- **Contact**: `info@ethixweb.com`
- **Booking**: [Calendly 30-Min Strategy Call](https://calendly.com/ethixweb-agency/30min?month=2026-06)
