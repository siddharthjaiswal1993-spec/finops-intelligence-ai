import { BarChart2, TrendingDown, ArrowUpRight, Zap } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { MetricCard } from '@/components/common/MetricCard';
import { RiskBadge } from '@/components/common/RiskBadge';
import { accounts } from '@/data/accounts';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const marginOpportunities = [
  {
    title: 'Reprice High-Touch Enterprise Accounts',
    impact: '$310K quarterly margin recovery',
    reason: 'AlphaCorp, BluePeak, and Orbital Logistics have gross margins 12-18% below portfolio average due to support and implementation overruns.',
  },
  {
    title: 'Standardize Enterprise Onboarding Playbook',
    impact: '$420K quarterly savings',
    reason: 'Implementation variance across accounts causes 40-60% cost overruns. A standardized playbook reduces custom scope significantly.',
  },
  {
    title: 'Expand High-Margin Accounts',
    impact: '$180K ARR potential',
    reason: 'Northstar Bank and Zenova Health have the highest gross margins (78-79%) and strong usage growth — prime expansion candidates.',
  },
];

export default function MarginIntelligence() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Margin Intelligence"
        subtitle="Identify where operational spend is weakening margins and where efficiency can be improved"
      />
      <div className="p-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Gross Margin" value="71.2%" change="Portfolio average" icon={BarChart2} />
          <MetricCard title="Projected Margin Risk" value="-2.8%" change="Enterprise accounts driving decline" changeType="up" icon={TrendingDown} alert />
          <MetricCard title="Cost-to-Serve Increase" value="+16%" change="vs. prior quarter" changeType="up" icon={ArrowUpRight} alert />
          <MetricCard title="Efficiency Opportunity" value="$1.1M" change="Identified by AI" changeType="down" icon={Zap} />
        </div>

        {/* Account Profitability Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Account Profitability Analysis</h2>
            <p className="text-xs text-slate-400 mt-0.5">ARR, cost-to-serve, gross margin, and risk — sorted by margin risk</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Account', 'ARR', 'Cost to Serve', 'Gross Margin', 'Margin Risk', 'Main Driver', 'AI Recommendation'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {accounts
                  .slice()
                  .sort((a, b) => {
                    const order = { High: 0, Critical: 0, Medium: 1, Low: 2 };
                    return order[a.marginRisk] - order[b.marginRisk];
                  })
                  .map((account) => (
                    <tr key={account.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium text-white">{account.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-300">{formatCurrency(account.arr)}</td>
                      <td className="px-5 py-3 text-sm text-slate-300">{formatCurrency(account.costToServe)}</td>
                      <td className="px-5 py-3">
                        <span className={cn(
                          'text-sm font-medium',
                          account.grossMargin >= 75 ? 'text-green-400' : account.grossMargin >= 65 ? 'text-amber-400' : 'text-red-400',
                        )}>
                          {account.grossMargin}%
                        </span>
                      </td>
                      <td className="px-5 py-3"><RiskBadge risk={account.marginRisk} /></td>
                      <td className="px-5 py-3 text-xs text-slate-400">{account.mainDriver}</td>
                      <td className="px-5 py-3 text-xs text-slate-400 max-w-xs">{account.aiRecommendation}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 border border-blue-800 rounded-xl p-6">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2">AI Margin Intelligence Insight</p>
          <p className="text-white font-medium mb-2">3 enterprise accounts are diluting portfolio gross margin by an estimated 2.8%</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            AlphaCorp, BluePeak Retail, and Orbital Logistics have cost-to-serve ratios that are significantly above contract assumptions.
            Combined support overruns, custom workflow requirements, and implementation scope creep are compressing margins on these accounts.
            Without pricing or delivery model changes, gross margin will continue to decline as enterprise revenue grows.
          </p>
          <div className="flex gap-3">
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Review Pricing Strategy
            </button>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
              Generate Margin Report
            </button>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
              Create Action Plan
            </button>
          </div>
        </div>

        {/* Margin Opportunities */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-4">Margin Improvement Opportunities</h2>
          <div className="grid grid-cols-3 gap-4">
            {marginOpportunities.map((opp, i) => (
              <div key={i} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{opp.title}</h3>
                <p className="text-sm font-medium text-green-400 mb-3">{opp.impact}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{opp.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
