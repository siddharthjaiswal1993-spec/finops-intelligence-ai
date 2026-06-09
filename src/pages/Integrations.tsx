import { CheckCircle, Circle } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { integrations } from '@/data/integrations';
import { cn } from '@/lib/utils';

const syncActivity = [
  { source: 'AWS', event: 'Cloud billing data synced — 847 records updated', time: '12 min ago' },
  { source: 'Slack', event: 'Budget alert delivered to #finance-ops', time: '18 min ago' },
  { source: 'Salesforce', event: 'Account ARR data refreshed — 42 accounts', time: '24 min ago' },
  { source: 'Snowflake', event: 'Query cost data synced — $145K MTD', time: '35 min ago' },
  { source: 'Ramp', event: 'Corporate card transactions synced — 214 transactions', time: '2 hours ago' },
];

const categories = [...new Set(integrations.map((i) => i.category))];
const connected = integrations.filter((i) => i.status === 'Connected').length;
const available = integrations.filter((i) => i.status === 'Available').length;

export default function Integrations() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Integrations"
        subtitle="Connect finance, operations, CRM, procurement, and data systems"
      />
      <div className="p-8 space-y-8">
        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="bg-green-950 border border-green-900 rounded-xl px-5 py-3 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-lg font-bold text-white">{connected}</p>
              <p className="text-xs text-green-400">Connected</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3">
            <Circle className="w-5 h-5 text-slate-500" />
            <div>
              <p className="text-lg font-bold text-white">{available}</p>
              <p className="text-xs text-slate-400">Available</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">
            <p className="text-lg font-bold text-white">{integrations.length}</p>
            <p className="text-xs text-slate-400">Total integrations</p>
          </div>
        </div>

        {/* Integration Groups */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryIntegrations = integrations.filter((i) => i.category === category);
            return (
              <div key={category}>
                <h2 className="text-sm font-semibold text-white mb-3">{category}</h2>
                <div className="grid grid-cols-4 gap-4">
                  {categoryIntegrations.map((integration) => (
                    <div
                      key={integration.id}
                      className={cn(
                        'bg-slate-900 rounded-xl border p-5',
                        integration.status === 'Connected' ? 'border-green-900' : 'border-slate-800',
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">{integration.name}</h3>
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full font-medium',
                            integration.status === 'Connected'
                              ? 'bg-green-950 text-green-400'
                              : 'bg-slate-800 text-slate-400',
                          )}
                        >
                          {integration.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{integration.description}</p>
                      {integration.lastSync && (
                        <p className="text-xs text-slate-500 mb-3">Last sync: {integration.lastSync}</p>
                      )}
                      <button
                        className={cn(
                          'w-full text-xs px-3 py-1.5 rounded-lg font-medium transition-colors',
                          integration.status === 'Connected'
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                            : 'bg-blue-600 hover:bg-blue-700 text-white',
                        )}
                      >
                        {integration.status === 'Connected' ? 'Manage' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Activity */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Recent Sync Activity</h2>
          </div>
          <div className="divide-y divide-slate-800">
            {syncActivity.map((activity, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-4">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs font-medium text-slate-300 w-24">{activity.source}</span>
                <span className="text-xs text-slate-400 flex-1">{activity.event}</span>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
