# AI Agent Architecture — FinOps Intelligence AI

## Overview

FinOps Intelligence AI uses five specialized AI agents that run continuously in the background, each focused on a specific domain of finance operations risk. Agents share a unified data context and can cross-reference each other's outputs to generate higher-quality, multi-signal insights.

The core agent design principle: **every agent observes, diagnoses, recommends, and escalates — but never acts without human approval.**

---

## Agent 1: Budget Risk Agent

**Purpose:** Forecast which departments will exceed their approved budget before month-end close.

**Trigger Conditions:**
- Runs every 15 minutes during business hours
- Triggered immediately when a department's burn rate crosses 85% of monthly budget
- Triggered when a week-over-week spend increase exceeds 20%

**Input Data Sources:**
- ERP actuals (daily or weekly refresh): department spend by category, period-to-date
- Approved budget by department and category
- Historical spend patterns (prior 6 months, same period)
- Headcount data (for people cost modeling)

**Reasoning Logic:**
1. Calculate current burn rate: (spend to date) / (days elapsed in period)
2. Project month-end spend: burn rate × total days in period
3. Apply seasonality adjustment: compare to same period in prior quarters
4. Apply anomaly adjustment: if active anomalies exist for the department, add anomaly impact to projection
5. Calculate variance: projected spend vs. approved budget
6. Score risk level: Critical (>25% over), High (>10% over), Medium (1-10% over), Low (under budget)
7. Identify primary driver: largest category contributor to variance
8. Generate confidence score based on data freshness and historical forecast accuracy

**Output Format:**
```
{
  department: string,
  monthlyBudget: number,
  currentSpend: number,
  forecastedSpend: number,
  variance: number,
  riskLevel: 'High' | 'Medium' | 'Low' | 'Critical',
  primaryDriver: string,
  aiConfidence: number,
  reasoning: string
}
```

**Escalation Logic:**
- High/Critical risk → generate recommendation + notify Finance Ops Manager
- High/Critical risk with >$100K impact → include in CFO brief

**Human Approval Required:** Yes — for any action item created from a budget risk finding.

---

## Agent 2: Spend Anomaly Agent

**Purpose:** Detect unusual spend patterns across vendors, tools, cloud infrastructure, and operational workflows.

**Trigger Conditions:**
- Runs every 15 minutes
- Triggered immediately when any vendor spend increases >25% week-over-week
- Triggered when new SaaS tool purchase detected from corporate card data

**Input Data Sources:**
- Corporate card transactions (daily refresh from Ramp/Brex)
- Vendor invoices and contract data
- Cloud billing data (AWS, GCP, Azure — 15-minute granularity)
- Historical vendor spend baselines (rolling 13-week average)
- SaaS tool registry

**Detection Methods:**
1. **Statistical deviation:** Flag any spend category >2 standard deviations above 13-week rolling average
2. **Peer benchmarking:** Compare tool usage costs across departments for overlap detection
3. **Pattern matching:** Detect new vendors, new cost categories, or unusual transaction patterns
4. **License waste detection:** Compare active users vs. licensed seats for connected SaaS tools

**Classification:**
- Cloud spike: >20% increase in cloud platform costs without proportional ARR/usage growth
- Duplicate SaaS: Two or more tools with >70% functional overlap detected across departments
- Unapproved spend: New vendor purchase without approved purchase order
- Vendor anomaly: >15% increase in vendor monthly spend without contract amendment
- License waste: <75% utilization rate on licensed SaaS seats

**Confidence Scoring:**
- 90-100%: Pattern consistent with historical data; strong correlation to known cause
- 80-89%: Good signal; one alternative explanation possible
- 70-79%: Moderate signal; needs human investigation to confirm root cause
- <70%: Low confidence; present as "worth reviewing" not "anomaly confirmed"

---

## Agent 3: Margin Intelligence Agent

**Purpose:** Connect ARR, cost-to-serve, cloud infrastructure usage, and support operations to produce account-level profitability analysis.

