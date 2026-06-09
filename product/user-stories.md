# User Stories — FinOps Intelligence AI

## CFO (Sarah)

**US-CFO-1:** As a CFO, I want to see a morning risk brief when I log in, so that I know the top financial risks for the week without opening any reports.
- **Given** I log into FinOps Intelligence AI, **When** I open the Command Center, **Then** I see an AI Executive Brief with at minimum: current budget risk summary, top anomalies, and top recommended actions.

**US-CFO-2:** As a CFO, I want to approve AI-recommended actions before they are dispatched, so that I remain accountable for all actions taken in my name.
- **Given** an AI recommendation exists with status Open, **When** I click "Create Jira Task" or "Send Slack Alert," **Then** I see a confirmation modal showing what will be created/sent before execution.

**US-CFO-3:** As a CFO, I want to review and approve a CFO brief before it is distributed, so that I can verify accuracy and add context before it reaches my board.
- **Given** the Executive Briefing Agent has generated a draft brief, **When** I open the Reports page, **Then** I see the draft with an Approve button that is required before distribution.

**US-CFO-4:** As a CFO, I want to see which departments are at highest budget risk, so that I can focus my attention on the right conversations.
- **Given** I am on the Command Center, **When** I view the Department Risk table, **Then** I see departments sorted by risk level with budget utilization percentage and variance amount.

**US-CFO-5:** As a CFO, I want to see confidence scores on all AI insights, so that I can calibrate how much weight to give each recommendation.
- **Given** any AI insight is displayed, **When** I view it, **Then** I see a confidence percentage (0-100) prominently displayed alongside the insight.

---

## Finance Ops Manager (Priya)

**US-FOM-1:** As a Finance Ops Manager, I want to see all active spend anomalies in a single view, so that I can prioritize which ones to investigate first.
- **Given** anomalies have been detected, **When** I open the Spend Anomalies page, **Then** I see all anomalies in a table sortable by severity, with the ability to click into each for full detail.

**US-FOM-2:** As a Finance Ops Manager, I want to change the status of an anomaly, so that I can track investigation progress across the team.
- **Given** an anomaly exists with status Open, **When** I click "Assign to Team," **Then** the anomaly status updates and is reflected in the table.

**US-FOM-3:** As a Finance Ops Manager, I want to generate a CFO report in one click, so that I don't spend a full day compiling monthly finance packages.
- **Given** I am on the Reports page, **When** I click "Generate Report" for any template, **Then** the report preview populates with live data from the platform.

**US-FOM-4:** As a Finance Ops Manager, I want to see vendor renewals sorted by urgency, so that I never miss a negotiation window.
- **Given** vendors with renewal dates exist, **When** I open Vendor Insights, **Then** I see a renewal risk table sorted by days-remaining with urgency color coding.

**US-FOM-5:** As a Finance Ops Manager, I want to see which integrations are connected and when they last synced, so that I know my data is current.
- **Given** integrations are configured, **When** I open the Integrations page, **Then** I see each integration with its status (Connected/Available) and last sync time for connected integrations.

---

## Engineering Ops (Marcus)

**US-EO-1:** As an Engineering Ops Manager, I want to see which customer accounts are driving cloud cost spikes, so that I can investigate the right workloads.
- **Given** an AWS compute anomaly exists, **When** I open the anomaly detail, **Then** I see the root cause attribution including which accounts or workloads are implicated.

**US-EO-2:** As an Engineering Ops Manager, I want specific workload-level recommendations when cloud costs spike, not just alerts.
- **Given** a cloud anomaly is detected, **When** I view the AI recommendation for cloud optimization, **Then** I see specific actions (e.g., "review workload tagging, optimize batch jobs") with estimated impact.

---

## FP&A Lead (David)

**US-FPA-1:** As an FP&A Lead, I want to see AI-forecasted spend for each department with confidence scores, so that I can identify which forecasts I need to validate further.
- **Given** budget forecasts exist, **When** I open Budget Risk, **Then** I see each department's forecasted spend, variance, and AI confidence score in a table.

**US-FPA-2:** As an FP&A Lead, I want to see a bar chart showing budget vs. current spend vs. forecast, so that I can visually identify which departments are at highest risk.
- **Given** I am on the Budget Risk page, **When** the chart renders, **Then** I see a grouped bar chart with three bars per department: budget, current spend, and forecast in distinct colors.

---

## RevOps (Alex)

**US-RO-1:** As a RevOps Manager, I want to see Salesforce license utilization before the renewal window, so that I can reduce seats before negotiating.
- **Given** Salesforce is a connected vendor, **When** I view the vendor detail, **Then** I see current utilization percentage and number of inactive seats identified.

**US-RO-2:** As a RevOps Manager, I want AI to flag duplicate analytics tools across departments, so that I can build a consolidation case before the next planning cycle.
- **Given** overlapping SaaS tools exist across departments, **When** I open Spend Anomalies, **Then** I see duplicate tool anomalies with estimated annual waste amount.
