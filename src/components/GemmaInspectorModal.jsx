import React, { useState } from "react";
import { X, Sparkles, Copy, Check, Eye, Cpu, Clock, CheckCircle } from "lucide-react";

export function GemmaInspectorModal({ isOpen, onClose, diagnosticData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !diagnosticData) return null;

  const metadata = diagnosticData.analysisMetadata || {};
  const jsonString = JSON.stringify(diagnosticData, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} id="gemma-inspector-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 740 }}>
        <div className="modal-header">
          <h3>
            <Sparkles size={18} color="#a855f7" />
            <span>Gemma 4 Multimodal Intelligence Inspector</span>
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
            <div className="glass-card" style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>Model Engine</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#38bdf8", marginTop: 4 }}>
                {metadata.model || "Gemma 4 Vision"}
              </div>
            </div>
            <div className="glass-card" style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>Vision Tokens</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#a855f7", marginTop: 4 }}>
                {metadata.visionTokens || 810} tokens
              </div>
            </div>
            <div className="glass-card" style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>Latency</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#34d399", marginTop: 4 }}>
                {metadata.latencyMs || 340} ms
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Eye size={14} color="#38bdf8" /> Raw Gemma 4 Structured Diagnostic JSON
              </span>
              <button
                type="button"
                className={`btn-copy-code ${copied ? "copied" : ""}`}
                onClick={handleCopyJson}
              >
                {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy JSON"}</span>
              </button>
            </div>
            <pre
              className="code-content"
              style={{
                maxHeight: 340,
                fontSize: "0.78rem",
                borderRadius: "var(--radius-sm)",
                background: "#080c14",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              {jsonString}
            </pre>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
