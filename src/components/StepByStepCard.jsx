import React, { useState } from "react";
import { CheckSquare, Square, Copy, Check, Terminal, AlertCircle, Wrench } from "lucide-react";
import confetti from "canvas-confetti";

export function StepByStepCard({ stepByStepFix }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!stepByStepFix || !Array.isArray(stepByStepFix) || stepByStepFix.length === 0) return null;

  const totalSteps = stepByStepFix.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  const toggleStep = (index) => {
    const nextState = {
      ...completedSteps,
      [index]: !completedSteps[index]
    };
    setCompletedSteps(nextState);

    // If user completed all steps, celebrate with confetti!
    const newCompletedCount = Object.values(nextState).filter(Boolean).length;
    if (newCompletedCount === totalSteps) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="section-steps glass-card" id="section-step-by-step-fix">
      <div className="steps-header">
        <div className="section-label">
          <Wrench size={14} color="#38bdf8" />
          <span>3. Step-by-Step Fix</span>
        </div>
        <div className="steps-progress-pill" id="steps-progress-counter">
          {completedCount} of {totalSteps} Completed
        </div>
      </div>

      <div className="steps-list">
        {stepByStepFix.map((step, idx) => {
          const isDone = !!completedSteps[idx];
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              id={`step-item-${step.stepNumber || idx + 1}`}
              className={`step-card ${isDone ? "completed" : ""}`}
            >
              <button
                type="button"
                className="step-checkbox-btn"
                onClick={() => toggleStep(idx)}
                aria-label={`Mark step ${step.stepNumber || idx + 1} as completed`}
              >
                {isDone ? (
                  <CheckSquare size={20} color="#10b981" />
                ) : (
                  <Square size={20} />
                )}
              </button>

              <div className="step-body">
                <div className="step-title-row">
                  <div className="step-title">
                    <span className="step-num-badge">{step.stepNumber || idx + 1}</span>
                    <span>{step.title}</span>
                  </div>
                </div>

                <div className="step-desc">{step.description}</div>

                {step.codeOrCommand && (
                  <div className="code-command-box">
                    <div className="code-header">
                      <span className="code-tag">
                        {step.commandType === "terminal" ? (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Terminal size={11} /> Terminal Command
                          </span>
                        ) : (
                          "Code / Configuration"
                        )}
                      </span>
                      <button
                        type="button"
                        className={`btn-copy-code ${isCopied ? "copied" : ""}`}
                        onClick={() => handleCopyCode(step.codeOrCommand, idx)}
                        title="Copy command"
                      >
                        {isCopied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                        <span>{isCopied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="code-content">
                      <code>{step.codeOrCommand}</code>
                    </pre>
                  </div>
                )}

                {step.caution && (
                  <div className="step-caution">
                    <AlertCircle size={14} style={{ flexShrink: 0 }} />
                    <span>{step.caution}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
