import React from "react";
import { Scan, Sliders } from "lucide-react";

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Navbar({ onOpenHowItWorks, onOpenExamples, onTriggerUpload, onOpenSettings }) {
  return (
    <nav className="navbar" id="app-navbar">
      <div className="navbar-container">
        {/* Left: Brand */}
        <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="brand-icon-box">
            <Scan size={16} />
          </div>
          <span className="brand-title">FixLens</span>
          <span className="brand-badge">AI Troubleshooter</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-links">
          <button type="button" className="nav-link" onClick={onOpenHowItWorks} id="nav-how-it-works">
            How it works
          </button>
          <button type="button" className="nav-link" onClick={onOpenExamples} id="nav-examples">
            Examples
          </button>
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenSettings?.();
            }}
            title="AI Model & Key Settings"
            id="nav-settings-btn"
            aria-label="Open settings"
            style={{ cursor: "pointer", pointerEvents: "auto" }}
          >
            <Sliders size={14} style={{ pointerEvents: "none" }} />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm"
            title="GitHub Repository"
            id="nav-github-link"
          >
            <GithubIcon size={15} />
          </a>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onTriggerUpload}
            id="nav-analyze-cta"
          >
            Analyze
          </button>
        </div>
      </div>
    </nav>
  );
}
