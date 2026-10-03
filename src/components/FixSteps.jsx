import React, { useState } from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";

export function FixSteps({ stepByStepFix }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!stepByStepFix || !Array.isArray(stepByStepFix) || stepByStepFix.length === 0) return null;

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="steps-card" id="section-step-by-step-fix">
      <div className="section-eyebrow">03 — Step-by-Step Fix</div>

      <div className="steps-list">
        {stepByStepFix.map((step, idx) => {
          const stepNum = step.stepNumber || String(idx + 1).padStart(2, "0");
          const isCopied = copiedIndex === idx;

          return (
            <div key={idx} className="step-row" id={`step-row-${stepNum}`}>
              <div className="step-number">{stepNum}</div>

              <div className="step-content">
                <div className="step-title">{step.title}</div>
                {step.description && <div className="step-desc">{step.description}</div>}

                {step.codeOrCommand && (
                  <div className="step-code-box">
                    <div className="step-code-bar">
                      <span className="step-code-type">
                        {step.commandType === "terminal" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Terminal size={11} /> terminal
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Code2 size={11} /> code
                          </span>
                        )}
                      </span>

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleCopy(step.codeOrCommand, idx)}
                        style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}
                      >
                        {isCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                        <span>{isCopied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <pre className="step-code-text">
                      <code>{step.codeOrCommand}</code>
                    </pre>
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
