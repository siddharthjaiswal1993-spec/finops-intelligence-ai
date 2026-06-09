# Data Model — FinOps Intelligence AI

## Entity Overview

| Entity | Description | Primary Key | Relationships |
|---|---|---|---|
| Department | Budget and spend data for each business unit | id | BudgetForecast, Anomaly |
| Vendor | Vendor spend, renewal, and usage data | id | Anomaly, Recommendation |
| Account | Customer account margin and profitability | id | MarginInsight |
| Anomaly | Detected spend anomaly or risk signal | id | Department, Vendor, Recommendation |
| Recommendation | AI-generated action with impact estimate | id | Anomaly, Department, Vendor |
| BudgetForecast | AI budget forecast per department | department | Department |
| AIAgent | Agent status and performance metrics | id | — |
| Integration | Connected data source status | id | — |
| AuditLog | Record of all AI and human actions | id | Recommendation, Anomaly |
| DemoStep | Demo scenario step data | step | — |

---

## Department

```typescript
{
  id: string;              // Unique identifier (e.g., 'eng', 'mkt')
  name: string;            // Display name
  budget: number;          // Approved monthly budget in USD
  currentSpend: number;    // Spend to date this period
  forecastedSpend: number; // AI-forecasted end-of-period spend
  variance: number;        // forecastedSpend - budget (positive = overrun)
  riskLevel: RiskLevel;    // 'High' | 'Medium' | 'Low' | 'Critical'
  mainDriver: string;      // Primary cause of variance or status
  spendBreakdown: SpendItem[]; // Spend by category
}

SpendItem {
  category: string;
  amount: number;
}
```

**Future schema:** `departments` table with `budget_periods` foreign key, `category_breakdown` in separate `department_spend_categories` table.

---

## Vendor

```typescript
{
  id: string;
  name: string;
  monthlySpend: number;         // Current month spend
  changePercent: number;        // WoW or MoM change percentage
  riskLevel: RiskLevel;
  insight: string;              // AI-generated insight summary
  renewalDays?: number;         // Days to renewal (optional)
  annualContract?: number;      // Annual contract value
  expectedIncrease?: number;    // Expected price increase at renewal (%)
  usageHealth: 'High' | 'Medium' | 'Low';
  negotiationPriority: 'High' | 'Medium' | 'Low';
  aiRecommendation: string;
}
```

**Future schema:** `vendors` table with `contracts` relationship, `usage_snapshots` time-series table.

---

## Account

```typescript
{
  id: string;
  name: string;
  arr: number;              // Annual recurring revenue
  costToServe: number;      // Total annual cost to serve this account
  grossMargin: number;      // Gross margin percentage
  marginRisk: RiskLevel;
  mainDriver: string;       // Primary cost driver
  aiRecommendation: string;
}
```

**Future schema:** `accounts` table with `monthly_cost_to_serve` time-series for trend analysis.

---

## Anomaly

```typescript
{
  id: string;
  title: string;
  category: string;             // 'Cloud' | 'SaaS' | 'Services' | 'Travel' | 'Vendor' | 'Marketing'
  amountImpact: number;         // Dollar impact above expected
  changePercent: number;        // Percentage change from baseline
  severity: RiskLevel;
  rootCause: string;            // AI-generated root cause explanation
  status: AnomalyStatus;        // 'Open' | 'Investigating' | 'Reviewed' | 'Action needed' | 'Resolved'
  detectedDaysAgo: number;
  expectedSpend: number;        // Baseline expected spend
  actualProjected: number;      // Projected actual spend
  businessImpact: string;       // Plain English business impact
  recommendedAction: string;
  department: string;
  vendor?: string;              // Related vendor if applicable
  confidence: number;           // AI confidence 0-100
}
```

**Future schema:** `anomalies` table with `status_history` for workflow audit trail, `false_positive_flag` for model feedback.

---

## Recommendation

```typescript
{
  id: string;
  title: string;
  estimatedImpact: number;     // Dollar value of potential impact
  impactPeriod: string;        // 'this month' | 'annually' | 'quarterly'
  urgency: RiskLevel;
  confidence: number;
  owner: string;               // Suggested owner role
  status: 'Open' | 'Needs review' | 'In progress' | 'Done';
  explanation: string;         // Full AI reasoning
  category: string;            // 'Cloud' | 'SaaS' | 'Margin' | 'Vendor' | 'Marketing' | 'Operations'
}
```

---

## BudgetForecast

```typescript
{
  department: string;      // Foreign key to Department
  monthlyBudget: number;
  currentSpend: number;
  forecastedSpend: number;
  variance: number;
  riskLevel: RiskLevel;
  aiConfidence: number;    // Forecast confidence 0-100
}
```

---

## AIAgent

```typescript
{
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Error';
  lastRunMinutes: number;      // Minutes since last run
  insightsGenerated: number;   // Insights in current session
  confidence: number;          // Average confidence of recent insights
  description: string;
  monitors: string[];          // List of monitoring targets
}
```

---

## AuditLog (Future)

```typescript
{
  id: string;
  actionType: string;          // 'alert' | 'task' | 'report' | 'escalation' | 'status_update'
  agentId: string;
  insightId: string;
  recommendedAt: Date;
  reviewedBy: string;          // User ID
  reviewDecision: 'Approved' | 'Rejected' | 'Edited';
  editMade?: string;           // Original → edited text if applicable
  approvedAt?: Date;
  executedAt?: Date;
  executionResult?: 'Success' | 'Failure';
}
```
