import React from "react";

export function ProblemCard({ problemDetected }) {
  if (!problemDetected) return null;

  const {
    title = "Technical Issue Detected",
    technology = "SYSTEM",
    category = "RUNTIME",
    severity = "HIGH",
    errorSnippet,
    summary
  } = problemDetected;

  const isCritical = severity.toUpperCase() === "CRITICAL" || severity.toUpperCase() === "HIGH";

  return (
    <div className="problem-card" id="section-problem-detected">
      <div className="section-eyebrow">01 — Problem Detected</div>

      <div className="problem-card-top">
        <div className="problem-card-heading">
          <span style={{ color: isCritical ? "#ef4444" : "#f59e0b" }}>●</span>
          <span>{title}</span>
        </div>

        <div className="problem-badges-row">
          {technology && <span className="badge-tag tech">{technology}</span>}
          {category && <span className="badge-tag tech">{category}</span>}
          <span className={`badge-tag ${isCritical ? "severity-high" : "severity-med"}`}>
            {severity}
          </span>
        </div>
      </div>

      {summary && <p className="problem-summary-text">{summary}</p>}

      {errorSnippet && (
        <div className="terminal-snippet" id="error-snippet-box">
          {errorSnippet}
        </div>
      )}
    </div>
  );
}
