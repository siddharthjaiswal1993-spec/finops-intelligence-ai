import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';

interface ToggleProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}

function Toggle({ label, description, defaultChecked = false }: ToggleProps) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between py-3">
      <div>
        <p className="text-sm text-white font-medium">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ml-6 ${on ? 'bg-blue-600' : 'bg-slate-700'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  options: string[];
  defaultValue?: string;
}

function SelectField({ label, options, defaultValue }: SelectFieldProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-sm text-white font-medium">{label}</p>
      <select
        defaultValue={defaultValue ?? options[0]}
        className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-blue-600"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar title="Settings" subtitle="Configure AI agents, finance controls, security, and notifications" />
      <div className="p-8 max-w-3xl space-y-6">
        {/* AI Configuration */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h2 className="text-sm font-semibold text-white mb-1">AI Configuration</h2>
          <p className="text-xs text-slate-400 mb-4">Control how AI agents operate and generate insights</p>
          <div className="divide-y divide-slate-800">
            <Toggle label="Enable AI Agents" description="Allow agents to continuously monitor and generate insights" defaultChecked />
            <Toggle label="Auto-generate weekly CFO brief" description="Executive Briefing Agent generates draft every Monday 8am" defaultChecked />
            <Toggle label="Anomaly detection — real-time" description="Scan for spend anomalies every 15 minutes" defaultChecked />
            <Toggle label="Budget risk forecasting" description="Run budget forecast models daily" defaultChecked />
            <SelectField label="AI confidence threshold for alerts" options={['70%', '75%', '80%', '85%', '90%']} defaultValue="80%" />
            <SelectField label="Forecasting model" options={['Conservative (90% CI)', 'Standard (80% CI)', 'Aggressive (70% CI)']} defaultValue="Standard (80% CI)" />
          </div>
        </div>

        {/* Finance Controls */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h2 className="text-sm font-semibold text-white mb-1">Finance Controls</h2>
          <p className="text-xs text-slate-400 mb-4">Budget thresholds and approval requirements</p>
          <div className="divide-y divide-slate-800">
            <Toggle label="Require CFO approval for all AI-generated actions" defaultChecked />
            <Toggle label="Budget overrun alert at 85% of monthly budget" defaultChecked />
            <Toggle label="Vendor renewal alerts at 60 days" defaultChecked />
            <SelectField label="Fiscal year" options={['FY2025', 'FY2024', 'Calendar year']} defaultValue="FY2025" />
            <SelectField label="Base currency" options={['USD', 'EUR', 'GBP', 'CAD']} defaultValue="USD" />
            <SelectField label="Budget period" options={['Monthly', 'Quarterly', 'Annual']} defaultValue="Monthly" />
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h2 className="text-sm font-semibold text-white mb-1">Security & Permissions</h2>
          <p className="text-xs text-slate-400 mb-4">Access control and audit settings</p>
          <div className="divide-y divide-slate-800">
            <Toggle label="Enable audit log for all AI actions" defaultChecked />
            <Toggle label="Require 2FA for CFO-level approvals" defaultChecked />
            <Toggle label="Read-only mode for department budget owners" />
            <SelectField label="Session timeout" options={['1 hour', '4 hours', '8 hours', '24 hours']} defaultValue="8 hours" />
            <SelectField label="Data retention" options={['90 days', '1 year', '2 years', '5 years']} defaultValue="1 year" />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h2 className="text-sm font-semibold text-white mb-1">Notifications</h2>
          <p className="text-xs text-slate-400 mb-4">Configure where and when alerts are delivered</p>
          <div className="divide-y divide-slate-800">
            <Toggle label="Slack alerts — #finance-ops channel" defaultChecked />
            <Toggle label="Email alerts for high-priority anomalies" defaultChecked />
            <Toggle label="Weekly digest email" defaultChecked />
            <Toggle label="Jira task auto-creation for approved actions" />
            <SelectField label="Alert frequency" options={['Real-time', 'Hourly digest', 'Daily digest']} defaultValue="Real-time" />
            <SelectField label="Minimum severity for alerts" options={['All', 'Medium and above', 'High only', 'Critical only']} defaultValue="Medium and above" />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            Save Settings
          </button>
          <button className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-2.5 rounded-lg font-medium transition-colors border border-slate-700">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
