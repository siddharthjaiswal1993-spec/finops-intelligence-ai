import { useState } from 'react';
import { Play, CheckCircle, Clock, Brain } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { demoScenario } from '@/data/demoScenario';
import { cn } from '@/lib/utils';

export default function DemoScenario() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const runDemo = () => {
    setRunning(true);
    setActiveStep(0);
    let step = 0;
    const advance = () => {
      step += 1;
      setActiveStep(step);
      if (step < demoScenario.length - 1) {
        setTimeout(advance, 2000);
      } else {
        setRunning(false);
      }
    };
    setTimeout(advance, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <TopBar
        title="Demo Scenario"
        subtitle="Cloud Spend Spike Creates Margin Risk — Live walkthrough of the FinOps AI workflow"
      />
      <div className="p-8 space-y-6">
        {/* Context card */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 border border-blue-900 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-base font-semibold text-white mb-2">Demo: Cloud Spend Spike Creates Margin Risk</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                This demo walks through how FinOps Intelligence AI detects an AWS compute spike, links it to enterprise customer margin pressure,
                generates prioritized recommendations, and produces a CFO brief — all with human approval at key decision points.
                The entire workflow is triggered automatically by the AI agents and surfaces within minutes of the anomaly appearing.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Characters: Sarah (CFO), Marcus (Engineering Ops), Priya (Finance Ops Manager)</span>
                <span>Duration: ~6 steps</span>
                <span>Financial impact: $620K risk identified</span>
              </div>
            </div>
            <button
              onClick={runDemo}
              disabled={running}
              className={cn(
                'ml-6 flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-colors flex-shrink-0',
                running
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white',
              )}
            >
              <Play className="w-4 h-4" />
              {running ? 'Running...' : 'Run Demo'}
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {demoScenario.map((step) => {
            const isActive = step.step - 1 === activeStep;
            const isComplete = step.step - 1 < activeStep;
            void (step.step - 1 > activeStep); // pending state reserved for future use

            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(step.step - 1)}
                className={cn(
                  'rounded-xl border p-6 cursor-pointer transition-all',
                  isActive
                    ? 'bg-blue-950/40 border-blue-700 shadow-lg shadow-blue-950/50'
                    : isComplete
                      ? 'bg-slate-900 border-green-900'
                      : 'bg-slate-900 border-slate-800 opacity-60',
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0',
                      isComplete
                        ? 'bg-green-600'
                        : isActive
                          ? 'bg-blue-600'
                          : 'bg-slate-700',
                    )}
                  >
                    {isComplete ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-white">{step.step}</span>}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          isComplete ? 'bg-green-950 text-green-400' : isActive ? 'bg-blue-950 text-blue-400' : 'bg-slate-800 text-slate-500',
                        )}
                      >
                        {step.status}
                      </span>
                      {step.financialImpact && (
                        <span className="text-xs text-amber-400 font-medium">{step.financialImpact}</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{step.description}</p>

                    {(isActive || isComplete) && (
                      <>
                        {/* AI Explanation */}
                        <div className="bg-blue-950/60 border border-blue-900 rounded-lg p-4 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide">AI Explanation</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{step.aiExplanation}</p>
                        </div>

                        {step.recommendedAction && (
                          <div className="flex items-center gap-2 text-xs text-amber-300">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Human action required: {step.recommendedAction}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion */}
        {activeStep >= demoScenario.length - 1 && (
          <div className="bg-green-950 border border-green-800 rounded-xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-2">Demo Complete</h3>
            <p className="text-sm text-slate-300 mb-4">
              FinOps Intelligence AI detected $620K in financial risk, linked an AWS compute spike to enterprise margin pressure, generated CFO-ready recommendations, and dispatched action items — all within minutes and with human approval at key decision points.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setActiveStep(0)} className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                Reset Demo
              </button>
              <button className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-2.5 rounded-lg font-medium transition-colors border border-slate-700">
                View Full Documentation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
