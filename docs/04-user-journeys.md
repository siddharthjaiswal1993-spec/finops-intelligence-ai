# User Journeys — FinOps Intelligence AI

## Journey 1: CFO Morning Review

**Trigger:** Monday morning, 8:30am. Sarah opens FinOps Intelligence AI after her first coffee.

**Steps:**
1. Sarah opens the Command Center. The AI Executive Brief is at the top: "3 departments at budget risk this month — Engineering, Customer Success, and Marketing."
2. She reads the brief: $620K at risk, 2.8% margin decline projected, DataStack renewal in 32 days.
3. She clicks "View Risk Drivers" to see the department breakdown. Engineering is the highest risk: $310K overrun, cloud compute spike.
4. She navigates to AI Recommendations. Three recommendations are flagged for her approval: AWS optimization ($140K), DataStack renegotiation ($120K), enterprise account repricing ($310K quarterly).
5. She clicks into the first recommendation, reviews the reasoning and confidence score (92%), and approves "Create Jira Task."
6. She clicks into the CFO Brief in Reports. The draft is pre-populated with the week's findings. She edits the executive summary, approves, and the brief is distributed to her VP Finance and FP&A Lead.

**AI Touchpoints:** Executive Brief, budget risk forecast, recommendation generation, CFO brief draft

**Human Decision Points:** Which recommendations to approve; CFO brief edit and approval; distribution decision

**Output:** Three actions created, CFO brief distributed, board prep data current

---

## Journey 2: FP&A Lead Investigating Budget Risk

**Trigger:** Priya sees an Engineering budget risk alert on Tuesday. She needs to understand the variance before the Wednesday finance review.

**Steps:**
1. Priya opens Budget Risk. Engineering is flagged High with $310K projected overrun and 92% confidence.
2. She clicks into the department detail. The AI forecast explanation cites AWS compute spike (+38%) as the primary driver.
3. She navigates to Spend Anomalies. The AWS Compute Spike anomaly is open, status Investigating, detected 3 days ago.
4. She clicks the anomaly detail. Root cause: new enterprise customer workloads consuming untagged compute. Business impact: gross margin compression on 3 accounts.
5. She clicks "Assign to Team" — assigns to Marcus in Engineering Ops with a note to investigate workload tagging.
6. She generates a department budget summary for the Engineering budget owner (VP Engineering) with the variance explanation pre-filled.
7. At the Wednesday finance review, Priya presents the variance with AI-generated root cause and the assigned action item already in progress.

**AI Touchpoints:** Budget risk forecast, anomaly root cause, department summary generation

**Human Decision Points:** Which anomalies to investigate; who to assign; what context to add in assignment

**Output:** Anomaly assigned and being investigated; VP Engineering has budget status; Priya has finance review prep ready

---

## Journey 3: Vendor Renewal Preparation

**Trigger:** 45 days before Salesforce renewal. RevOps Manager Alex needs to prepare the renewal negotiation.

**Steps:**
1. Alex opens Vendor Insights. Salesforce is flagged with 64 days to renewal, 71% license utilization, and 9% expected price increase.
2. The AI recommendation for Salesforce: "Reduce unused seats before renewal negotiation." 148 inactive seats identified.
3. Alex clicks into the renewal detail. Annual contract: $1.8M. Expected increase: +9% = $162K additional.
4. He exports the inactive seat list to share with Sales and Marketing managers.
5. He uses the AI recommendation as the basis for the vendor brief: current utilization, inactive seats, expected increase, negotiation position.
6. 30 days before renewal, he has the seat reduction confirmed and enters negotiation with data.

**AI Touchpoints:** Renewal countdown, usage health scoring, seat utilization analysis, negotiation recommendation

**Human Decision Points:** Which seats to deactivate; final negotiation position; contract approval

**Output:** $162K+ saved on Salesforce renewal through seat reduction and improved negotiation position

---

## Journey 4: Engineering Ops Responding to Cloud Alert

**Trigger:** Marcus receives a Jira task: "Review AWS workload tagging and optimize batch jobs — Finance risk flag. Budget risk: Engineering projected $310K overrun. Primary driver: AWS compute."

**Steps:**
1. Marcus opens FinOps Intelligence AI and navigates to the anomaly. He reads the root cause: enterprise customer workloads from AlphaCorp, BluePeak, and Orbital running untagged.
2. He clicks into the Department View for Engineering. The spend breakdown shows Cloud Infrastructure at $750K — 74% of total Engineering spend.
3. He reviews the AI recommendation: workload tagging review + batch job optimization = estimated $140K savings this month.
4. Marcus investigates his AWS console (outside the platform), confirms the untagged workloads, and implements tagging.
5. He updates the Jira task with his findings and the steps taken.
6. In FinOps AI, Priya updates the anomaly status from Investigating to Reviewed.
7. The following week, the Budget Risk Agent recalculates Engineering's forecast. The compute cost has stabilized — projected overrun reduces from $310K to $180K.

**AI Touchpoints:** Jira task creation (from AI recommendation approval), anomaly detail, department view, updated forecast

**Human Decision Points:** Which workloads to tag, optimization approach, validation of changes

**Output:** Engineering budget overrun reduced by $130K; workloads tagged for future visibility

---

## Journey 5: Monthly Finance Close Preparation

**Trigger:** Last week of the month. Priya needs to prepare the month-end close package for the CFO.

**Steps:**
1. Priya opens the Reports page. The Budget Overrun Forecast report shows current state: 3 departments over budget, 4 on track.
2. She generates the Department Budget Owner Summary. The AI pre-populates variance explanations for each department from agent outputs.
3. She reviews the anomaly log for the month. 7 anomalies detected, 5 resolved, 2 still open. She closes out the resolved ones with outcome notes.
4. She generates the CFO Weekly Risk Brief for the final week — this becomes the month-end summary. The AI includes 4-week variance trend and key actions taken.
5. She exports the data for the controller to reconcile with NetSuite actuals.
6. Sarah approves the brief and month-end summary. It is distributed to the board prep folder.
7. Priya sends the department variance explanations to each budget owner — generated by AI, reviewed by Priya, personalized with one sentence of context.

**AI Touchpoints:** Budget forecast, anomaly log, report generation, CFO brief, department summaries

**Human Decision Points:** Anomaly resolution notes, CFO brief edit, department owner communication personalization

**Output:** Month-end package complete in 2 hours instead of 2 days; no variance explanations built from scratch
