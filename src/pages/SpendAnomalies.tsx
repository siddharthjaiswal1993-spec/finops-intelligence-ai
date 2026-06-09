import { useState } from 'react';
import { AlertTriangle, Package, Copy, Ban } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { MetricCard } from '@/components/common/MetricCard';
import { RiskBadge } from '@/components/common/RiskBadge';
import { anomalies } from '@/data/anomalies';
import type { Anomaly, AnomalyStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const statusColors: Record<AnomalyStatus, string> = {
  Open: 'bg-blue-950 text-blue-400 border-blue-900',
  Investigating: 'bg-amber-950 text-amber-400 border-amber-900',
  Reviewed: 'bg-slate-800 text-slate-400 border-slate-700',
  'Action needed': 'bg-red-950 text-red-400 border-red-900',
  Resolved: 'bg-green-950 text-green-400 border-green-900',
};

function StatusBadge({ status }: { status: AnomalyStatus }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border', statusColors[status])}>
      {status}
    </span>
  );
}

function AnomalyDetailPanel({ anomaly }: { anomaly: Anomaly }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-5">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-white">{anomaly.title}</h3>
          <div className="flex gap-2">
            <RiskBadge risk={anomaly.severity} />
            <StatusBadge status={anomaly.status} />
          </div>
        </div>
        <p className="text-xs text-slate-400">Detected {anomaly.detectedDaysAgo} day{anomaly.detectedDaysAgo !== 1 ? 's' : ''} ago · {anomaly.department}{anomaly.vendor ? ` · ${anomaly.vendor}` : ''} · Confidence: {anomaly.confidence}%</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Expected Spend</p>
          <p className="text-lg font-bold text-white">{formatCurrency(anomaly.expectedSpend)}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Projected Actual</p>
          <p className="text-lg font-bold text-red-400">{formatCurrency(anomaly.actualProjected)}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Impact</p>
          <p className="text-lg font-bold text-amber-400">+{formatCurrency(anomaly.amountImpact)}</p>
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-900 rounded-lg p-4">
        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2">AI Root Cause Analysis</p>
        <p className="text-sm text-slate-300 leading-relaxed">{anomaly.rootCause}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Business Impact</p>
        <p className="text-sm text-slate-300 leading-relaxed">{anomaly.businessImpact}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Recommended Action</p>
        <p className="text-sm text-slate-300 leading-relaxed">{anomaly.recommendedAction}</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Assign to Team
        </button>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
          Generate Slack Alert
        </button>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
          Create CFO Note
        </button>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
          Mark Reviewed
        </button>
      </div>
    </div>
  );
}

export default function SpendAnomalies() {
  const [selected, setSelected] = useState<Anomaly>(anomalies[0]);

  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Spend Anomaly Detection"
        subtitle="Detect unusual spend patterns across vendors, tools, cloud, teams, and operational workflows"
      />
      <div className="p-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="High Priority" value="5" change="Require immediate action" changeType="up" icon={AlertTriangle} alert />
          <MetricCard title="Vendor Spikes" value="8" change="Above baseline" changeType="up" icon={Package} />
          <MetricCard title="Duplicate Spend" value="4" change="Overlapping tools detected" changeType="up" icon={Copy} />
          <MetricCard title="Unapproved Patterns" value="3" change="Outside policy" changeType="up" icon={Ban} />
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Anomaly Table */}
          <div className="col-span-3 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white">Detected Anomalies</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Anomaly</th>
                    <th className="text-left px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Category</th>
                    <th className="text-right px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Impact</th>
                    <th className="text-center px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Severity</th>
                    <th className="text-center px-4 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {anomalies.map((a) => (
                    <tr
                      key={a.id}
                      onClick={() => setSelected(a)}
                      className={cn(
                        'cursor-pointer transition-colors',
                        selected.id === a.id ? 'bg-blue-950/40' : 'hover:bg-slate-800/50',
                      )}
                    >
                      <td className="px-6 py-3 text-sm font-medium text-white">{a.title}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">{a.category}</td>
                      <td className="px-4 py-3 text-right text-sm text-red-400 font-medium">+{formatCurrency(a.amountImpact)}</td>
                      <td className="px-4 py-3 text-center"><RiskBadge risk={a.severity} /></td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={a.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="col-span-2">
            <h2 className="text-sm font-semibold text-white mb-3">Anomaly Detail</h2>
            <AnomalyDetailPanel anomaly={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}
