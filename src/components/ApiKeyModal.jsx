import React, { useState } from "react";
import { X, Key, CheckCircle, Info, ExternalLink } from "lucide-react";

export function ApiKeyModal({ isOpen, onClose, activeKey, onSaveKey, activeModel, onSelectModel }) {
  const [keyInput, setKeyInput] = useState(activeKey || "");
  const [selectedModel, setSelectedModel] = useState(
    activeModel && !activeModel.startsWith("gemini") ? activeModel : "gemma-4-26b-a4b-it"
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    onSelectModel(selectedModel);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 700);
  };

  const handleClear = () => {
    setKeyInput("");
    onSaveKey("");
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="api-key-modal">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <h3>
            <Key size={18} color="#38bdf8" />
            <span>AI Model & API Configuration</span>
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body-content">
            <div
              className="alert-banner info"
              style={{ fontSize: "0.82rem", padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)" }}
            >
              <Info size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>Built-in Hackathon Demo Mode:</strong> You do NOT need an API key to test! All 4 built-in preset scenarios and test runs work out of the box with simulated Gemma 4 intelligence.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="api-key-input">
                Google Gemini / Gemma API Key (Optional for live custom photos)
              </label>
              <input
                id="api-key-input"
                type="password"
                className="form-input"
                placeholder="AIzaSy..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              />
              <span style={{ fontSize: "0.74rem", color: "#64748b" }}>
                Stored locally in your browser’s localStorage. Never sent to any third-party server.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="model-select">
                Target Vision Engine
              </label>
              <select
                id="model-select"
                className="form-input"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{ cursor: "pointer" }}
              >
                <option value="gemma-4-26b-a4b-it">Gemma 4 26B MoE (gemma-4-26b-a4b-it - Recommended)</option>
                <option value="gemma-4-31b-it">Gemma 4 31B Dense (gemma-4-31b-it - High Reasoning)</option>
                <option value="gemma-4-12b-it">Gemma 4 12B Unified Multimodal (gemma-4-12b-it)</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem" }}>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                Get a free Google AI Studio API key <ExternalLink size={12} />
              </a>
            </div>

            {saveSuccess && (
              <div style={{ color: "#34d399", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle size={14} /> Settings saved successfully!
              </div>
            )}
          </div>

          <div className="modal-footer-bar">
            {activeKey && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleClear}
                style={{ marginRight: "auto", color: "#f87171" }}
              >
                Clear Key
              </button>
            )}
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" id="save-api-key-btn">
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
