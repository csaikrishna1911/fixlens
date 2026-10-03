import React, { useState } from "react";
import { Sparkles, Copy, Check, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { ProblemCard } from "./ProblemCard";
import { CauseCard } from "./CauseCard";
import { QuickFix } from "./QuickFix";
import { FixSteps } from "./FixSteps";
import { PreventionTips } from "./PreventionTips";

export function AnalysisResult({
  diagnosticResult,
  onReset,
  isSpeaking,
  onToggleSpeech
}) {
  const [copiedSolution, setCopiedSolution] = useState(false);

  if (!diagnosticResult) return null;

  const {
    problemDetected,
    whyItHappened,
    quickFix,
    stepByStepFix,
    preventionTips,
    analysisMetadata = {}
  } = diagnosticResult;

  const handleCopySolution = () => {
    const formatted = `FixLens Diagnostic Report
Problem: ${problemDetected?.title || ""}
Severity: ${problemDetected?.severity || ""} | Tech: ${problemDetected?.technology || ""}

Quick Fix:
$ ${quickFix?.command || ""}

Steps:
${stepByStepFix?.map((s) => `${s.stepNumber || "•"} ${s.title}: ${s.codeOrCommand || ""}`).join("\n")}

Prevention:
${preventionTips?.map((t) => `• ${t}`).join("\n")}
`;
    navigator.clipboard.writeText(formatted);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  return (
    <div className="results-dashboard" id="analysis-results-dashboard">
      {/* Result Header */}
      <div className="result-header-card" id="result-header-card">
        <div className="result-header-left">
          <div className="gemma-label">
            <Sparkles size={13} />
            <span>Gemma 4 Analysis</span>
          </div>
          <div className="result-header-title">
            Here's what I found in your screenshot.
          </div>
          <div className="result-metadata-row">
            <span>Analyzed just now</span>
            <span>•</span>
            <span>Image analysis</span>
            <span>•</span>
            <span style={{ color: "#8b5cf6" }}>
              {analysisMetadata.model || "Gemma 4 Multimodal"}
            </span>
            {analysisMetadata.isLiveApi && (
              <>
                <span>•</span>
                <span style={{ color: "#10b981", fontWeight: 600 }}>● Live API</span>
              </>
            )}
            {analysisMetadata.isPreset && (
              <>
                <span>•</span>
                <span style={{ color: "#94a3b8" }}>Demo Scenario</span>
              </>
            )}
            {analysisMetadata.promptTokens > 0 && (
              <>
                <span>•</span>
                <span>{analysisMetadata.promptTokens} prompt tokens</span>
              </>
            )}
            {analysisMetadata.latencyMs > 0 && (
              <>
                <span>•</span>
                <span>{analysisMetadata.latencyMs}ms</span>
              </>
            )}
          </div>
        </div>

        <div className="result-header-actions">
          {window.speechSynthesis && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onToggleSpeech}
              title={isSpeaking ? "Stop Voice Briefing" : "Listen to Voice Briefing"}
              id="btn-voice-brief"
            >
              {isSpeaking ? <VolumeX size={13} color="#ef4444" /> : <Volume2 size={13} />}
              <span>{isSpeaking ? "Stop" : "Audio Brief"}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopySolution}
            id="btn-copy-solution"
          >
            {copiedSolution ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copiedSolution ? "Copied" : "Copy Solution"}</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onReset}
            id="btn-analyze-another"
          >
            <RotateCcw size={13} />
            <span>Analyze Another Image</span>
          </button>
        </div>
      </div>

      {/* 01 — Problem Detected */}
      <ProblemCard problemDetected={problemDetected} />

      {/* 02 — Why It Happened */}
      <CauseCard whyItHappened={whyItHappened} />

      {/* 04 — Quick Fix (Placed right below cause for fastest developer resolution) */}
      <QuickFix quickFix={quickFix} />

      {/* 03 — Step-by-Step Fix */}
      <FixSteps stepByStepFix={stepByStepFix} />

      {/* 05 — Prevention Tips */}
      <PreventionTips preventionTips={preventionTips} />
    </div>
  );
}
