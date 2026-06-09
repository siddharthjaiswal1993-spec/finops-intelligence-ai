# Evals and Quality Metrics — FinOps Intelligence AI

## Overview

Every AI agent in FinOps Intelligence AI is measured against a defined set of evaluation criteria. These evals ensure that insights are accurate, confidence scores are calibrated, and recommendations drive real financial outcomes.

## Budget Risk Agent Evals

| Eval | Method | Target |
|---|---|---|
| Forecast accuracy at 7 days | |predicted - actual| / actual at week 3 | < 12% error |
| Forecast accuracy at 14 days | Same at week 2 | < 10% error |
| Forecast accuracy at 21 days | Same at week 1 | < 8% error |
| Confidence calibration | 90% confidence intervals capture 90% of actuals | ± 5% |
| False alarm rate (no overrun) | % of High alerts where actual spend came in under budget | < 15% |
| Miss rate (undetected overruns) | % of >$50K overruns not flagged | < 5% |

## Spend Anomaly Agent Evals

| Eval | Method | Target |
|---|---|---|
| True positive rate | % of flagged anomalies confirmed after investigation | > 75% |
| False positive rate | % of flagged anomalies that were false alarms | < 20% |
| Time to detection | Minutes from anomaly start to flag | < 30 minutes |
| Root cause accuracy | % of root causes validated as correct by Finance Ops | > 80% |
| Duplicate SaaS precision | % of flagged duplicates confirmed as actionable overlaps | > 70% |

## Margin Intelligence Agent Evals

| Eval | Method | Target |
|---|---|---|
| Cost-to-serve accuracy | % difference between AI cost and reconciled actual | < 10% |
| Margin risk prediction | % of High-risk accounts that had measurable margin impact in next quarter | > 65% |
| Recommendation relevance | Finance team rating of account recommendations (1-5) | > 3.8 |

## Vendor Optimization Agent Evals

| Eval | Method | Target |
|---|---|---|
| Renewal prediction accuracy | % of renewals predicted at correct date | > 95% |
| Price increase accuracy | % of expected increases within 5% of actual | > 80% |
| Usage health accuracy | Correlation between AI health score and actual utilization | r > 0.8 |
| Negotiation win rate | % of AI-flagged renewals where below-list was achieved | > 60% |

## Executive Briefing Agent Evals

| Eval | Method | Target |
|---|---|---|
| CFO brief approval rate | % of drafts approved without significant edit | > 75% |
| Brief accuracy | Finance Ops rating of data accuracy (1-5) | > 4.5 |
| Edit distance | Average character edits made by CFO before approval | < 100 chars |
| Insight relevance | % of brief insights acted on within 5 business days | > 50% |

## Confidence Calibration

**Definition:** A well-calibrated confidence score means that among all insights with 80% confidence, approximately 80% should be validated as correct.

**Measurement:** Monthly calibration check comparing stated confidence to validation outcomes. Plot reliability diagram.

**Recalibration trigger:** If calibration error exceeds ±10% at any confidence band, retrain or adjust confidence model.

## Override Analysis

Each rejected or edited recommendation is analyzed:
- What was the stated reason?
- What was the confidence score?
- What category of recommendation?
- Was the rejection a false positive or a valid human override?

Aggregate override rate by category and confidence band. High override rates indicate miscalibrated confidence or low recommendation quality.

## Eval Cadence

| Eval Type | Frequency | Owner |
|---|---|---|
| Budget forecast accuracy | Monthly (post-close) | AI Engineering |
| Anomaly true/false positive rates | Monthly | AI Engineering |
| Confidence calibration | Monthly | AI Engineering |
| CFO brief quality | Weekly | Product |
| Agent uptime and latency | Daily | Engineering |
| Customer outcome metrics | Quarterly | Customer Success |
