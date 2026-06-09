import { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  audience: string;
  lastGenerated: string;
}

const reportTemplates: ReportTemplate[] = [
  { id: 'cfo-weekly', title: 'CFO Weekly Risk Brief', description: 'Executive summary of top budget risks, anomalies, and recommended actions for the current week', audience: 'CFO, VP Finance', lastGenerated: '2h ago' },
  { id: 'board-finance', title: 'Board Finance Ops Summary', description: 'Board-ready summary of financial health, risk exposure, and operational efficiency highlights', audience: 'Board, CEO, CFO', lastGenerated: 'Yesterday' },
  { id: 'budget-overrun', title: 'Budget Overrun Forecast', description: 'Detailed department-level budget risk analysis with month-end projections and confidence intervals', audience: 'FP&A, Finance Ops', lastGenerated: '4h ago' },
  { id: 'vendor-renewal', title: 'Vendor Renewal Risk Report', description: 'All vendors with upcoming renewals, expected price changes, usage health, and negotiation recommendations', audience: 'Procurement, Finance', lastGenerated: '1 day ago' },
  { id: 'margin-plan', title: 'Margin Efficiency Plan', description: 'Account-level margin analysis with cost-to-serve breakdown and prioritized improvement recommendations', audience: 'CS Ops, RevOps, CFO', lastGenerated: '3h ago' },
  { id: 'dept-budget', title: 'Department Budget Owner Summary', description: 'Per-department budget status, variance explanations, and action items formatted for budget owner review', audience: 'Department Heads', lastGenerated: '8h ago' },
];

const cfoReportPreview = {
  generatedAt: 'June 9, 2025, 2:00 PM',
  period: 'Week of June 9, 2025 — Q2 FY2025',
  executiveSummary: 'Three departments — Engineering, Customer Success, and Marketing — are projected to exceed Q2 budget. Combined overrun risk is $620K. A critical vendor renewal (DataStack, 32 days) carries $120K price increase risk. Enterprise account margin is under pressure, with gross margin projected to decline 2.8% if current cost trajectories continue. AI has generated 7 prioritized action recommendations with combined estimated impact of $1.67M.',
  budgetRisks: [
    { dept: 'Engineering', amount: '$310K overrun', driver: 'AWS compute spike (+38%)', risk: 'High' },
    { dept: 'Customer Success', amount: '$165K overrun', driver: 'Implementation contractor surge', risk: 'High' },
    { dept: 'Marketing', amount: '$145K overrun', driver: 'Paid campaign expansion (Segment C)', risk: 'Medium' },
  ],
  spendAnomalies: [
    { title: 'AWS Compute Spike', impact: '+$210K', status: 'Investigating' },
    { title: 'DataStack Renewal', impact: '+$120K annual', status: 'Action needed' },
    { title: 'Support Contractor Increase', impact: '+$96K', status: 'Open' },
  ],
  marginRisks: '3 enterprise accounts (AlphaCorp, BluePeak Retail, Orbital Logistics) are projecting gross margin 12-18% below portfolio average. Combined margin recovery opportunity: $310K quarterly.',
  vendorRenewals: 'DataStack: 32 days, +18% ($120K impact). SupportFlow: 41 days, +12% ($26K impact). Salesforce: 64 days, +9% — 148 unused seats identified.',
  recommendations: [
    { title: 'Optimize AWS Compute', impact: '$140K this month', owner: 'Engineering Ops' },
    { title: 'Renegotiate DataStack', impact: '$120K annually', owner: 'Procurement' },
    { title: 'Reprice Enterprise Support', impact: '$310K quarterly', owner: 'Customer Success' },
  ],
  totalRisk: '$620K',
};

export default function Reports() {
  const [expanded, setExpanded] = useState<string | null>('cfo-weekly');

  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="AI Reports"
        subtitle="Generate CFO-ready summaries, board updates, and department action plans"
      />
      <div className="p-8 space-y-8">
        {/* Report Templates Grid */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-4">Report Templates</h2>
          <div className="grid grid-cols-3 gap-4">
            {reportTemplates.map((report) => (
              <div
                key={report.id}
                className="bg-slate-900 rounded-xl border border-slate-800 p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-950 rounded-lg flex-shrink-0">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-snug">{report.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{report.description}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <p className="text-xs text-slate-500">Audience: <span className="text-slate-400">{report.audience}</span></p>
                  <p className="text-xs text-slate-500">Last generated: <span className="text-slate-400">{report.lastGenerated}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setExpanded(expanded === report.id ? null : report.id)}
                    className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Generate Report
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === report.id ? null : report.id)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-medium transition-colors border border-slate-700"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CFO Report Preview */}
        {expanded === 'cfo-weekly' && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">CFO Weekly Risk Brief — Preview</h2>
                <p className="text-xs text-slate-400 mt-0.5">Generated {cfoReportPreview.generatedAt} · {cfoReportPreview.period}</p>
              </div>
              <button className="flex items-center gap-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export as PDF
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Executive Summary */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Executive Summary</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{cfoReportPreview.executiveSummary}</p>
              </div>

              {/* Budget Risks */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Budget Risks</h3>
                <div className="space-y-2">
                  {cfoReportPreview.budgetRisks.map((risk, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800 rounded-lg px-4 py-2.5">
                      <span className="text-sm text-white font-medium">{risk.dept}</span>
                      <span className="text-sm text-red-400 font-medium">{risk.amount}</span>
                      <span className="text-xs text-slate-400">{risk.driver}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${risk.risk === 'High' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'}`}>{risk.risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spend Anomalies */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Top Spend Anomalies</h3>
                <div className="space-y-2">
                  {cfoReportPreview.spendAnomalies.map((a, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800 rounded-lg px-4 py-2.5">
                      <span className="text-sm text-white">{a.title}</span>
                      <span className="text-sm text-amber-400 font-medium">{a.impact}</span>
                      <span className="text-xs text-slate-400">{a.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Margin + Vendor */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Margin Risks</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{cfoReportPreview.marginRisks}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Vendor Renewals</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{cfoReportPreview.vendorRenewals}</p>
                </div>
              </div>

              {/* Recommended Actions */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Top 3 Recommended Actions</h3>
                <div className="space-y-2">
                  {cfoReportPreview.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-800 rounded-lg px-4 py-2.5">
                      <span className="w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-white flex-1">{rec.title}</span>
                      <span className="text-sm text-green-400 font-medium">{rec.impact}</span>
                      <span className="text-xs text-slate-400">Owner: {rec.owner}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-red-950 border border-red-800 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-300">Total Financial Risk This Period: <span className="text-red-400">{cfoReportPreview.totalRisk}</span></p>
                <p className="text-xs text-red-400/80 mt-1">Requires CFO review and action approval before end of week.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
