import React from "react";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="app-footer">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>
        <Terminal size={14} color="#3b82f6" />
        <strong style={{ color: "var(--text-main)" }}>FixLens</strong>
        <span>—</span>
        <span>AI Visual Troubleshooter powered by Gemma 4</span>
      </div>
      <div>
        Built for developers, engineers, and learners to turn error screenshots into actionable fixes.
      </div>
    </footer>
  );
}
