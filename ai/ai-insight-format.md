# AI Insight Format — FinOps Intelligence AI

## Standard Insight Schema

Every insight surfaced to users must conform to this 10-field schema. No insight is displayed without all 10 fields populated.

```typescript
interface AIInsight {
  signal_detected: string;          // What data pattern was observed
  root_cause: string;               // Most likely explanation for the signal
  financial_impact: {
    amount: number;                  // Dollar impact
    period: string;                  // 'this month' | 'annually' | 'quarterly'
    direction: 'risk' | 'opportunity'; // Is this a cost or a saving?
  };
  business_impact: string;          // Plain English business consequence
  confidence_score: number;         // 0-100 integer
  recommended_action: string;       // Specific step to take
  suggested_owner: string;          // Role that should act (e.g., 'Engineering Ops')
  urgency_level: 'High' | 'Medium' | 'Low';
  human_approval_required: boolean; // Whether action requires approval
  sources_cited: string[];          // Data sources used in this insight
}
```

---

## Example Insights by Agent Type

### Budget Risk Agent — Example Insight

```json
{
  "signal_detected": "Engineering department burn rate is $48,000/day, 38% above the $35K/day budget baseline.",
  "root_cause": "AWS compute spend increased $210K above forecast, driven by new enterprise customer workloads (AlphaCorp, BluePeak, Orbital) consuming untagged EC2 and ECS capacity.",
  "financial_impact": {
    "amount": 310000,
    "period": "this month",
    "direction": "risk"
  },
  "business_impact": "Engineering will exceed its monthly budget by $310K at current burn rate, compressing Q2 gross margin and requiring unplanned reallocation from other department budgets.",
  "confidence_score": 92,
  "recommended_action": "Review AWS workload tagging to attribute enterprise customer costs. Evaluate reserved capacity pricing for recurring workloads. Estimate: $140K cost reduction this month.",
  "suggested_owner": "Engineering Ops",
  "urgency_level": "High",
  "human_approval_required": true,
  "sources_cited": ["NetSuite GL actuals", "AWS Cost Explorer", "Approved FY2025 budget"]
}
```

### Spend Anomaly Agent — Example Insight

```json
{
  "signal_detected": "Duplicate analytics tool spend detected: AnalyticsPro ($38K/month) used by Product, Mixpanel ($22K/month) used by Marketing — 78% functional overlap.",
  "root_cause": "Product and Marketing teams independently evaluated and purchased analytics tools in Q1 without cross-functional alignment or central procurement review.",
  "financial_impact": {
    "amount": 72000,
    "period": "annually",
    "direction": "opportunity"
  },
  "business_impact": "$72K annual waste. Data fragmentation across teams reduces insight quality and complicates reporting consolidation.",
  "confidence_score": 81,
  "recommended_action": "Evaluate Mixpanel and AnalyticsPro for consolidation. Finance Ops to lead vendor comparison. Recommend standardizing on single platform by Q3.",
  "suggested_owner": "Finance Ops",
  "urgency_level": "Medium",
  "human_approval_required": false,
  "sources_cited": ["Corporate card data (Ramp)", "SaaS tool registry", "Functional category database"]
}
```

### Margin Intelligence Agent — Example Insight

```json
{
  "signal_detected": "AlphaCorp cost-to-serve increased to $420K annually against $1.2M ARR, producing a 65% gross margin — 10% below portfolio average of 75%.",
  "root_cause": "AlphaCorp requires extensive custom workflow support (40+ hours/month) not reflected in contract pricing, plus disproportionate support ticket volume (3x portfolio average).",
  "financial_impact": {
    "amount": 150000,
    "period": "annually",
    "direction": "opportunity"
  },
  "business_impact": "AlphaCorp is the highest ARR account in the portfolio but the second-lowest margin. If cost trajectory continues without repricing, gross margin will decline to 60% by Q3.",
  "confidence_score": 89,
  "recommended_action": "Initiate repricing conversation for custom workflow support tier. Introduce self-serve capabilities for top-3 support request categories. Estimated annual margin recovery: $150K.",
  "suggested_owner": "Customer Success",
  "urgency_level": "High",
  "human_approval_required": true,
  "sources_cited": ["Salesforce CRM (ARR)", "AWS usage tags", "SupportFlow ticket data", "Contractor time logs"]
}
```

### Vendor Optimization Agent — Example Insight

```json
{
  "signal_detected": "DataStack contract renewal in 32 days. Expected price increase: 18% (+$86,400 annually). Current usage health: Medium (67% utilization).",
  "root_cause": "DataStack standard renewal pricing includes 18% increase per contract terms. Usage is below committed volume, providing negotiation leverage.",
  "financial_impact": {
    "amount": 120000,
    "period": "annually",
    "direction": "risk"
  },
  "business_impact": "Renewing at list price adds $120K to annual Engineering costs. At current utilization, the organization is overpaying for unused capacity.",
  "confidence_score": 94,
  "recommended_action": "Initiate renegotiation immediately. Benchmark against alternatives (Fivetran, Airbyte). Negotiate based on actual usage tier, not committed volume. Negotiation window: 30 days.",
  "suggested_owner": "Procurement",
  "urgency_level": "High",
  "human_approval_required": true,
  "sources_cited": ["Vendor contract registry", "DataStack usage API", "AP invoice data"]
}
```

### Executive Briefing Agent — Example Insight

```json
{
  "signal_detected": "Cross-agent synthesis: 3 departments at budget risk ($620K combined), 2.8% gross margin decline risk, 2 vendor renewals in <45 days, 7 anomalies open.",
  "root_cause": "Interconnected signals: AWS compute spike driving Engineering overrun, enterprise account workloads driving margin compression, contractor surge driving CS overrun, low-conversion paid campaigns driving Marketing overrun.",
  "financial_impact": {
    "amount": 620000,
    "period": "this month",
    "direction": "risk"
  },
  "business_impact": "Q2 gross margin is at risk of missing the 72% target. Three departments will exceed budget without intervention. DataStack and SupportFlow renewals require immediate procurement attention.",
  "confidence_score": 91,
  "recommended_action": "Review and approve 3 AI recommendations (AWS optimization, DataStack renegotiation, enterprise account repricing). Distribute CFO brief to VP Finance and FP&A Lead for coordinated response.",
  "suggested_owner": "CFO",
  "urgency_level": "High",
  "human_approval_required": true,
  "sources_cited": ["Budget Risk Agent", "Spend Anomaly Agent", "Margin Intelligence Agent", "Vendor Optimization Agent"]
}
```
