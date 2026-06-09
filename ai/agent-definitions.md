# AI Agent Definitions — FinOps Intelligence AI

## Agent Specification Format

Each agent is defined by: purpose, trigger conditions, input schema, reasoning steps, output schema, confidence calculation, escalation conditions, and human interaction points.

---

## Budget Risk Agent

**ID:** budget-risk  
**Purpose:** Forecast which departments will exceed their approved budget and by how much.

**Trigger Conditions:**
- Scheduled: every 15 minutes during business hours (8am-8pm local)
- Event: department spend increases 20%+ week-over-week
- Event: department reaches 85% of monthly budget utilization

**Input Schema:**
```
{
  departments: [{id, name, budget, currentSpend, historicalSpend[]}],
  currentDate: Date,
  periodDays: number,
  daysElapsed: number
}
```

**Reasoning Steps:**
1. For each department, calculate daily burn rate = currentSpend / daysElapsed
2. Project month-end spend = burnRate × periodDays
3. Apply seasonality factor from historical same-period data (± 10-15%)
4. Add anomaly impact from active high-severity anomalies in that department
5. Calculate variance = projectedSpend - approvedBudget
6. Assign risk level: Critical (>25% over), High (>10%), Medium (1-10%), Low (≤0%)
7. Identify primary driver = largest category contributor to variance
8. Calculate confidence based on data freshness and historical accuracy

**Output Schema:**
```
{
  department: string,
  monthlyBudget: number,
  currentSpend: number,
  forecastedSpend: number,
  variance: number,
  riskLevel: RiskLevel,
  primaryDriver: string,
  aiConfidence: number, // 0-100
  generatedAt: Date
}
```

**Confidence Calculation:**
- Start at 90%
- -5% if data is >24 hours old
- -10% if < 7 days of data in current period
- -5% for each active high-severity anomaly in department
- +5% if historical forecast accuracy for this department is >90%

**Escalation:**
- High/Critical AND impact >$50K → include in CFO brief queue
- High/Critical → notify Finance Ops Manager via platform alert

---

## Spend Anomaly Agent

**ID:** spend-anomaly  
**Purpose:** Detect unusual spend patterns across all categories.

**Detection Logic:**

*Statistical deviation:*
- Calculate rolling 13-week average and standard deviation per category
- Flag categories with spend > mean + 2σ

*Duplicate SaaS detection:*
- Map all SaaS tools to functional categories
- Flag any two tools in same category purchased by different departments

*Vendor anomaly:*
- Compare current month vs. 3-month average per vendor
- Flag increase >15% without contract amendment

*License waste:*
- Compare active users to licensed seats
- Flag utilization < 75% within 90 days of renewal

**Confidence Calculation:**
- Statistical anomaly with clear baseline: 85-95%
- Duplicate SaaS with category match: 80-88%
- Vendor anomaly with historical data: 75-90%
- License waste with usage data: 80-92%

---

## Margin Intelligence Agent

**ID:** margin-intel  
**Purpose:** Connect revenue, cost, and operational data to produce account-level profitability analysis.

**Key Calculations:**

*Cost-to-serve:*
- Cloud infrastructure cost (tagged by account from AWS)
- Support operations cost (ticket volume × average cost per ticket)
- Implementation cost (contractor hours × loaded rate)
- Customer success labor (check-in hours × loaded rate)

*Gross margin:*
- (ARR - annualized cost-to-serve) / ARR × 100

*Margin risk classification:*
- High: gross margin >10% below portfolio average
- Medium: 5-10% below portfolio average
- Low: within 5% of portfolio average or above average

**Cross-agent integration:**
- Receives cloud spike signals from Spend Anomaly Agent
- Cross-references with account tagging data to attribute costs to specific accounts
- Shares high-margin-risk accounts with Executive Briefing Agent

---

## Vendor Optimization Agent

**ID:** vendor-opt  
**Purpose:** Maximize negotiation leverage and minimize vendor cost through proactive tracking.

**Renewal Window Logic:**
```
> 90 days: Monitor
60-90 days: Prepare (gather usage data, identify alternatives)
30-60 days: Act (initiate renegotiation or renewal decision)
< 30 days: Urgent (escalate immediately, may need to accept list price)
```

**Usage Health Score:**
- High: >85% of licensed seats/capacity in use
- Medium: 60-85% utilization
- Low: <60% utilization

**Negotiation Priority Score:**
- High: Low usage + upcoming renewal + expected price increase
- Medium: Medium usage + upcoming renewal
- Low: High usage + distant renewal

---

## Executive Briefing Agent

**ID:** exec-brief  
**Purpose:** Synthesize all agent outputs into CFO-ready summaries.

**Synthesis Algorithm:**
1. Query all agent outputs with timestamp > last brief date
2. Rank insights: (financial_impact × urgency_score × confidence) / 1000
3. Select top 7 insights for inclusion
4. Group by section: Budget Risks, Spend Anomalies, Margin Alerts, Vendor Renewals
5. Generate executive summary (3-5 sentences, plain English)
6. Append recommended actions (top 3, sorted by urgency)
7. Add total risk figure (sum of all High/Critical financial impacts)
8. Create draft, assign to CFO review queue

**Human Approval Required:** Yes — draft sent to CFO review queue; not distributed until approved.