**Input Data Sources:**
- CRM data: Account ARR, contract value, account tier (from Salesforce)
- Cloud billing data: Usage tagged by account (from AWS)
- Support ticket data: Volume and resolution time by account (from Zendesk/SupportFlow)
- Implementation data: Contractor hours by account (from Jira)
- Customer success data: Check-in frequency, custom work hours

**Reasoning Logic:**
1. Calculate cost-to-serve per account: cloud costs + support hours × loaded rate + implementation overruns
2. Calculate gross margin: (ARR - cost-to-serve) / ARR
3. Compare to portfolio average gross margin
4. Flag accounts with gross margin >10% below portfolio average as margin risk
5. Cross-reference with Budget Risk Agent: accounts with high support cost → investigate CS budget overrun
6. Generate account-specific recommendation based on primary cost driver

**Key Insight Patterns:**
- Account with high ARR but high custom workflow cost → reprice or productize
- Account with high support ticket volume → self-serve capability gap or product quality issue
- Account with high implementation cost → standardize onboarding or scope creep
- Account with low cost-to-serve and high ARR → expansion candidate

---

## Agent 4: Vendor Optimization Agent

**Purpose:** Track vendor renewals, usage health, pricing signals, and consolidation opportunities to maximize negotiation leverage.

**Input Data Sources:**
- Vendor contract registry: renewal dates, current pricing, committed volumes
- Vendor usage data (where available from integration)
- Corporate card and AP data: monthly spend per vendor
- Market intelligence: industry benchmark pricing (static data)

**Key Monitoring Functions:**
1. **Renewal countdown:** Alert at 90, 60, 30, and 14 days before renewal
2. **Usage health scoring:** High (>85% utilization), Medium (60-85%), Low (<60%)
3. **Price increase signal:** Flag vendors with known pricing increases or renewal negotiation history
4. **Consolidation detection:** Identify pairs of tools with >70% overlap across departments

**Negotiation Window Logic:**
- 60+ days to renewal + low usage → high leverage window
- 30-60 days to renewal + high usage → standard renewal, lock multi-year if favorable
- <30 days to renewal → urgent; escalate immediately

---

## Agent 5: Executive Briefing Agent

**Purpose:** Synthesize outputs from all four operating agents into CFO-ready summaries, board updates, and department action plans.

**Trigger Conditions:**
- Automatic weekly brief: Monday 8am
- Triggered when any agent generates a High or Critical severity insight
- Triggered manually by CFO or Finance Ops Manager

**Reasoning Logic:**
1. Query all agent outputs from past 7 days
2. Rank insights by financial impact × urgency × confidence
3. Select top 5-7 insights for inclusion in brief
4. Group into sections: Budget Risks, Spend Anomalies, Margin Alerts, Vendor Renewals
5. Generate executive summary: 3-5 sentences covering total risk, total opportunity, and top action
6. Draft recommended actions with owners and deadlines
7. Send draft to CFO for approval — no distribution without explicit approval

**Human Approval Model:**
- Agent generates draft brief
- Finance Ops Manager reviews and can edit
- CFO approves before distribution
- System logs approval timestamp and approver identity
- Distribution triggered only after approval

---

## Agent Interaction Model

Agents are not isolated — they share context through a unified insight store:

```
Budget Risk Agent ──┐
Spend Anomaly Agent ─┤── Insight Store ──── Executive Briefing Agent
Margin Intelligence ─┤       │
Vendor Optimization ─┘       └── Cross-reference engine
```

**Cross-reference examples:**
- Spend Anomaly Agent flags AWS compute spike → Margin Intelligence Agent checks which accounts have untagged compute → Budget Risk Agent updates Engineering forecast → Executive Briefing Agent includes in CFO brief
- Vendor Optimization Agent flags DataStack renewal → Spend Anomaly Agent checks if DataStack usage justifies renewal → Budget Risk Agent adds renewal cost to Engineering forecast

This cross-agent reasoning is what makes FinOps Intelligence AI qualitatively different from siloed monitoring tools.
