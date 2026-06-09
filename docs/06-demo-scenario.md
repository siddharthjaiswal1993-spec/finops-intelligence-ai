# Demo Scenario — Cloud Spend Spike Creates Margin Risk

## Scenario Summary

A week-over-week AWS compute spike is detected by the Spend Anomaly Agent. What starts as a cloud cost alert cascades through four AI agents — revealing a department budget overrun, enterprise account margin compression, and a CFO risk brief that was triggered automatically and approved in minutes, not days.

**Total financial risk identified:** $620K  
**Time from anomaly to CFO awareness:** < 15 minutes  
**Human decisions required:** 2 (action approval, CFO brief approval)

---

## Characters

**Sarah** — CFO. Receives the morning brief, reviews AI recommendations, approves actions.

**Marcus** — Engineering Ops Manager. Receives Jira task to investigate AWS workloads. Acts on cloud optimization recommendation.

**Priya** — Finance Ops Manager. Monitors FinOps AI platform, triages alerts, coordinates response.

---

## Scene-by-Scene Narrative

### Step 1: Anomaly Detected

**What happens:**  
The Spend Anomaly Agent, running its 15-minute monitoring cycle, detects that AWS compute spend for the Engineering department has increased $210,000 above the rolling 13-week baseline. The week-over-week change is 38% — well above the 20% trigger threshold.

**What AI does:**  
The agent performs root cause pre-analysis: the spike is concentrated in EC2 and ECS compute, not storage or networking. The pattern started 3 days ago, correlating with the onboarding of three new enterprise customers. The agent flags this as a Cloud anomaly with High severity and 92% confidence.

**What human does:**  
Priya sees the alert in the FinOps AI Command Center. She reviews the anomaly detail and changes the status from Open to Investigating.

**Talking point:** The system caught this in minutes. Without FinOps AI, Priya would have found this at month-end close — three weeks later.

---

### Step 2: Budget Overrun Forecast Generated

**What happens:**  
The Budget Risk Agent, receiving the updated spend signal from the Spend Anomaly Agent's output, recalculates Engineering's month-end projection. At the current burn rate, Engineering will spend $1.51M against a $1.2M monthly budget — a $310K overrun.

**What AI does:**  
The Budget Risk Agent generates a new forecast with 92% confidence. It identifies cloud infrastructure as the primary driver (representing 50% of total Engineering spend). It automatically generates a budget risk insight and adds it to the CFO brief queue.

**What human does:**  
The alert appears in the Department Risk table on the Command Center. The budget utilization bar for Engineering turns red. Priya clicks through to the Budget Risk page to review the full forecast.

**Talking point:** The CFO would normally find out about this on day 28. Now she finds out on day 11.

---

### Step 3: Margin Impact Linked to Enterprise Accounts

**What happens:**  
The Margin Intelligence Agent queries the Insight Store and sees the AWS spike signal. It cross-references AWS usage tags with Salesforce account data. Three accounts — AlphaCorp, BluePeak Retail, and Orbital Logistics — account for 67% of the untagged compute increase. All three accounts are already operating below the portfolio gross margin average.

**What AI does:**  
The agent calculates the projected margin impact: if the compute cost continues, gross margin on these three accounts will decline by an additional 2.8% by quarter-end. It updates its account profitability analysis and flags all three accounts as High margin risk.

**What human does:**  
Priya sees the Margin Intelligence alert. She reviews the Account Profitability table and notes the accounts. She assigns the anomaly to the CS Ops team for review.

**Talking point:** Without cross-agent reasoning, you'd never connect an AWS bill to customer margin. That insight would take a senior analyst three days to produce manually.

---

### Step 4: AI Recommendations Generated

**What happens:**  
The Recommendation Engine synthesizes the Budget Risk, Spend Anomaly, and Margin Intelligence signals. It generates three prioritized recommendations ranked by estimated financial impact.

