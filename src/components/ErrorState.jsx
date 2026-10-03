import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorState({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="inline-error-banner" id="error-state-banner">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <AlertCircle size={18} style={{ color: "#ef4444", flexShrink: 0 }} />
        <div>
          <strong style={{ display: "block", color: "#fca5a5" }}>
            Couldn't analyze this image.
          </strong>
          <span style={{ fontSize: "0.82rem", color: "#e2e8f0" }}>
            {error || "Please try another screenshot or check your connection."}
          </span>
        </div>
      </div>

      {onRetry && (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onRetry}
          style={{ borderColor: "rgba(239, 68, 68, 0.4)", color: "#ffffff" }}
        >
          <RotateCcw size={12} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
