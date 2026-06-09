# Recommendation Engine — FinOps Intelligence AI

## Overview

The recommendation engine takes validated, high-confidence insights from all four operating agents and converts them into structured, actionable recommendations with estimated financial impact, confidence score, urgency level, and suggested owner.

## Recommendation Generation Pipeline

```
Agent Insight (validated, confidence ≥75%)
    ↓
Insight Classification (what type of recommendation?)
    ↓
Impact Estimation (how much is at stake?)
    ↓
Owner Assignment (who should act?)
    ↓
Urgency Scoring (how time-sensitive?)
    ↓
Duplicate Check (is this already an open recommendation?)
    ↓
Recommendation Created
    ↓
Surfaced to Finance Ops Manager / CFO queue
```

## Recommendation Categories

| Category | Source Agent | Typical Actions |
|---|---|---|
| Cloud | Budget Risk, Spend Anomaly | Workload optimization, reserved capacity, right-sizing |
| SaaS | Spend Anomaly | License reduction, tool consolidation, contract renegotiation |
| Vendor | Vendor Optimization | Renewal negotiation, alternative evaluation, usage adjustment |
| Margin | Margin Intelligence | Account repricing, delivery model change, cost reduction |
| Marketing | Spend Anomaly | Campaign pause, channel reallocation, CAC optimization |
| Operations | Budget Risk, Margin | Process standardization, contractor management, efficiency |

## Impact Estimation Logic

For each recommendation type:

**Cloud Optimization:**
- Reserved capacity savings = current_on_demand_cost × 0.22 (AWS average reserved discount)
- Workload tagging impact = estimated_untagged_spend × attribution_correction_factor
- Right-sizing impact = analyze instance utilization (requires cloud API data)

**SaaS Consolidation:**
- Annual waste = lower_cost_tool_spend × 12
- Seat reduction = inactive_seats × per_seat_annual_cost

**Vendor Renegotiation:**
- Risk impact = contract_value × expected_increase_pct
- Opportunity = contract_value × (negotiation_success_rate × average_discount)

**Margin Recovery:**
- Account repricing impact = cost_to_serve_overrun × estimated_recovery_pct
- Delivery model change = implementation_overrun × standardization_savings_pct

## Owner Assignment Logic

| Signal Type | Recommended Owner |
|---|---|
| Cloud compute spike | Engineering Ops |
| SaaS license waste | RevOps |
| Vendor renewal | Procurement |
| Customer margin compression | Customer Success |
| Paid campaign overspend | Marketing Ops |
| Implementation overrun | Customer Success |
| Duplicate tools across departments | Finance Ops |
| Budget category overrun | Department Budget Owner |

## Urgency Scoring

```
base_urgency = classify(financial_impact, days_to_action)
time_sensitivity = 
  if vendor_renewal < 30 days: Critical
  if vendor_renewal 30-60 days: High
  if month_end < 7 days AND budget_overrun: High
  else: based on financial_impact

final_urgency = max(base_urgency, time_sensitivity)
```

## Recommendation Lifecycle

1. **Open** — Created by agent, pending Finance Ops review
2. **Needs review** — Flagged for CFO-level review (impact >$200K or urgency = High)
3. **In progress** — Jira task created or action assigned
4. **Done** — Action completed, outcome tracked

Recommendations auto-expire after 90 days without status update (downgraded to archive).

## Deduplication

Before creating a new recommendation:
1. Check for existing open recommendations with same category + same owner + same period
2. If match found: update estimated impact and timestamp rather than creating duplicate
3. Log as "recommendation updated" in audit trail
