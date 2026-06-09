import { DollarSign, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TopBar } from '@/components/layout/TopBar';
import { MetricCard } from '@/components/common/MetricCard';
import { RiskBadge } from '@/components/common/RiskBadge';
import { budgetForecasts } from '@/data/budgetForecasts';
import { recommendations } from '@/data/recommendations';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const chartData = budgetForecasts.map((f) => ({
  name: f.department.length > 8 ? f.department.slice(0, 8) : f.department,
  Budget: Math.round(f.monthlyBudget / 1000),
  'Current Spend': Math.round(f.currentSpend / 1000),
  Forecast: Math.round(f.forecastedSpend / 1000),
}));

const highRiskRecs = recommendations.filter((r) => r.urgency === 'High').slice(0, 3);

export default function BudgetRisk() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Budget Risk Forecasting"
        subtitle="Predict which teams, projects, and vendors are likely to exceed budget before financial close"
      />
      <div className="p-8 space-y-8">
        {/* Summary metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Approved Budget" value="$4.4M" subtitle="Combined all departments" icon={DollarSign} />
          <MetricCard title="Current Spend" value="$3.72M" change="84.5% of budget used" changeType="up" icon={BarChart2} />
          <MetricCard title="Forecasted Spend" value="$5.02M" change="+$620K above budget" changeType="up" icon={TrendingUp} alert />
          <MetricCard title="Projected Overrun" value="$620K" change="3 departments at risk" changeType="up" icon={AlertTriangle} alert />
        </div>

        {/* Bar Chart */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h2 className="text-sm font-semibold text-white mb-1">Department Budget vs. Forecast</h2>
          <p className="text-xs text-slate-400 mb-6">Monthly budget, current spend, and AI-forecasted spend by department (in $K)</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v: number) => `$${v}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
                formatter={(value) => [`$${value}K`, '']}
              />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              <Bar dataKey="Budget" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Current Spend" fill="#14b8a6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Forecast" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Forecast Explanation */}
        <div className="bg-slate-900 rounded-xl border border-blue-900 p-6">
          <h2 className="text-sm font-semibold text-blue-300 mb-3">AI Forecast Explanation</h2>
          <ul className="space-y-2">
            {[
              'Engineering is projected to overspend by $310K driven by a 38% AWS compute spike tied to three new enterprise customer workloads running untagged infrastructure.',
              'Customer Success is tracking $165K over budget due to an enterprise onboarding surge requiring additional contractor hours.',
              'Marketing is projected to exceed budget by $145K due to paid acquisition campaigns in low-conversion segments (Segment C) without proportional revenue impact.',
              'Sales and Operations are on track — both departments are forecasted to end below budget.',
              'AI confidence is 89% across all forecasts, based on 18 days of Q2 burn rate data combined with historical Q2 seasonality patterns.',
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Budget Risk Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Department Budget Risk Detail</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Department', 'Monthly Budget', 'Current Spend', 'Forecasted Spend', 'Variance', 'Risk Level', 'AI Confidence'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {budgetForecasts.map((f) => (
                  <tr key={f.department} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-white">{f.department}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{formatCurrency(f.monthlyBudget)}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{formatCurrency(f.currentSpend)}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{formatCurrency(f.forecastedSpend)}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={cn('font-medium', f.variance > 0 ? 'text-red-400' : 'text-green-400')}>
                        {f.variance > 0 ? '+' : ''}{formatCurrency(f.variance)}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <RiskBadge risk={f.riskLevel} />
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-300">{f.aiConfidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Actions */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-4">Recommended Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            {highRiskRecs.map((rec) => (
              <div key={rec.id} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white leading-snug">{rec.title}</h3>
                  <RiskBadge risk={rec.urgency} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{rec.explanation}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Estimated Impact</span>
                    <span className="text-green-400 font-medium">{formatCurrency(rec.estimatedImpact)} {rec.impactPeriod}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Owner</span>
                    <span className="text-slate-300">{rec.owner}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">AI Confidence</span>
                    <span className="text-blue-400">{rec.confidence}%</span>
                  </div>
                </div>
                <button className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Create Action Item
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