**Recommendations generated:**
1. Optimize AWS Compute Workloads — $140K estimated impact this month (Engineering Ops, Confidence 92%)
2. Reprice Premium Support for High-Touch Accounts — $310K quarterly margin recovery (Customer Success, Confidence 89%)
3. Evaluate Reserved Capacity Pricing — 20-25% cost reduction estimate (Engineering Ops, Confidence 84%)

**What human does:**  
Priya reviews the recommendations on the AI Recommendations page. She approves recommendations 1 and 2 for immediate action. She defers recommendation 3 for next quarter planning.

**Talking point:** The AI doesn't just flag problems — it tells you exactly what to do and who should do it. That's the difference between a warning system and an intelligence platform.

---

### Step 5: CFO Summary Generated for Review

**What happens:**  
The Executive Briefing Agent synthesizes all four agents' outputs and generates a CFO Weekly Risk Brief draft. It includes the budget risk summary, margin alert, vendor renewal warning (DataStack, 32 days out), and three prioritized recommended actions.

**What AI does:**  
Draft brief content:
- Executive Summary: $620K at financial risk this week. Three budget overrun risks, margin pressure on 3 enterprise accounts, urgent vendor renewal.
- Budget Risks: Engineering ($310K), Customer Success ($165K), Marketing ($145K)
- Margin Risks: AlphaCorp, BluePeak, Orbital — 2.8% projected gross margin decline
- Vendor Renewals: DataStack (32 days, +18% expected = $120K annual impact)
- Recommended Actions: 3 actions with owners, impacts, and deadlines

**What human does:**  
Sarah receives a notification: "CFO Brief ready for review." She opens the Reports page, reviews the draft, edits the executive summary slightly, and approves distribution.

**Talking point:** This brief would have taken a finance analyst 4-6 hours to compile manually. The AI produced it in 30 seconds, with human review and approval before it went anywhere.

---

### Step 6: Actions Created — Slack Alert and Jira Task

**What happens:**  
With Priya's approval, the system creates a Jira task for Marcus (Engineering Ops) to review AWS workload tagging and optimize batch jobs. A Slack alert is sent to the #finance-ops channel with the budget risk summary and a link to the full anomaly detail.

**Jira task created:**  
Title: "Review AWS workload tagging and optimize batch jobs — Finance risk flag"  
Description: Engineering projected $310K over monthly budget. Root cause: untagged compute from 3 enterprise customer workloads. Estimated savings from optimization: $140K this month.  
Assignee: Marcus | Priority: High | Due: 5 business days

**Slack alert sent:**  
"Budget Risk Alert: Engineering is projected $310K over monthly budget. AWS compute spike linked to AlphaCorp, BluePeak, and Orbital onboarding workloads. Jira task assigned to Engineering Ops. See FinOps Intelligence AI for full details."

**What human does:**  
Marcus receives the Jira task and begins workload investigation. Priya closes the anomaly loop by updating the status in FinOps AI. Sarah marks the CFO brief as distributed.

**Talking point:** End-to-end, from anomaly detection to action dispatch, took about 20 minutes — 5 of which were human review and approval. The rest was AI.

---

## Demo Talking Points

1. **The detection gap:** Traditional tools find budget issues at month-end. FinOps AI finds them in week 1. That time difference is the difference between fixing a problem and explaining one.

2. **Cross-agent intelligence:** No single agent produced the full picture. The insight that three enterprise customer onboarding workloads were driving margin compression required Budget Risk + Spend Anomaly + Margin Intelligence working together. That's the architecture advantage.

3. **Human-in-the-loop:** Every action required human approval. The AI never acted autonomously. This is intentional and non-negotiable — finance decisions have consequences, and humans need to remain accountable.

4. **Confidence scores:** Every insight includes a confidence score. The system is transparent about uncertainty. This builds trust over time.

5. **Speed vs. quality:** The CFO brief took 30 seconds to generate. A senior analyst would need hours. And the AI brief was accurate to two decimal places on every figure.
