import React from "react";
import { Sparkles, Sliders, Volume2, VolumeX, RotateCcw, ShieldCheck, Terminal } from "lucide-react";

export function Header({
  onOpenSettings,
  onReset,
  hasResult,
  isSpeaking,
  onToggleSpeech,
  onOpenInspector,
  activeKey
}) {
  return (
    <header className="header-bar glass-panel" id="main-header">
      <div className="brand-wrapper">
        <div className="brand-logo-icon">
          <Terminal size={24} color="#ffffff" />
        </div>
        <div className="brand-text">
          <h1>
            FixLens
            <span className="ai-badge">
              <span className="pulse-dot"></span>
              Gemma 4 Vision
            </span>
          </h1>
          <p>See the problem. Understand the problem. Fix it.</p>
        </div>
      </div>

      <div className="header-actions">
        {hasResult && (
          <>
            <button
              id="voice-briefing-btn"
              className={`btn btn-secondary btn-voice ${isSpeaking ? "speaking" : ""}`}
              onClick={onToggleSpeech}
              title={isSpeaking ? "Stop AI Voice Briefing" : "Listen to AI Voice Briefing"}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isSpeaking ? "Stop Voice" : "Audio Brief"}</span>
            </button>

            <button
              id="gemma-inspector-btn"
              className="btn btn-secondary"
              onClick={onOpenInspector}
              title="Inspect Gemma 4 Multimodal Diagnostic Payload"
            >
              <Sparkles size={16} color="#a855f7" />
              <span>AI Inspector</span>
            </button>

            <button
              id="reset-analysis-btn"
              className="btn btn-secondary"
              onClick={onReset}
              title="Upload New Screenshot"
            >
              <RotateCcw size={16} />
              <span>New Scan</span>
            </button>
          </>
        )}

        <button
          id="api-settings-btn"
          className="btn btn-secondary"
          onClick={onOpenSettings}
          title="Configure Gemini / Gemma 4 API Key"
        >
          <Sliders size={16} />
          <span>{activeKey ? "API Key: Active" : "Demo Mode / API"}</span>
        </button>
      </div>
    </header>
  );
}
