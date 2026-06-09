# FinOps Intelligence AI

**FinOps Intelligence AI is an AI-native finance operations intelligence platform that forecasts budget risk, detects operational spend anomalies, and surfaces margin efficiency opportunities before they become board-level financial issues.**

GitHub: https://github.com/siddharthjaiswal1993-spec/finops-intelligence-ai

---

## The Problem

Finance teams discover budget overruns, vendor pricing surprises, and margin compression during month-end close or quarterly reviews — when it is already too late to act. Traditional dashboards show what happened. They do not predict what is about to happen or tell you what to do about it.

The result: reactive decisions, emergency vendor negotiations, and CFO conversations that should have happened three weeks earlier.

---

## The Solution

FinOps Intelligence AI continuously monitors budget burn rates, vendor spend patterns, cloud costs, and account-level cost-to-serve — and surfaces early warnings, root cause analysis, and prioritized action recommendations before issues escalate.

**Core workflow:** DETECT → DIAGNOSE → RECOMMEND → APPROVE → ACT → VERIFY

Five specialized AI agents run continuously:
- **Budget Risk Agent** — forecasts which departments will exceed budget and when
- **Spend Anomaly Agent** — detects unusual vendor, cloud, SaaS, and operational spend patterns
- **Margin Intelligence Agent** — connects ARR, cost-to-serve, and support load to customer profitability
- **Vendor Optimization Agent** — tracks renewals, usage health, pricing changes, and consolidation opportunities
- **Executive Briefing Agent** — synthesizes signals into CFO-ready summaries and action plans

Every insight includes: detected signal, root cause, financial impact, business impact, confidence score, recommended action, suggested owner, and urgency level.

All AI-recommended actions require human approval before execution.

---

## Target Users

| Persona | Primary Use Case |
|---|---|
| CFO | Morning risk brief, approve major actions |
| VP Finance / FP&A Lead | Budget risk forecasting, variance analysis |
| Finance Ops Manager | Anomaly triage, vendor renewals, report generation |
| Engineering Ops | Cloud cost optimization, workload review |
| CS Ops | Customer margin analysis, support cost review |
| RevOps | License utilization, SaaS consolidation |
| Procurement | Vendor renegotiation, renewal preparation |
| Department Budget Owners | Personal budget status and variance explanation |

---

## Core Capabilities

1. **Budget Risk Forecasting** — AI-powered month-end projections by department with confidence intervals and variance explanations
2. **Spend Anomaly Detection** — Continuous monitoring for cloud spikes, duplicate SaaS tools, vendor pricing changes, and unapproved spend patterns
3. **Margin Intelligence** — Account-level profitability analysis connecting ARR, cost-to-serve, cloud usage, and support load
4. **Vendor Optimization** — Renewal tracking, usage health scoring, consolidation opportunity detection, and negotiation timing
5. **Executive Reporting** — One-click CFO brief, board summary, and department budget owner report generation with human approval gates

---

## Demo Scenario: Cloud Spend Spike Creates Margin Risk

**Step 1 — Anomaly Detected:** Spend Anomaly Agent flags AWS compute up 38% week-over-week, $210K above forecast.

**Step 2 — Budget Risk Linked:** Budget Risk Agent forecasts Engineering will exceed monthly budget by $310K at current burn rate. Confidence: 92%.

**Step 3 — Root Cause Identified:** Margin Intelligence Agent cross-references cloud usage with Salesforce account data — 3 enterprise customers (AlphaCorp, BluePeak, Orbital) account for 67% of the spike. These accounts are already margin-negative.

**Step 4 — Recommendations Generated:** Three prioritized actions: workload optimization ($140K), account repricing ($310K quarterly margin recovery), reserved capacity evaluation (20-25% cost reduction).

**Step 5 — CFO Summary Drafted:** Executive Briefing Agent generates a CFO Weekly Risk Brief summarizing $620K at risk. Awaits CFO approval before distribution.

**Step 6 — Actions Dispatched:** CFO approves. Jira task created for Engineering Ops, Slack alert sent to #finance-ops.

Total risk identified: $620K. Total workflow time: minutes.

---

## Repo Structure

```
finops-intelligence-ai/
├── src/                          # React/TypeScript frontend
│   ├── components/
│   │   ├── layout/               # AppShell, Sidebar, TopBar
│   │   └── common/               # RiskBadge, MetricCard, AgentStatusCard
│   ├── data/                     # TypeScript mock data files
│   ├── pages/                    # 11 page components
│   └── types/                    # TypeScript types
├── data/                         # JSON data files (portfolio reference)
├── docs/                         # Product documentation (12 docs)
├── product/                      # PRD, MVP scope, user stories, features
├── ai/                           # AI agent specs and logic docs
├── design/                       # IA, UI requirements, design system
└── architecture/                 # System overview, integrations, data flow
```

---

## How to Run Locally

```bash
git clone https://github.com/siddharthjaiswal1993-spec/finops-intelligence-ai
cd finops-intelligence-ai
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Pages

| Page | Route | Description |
|---|---|---|
| Command Center | /dashboard | AI executive brief, department risk table, live alert feed, 5 AI agents |
| Budget Risk | /budget-risk | Department forecasts, bar chart, AI explanation, action cards |
| Spend Anomalies | /anomalies | Anomaly table + detail panel with root cause and actions |
| Margin Intelligence | /margin | Account profitability table, margin opportunity cards |
| Vendor Insights | /vendors | Vendor grid, renewal risk table, urgent warnings |
| Departments | /departments | Department selector, spend breakdown pie chart |
| AI Recommendations | /recommendations | Prioritized action cards with Jira/Slack integration |
| Reports | /reports | CFO brief, board summary, budget report templates |
| Integrations | /integrations | 19 integrations across ERP, CRM, cloud, collaboration |
| Demo Scenario | /demo | Animated 6-step walkthrough of full AI workflow |
| Settings | /settings | AI config, finance controls, security, notifications |

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts (BarChart, PieChart)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Design:** Dark enterprise SaaS — slate-950/900 palette, blue accents

---

## Future Roadmap

**Phase 1 — Portfolio MVP (current):** All mock data screens, full design system, demo scenario

**Phase 2 — Real Data MVP:** CSV upload, ERP connectors, cloud billing import, rule-based anomaly detection, basic ML forecasting

**Phase 3 — AI Workflow Product:** LLM-generated explanations, agentic recommendations, Slack/Jira integration, human approval queue, CFO report generation, audit logs

**Phase 4 — Enterprise Platform:** RBAC, multi-BU support, real-time integrations, model eval framework, board reporting, SOC 2 compliance

---

Built with Claude Code · Portfolio project demonstrating AI-native product thinking for finance operations

---

## Previous Vite Template Notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
