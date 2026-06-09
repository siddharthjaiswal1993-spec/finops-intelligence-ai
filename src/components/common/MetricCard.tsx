import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  icon: LucideIcon;
  alert?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  icon: Icon,
  alert,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-slate-900 rounded-xl border p-5',
        alert ? 'border-red-800' : 'border-slate-800',
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{title}</p>
          <p className={cn('text-2xl font-bold mt-1.5', alert ? 'text-red-400' : 'text-white')}>
            {value}
          </p>
          {change && (
            <p
              className={cn(
                'text-xs mt-1',
                changeType === 'up'
                  ? 'text-red-400'
                  : changeType === 'down'
                    ? 'text-green-400'
                    : 'text-slate-400',
              )}
            >
              {change}
            </p>
          )}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className={cn('p-2.5 rounded-lg', alert ? 'bg-red-950' : 'bg-slate-800')}>
          <Icon className={cn('w-5 h-5', alert ? 'text-red-400' : 'text-blue-400')} />
        </div>
      </div>
    </div>
  );
}
