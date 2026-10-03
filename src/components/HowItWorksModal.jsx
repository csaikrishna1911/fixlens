import React from "react";
import { X, Scan, Eye, Wrench, ShieldCheck } from "lucide-react";

export function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    {
      num: "01",
      icon: <Scan size={18} color="#3b82f6" />,
      title: "Visual Ingestion",
      desc: "Upload or paste any screenshot of terminal errors, IDE bugs, Windows exceptions, or build failures directly into FixLens."
    },
    {
      num: "02",
      icon: <Eye size={18} color="#8b5cf6" />,
      title: "Gemma 4 Multimodal Vision",
      desc: "Gemma 4 tokenizes the visual image directly, reading OCR characters, stack trace line numbers, and error codes from the raw pixels."
    },
    {
      num: "03",
      icon: <Wrench size={18} color="#10b981" />,
      title: "Root Cause & Actionable Fixes",
      desc: "FixLens formulates a plain-language explanation of what broke, provides a 1-line quick fix, and generates ordered step-by-step remediation commands."
    },
    {
      num: "04",
      icon: <ShieldCheck size={18} color="#f59e0b" />,
      title: "Proactive Prevention",
      desc: "Learn best practices and configuration adjustments so you never face the same frustrating error again."
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} id="how-it-works-modal">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <h3>How FixLens Works</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body-content">
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            FixLens is designed around a single core principle:{" "}
            <strong style={{ color: "var(--text-main)" }}>
              IMAGE → GEMMA 4 → UNDERSTANDING → ACTIONABLE FIX
            </strong>
            . We avoid generic chatbots in favor of deep visual reasoning.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {steps.map((st) => (
              <div
                key={st.num}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.85rem 1rem",
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ flexShrink: 0, marginTop: 2 }}>{st.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-main)", marginBottom: 2 }}>
                    {st.num}. {st.title}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
                    {st.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer-bar">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
