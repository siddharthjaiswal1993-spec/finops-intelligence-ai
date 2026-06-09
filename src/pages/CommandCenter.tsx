import { DollarSign, AlertTriangle, TrendingUp, Lightbulb, Brain, Activity } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { MetricCard } from '@/components/common/MetricCard';
import { AgentStatusCard } from '@/components/common/AgentStatusCard';
import { RiskBadge } from '@/components/common/RiskBadge';
import { departments } from '@/data/departments';
import { agents } from '@/data/agents';
import { anomalies } from '@/data/anomalies';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const alertFeed = [
  { id: 1, severity: 'High', message: 'Engineering budget projected to exceed $310K by month-end', time: '3m ago' },
  { id: 2, severity: 'High', message: 'DataStack renewal due in 32 days — 18% price increase expected', time: '1h ago' },
  { id: 3, severity: 'Medium', message: 'AWS compute spend +38% week-over-week — investigation open', time: '3h ago' },
  { id: 4, severity: 'Medium', message: 'Customer Success forecasted to exceed budget by $165K', time: '5h ago' },
  { id: 5, severity: 'Low', message: 'Salesforce license utilization dropped to 71% — renewal in 64 days', time: '8h ago' },
];

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Finance Operations Command Center"
        subtitle="AI-powered early warning system for budget risk, spend anomalies, and margin efficiency"
      />
      <div className="p-8 space-y-8">
        {/* Metrics row */}
        <div className="grid grid-cols-5 gap-4">
          <MetricCard
            title="Total Monthly Spend"
            value="$4.82M"
            change="+12.4% vs last month"
            changeType="up"
            icon={DollarSign}
          />
          <MetricCard
            title="Forecasted Budget Overrun"
            value="$620K"
            change="Across 3 departments"
            changeType="up"
            icon={TrendingUp}
            alert
          />
          <MetricCard
            title="Active Anomalies"
            value="17"
            change="5 high priority"
            changeType="up"
            icon={AlertTriangle}
            alert
          />
          <MetricCard
            title="Margin Opportunity"
            value="$1.1M"
            change="Potential savings identified"
            changeType="down"
            icon={Lightbulb}
          />
          <MetricCard
            title="AI Confidence"
            value="89%"
            subtitle="18 data sources connected"
            icon={Activity}
          />
        </div>

        {/* AI Executive Brief */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 border border-blue-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-900 rounded-xl flex-shrink-0">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-blue-300 uppercase tracking-wide">AI Executive Brief</p>
                <span className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded-full">Updated 8 min ago</span>
              </div>
              <p className="text-white font-medium mb-1">3 departments at budget risk this month — Engineering, Customer Success, and Marketing.</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Engineering is projected to exceed budget by $310K driven by an AWS compute spike tied to three new enterprise customer workloads.
                Customer Success is tracking $165K over budget due to implementation contractor surge. Marketing is overspending on paid acquisition
                in low-conversion segments. DataStack renewal (32 days out) carries $120K price increase risk. Gross margin compression detected
                on 3 enterprise accounts — AlphaCorp, BluePeak, and Orbital Logistics.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  View Risk Drivers
                </button>
                <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
                  Generate CFO Summary
                </button>
                <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
                  Create Action Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Department Risk Table */}
          <div className="col-span-2 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Department Budget Risk</h2>
              <span className="text-xs text-slate-400">{departments.length} departments</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Department</th>
                    <th className="text-left px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Budget Used</th>
                    <th className="text-right px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Forecasted Overrun</th>
                    <th className="text-center px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Risk</th>
                    <th className="text-left px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Main Driver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {departments.map((dept) => {
                    const pctUsed = Math.round((dept.currentSpend / dept.budget) * 100);
                    return (
                      <tr key={dept.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-3 text-sm font-medium text-white">{dept.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-700 rounded-full h-1.5">
                              <div
                                className={cn('h-1.5 rounded-full', pctUsed > 90 ? 'bg-red-500' : pctUsed > 75 ? 'bg-amber-500' : 'bg-blue-500')}
                                style={{ width: `${Math.min(pctUsed, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400">{pctUsed}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-sm">
                          {dept.variance > 0 ? (
                            <span className="text-red-400 font-medium">+{formatCurrency(dept.variance)}</span>
                          ) : (
                            <span className="text-green-400 font-medium">{formatCurrency(dept.variance)}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <RiskBadge risk={dept.riskLevel} />
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400">{dept.mainDriver}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alert Feed */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Live Alert Feed</h2>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="divide-y divide-slate-800">
              {alertFeed.map((alert) => (
                <div key={alert.id} className="px-5 py-3.5 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                        alert.severity === 'High' ? 'bg-red-500' : alert.severity === 'Medium' ? 'bg-amber-500' : 'bg-blue-500',
                      )}
                    />
                    <div>
                      <p className="text-xs text-slate-200 leading-relaxed">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Agents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">AI Agents — Active</h2>
            <span className="text-xs text-green-400 bg-green-950 px-2 py-1 rounded-full">
              {agents.filter((a) => a.status === 'Active').length} / {agents.length} running
            </span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {agents.map((agent) => (
              <AgentStatusCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Recent Anomalies */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Anomalies</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">View all →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-6 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Anomaly</th>
                  <th className="text-left px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Category</th>
                  <th className="text-right px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Impact</th>
                  <th className="text-center px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Severity</th>
                  <th className="text-left px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Department</th>
                  <th className="text-right px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Detected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {anomalies.slice(0, 5).map((a) => (
                  <tr key={a.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-white">{a.title}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{a.category}</td>
                    <td className="px-4 py-3 text-right text-sm text-red-400 font-medium">+{formatCurrency(a.amountImpact)}</td>
                    <td className="px-4 py-3 text-center"><RiskBadge risk={a.severity} /></td>
                    <td className="px-4 py-3 text-xs text-slate-400">{a.department}</td>
                    <td className="px-4 py-3 text-right text-xs text-slate-500">{a.detectedDaysAgo}d ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
