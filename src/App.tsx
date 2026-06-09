import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import CommandCenter from '@/pages/CommandCenter';
import BudgetRisk from '@/pages/BudgetRisk';
import SpendAnomalies from '@/pages/SpendAnomalies';
import MarginIntelligence from '@/pages/MarginIntelligence';
import VendorInsights from '@/pages/VendorInsights';
import DepartmentView from '@/pages/DepartmentView';
import AIRecommendations from '@/pages/AIRecommendations';
import Reports from '@/pages/Reports';
import Integrations from '@/pages/Integrations';
import DemoScenario from '@/pages/DemoScenario';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<CommandCenter />} />
          <Route path="/budget-risk" element={<BudgetRisk />} />
          <Route path="/anomalies" element={<SpendAnomalies />} />
          <Route path="/margin" element={<MarginIntelligence />} />
          <Route path="/vendors" element={<VendorInsights />} />
          <Route path="/departments" element={<DepartmentView />} />
          <Route path="/recommendations" element={<AIRecommendations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/demo" element={<DemoScenario />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
