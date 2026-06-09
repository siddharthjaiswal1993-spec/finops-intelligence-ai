# Data Flow — FinOps Intelligence AI

## Primary Data Flows

### Flow 1: Budget Risk Detection

```
NetSuite GL actuals (daily)
    → Ingestion Layer normalizes to department_spend table
    → Budget Risk Agent runs (every 15 min)
    → Queries: currentSpend, approvedBudget, historicalSpend
    → Calculates: burnRate, forecastedSpend, variance, riskLevel, confidence
    → Writes insight to Insight Store
    → Executive Briefing Agent reads from Insight Store
    → If riskLevel = High/Critical: adds to CFO brief draft
    → Finance Ops Manager reviews alert in Command Center
    → CFO approves recommended action
    → Jira task created (with approval)
```

### Flow 2: Spend Anomaly Detection

```
Ramp/Brex transactions (real-time)
    + AWS billing (15 min)
    + AP invoice data (daily)
    → Ingestion Layer normalizes to unified spend table
    → Spend Anomaly Agent runs (every 15 min)
    → Calculates: rolling_baseline, stddev, current_spend
    → Detects deviations > 2σ
    → Performs root cause pre-analysis (cross-reference with account tags)
    → Creates anomaly record with severity, confidence, root cause
    → Notifies Finance Ops Manager in real-time alert feed
    → Finance Ops Manager triages: Open → Investigating
    → AI generates recommendation with estimated impact
    → Recommendation surfaced with action buttons
```

### Flow 3: Margin Intelligence Signal

```
Salesforce CRM (1 hour)
    + AWS usage tags (15 min)
    + Support ticket data (daily)
    + Implementation hours (daily)
    → Margin Intelligence Agent aggregates per account
    → Calculates: cost_to_serve, gross_margin, margin_delta_vs_portfolio
    → Flags accounts with margin > 10% below average
    → Cross-references: does this account appear in active anomalies?
    → Generates account-level recommendation
    → Shares high-risk accounts with Executive Briefing Agent
    → Finance Ops and CS Ops see margin alerts in Margin Intelligence page
```

### Flow 4: CFO Brief Generation

```
Budget Risk Agent output (latest insights)
    + Spend Anomaly Agent output (top 3 by impact)
    + Margin Intelligence Agent output (top 2 risks)
    + Vendor Optimization Agent output (renewals <60 days)
    → Executive Briefing Agent aggregates
    → Ranks insights by (impact × urgency × confidence)
    → Generates executive summary (3-5 sentences)
    → Assembles sections: Budget Risks, Anomalies, Margin, Vendors
    → Adds recommended actions with owners and deadlines
    → Creates draft brief in Reports page
    → Finance Ops Manager can edit
    → CFO approves → brief distributed
    → Audit log records: draft_created, approved_by, approved_at, distributed_at
```

---

## Data Sensitivity Classification

| Data Type | Sensitivity | Access |
|---|---|---|
| Department budget amounts | Confidential | Finance team, CFO, VP Finance |
| Account ARR and margin | Highly Confidential | Finance team, CS Ops, CFO |
| Vendor contract values | Confidential | Finance team, Procurement, CFO |
| Individual anomaly details | Internal | Finance Ops, relevant department |
| CFO brief content | Highly Confidential | CFO, VP Finance, approved recipients |
| Audit logs | Internal | Finance Ops, Controller, Compliance |
| Agent performance metrics | Internal | Finance Ops, Product |

---

## Data Retention

| Data Category | Retention Period | Archival Policy |
|---|---|---|
| Transaction-level spend data | 3 years | Archive to cold storage after 1 year |
| Budget forecasts | 5 years | Retained for audit and benchmarking |
| Anomaly records | 2 years | Retained for model training |
| AI insights | 1 year | Rolled up to summary after 90 days |
| Audit logs | 7 years | Required for financial compliance |
| CFO briefs | 5 years | Retained as board-level records |
