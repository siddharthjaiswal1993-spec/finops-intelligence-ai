# MVP Scope — FinOps Intelligence AI

## What Is In MVP (Portfolio Prototype)

### Core Pages (11 total)
- Command Center with AI executive brief, department risk table, live alerts, 5 AI agent panels
- Budget Risk with bar chart, department forecast table, AI explanation, recommended actions
- Spend Anomalies with anomaly table, detail panel, status workflow, action buttons
- Margin Intelligence with account profitability table, margin opportunity cards, AI insight
- Vendor Insights with vendor grid, renewal risk table, urgency warnings
- Department View with selector tabs, pie chart, spend breakdown, AI summary
- AI Recommendations with prioritized card layout, filter, action buttons
- Reports with 6 templates, CFO brief preview, mock export
- Integrations with 19 integrations, sync activity feed
- Demo Scenario with animated 6-step walkthrough
- Settings with 4 configuration sections

### Data Layer
- 11 TypeScript mock data files: departments, vendors, accounts, anomalies, recommendations, budgetForecasts, marginInsights, agents, integrations, demoScenario, reports
- 11 JSON data files (portfolio reference versions)

### UI Components
- AppShell, Sidebar, TopBar layout components
- RiskBadge, MetricCard, AgentStatusCard common components
- Consistent dark enterprise SaaS design: slate-950/900 backgrounds, blue accents

### Visualizations
- Recharts BarChart: Budget Risk page (7 departments, 3 bars each)
- Recharts PieChart: Department View page (spend breakdown)

### Documentation
- 12 docs files (product vision through interview talking points)
- 5 product files (PRD, MVP scope, user stories, feature inventory, release plan)
- 5 AI files (agent definitions, insight format, forecasting logic, anomaly detection, recommendation engine)
- 4 architecture files (system overview, integration architecture, data flow, security)

---

## What Is Explicitly Out of MVP

| Feature | Reason for Exclusion |
|---|---|
| Real data connections (ERP, cloud, CRM) | Requires infrastructure, auth, and data pipeline work beyond prototype scope |
| User authentication and session management | Not needed for portfolio demonstration |
| Live Jira task creation | Requires Jira OAuth and API integration |
| Live Slack alert sending | Requires Slack app installation and OAuth |
| Real PDF export | Requires PDF generation library and backend |
| Database and persistent state | All state is ephemeral mock data |
| LLM-generated explanations | Requires LLM API integration and eval framework |
| Mobile responsive layout | Portfolio is desktop-first; mobile optimization is Phase 2 |
| Multi-user and permissions | Single-user demo; RBAC is Phase 4 |
| Automated agent scheduling | Agents are visualized but not running real jobs |

**Rationale:** The MVP scope is designed to maximize product vision demonstration at minimal implementation complexity. Every excluded feature is clearly scoped to a future phase, not abandoned.

---

## Success Criteria for MVP

1. All 11 pages load cleanly with no TypeScript errors
2. Build completes with `npm run build` in under 60 seconds
3. Charts render correctly on Budget Risk and Department View pages
4. Demo Scenario step-through works with 1.5-second delays between steps
5. Navigation between all pages works correctly
6. Dark theme is consistent across all pages
7. All mock data is visible and correct in tables and cards
8. All documentation files are complete and substantive

---

## Definition of Done

- TypeScript build passes with 0 errors
- All 11 pages render with real mock data (no placeholder text)
- Both Recharts visualizations render correctly
- Demo Scenario "Run Demo" button works
- All 28 documentation files are written and substantive
- README is complete with local setup instructions
- GitHub repository is public and accessible
- `npm install && npm run dev` launches the app at localhost:5173
