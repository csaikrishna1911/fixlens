import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, X, Maximize2, Zap, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/presetScenarios";

export function ImageUploader({
  imageSrc,
  setImageSrc,
  selectedPresetId,
  setSelectedPresetId,
  onAnalyze,
  isAnalyzing,
  onZoomImage
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Global paste handler to paste screenshot directly from clipboard
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            setImageSrc(event.target.result);
            setSelectedPresetId(null);
          };
          reader.readAsDataURL(blob);
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [setImageSrc, setSelectedPresetId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setSelectedPresetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setSelectedPresetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setImageSrc(preset.imageDataUri);
  };

  const handleClearImage = () => {
    setImageSrc(null);
    setSelectedPresetId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="uploader-card glass-panel" id="image-uploader-section">
      {/* Preset Scenarios for Instant Demo */}
      <div className="presets-container">
        <div className="presets-header">
          <span>
            <Zap size={14} color="#38bdf8" /> Try Quick Hackathon Demos
          </span>
          <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "none" }}>
            1-Click realistic error logs
          </span>
        </div>
        <div className="preset-cards-grid">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                id={`preset-${preset.id}`}
                type="button"
                className={`preset-chip-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleSelectPreset(preset)}
              >
                <div className="preset-chip-top">
                  <span className="preset-tag">{preset.badge}</span>
                  {isSelected && <CheckCircle2 size={14} color="#38bdf8" />}
                </div>
                <div className="preset-name">{preset.title}</div>
                <div className="preset-desc">{preset.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Zone or Image Preview */}
      {!imageSrc ? (
        <div
          id="dropzone-area"
          className={`dropzone ${isDragOver ? "drag-active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="drop-icon-wrapper">
            <UploadCloud size={28} />
          </div>
          <div className="drop-instructions">
            <h3>Drop screenshot here or click to browse</h3>
            <p>Upload any error message, terminal crash, Windows dialog, or code exception</p>
          </div>
          <div className="drop-hints">
            <span>PNG, JPG, WebP supported</span>
            <span>•</span>
            <span>
              Or press <span className="kbd">Ctrl</span> + <span className="kbd">V</span> to paste
            </span>
          </div>
        </div>
      ) : (
        <div className="preview-container" id="image-preview-container">
          <img src={imageSrc} alt="Problem Screenshot" className="preview-img" id="uploaded-error-image" />
          {isAnalyzing && <div className="scanner-beam"></div>}
          <div className="preview-overlay">
            <button
              id="zoom-image-btn"
              type="button"
              onClick={() => onZoomImage(imageSrc)}
              title="Zoom full image"
            >
              <Maximize2 size={16} />
            </button>
            <button
              id="clear-image-btn"
              type="button"
              onClick={handleClearImage}
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Action Bar */}
      {imageSrc && (
        <div className="action-bar">
          <button
            id="analyze-with-gemma-btn"
            className="btn btn-primary btn-analyze"
            onClick={onAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="pulse-dot"></span>
                <span>Gemma 4 Analyzing Screenshot...</span>
              </>
            ) : (
              <>
                <Play size={18} fill="#fff" />
                <span>Analyze with Gemma 4</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
