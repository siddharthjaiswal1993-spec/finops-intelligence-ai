import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types';

const cfg: Record<RiskLevel, string> = {
  Critical: 'bg-red-950 text-red-400 border-red-800',
  High: 'bg-red-950 text-red-400 border-red-900',
  Medium: 'bg-amber-950 text-amber-400 border-amber-900',
  Low: 'bg-green-950 text-green-400 border-green-900',
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        cfg[risk],
      )}
    >
      {risk}
    </span>
  );
}
