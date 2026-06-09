import { AlertCircle } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { RiskBadge } from '@/components/common/RiskBadge';
import { vendors } from '@/data/vendors';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { cn } from '@/lib/utils';

const renewalVendors = vendors.filter((v) => v.renewalDays !== undefined);

function UsageHealthBadge({ health }: { health: 'High' | 'Medium' | 'Low' }) {
  const cfg = {
    High: 'text-green-400 bg-green-950',
    Medium: 'text-amber-400 bg-amber-950',
    Low: 'text-red-400 bg-red-950',
  };
  return (
    <span className={cn('text-xs px-2 py-0.5 rounded font-medium', cfg[health])}>{health}</span>
  );
}

export default function VendorInsights() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Vendor Intelligence"
        subtitle="Track vendor spend, renewal risk, pricing changes, and consolidation opportunities"
      />
      <div className="p-8 space-y-8">
        {/* Urgent renewal warning */}
        <div className="bg-red-950/50 border border-red-800 rounded-xl p-5 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-300">2 vendor renewals require immediate action</p>
            <p className="text-xs text-red-400/80 mt-0.5">
              DataStack renewal in <strong>32 days</strong> with 18% expected price increase ($120K annual impact). SupportFlow renewal in 41 days — lock multi-year pricing now.
            </p>
          </div>
        </div>

        {/* Vendor Grid */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-4">All Vendors</h2>
          <div className="grid grid-cols-4 gap-4">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{vendor.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{vendor.insight}</p>
                  </div>
                  <RiskBadge risk={vendor.riskLevel} />
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Monthly Spend</span>
                    <span className="text-white font-medium">{formatCurrency(vendor.monthlySpend)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Change</span>
                    <span className={cn('font-medium', vendor.changePercent > 20 ? 'text-red-400' : vendor.changePercent > 10 ? 'text-amber-400' : 'text-green-400')}>
                      {formatPercent(vendor.changePercent)}
                    </span>
                  </div>
                  {vendor.renewalDays && (
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Renewal</span>
                      <span className={cn('font-medium', vendor.renewalDays < 45 ? 'text-red-400' : 'text-amber-400')}>
                        {vendor.renewalDays} days
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Usage Health</span>
                    <UsageHealthBadge health={vendor.usageHealth} />
                  </div>
                </div>
                <p className="text-xs text-blue-400 border-t border-slate-800 pt-3">{vendor.aiRecommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Risk Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Renewal Risk Summary</h2>
            <p className="text-xs text-slate-400 mt-0.5">{renewalVendors.length} vendors with upcoming renewals</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Vendor', 'Renewal (Days)', 'Annual Contract', 'Expected Increase', 'Usage Health', 'Priority', 'AI Recommendation'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-slate-400 font-medium uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {renewalVendors
                  .slice()
                  .sort((a, b) => (a.renewalDays ?? 999) - (b.renewalDays ?? 999))
                  .map((v) => (
                    <tr key={v.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium text-white">{v.name}</td>
                      <td className="px-5 py-3">
                        <span className={cn(
                          'text-sm font-medium',
                          (v.renewalDays ?? 999) < 45 ? 'text-red-400' : 'text-amber-400',
                        )}>
                          {v.renewalDays} days
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-300">{v.annualContract ? formatCurrency(v.annualContract) : '—'}</td>
                      <td className="px-5 py-3">
                        <span className="text-sm font-medium text-amber-400">{v.expectedIncrease ? `+${v.expectedIncrease}%` : '—'}</span>
                      </td>
                      <td className="px-5 py-3"><UsageHealthBadge health={v.usageHealth} /></td>
                      <td className="px-5 py-3"><RiskBadge risk={v.negotiationPriority} /></td>
                      <td className="px-5 py-3 text-xs text-slate-400 max-w-xs">{v.aiRecommendation}</td>
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
