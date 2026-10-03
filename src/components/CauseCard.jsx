import React from "react";

export function CauseCard({ whyItHappened }) {
  if (!whyItHappened) return null;

  const { explanation, rootCause } = whyItHappened;

  return (
    <div className="cause-card" id="section-why-it-happened">
      <div className="section-eyebrow">02 — Why It Happened</div>

      <p className="cause-explanation" id="cause-explanation-text">
        {explanation}
      </p>

      {rootCause && (
        <div className="cause-technical-box" id="cause-root-cause-box">
          <strong>Under the hood: </strong>
          <span>{rootCause}</span>
        </div>
      )}
    </div>
  );
}
