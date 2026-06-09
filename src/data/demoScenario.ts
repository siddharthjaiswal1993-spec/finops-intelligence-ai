import type { DemoStep } from '@/types';

export const demoScenario: DemoStep[] = [
  {
    step: 1,
    title: 'New Spend Anomaly Detected',
    description:
      'Spend Anomaly Agent detects AWS compute spend increased 38% week-over-week — $210K above expected.',
    aiExplanation:
      'AWS compute spend for Engineering has increased $210K above forecast. Usage pattern does not match historical baselines or planned feature releases. Flagging for investigation.',
    status: 'Anomaly flagged',
    financialImpact: '$210K projected variance',
  },
  {
    step: 2,
    title: 'Budget Overrun Forecast Generated',
    description:
      'Budget Risk Agent forecasts Engineering will exceed monthly budget by $310K by month-end at current burn rate.',
    aiExplanation:
      'Based on current spend trajectory and historical patterns, Engineering is projected to reach $1.51M against a $1.2M monthly budget. Confidence: 92%. Primary driver: cloud infrastructure costs.',
    status: 'Budget risk identified',
    financialImpact: '$310K projected overrun',
  },
  {
    step: 3,
    title: 'Margin Impact Linked to Enterprise Accounts',
    description:
      'Margin Intelligence Agent connects the AWS spike to three enterprise customer workloads consuming untagged compute.',
    aiExplanation:
      'Cross-referencing cloud usage tags with Salesforce account data: AlphaCorp, BluePeak Retail, and Orbital Logistics account for 67% of the compute spike. These accounts are already margin-negative after support costs.',
    status: 'Root cause identified',
    financialImpact: '2.8% projected margin decline',
  },
  {
    step: 4,
    title: 'AI Recommendations Generated',
    description:
      'The system generates three prioritized recommendations: workload optimization, pricing review, and reserved capacity evaluation.',
    aiExplanation:
      'Recommended actions: (1) Review workload tagging and optimize batch jobs — estimated $140K savings. (2) Initiate pricing review for high-cost accounts — estimated $310K quarterly margin recovery. (3) Evaluate reserved capacity pricing — estimated 20-25% cost reduction.',
    status: 'Actions recommended',
    financialImpact: 'Up to $450K combined impact',
    recommendedAction: 'Review and approve recommendations below',
  },
  {
    step: 5,
    title: 'CFO Summary Generated for Review',
    description:
      'Executive Briefing Agent drafts a CFO Weekly Risk Brief. Human approval required before distribution.',
    aiExplanation:
      'Draft CFO brief includes: budget risk summary ($620K at risk), margin alert (2.8% decline risk), vendor renewal warning (DataStack, 32 days), and three prioritized recommended actions with owners and estimated impacts.',
    status: 'Awaiting CFO approval',
    financialImpact: '$620K total risk flagged',
    recommendedAction: 'Approve or edit CFO brief before sending',
  },
  {
    step: 6,
    title: 'Actions Created — Slack Alert and Jira Task',
    description:
      'With human approval, system simulates creating a Jira task for Engineering Ops and sending a Slack alert to the Finance channel.',
    aiExplanation:
      'Jira task created: "Review AWS workload tagging and optimize batch jobs — Finance risk flag." Slack alert sent to #finance-ops: "Budget Risk Alert: Engineering projected $310K overrun. See FinOps Intelligence AI for recommended actions."',
    status: 'Actions dispatched',
    financialImpact: 'Response initiated',
  },
];
