import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Package,
  Building2,
  Lightbulb,
  FileText,
  Plug,
  Settings,
  Play,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Command Center' },
  { to: '/budget-risk', icon: TrendingUp, label: 'Budget Risk' },
  { to: '/anomalies', icon: AlertTriangle, label: 'Spend Anomalies' },
  { to: '/margin', icon: BarChart3, label: 'Margin Intelligence' },
  { to: '/vendors', icon: Package, label: 'Vendor Insights' },
  { to: '/departments', icon: Building2, label: 'Departments' },
  { to: '/recommendations', icon: Lightbulb, label: 'AI Recommendations' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/integrations', icon: Plug, label: 'Integrations' },
  { to: '/demo', icon: Play, label: 'Demo Scenario' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">FinOps AI</p>
            <p className="text-xs text-slate-400">Intelligence Platform</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
              )
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pb-4 border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-500">FY2025 · Q2 · Finance Ops</p>
      </div>
    </aside>
  );
}
