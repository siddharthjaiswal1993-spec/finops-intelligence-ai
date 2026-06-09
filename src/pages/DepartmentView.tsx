import { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TopBar } from '@/components/layout/TopBar';
import { MetricCard } from '@/components/common/MetricCard';
import { RiskBadge } from '@/components/common/RiskBadge';
import { departments } from '@/data/departments';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444', '#f97316'];

export default function DepartmentView() {
  const [selectedId, setSelectedId] = useState<string>('eng');
  const dept = departments.find((d) => d.id === selectedId) ?? departments[0];
  const pctUsed = Math.round((dept.currentSpend / dept.budget) * 100);

  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Department Intelligence"
        subtitle="Budget performance, spend breakdown, and AI insights by department"
      />
      <div className="p-8 space-y-6">
        {/* Department Tabs */}
        <div className="flex gap-2 flex-wrap">
          {departments.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedId === d.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200',
              )}
            >
              {d.name}
              {d.riskLevel === 'High' && (
                <span className="ml-1.5 w-2 h-2 bg-red-500 rounded-full inline-block" />
              )}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Approved Budget" value={formatCurrency(dept.budget)} icon={DollarSign} />
          <MetricCard
            title="Current Spend"
            value={formatCurrency(dept.currentSpend)}
            change={`${pctUsed}% of budget used`}
            changeType={pctUsed > 90 ? 'up' : 'neutral'}
            icon={BarChart2}
          />
          <MetricCard
            title="Forecasted Spend"
            value={formatCurrency(dept.forecastedSpend)}
            change={dept.variance > 0 ? `+${formatCurrency(dept.variance)} over budget` : `${formatCurrency(Math.abs(dept.variance))} under budget`}
            changeType={dept.variance > 0 ? 'up' : 'down'}
            icon={TrendingUp}
            alert={dept.variance > 0}
          />
          <MetricCard
            title="Variance"
            value={`${dept.variance > 0 ? '+' : ''}${formatCurrency(dept.variance)}`}
            change={dept.mainDriver}
            changeType={dept.variance > 0 ? 'up' : 'down'}
            icon={AlertTriangle}
            alert={dept.riskLevel === 'High'}
          />
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Pie Chart */}
          <div className="col-span-3 bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h2 className="text-sm font-semibold text-white mb-1">Spend Breakdown</h2>
            <p className="text-xs text-slate-400 mb-4">Current spend by category — {dept.name}</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dept.spendBreakdown}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  labelLine={false}
                >
                  {dept.spendBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  formatter={(value) => [formatCurrency(Number(value)), '']}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* AI Summary + Details */}
          <div className="col-span-2 space-y-4">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">{dept.name} Summary</h3>
                <RiskBadge risk={dept.riskLevel} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Budget Utilization</span>
                  <span className={cn('font-medium', pctUsed > 90 ? 'text-red-400' : 'text-slate-300')}>{pctUsed}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={cn('h-2 rounded-full', pctUsed > 90 ? 'bg-red-500' : pctUsed > 75 ? 'bg-amber-500' : 'bg-blue-500')}
                    style={{ width: `${Math.min(pctUsed, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Main Risk Driver</span>
                  <span className="text-slate-300">{dept.mainDriver}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-950 border border-blue-900 rounded-xl p-5">
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2">AI Department Analysis</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {dept.riskLevel === 'High'
                  ? `${dept.name} is at high budget risk for this period. The primary driver is ${dept.mainDriver.toLowerCase()}. At current burn rate, the department is projected to exceed budget by ${formatCurrency(dept.variance)}. Immediate review recommended.`
                  : dept.riskLevel === 'Medium'
                    ? `${dept.name} shows moderate budget pressure. ${dept.mainDriver} is causing elevated spend relative to plan. Monitor closely through period end.`
                    : `${dept.name} is tracking well within budget. Current spend trajectory suggests ${formatCurrency(Math.abs(dept.variance))} under budget by period end. No immediate action required.`}
              </p>
            </div>

            {/* Spend breakdown list */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Spend by Category</p>
              <div className="space-y-2">
                {dept.spendBreakdown.map((item, i) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-slate-400">{item.category}</span>
                    </div>
                    <span className="text-xs text-slate-300 font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
