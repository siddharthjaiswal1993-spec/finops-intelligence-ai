# System Architecture Overview — FinOps Intelligence AI

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATA SOURCES                                    │
│  NetSuite/ERP  │  AWS/Cloud  │  Salesforce  │  Ramp/Brex  │  Jira/Slack │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        INGESTION LAYER                                    │
│  Connectors  │  CSV Upload  │  Webhook Receivers  │  Data Validation     │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      UNIFIED DATA STORE                                   │
│  Normalized spend data  │  Budget data  │  Account data  │  Vendor data  │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        AI AGENT LAYER                                     │
│  Budget Risk Agent  │  Spend Anomaly Agent  │  Margin Intelligence Agent │
│  Vendor Optimization Agent  │  Executive Briefing Agent                   │
│                    ──── Shared Insight Store ────                         │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    RECOMMENDATION ENGINE                                   │
│  Impact Estimation  │  Owner Assignment  │  Urgency Scoring               │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   ACTION ORCHESTRATION                                     │
│  Human Approval Queue  │  Jira Task Creator  │  Slack Alert Dispatcher   │
│  CFO Report Generator  │  Audit Logger                                    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                                    │
│  React/TypeScript Frontend  │  Command Center  │  Page Components         │
│  Dark Enterprise SaaS UI  │  Recharts Visualizations                      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Layer Descriptions

### Data Sources
External systems that provide raw financial, operational, and revenue data. In Phase 1 (portfolio), this is mock data. In Phase 2+, this becomes real API integrations and CSV uploads.

### Ingestion Layer
Handles data collection, normalization, and validation. Responsible for data freshness tracking and error handling when sources are unavailable. Each connector runs on a defined schedule (15-minute to daily, depending on source).

### Unified Data Store
A normalized, denormalized-for-reads data store that makes cross-source analysis efficient. Key design principle: agents query a unified view, not individual source systems. This enables cross-agent insight generation.

**Tables (Phase 2):**
- `department_spend` (daily actuals by department and category)
- `budget` (approved budget by department and period)
- `vendor_contracts` (vendor metadata, contract values, renewal dates)
- `vendor_spend` (monthly spend by vendor)
- `accounts` (CRM account data: ARR, tier, status)
- `cloud_cost` (cloud billing by service, tag, account)
- `card_transactions` (corporate card transactions with merchant, category, department)

### AI Agent Layer
Five specialized agents that run on defined schedules, share context through the Insight Store, and produce structured insights conforming to the 10-field AIInsight schema.

**Shared Insight Store:** A central cache of recent agent outputs that enables cross-agent correlation. When the Spend Anomaly Agent flags an AWS spike, the Margin Intelligence Agent can query this store and immediately check which accounts are affected.

### Recommendation Engine
Converts agent insights into actionable recommendations with estimated impact, urgency, owner assignment, and status tracking.

### Action Orchestration
Manages the human approval workflow and executes approved actions. All external actions (Jira, Slack, email) require human approval before execution. The orchestration layer maintains an approval queue, records audit logs, and handles action failure/retry.

### Presentation Layer
React/TypeScript frontend serving all UI. In Phase 1, this is a static Vite app with mock data. In Phase 2+, it connects to a backend API.

## Technology Stack (Current Phase)

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Build | Vite 8 |

## Technology Stack (Phase 2+)

| Layer | Technology |
|---|---|
| Backend API | Node.js / FastAPI |
| Database | PostgreSQL (transactional) + ClickHouse (analytical) |
| Queue | Redis / BullMQ for agent scheduling |
| LLM | Anthropic Claude via API |
| Auth | Auth0 or Clerk |
| Infrastructure | AWS (ECS, RDS, ElastiCache) |
| Monitoring | Datadog |
