# Information Architecture — FinOps Intelligence AI

## Navigation Structure

```
FinOps Intelligence AI
├── Command Center (/dashboard)         — Primary landing page
│   ├── AI Executive Brief
│   ├── Department Risk Table
│   ├── Live Alert Feed
│   └── AI Agent Status Panel
│
├── Budget Risk (/budget-risk)          — Forecasting module
│   ├── Summary Metrics
│   ├── Department Bar Chart
│   ├── AI Forecast Explanation
│   ├── Forecast Table
│   └── Recommended Actions
│
├── Spend Anomalies (/anomalies)        — Anomaly detection
│   ├── Summary Metrics
│   ├── Anomaly Table
│   └── Anomaly Detail Panel
│
├── Margin Intelligence (/margin)       — Profitability analysis
│   ├── Portfolio Metrics
│   ├── Account Profitability Table
│   ├── AI Insight
│   └── Margin Opportunities
│
├── Vendor Insights (/vendors)          — Vendor management
│   ├── Renewal Alert Card
│   ├── Vendor Grid
│   └── Renewal Risk Table
│
├── Departments (/departments)          — Department drill-down
│   ├── Department Selector
│   ├── Department Metrics
│   ├── Spend Breakdown Pie Chart
│   └── AI Department Summary
│
├── AI Recommendations (/recommendations) — Action management
│   ├── Summary + Action Buttons
│   ├── Filter Bar
│   └── Recommendation Cards
│
├── Reports (/reports)                  — Report generation
│   ├── Template Gallery
│   └── Report Preview Panel
│
├── Integrations (/integrations)        — Data connections
│   ├── Connection Stats
│   ├── Integration Groups by Category
│   └── Sync Activity Feed
│
├── Demo Scenario (/demo)               — Product walkthrough
│   ├── Context Card
│   ├── Step Cards
│   └── Completion Panel
│
└── Settings (/settings)               — Configuration
    ├── AI Configuration
    ├── Finance Controls
    ├── Security
    └── Notifications
```

## Page Hierarchy

**Tier 1 (Daily users):** Command Center → AI Recommendations → Spend Anomalies  
**Tier 2 (Weekly users):** Budget Risk → Margin Intelligence → Vendor Insights  
**Tier 3 (Monthly users):** Reports → Departments → Integrations  
**Supporting:** Demo Scenario → Settings

## Content Principles

1. **Insights before data** — Show the AI-generated summary at the top, detailed data below
2. **Financial impact first** — Every row and card leads with dollar amount, not category name
3. **Action-oriented** — Every insight ends with a recommended action and an action button
4. **Risk-coded** — Color coding: red = High/Critical, amber = Medium, green = Low
5. **Confidence visible** — Confidence score is always displayed alongside AI outputs
