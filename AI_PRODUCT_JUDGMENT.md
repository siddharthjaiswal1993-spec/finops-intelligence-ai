# AI Product Judgment — FinOps Intelligence AI

The AI-specific product decisions made in designing this platform, why they were made, and what they reveal about how to approach AI product design.

---

## Decision 1: Deterministic calculations, LLM narrative

**What:** All financial figures (budget overrun projections, anomaly impact dollar amounts, savings estimates, margin calculations) are computed by structured logic from verified data. LLMs generate only the readable explanation of those figures.

**Why:** The failure mode that ends an AI product in a finance context is a confident but wrong number. A CFO who sees "$620K at risk" in an AI-generated brief and checks the underlying math — if those numbers do not reconcile with her ERP — will never open the brief again.

LLMs are very good at generating readable, contextual narrative. They are not reliable for precise numerical calculation, especially when chain-of-thought reasoning across multiple data sources is required. The right architecture separates the two responsibilities: let the LLM be the analyst who writes the memo, but make sure a human-readable audit trail connects every number in that memo to a verified calculation.

**What this reflects:** AI architecture decisions should follow the failure modes you cannot afford. In financial products, the failure mode is numerical error. Architect around it.

---

## Decision 2: Cross-agent reasoning as the core value, not single-agent accuracy

**What:** The most valuable insights in the system require multiple agents working together — the Spend Anomaly agent detects the signal, the Margin Intelligence agent connects it to account profitability, the Budget Risk agent projects the month-end impact, and the Executive Briefing agent synthesises the story. No single agent can produce the $620K risk insight independently.

**Why:** Single-agent products improve a category. Cross-agent products create one. Every FinOps tool detects spend anomalies. Every FP&A tool forecasts budget variances. The differentiated insight — "this specific cloud spend pattern will breach this specific department's budget in 11 days and the 3 accounts causing it are already margin-negative" — requires seeing all three signals together.

Designing for cross-agent reasoning is harder architecturally and harder to evaluate, but it is the only place where the product is genuinely different from what already exists.

**What this reflects:** The AI design questions worth spending time on are not "how do we make each agent more accurate?" but "what insights only become possible when agents share context?" Those are the product bets worth making.

---

## Decision 3: The 10-field insight schema is a hard requirement, not a suggestion

**What:** Every AI insight must contain: signal, root cause, financial impact, business impact, confidence, recommendation, suggested owner, urgency, data sources, and approval required. Incomplete insights do not surface to users.

**Why:** Partially-formed AI insights have two failure modes. For users: a recommendation without a clear owner or urgency level cannot be actioned quickly — it goes into a mental queue and gets forgotten. For the product: an insight that surfaces without confidence or data source information is not auditable, which means it cannot build trust over time.

The 10-field schema is a forcing function. It requires the agent to be specific about what it detected, why it matters, and exactly what it wants someone to do. That specificity is the difference between an alert and an action recommendation.

**What this reflects:** Output structure is a product decision, not an engineering parameter. What fields appear in an AI insight defines what behaviour it drives. Designing the schema carefully is designing the user's workflow.

---

## Decision 4: Rejection capture is as important as approval capture

**What:** When a Finance Ops Manager rejects an AI recommendation, the product prompts for a reason (optional free text plus a categorical tag). That rejection signal is stored and feeds back into agent improvement.

**Why:** Most AI products track approvals and outcomes but ignore rejections. This is a significant missed signal. A recommendation that is consistently rejected for the same reason is a product bug, not user error. Common rejection patterns reveal miscalibration in the agent's reasoning that would not surface if you only tracked approvals.

More practically: a Finance Ops Manager who rejects an insight and explains why is doing product research for free. The PM team should be reviewing rejection patterns weekly.

**What this reflects:** The feedback loop in an AI product is a product design problem. It does not happen automatically. You have to build the capture mechanism, make it easy enough to use that people actually provide feedback, and have a process for reviewing and acting on it.

---

## Decision 5: Budget Risk as the landing wedge, not Maximum Value

**What:** The platform has five agents, but the GTM motion leads with Budget Risk — not Margin Intelligence (which is arguably more valuable) or Vendor Optimisation (which has a faster sales story).

**Why:** Budget Risk is the use case that every CFO has personally experienced a failure on. Every finance leader at a tech company has been surprised by a budget overrun. It is universally felt, immediately understood, and easy to demo with a credible scenario.

Margin Intelligence is more strategic and more valuable, but it requires the CFO to understand a new analytical framework before she can see the value. Vendor Optimisation requires data from multiple systems before the agent can generate useful recommendations. Budget Risk works with ERP data alone.

The landing wedge should be the use case that is easiest to trust, easiest to verify, and fastest to produce visible value — not the most impressive capability.

**What this reflects:** GTM sequencing is a product design decision, not just a sales decision. The order in which users experience capabilities shapes whether they build enough trust to adopt the more complex ones. Sequence from "easiest to trust" to "most strategic," not from "most impressive demo" to "easiest to explain."

---

## What These Decisions Have in Common

All five decisions reflect the same underlying principle: in financial AI, trust is the only thing that matters. Capability without trust does not get used. Trust without capability does not retain.

The deterministic calculation architecture, the cross-agent reasoning design, the strict insight schema, the rejection capture model, and the landing wedge sequencing are all expressions of the same product bet: that a system finance leaders can trust with their numbers will outcompete a more capable system they cannot.
