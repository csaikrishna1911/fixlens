import React, { useState } from "react";
import { Zap, Copy, Check } from "lucide-react";

export function QuickFix({ quickFix }) {
  const [copied, setCopied] = useState(false);

  if (!quickFix) return null;

  const { command, description } = quickFix;

  const handleCopy = () => {
    if (command) {
      navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="quickfix-card" id="section-quick-fix">
      <div className="quickfix-header">
        <div className="quickfix-label">
          <Zap size={14} fill="#10b981" />
          <span>04 — Quick Fix</span>
        </div>
        <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 600 }}>
          Fastest Resolution
        </span>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Run this command:
      </div>

      <div className="quickfix-terminal">
        <code className="quickfix-code" id="quickfix-command-line">
          $ {command}
        </code>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCopy}
          id="btn-copy-quickfix"
          style={{ flexShrink: 0 }}
        >
          {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy command"}</span>
        </button>
      </div>

      {description && <div className="quickfix-desc">{description}</div>}
    </div>
  );
}
