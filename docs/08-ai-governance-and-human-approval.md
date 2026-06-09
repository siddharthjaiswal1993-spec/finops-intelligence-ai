# AI Governance and Human Approval — FinOps Intelligence AI

## Why Human Approval Is Mandatory

FinOps Intelligence AI operates in a high-stakes domain: decisions informed by the platform affect vendor contracts, department budgets, customer pricing, and executive communications. An AI that acts autonomously in this context would undermine the trust that finance teams must maintain with their boards, auditors, and leadership teams.

Human approval is not a convenience feature or a hedge against AI errors. It is an architectural principle. The platform is designed to make finance teams faster and smarter — not to replace their judgment.

The consequence of a false positive in a budget alert is recoverable. The consequence of an AI autonomously sending a CFO brief with incorrect figures to a board — or creating a vendor renegotiation without the right human context — is not.

## The Approval Model

Every AI-generated action passes through a four-stage approval workflow:

```
1. Agent Recommends
   → AI generates insight with confidence score, reasoning, and financial impact
   
2. System Explains
   → Platform surfaces the insight with full reasoning: what signal, what root cause, 
     what financial impact, what business impact, what recommended action, what owner
     
3. Human Reviews
   → Finance Ops Manager or CFO reviews the insight
   → Can approve as-is, edit before approving, or reject with a reason
   
4. System Executes (only after approval)
   → Approved action is executed: Jira task created, Slack alert sent, report distributed
   → Execution timestamp and approver identity logged in audit record
```

## Actions That Require Approval

The following actions require explicit human approval before the system executes:

1. Creating a Jira task or work item from an AI recommendation
2. Sending a Slack or email alert to any channel or distribution list
3. Distributing a CFO brief, board summary, or any executive report
4. Assigning an anomaly or recommendation to a specific team or owner
5. Marking an anomaly as "Action needed" (triggers escalation workflow)
6. Creating a CFO note from an anomaly detail
7. Generating and distributing a vendor negotiation summary
8. Updating a budget risk status that would trigger a department notification

## Actions That Do Not Require Approval

The following actions are autonomous and do not require approval:

1. Agent monitoring runs and internal insight generation
2. Updating internal dashboard data (risk levels, forecast numbers, confidence scores)
3. Adding insights to the CFO brief draft (before it is distributed)
4. Generating report drafts (before distribution is triggered)
5. Updating anomaly status within the platform (e.g., Open → Investigating) when initiated by a user

## Audit Log Requirements

Every approved and rejected action must be logged with:

| Field | Description |
|---|---|
| Action ID | Unique identifier for the action |
| Action Type | Category: alert, task, report, escalation, status update |
| AI Agent | Which agent generated the underlying insight |
| Insight ID | Reference to the source AI insight |
| Recommended At | Timestamp when AI generated the recommendation |
| Reviewed By | User identity of the reviewer |
| Review Decision | Approved / Rejected / Edited |
| Edit Made | If edited, capture original and edited text |
| Approved At | Timestamp of approval |
| Executed At | Timestamp of execution |
| Execution Result | Success / Failure + error details |

## Confidence Threshold Policies

| Confidence Level | Action |
|---|---|
| ≥ 90% | Present as confirmed finding; recommend immediate action |
| 80-89% | Present as strong signal; recommend investigation |
| 70-79% | Present as worth reviewing; label as "needs investigation" |
| < 70% | Do not surface in CFO brief; present in anomaly log only |

Finance teams can configure the minimum confidence threshold in Settings. Default: 75%.

## Override Capture

When a human rejects or edits an AI recommendation, the platform captures the override with reason:

- Override type: Rejected / Edited / Context added
- Override reason (optional free text)
- Override signal: feeds back into model calibration over time

This creates a feedback loop that improves agent accuracy for each customer's specific context.

## Model Feedback Loops

The platform tracks prediction accuracy over time:

- Budget forecast: compare predicted month-end spend to actual at close
- Anomaly classification: track which anomalies were confirmed vs. false positives after investigation
- Recommendation impact: compare estimated impact to actual financial outcome when tracked

This data is used to calibrate confidence scoring and improve prediction quality.

## Explainability Standards

Every AI insight displayed to users must include the following fields — no exceptions:

1. **Signal detected:** What data pattern triggered this insight
2. **Root cause:** Why this pattern is occurring (or most likely explanation)
3. **Financial impact:** Dollar amount and period (e.g., $310K this month)
4. **Business impact:** What this means for the business in plain English
5. **Confidence score:** Percentage with label (e.g., 92% — High confidence)
6. **Recommended action:** Specific step with estimated impact
7. **Suggested owner:** Who should act on this recommendation
8. **Urgency level:** High / Medium / Low with reasoning
9. **Human approval required:** Yes/No with explanation of what will be executed
10. **Sources cited:** Which data sources informed this insight

Insights that do not meet all 10 criteria are not surfaced to users, regardless of confidence level.
