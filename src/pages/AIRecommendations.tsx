import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { RiskBadge } from '@/components/common/RiskBadge';
import { recommendations } from '@/data/recommendations';
import type { Recommendation } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

type FilterStatus = 'All' | 'Open' | 'Needs review' | 'In progress';

const statusBadgeColors: Record<string, string> = {
  Open: 'bg-blue-950 text-blue-400 border-blue-900',
  'Needs review': 'bg-amber-950 text-amber-400 border-amber-900',
  'In progress': 'bg-purple-950 text-purple-400 border-purple-900',
  Done: 'bg-green-950 text-green-400 border-green-900',
};

function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div
      className={cn(
        'bg-slate-900 rounded-xl border p-6',
        rec.urgency === 'High' ? 'border-red-900' : 'border-slate-800',
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-4">
          <h3 className="text-sm font-semibold text-white leading-snug">{rec.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{rec.category} · Owner: {rec.owner}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <RiskBadge risk={rec.urgency} />
          <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border', statusBadgeColors[rec.status])}>
            {rec.status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-950 border border-green-900 rounded-lg px-3 py-1.5">
          <p className="text-xs text-green-400 font-medium">{formatCurrency(rec.estimatedImpact)} {rec.impactPeriod}</p>
        </div>
        <div className="bg-blue-950 border border-blue-900 rounded-lg px-3 py-1.5">
          <p className="text-xs text-blue-400 font-medium">{rec.confidence}% confidence</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4">{rec.explanation}</p>

      <div className="flex gap-2 flex-wrap">
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">
          Create Jira Task
        </button>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-medium transition-colors border border-slate-700">
          Send Slack Alert
        </button>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-medium transition-colors border border-slate-700">
          Add to CFO Report
        </button>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-medium transition-colors border border-slate-700">
          Mark Reviewed
        </button>
      </div>
    </div>
  );
}

export default function AIRecommendations() {
  const [filter, setFilter] = useState<FilterStatus>('All');

  const filtered = filter === 'All' ? recommendations : recommendations.filter((r) => r.status === filter);

  const totalImpact = recommendations.reduce((sum, r) => sum + r.estimatedImpact, 0);

  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="AI Recommendations"
        subtitle="Prioritized actions to reduce financial risk and improve operational efficiency"
      />
      <div className="p-8 space-y-6">
        {/* Summary */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex items-center gap-6">
          <div className="p-3 bg-blue-950 rounded-xl">
            <Lightbulb className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{recommendations.length} AI-generated recommendations</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Combined estimated impact: <span className="text-green-400 font-medium">{formatCurrency(totalImpact)}</span> across savings and margin recovery
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Generate CFO Summary
            </button>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
              Export All Actions
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-2">
          {(['All', 'Open', 'Needs review', 'In progress'] as FilterStatus[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filter === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200',
              )}
            >
              {f}
              <span className="ml-1.5 text-xs opacity-70">
                {f === 'All' ? recommendations.length : recommendations.filter((r) => r.status === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}
