import React from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

export function PreventionCard({ preventionTips }) {
  if (!preventionTips || !Array.isArray(preventionTips) || preventionTips.length === 0) return null;

  return (
    <div className="section-prevention glass-card" id="section-prevention-tips">
      <div className="prevention-header">
        <ShieldCheck size={18} color="#c084fc" />
        <span>5. Prevention Tips (Best Practices)</span>
      </div>

      <ul className="prevention-list">
        {preventionTips.map((tip, idx) => (
          <li key={idx} className="prevention-item">
            <CheckCircle size={15} className="prevention-item-icon" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
