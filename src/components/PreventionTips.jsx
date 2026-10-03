import React from "react";
import { Check } from "lucide-react";

export function PreventionTips({ preventionTips }) {
  if (!preventionTips || !Array.isArray(preventionTips) || preventionTips.length === 0) return null;

  return (
    <div className="prevention-card" id="section-prevention-tips">
      <div className="section-eyebrow">05 — Prevention Tips</div>

      <ul className="prevention-list">
        {preventionTips.map((tip, idx) => (
          <li key={idx} className="prevention-item">
            <Check size={16} className="prevention-icon" strokeWidth={2.5} />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
