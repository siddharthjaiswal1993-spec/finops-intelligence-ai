# Integration Architecture — FinOps Intelligence AI

## Integration Categories

### ERP / Finance (Source of budget and actuals data)
- **NetSuite** — GL actuals, department actuals, budget lines, chart of accounts
- **QuickBooks** — SMB accounting, expense categorization
- **SAP** — Enterprise ERP, financial controlling
- **Workday Financials** — Financial management and workforce planning

### CRM / Revenue (Source of ARR and account data)
- **Salesforce** — Account ARR, contract value, account tier, renewal dates
- **HubSpot** — Revenue pipeline, deal data

### Spend Management (Source of real-time transaction data)
- **Ramp** — Corporate card transactions with real-time categorization
- **Brex** — Corporate cards and expense management
- **Airbase** — Procurement workflows and spend approval

### Cloud / Infrastructure (Source of infrastructure cost data)
- **AWS Cost Explorer** — EC2, RDS, S3, Lambda, and all service costs with tagging
- **Azure Cost Management** — Azure resource costs
- **Google Cloud Billing** — GCP compute and storage costs
- **Snowflake** — Data warehouse query costs and compute billing

### Collaboration (Target for alert delivery)
- **Slack** — Alert channel routing, approval workflows
- **Google Workspace** — Calendar integration, email delivery
- **Microsoft Teams** — Teams channel alerts

### Project Management (Target for action dispatch)
- **Jira** — Task creation with priority, assignment, and project routing
- **Asana** — Task management
- **Linear** — Engineering project tracking

---

## Integration Patterns

### Pattern 1: Read Integration (Source Systems)
Used for ERP, CRM, cloud billing, and spend management.

```
Scheduler (15min/1hr/daily)
    → Connector (OAuth 2.0 or API key)
    → Data fetch (incremental or full refresh)
    → Schema normalization
    → Data validation (type checking, null handling, range validation)
    → Write to Unified Data Store
    → Update last_sync timestamp
    → Trigger agent refresh if material change detected
```

**Error handling:** If connector fails, mark integration as "Sync Error," retain last successful data, alert Finance Ops Manager.

### Pattern 2: Write Integration (Action Targets)
Used for Slack, Jira, email. Always requires human approval before execution.

```
Agent generates recommendation
    → Human reviews and approves
    → Action dispatch validated (credentials, target channel/project exists)
    → API call to target system
    → Success confirmation logged
    → Audit record created with approval timestamp, approver, and execution result
```

**Error handling:** If dispatch fails, retry 3x with exponential backoff, then surface error to Finance Ops Manager with manual fallback instructions.

---

## Phase 1 (Portfolio) vs. Phase 2+ (Production)

| Integration | Phase 1 | Phase 2+ |
|---|---|---|
| All data sources | Mock data in TypeScript files | Real API connectors |
| Slack | Button UI only, no actual send | Real Slack app with OAuth |
| Jira | Button UI only, no actual create | Real Jira OAuth integration |
| PDF export | Button UI only | PDF generation (Puppeteer or pdfkit) |
| Authentication | None required | Auth0 / Clerk |

---

## Data Freshness SLAs

| Source | Target Refresh Rate | Maximum Acceptable Staleness |
|---|---|---|
| AWS billing | 15 minutes | 1 hour |
| Corporate cards | 15 minutes (real-time) | 2 hours |
| ERP actuals | Daily (overnight) | 36 hours |
| Salesforce CRM | 1 hour | 4 hours |
| Snowflake | 30 minutes | 2 hours |
| Vendor contracts | Manual update | 7 days |
