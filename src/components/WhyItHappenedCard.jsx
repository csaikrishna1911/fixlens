import React from "react";
import { HelpCircle, Sparkles, Binary } from "lucide-react";

export function WhyItHappenedCard({ whyItHappened }) {
  if (!whyItHappened) return null;

  const { explanation, rootCause } = whyItHappened;

  return (
    <div className="section-why glass-card" id="section-why-it-happened">
      <div className="section-label">
        <HelpCircle size={14} color="#6366f1" />
        <span>2. Why It Happened</span>
      </div>

      <div className="why-grid">
        <div className="why-block">
          <div className="why-block-title">
            <Sparkles size={14} color="#38bdf8" />
            <span>Plain-English Explanation</span>
          </div>
          <p id="plain-english-explanation">{explanation}</p>
        </div>

        {rootCause && (
          <div className="why-block">
            <div className="why-block-title">
              <Binary size={14} color="#a855f7" />
              <span>Technical Root Cause</span>
            </div>
            <p id="technical-root-cause" style={{ color: "#94a3b8", fontSize: "0.86rem" }}>
              {rootCause}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
