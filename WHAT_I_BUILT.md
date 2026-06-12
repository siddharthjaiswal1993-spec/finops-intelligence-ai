# What I Built — FinOps Intelligence AI

A technical inventory of what exists in this repository and how the pieces fit together.

---

## Product Documents

| File | What It Contains |
|---|---|
| `docs/01-product-vision.md` | Platform vision, the finance intelligence gap, and strategic direction |
| `docs/02-product-requirements.md` | Functional requirements for all five agents and the shared approval workflow |
| `docs/03-personas-and-jtbd.md` | 8 user personas from CFO to department budget owner, with jobs-to-be-done |
| `docs/04-user-journeys.md` | End-to-end journeys for each primary persona from signal detection to action outcome |
| `docs/05-ai-agent-architecture.md` | Five-agent design: Budget Risk, Spend Anomaly, Margin Intelligence, Vendor Optimisation, Executive Briefing |
| `docs/06-demo-scenario.md` | Full worked scenario: $620K cloud spend → margin risk → CFO brief approval |
| `docs/07-data-model.md` | Data schema for insights, agents, approvals, and outcome tracking |
| `docs/08-ai-governance-and-human-approval.md` | Approval policy, confidence thresholds, and the 10-field insight schema |
| `docs/09-success-metrics.md` | Leading indicators, product quality metrics, and business impact targets |
| `docs/10-roadmap.md` | Phased roadmap from prototype to production integrations |
| `docs/11-gtm-positioning.md` | Target segment, ICP, messaging pillars, and competitive positioning |
| `docs/12-product-design-decisions.md` | Key product decisions, human-in-the-loop rationale, and learnings |

---

## Standard Portfolio Documents

| File | What It Contains |
|---|---|
| `PORTFOLIO_AUDIT.md` | Honest evaluation of completeness, strengths, and what's missing |
| `PRODUCT_THESIS.md` | The core bet, problem framing, and strategic rationale |
| `WHAT_I_BUILT.md` | This file |
| `OUTCOME_MODEL.md` | Business outcomes, success metrics, and how value is measured |
| `AI_PRODUCT_JUDGMENT.md` | AI-specific product decisions and the reasoning behind them |

---

## Prototype

Built with React. Demonstrates:
- CFO morning risk brief dashboard
- Anomaly detection feed with confidence indicators
- Agent insight cards with 10-field detail view
- Approval queue with reasoning transparency
- Outcome tracking panel

---

## Key Design Decisions Encoded in the Docs

**The 10-field insight schema** — every AI insight must contain: signal, root cause, financial impact, business impact, confidence score, recommendation, owner, urgency, data sources, and approval required. This is a hard product requirement enforced at the agent output layer, not a presentation choice.

**DETECT → DIAGNOSE → RECOMMEND → APPROVE → ACT → VERIFY loop** — the workflow is explicitly six stages, not four. The VERIFY stage is critical: the system checks whether the action had the intended effect and updates the agent's confidence calibration. Without verification, the feedback loop does not close.

**LLMs generate narrative only; calculations are deterministic** — all financial figures (impact amounts, forecast variances, budget overrun projections) are calculated by structured logic. LLMs are used to generate readable explanations of those figures. This eliminates hallucination risk for the numbers that matter most to CFOs.

**Budget Risk as the landing wedge** — the product strategy explicitly sequences which agents to lead with (Budget Risk) and which are expansion motions (Margin Intelligence, Vendor Optimisation). This is a GTM sequencing decision that shapes the product roadmap.

---

## What's Not Here

A production codebase. This is a product strategy and prototype — the goal is to validate the product design and demonstrate the thinking, not to build a shippable product.

Production integrations (NetSuite, AWS Cost Explorer, Salesforce, Ramp) are described in the architecture and roadmap documents but not implemented. The prototype uses hardcoded mock data to demonstrate the core UX and workflow.
