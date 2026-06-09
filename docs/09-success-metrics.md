# Success Metrics — FinOps Intelligence AI

## Framework Overview

Success metrics are organized into three tiers: Product Metrics (user engagement and feature adoption), AI Quality Metrics (accuracy and reliability of AI outputs), and Business Impact Metrics (financial outcomes for customers).

---

## Product Metrics

| Metric | Definition | Target | Measurement | Owner | Cadence |
|---|---|---|---|---|---|
| Daily Active Users (DAU) | Unique users who log in per day | 80% of licensed users weekly | Auth logs | Product | Weekly |
| CFO Brief Open Rate | % of generated CFO briefs opened by CFO | > 90% | Email/in-app analytics | Product | Weekly |
| Recommendation Approval Rate | % of AI recommendations approved (vs. rejected) | > 60% | Action audit log | Product | Weekly |
| Time to First Action | Minutes from anomaly detection to first human action | < 30 minutes | Timestamp delta | Product | Weekly |
| Report Generation Usage | Reports generated per user per week | > 2 per Finance Ops user | Usage log | Product | Weekly |
| Feature Adoption — Budget Risk | % of active users visiting Budget Risk page weekly | > 80% | Page analytics | Product | Weekly |
| Feature Adoption — Anomaly Detection | % of active users visiting Anomalies page weekly | > 70% | Page analytics | Product | Weekly |
| Settings Customization Rate | % of users who have modified at least one AI setting | > 50% at 30 days | Settings log | Product | Monthly |
| User Retention (Day 30) | % of users still active at Day 30 post-activation | > 75% | Auth logs | Product | Monthly |
| NPS Score | Net Promoter Score from quarterly survey | > 50 | Survey | Product | Quarterly |

---

## AI Quality Metrics

| Metric | Definition | Target | Measurement | Owner | Cadence |
|---|---|---|---|---|---|
| Budget Forecast Accuracy | |Predicted month-end spend - Actual| / Actual | < 10% error at 2-week horizon | Month-end reconciliation | Engineering | Monthly |
| Anomaly True Positive Rate | % of flagged anomalies confirmed as real issues after investigation | > 75% | Post-investigation tagging | AI/Engineering | Monthly |
| Anomaly False Positive Rate | % of flagged anomalies that were false alarms | < 20% | Post-investigation tagging | AI/Engineering | Monthly |
| Confidence Calibration | Correlation between stated confidence and actual accuracy | r > 0.8 | Statistical analysis | AI/Engineering | Quarterly |
| Agent Uptime | % of time agents are running and producing insights | > 99.5% | Agent monitoring | Engineering | Weekly |
| Insight Latency | Time from data ingestion to insight surfaced | < 15 minutes | Pipeline monitoring | Engineering | Daily |
| CFO Brief Quality Score | Finance Ops Manager rating of brief accuracy (1-5) | > 4.2 average | In-app rating | Product | Weekly |
| Recommendation Impact Accuracy | Estimated financial impact vs. measured outcome | < 20% variance | Post-action tracking | AI/Product | Monthly |
| Override Rate | % of AI recommendations that are edited or rejected | < 30% | Action audit log | AI/Product | Weekly |
| Model Improvement Rate | Quarter-over-quarter improvement in forecast accuracy | > 5% per quarter | Accuracy tracking | AI/Engineering | Quarterly |

---

## Business Impact Metrics

| Metric | Definition | Target | Benchmark | Owner | Cadence |
|---|---|---|---|---|---|
| Financial Risk Detected | Total dollar value of budget risk, margin risk, and vendor risk surfaced by AI | > $500K per customer per quarter | Pre-FinOps AI baseline | Sales/Customer Success | Quarterly |
| Savings Realized | Measured financial savings from actions taken based on AI recommendations | > $200K per customer per quarter | Customer self-reported | Customer Success | Quarterly |
| Budget Variance Reduction | Reduction in actual vs. forecast variance at month-end | > 30% reduction vs. baseline | Customer's prior 4 quarters | Finance Ops | Monthly |
| Time Savings — Analyst | Hours saved per week per Finance Ops analyst on variance investigation | > 10 hours/week | Pre-onboarding baseline survey | Customer Success | Monthly |
| Vendor Negotiation Wins | % of AI-flagged vendor renewals where customer achieved below-list pricing | > 60% | Customer-reported outcomes | Customer Success | Quarterly |
| Gross Margin Recovery | Margin improvement on accounts where AI-recommended repricing was executed | > 5% margin improvement | Pre-action margin baseline | Customer Success | Quarterly |
| CFO Decision Speed | Time from financial risk emergence to CFO awareness and action | < 24 hours (vs. weeks before) | Customer baseline | Customer Success | Monthly |
| Product ROI | Customer-reported ROI (savings / FinOps AI subscription cost) | > 10x | Industry benchmark: 5x | Sales | Quarterly |
