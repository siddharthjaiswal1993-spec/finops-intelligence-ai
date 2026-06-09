# Budget Forecasting Logic — FinOps Intelligence AI

## Overview

The Budget Risk Agent uses a three-component forecasting model: burn rate projection, seasonality adjustment, and anomaly impact adjustment.

## Inputs

| Input | Source | Refresh Rate |
|---|---|---|
| Period-to-date spend by department | ERP (NetSuite) | Daily |
| Approved budget by department | Budget system | Per planning cycle |
| Historical spend (same period, prior 3 years) | ERP historical | Static |
| Active anomalies with financial impact | Spend Anomaly Agent | Real-time |
| Current date and days elapsed in period | System | Real-time |

## Forecasting Methodology

### Step 1: Burn Rate Projection

```
dailyBurnRate = currentSpend / daysElapsed
projectedMonthEnd = dailyBurnRate × totalDaysInPeriod
```

This is the simplest projection and most accurate for stable departments with consistent spend patterns.

### Step 2: Seasonality Adjustment

Compare current period's daily burn rate to the same period in prior years:

```
avgPriorPeriodBurnRate = mean(day_N_spend for prior 3 years) / day_N
seasonalityFactor = currentBurnRate / avgPriorPeriodBurnRate
adjustedForecast = projectedMonthEnd × (1 / seasonalityFactor)
```

**When seasonality correction is applied:**
- If seasonalityFactor > 1.15: current period is running hot relative to historical pattern → apply dampening
- If seasonalityFactor < 0.85: current period is running cool → apply uplift

**When seasonality correction is NOT applied:**
- If historical data is incomplete (<2 prior years for same period)
- If department is new (<6 months history)

### Step 3: Anomaly Impact Adjustment

For each active High or Critical severity anomaly in the department:

```
anomalyMonthlyImpact = anomaly.amountImpact × (daysRemaining / totalPeriodDays)
adjustedForecast += anomalyMonthlyImpact
```

This ensures that detected anomalies are included in the forecast, not just the baseline burn rate.

### Final Forecast

```
finalForecast = adjustedForecast
variance = finalForecast - approvedBudget
variancePct = variance / approvedBudget × 100
```

## Confidence Scoring

Starting confidence: 90%

| Adjustment | Condition | Impact |
|---|---|---|
| Data freshness | Data >24 hours old | -5% |
| Sample size | <7 days of current period data | -10% |
| Active anomalies | Each High/Critical anomaly | -5% |
| Historical accuracy | This department >90% accurate historically | +5% |
| Seasonality data | Missing prior year data | -5% |

Minimum surfaced confidence: 70% (below 70%, insight is logged but not surfaced)

## Output

```json
{
  "department": "Engineering",
  "monthlyBudget": 1200000,
  "currentSpend": 1010000,
  "forecastedSpend": 1510000,
  "variance": 310000,
  "variancePct": 25.8,
  "riskLevel": "High",
  "aiConfidence": 92,
  "primaryDriver": "Cloud Infrastructure",
  "forecastComponents": {
    "burnRateProjection": 1380000,
    "seasonalityAdjustment": -20000,
    "anomalyAdjustment": 150000
  }
}
```

## Known Limitations

1. **Assumes constant burn rate:** Model does not account for planned spend acceleration (e.g., a campaign going live mid-month). Future: allow users to annotate planned spend events.

2. **Anomaly impact estimation:** When anomaly financial impact is uncertain, the model defaults to the detected amount. This may overstate impact for anomalies that are partially offset by other budget lines.

3. **New departments:** Departments with <90 days of history have lower forecast accuracy. The model surfaces lower confidence scores and flags this to users.

4. **Discretionary vs. committed spend:** The model does not distinguish between committed spend (contracts) and discretionary spend (new purchases). Future: incorporate contract registry to improve committed spend modeling.
