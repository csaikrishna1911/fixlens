import React, { useState } from "react";
import { Zap, Copy, Check, Terminal } from "lucide-react";

export function QuickFixCard({ quickFix }) {
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
    <div className="section-quickfix glass-card" id="section-quick-fix">
      <div className="quickfix-header">
        <Zap size={18} fill="#10b981" />
        <span>4. Quick Fix (1-Liner Solution)</span>
      </div>

      <div className="quickfix-box">
        <div className="quickfix-command" id="quick-fix-command-text">
          $ {command}
        </div>
        <button
          id="copy-quick-fix-btn"
          type="button"
          className={`btn btn-secondary ${copied ? "btn-copy-code copied" : ""}`}
          onClick={handleCopy}
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.8rem", flexShrink: 0 }}
        >
          {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
          <span>{copied ? "Copied!" : "Copy Command"}</span>
        </button>
      </div>

      {description && <div className="quickfix-desc">{description}</div>}
    </div>
  );
}
