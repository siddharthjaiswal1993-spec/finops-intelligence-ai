import type { AIAgent } from '@/types';
import { cn } from '@/lib/utils';

export function AgentStatusCard({ agent }: { agent: AIAgent }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-white">{agent.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{agent.description}</p>
        </div>
        <span
          className={cn(
            'flex items-center gap-1.5 text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2',
            agent.status === 'Active'
              ? 'bg-green-950 text-green-400'
              : 'bg-slate-800 text-slate-400',
          )}
        >
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              agent.status === 'Active' ? 'bg-green-400' : 'bg-slate-500',
            )}
          />
          {agent.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-lg font-bold text-white">{agent.insightsGenerated}</p>
          <p className="text-xs text-slate-500">Insights</p>
        </div>
        <div>
          <p className="text-lg font-bold text-blue-400">{agent.confidence}%</p>
          <p className="text-xs text-slate-500">Confidence</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-300">{agent.lastRunMinutes}m</p>
          <p className="text-xs text-slate-500">Last run</p>
        </div>
      </div>
    </div>
  );
}
