import React from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

export function EmptyState({ onUploadClick }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1.5rem",
        color: "var(--text-muted)",
        border: "1px dashed var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-surface)"
      }}
    >
      <ImageIcon size={32} style={{ color: "var(--text-dim)", marginBottom: "0.75rem" }} />
      <h4 style={{ color: "var(--text-main)", marginBottom: "0.25rem", fontSize: "1rem" }}>
        No screenshot selected
      </h4>
      <p style={{ fontSize: "0.84rem", maxWidth: "340px", margin: "0 auto 1.25rem" }}>
        Upload or paste a screenshot of your technical error to start visual troubleshooting.
      </p>
      <button type="button" className="btn btn-secondary btn-sm" onClick={onUploadClick}>
        <UploadCloud size={14} />
        <span>Select Screenshot</span>
      </button>
    </div>
  );
}
