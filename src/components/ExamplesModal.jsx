import React from "react";
import { X, ArrowRight } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/presetScenarios";

export function ExamplesModal({ isOpen, onClose, onSelectPreset }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="examples-modal">
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
        <div className="modal-header-bar">
          <h3>Curated Error Examples</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body-content">
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            Select any real-world technical failure below to load a verified screenshot into FixLens
            for immediate testing.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {PRESET_SCENARIOS.map((preset) => (
              <div
                key={preset.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  transition: "border-color 0.15s ease"
                }}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-mono)",
                        background: "rgba(255,255,255,0.06)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: 3,
                        color: "#94a3b8"
                      }}
                    >
                      {preset.badge}
                    </span>
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-main)" }}>
                      {preset.title}
                    </strong>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {preset.description}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0, marginLeft: 12 }}
                >
                  <span>Load</span>
                  <ArrowRight size={12} />
                </button>
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
