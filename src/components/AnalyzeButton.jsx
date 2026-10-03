import React from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function AnalyzeButton({ onAnalyze, isAnalyzing }) {
  return (
    <div className="ready-analyze-card" id="ready-analyze-box">
      <div className="ready-badge">
        <CheckCircle2 size={13} />
        <span>Image ready for analysis</span>
      </div>

      <h2 className="ready-title">Let Gemma 4 troubleshoot this</h2>

      <p className="ready-desc">
        Gemma 4 will scan the error trace, identify the underlying root cause, and formulate
        an actionable resolution plan with copy-paste terminal commands.
      </p>

      <button
        type="button"
        className="btn btn-primary btn-large"
        onClick={onAnalyze}
        disabled={isAnalyzing}
        id="btn-analyze-gemma"
        style={{ minWidth: "260px", padding: "0.85rem 1.75rem", fontSize: "1rem" }}
      >
        <Sparkles size={16} />
        <span>{isAnalyzing ? "Analyzing..." : "Analyze with Gemma 4"}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
