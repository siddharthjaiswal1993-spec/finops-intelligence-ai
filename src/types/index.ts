export type RiskLevel = 'High' | 'Medium' | 'Low' | 'Critical';
export type AnomalyStatus = 'Open' | 'Investigating' | 'Reviewed' | 'Action needed' | 'Resolved';
export type AgentStatus = 'Active' | 'Paused' | 'Error';

export interface Department {
  id: string;
  name: string;
  budget: number;
  currentSpend: number;
  forecastedSpend: number;
  variance: number;
  riskLevel: RiskLevel;
  mainDriver: string;
  spendBreakdown: SpendItem[];
}

export interface SpendItem {
  category: string;
  amount: number;
}

export interface Vendor {
  id: string;
  name: string;
  monthlySpend: number;
  changePercent: number;
  riskLevel: RiskLevel;
  insight: string;
  renewalDays?: number;
  annualContract?: number;
  expectedIncrease?: number;
  usageHealth: 'High' | 'Medium' | 'Low';
  negotiationPriority: 'High' | 'Medium' | 'Low';
  aiRecommendation: string;
}

export interface Account {
  id: string;
  name: string;
  arr: number;
  costToServe: number;
  grossMargin: number;
  marginRisk: RiskLevel;
  mainDriver: string;
  aiRecommendation: string;
}

export interface Anomaly {
  id: string;
  title: string;
  category: string;
  amountImpact: number;
  changePercent: number;
  severity: RiskLevel;
  rootCause: string;
  status: AnomalyStatus;
  detectedDaysAgo: number;
  expectedSpend: number;
  actualProjected: number;
  businessImpact: string;
  recommendedAction: string;
  department: string;
  vendor?: string;
  confidence: number;
}

export interface Recommendation {
  id: string;
  title: string;
  estimatedImpact: number;
  impactPeriod: string;
  urgency: RiskLevel;
  confidence: number;
  owner: string;
  status: 'Open' | 'Needs review' | 'In progress' | 'Done';
  explanation: string;
  category: string;
}

export interface BudgetForecast {
  department: string;
  monthlyBudget: number;
  currentSpend: number;
  forecastedSpend: number;
  variance: number;
  riskLevel: RiskLevel;
  aiConfidence: number;
}

export interface AIAgent {
  id: string;
  name: string;
  status: AgentStatus;
  lastRunMinutes: number;
  insightsGenerated: number;
  confidence: number;
  description: string;
  monitors: string[];
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  status: 'Connected' | 'Available';
  lastSync?: string;
  description: string;
  logo?: string;
}

export interface DemoStep {
  step: number;
  title: string;
  description: string;
  aiExplanation: string;
  status: string;
  financialImpact?: string;
  recommendedAction?: string;
}
