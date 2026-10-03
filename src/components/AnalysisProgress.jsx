import React, { useState, useEffect } from "react";
import { Check, Sparkles } from "lucide-react";

export function AnalysisProgress() {
  const [activeStep, setActiveStep] = useState(2); // 0-indexed: 0 and 1 start done, 2 is active

  useEffect(() => {
    const t1 = setTimeout(() => setActiveStep(3), 600);
    const t2 = setTimeout(() => setActiveStep(4), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const steps = [
    { id: 0, text: "Image received" },
    { id: 1, text: "Visual elements detected" },
    { id: 2, text: "Identifying the problem" },
    { id: 3, text: "Understanding the cause" },
    { id: 4, text: "Generating solution" }
  ];

  return (
    <div className="analysis-progress-card" id="analysis-progress-card">
      <div className="progress-card-header">
        <div className="progress-eyebrow">
          <Sparkles size={13} />
          <span>Gemma 4 Multimodal Engine</span>
        </div>
        <h3 className="progress-title">Analyzing your screenshot</h3>
      </div>

      <div className="progress-timeline">
        {steps.map((step) => {
          const isDone = activeStep > step.id;
          const isCurrent = activeStep === step.id;

          return (
            <div
              key={step.id}
              className={`progress-step ${isDone ? "done" : isCurrent ? "current" : ""}`}
            >
              <div className="progress-step-icon">
                {isDone ? (
                  <Check size={14} color="#10b981" strokeWidth={2.5} />
                ) : isCurrent ? (
                  <div className="pulse-circle"></div>
                ) : (
                  <div className="empty-circle"></div>
                )}
              </div>
              <span>{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
