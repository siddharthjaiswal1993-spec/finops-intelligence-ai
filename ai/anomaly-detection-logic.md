# Anomaly Detection Logic — FinOps Intelligence AI

## Signal Types

| Signal Type | Description | Primary Data Source |
|---|---|---|
| Cloud cost spike | Cloud platform spend >20% WoW without usage/ARR growth | AWS/GCP/Azure billing |
| Vendor spend spike | Any vendor spend >15% above 13-week rolling average | AP invoices, corporate cards |
| Duplicate SaaS tools | Two or more tools with >70% functional overlap in same category | SaaS registry, card transactions |
| License waste | SaaS tool utilization <75% within 90 days of renewal | Vendor usage API / manual |
| Unapproved spend | New vendor purchase without approved PO in procurement system | Corporate card transactions |
| Vendor pricing increase | Renewal quote or invoice >5% above current contract price | AP invoices, vendor contracts |
| Budget category spike | Any budget category >2σ above rolling baseline | ERP actuals |

---

## Detection Methods

### Method 1: Statistical Deviation

Used for: Vendor spend spikes, cloud cost spikes, budget category spikes

```
baseline_mean = rolling_13_week_average(category_spend)
baseline_std = rolling_13_week_stdev(category_spend)
threshold = baseline_mean + 2 × baseline_std
if current_spend > threshold: flag as anomaly
```

**Anomaly severity based on standard deviations:**
- 2.0-2.5σ: Medium severity
- 2.5-3.0σ: High severity
- >3.0σ: Critical severity

### Method 2: Peer Benchmarking (Duplicate SaaS Detection)

Used for: Identifying overlapping tools across departments

```
1. Categorize each SaaS tool by primary function (analytics, CRM, communication, etc.)
2. For each category, identify all departments with a purchased tool
3. If 2+ departments have tools in same functional category:
   - Calculate functional overlap score (0-100%)
   - If overlap score > 70%: flag as duplicate
   - Estimate annual waste = sum of lower-cost tool monthly spend × 12
```

### Method 3: Historical Pattern Matching

Used for: Seasonal patterns, planned event detection

```
For each spend category:
1. Compare current week to same week in prior year
2. If current spend is >15% above same period prior year AND
   no planned event (campaign, conference) explains the change:
   flag as potential anomaly
3. Cross-reference with budget owner annotations to filter false positives
```

---

## Classification Logic

After detection, anomalies are classified by:

**Category:** Cloud | SaaS | Services | Travel | Vendor | Marketing | Operations | Personnel

**Severity:**
- Critical: >$500K impact or >50% above baseline
- High: $100K-$500K impact or 25-50% above baseline
- Medium: $10K-$100K impact or 10-25% above baseline
- Low: <$10K impact or <10% above baseline

**Root Cause Attribution:**
1. Match anomaly signal to known patterns (vendor renewal, product launch, seasonal event)
2. Cross-reference with other active anomalies for compounding signals
3. Query Margin Intelligence Agent for account attribution
4. Generate plain-English explanation

---

## Severity Scoring

```
base_severity = categorize(amount_impact, percent_change)
cross_agent_multiplier = 1.2 if linked to margin risk, else 1.0
urgency_multiplier = 1.3 if linked to vendor renewal <45 days, else 1.0
final_severity_score = base_score × cross_agent_multiplier × urgency_multiplier
```

---

## False Positive Reduction

**Contextual filters applied before flagging:**
- Check if spend increase is associated with approved budget amendment
- Check if spend increase aligns with approved vendor contract expansion
- Check if seasonal pattern explains the increase (Q2 field marketing, Q4 year-end)
- Check if department head has annotated a planned expense event

**Minimum threshold for surfacing:**
- Anomaly confidence must be ≥70%
- Financial impact must be ≥$10,000
- Pattern must not match an active "expected" annotation from a user

---

## Feedback Loop

When a user marks an anomaly as "Reviewed — Expected" or rejects an AI recommendation with the reason "False positive":
1. The rejection is logged with the anomaly characteristics
2. The detection model notes this pattern for future reference
3. If the same pattern repeats 3+ times and is rejected each time, the threshold for that category is raised by 0.5σ for that customer
