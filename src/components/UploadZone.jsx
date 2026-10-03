import React, { useState, useRef, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/presetScenarios";

export function UploadZone({ onImageSelected, onSelectPreset, fileInputRef }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const internalInputRef = useRef(null);
  const activeInputRef = fileInputRef || internalInputRef;

  // Handle global clipboard paste (Ctrl+V or Win+Shift+S paste)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              onImageSelected({
                dataUrl: event.target.result,
                fileName: "clipboard-screenshot.png",
                fileSize: `${(blob.size / (1024 * 1024)).toFixed(1)} MB`
              });
            };
            reader.readAsDataURL(blob);
          }
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onImageSelected]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image exceeds maximum 10MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelected({
          dataUrl: event.target.result,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image exceeds maximum 10MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelected({
          dataUrl: event.target.result,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="workspace-wrapper" id="upload-workspace">
      <div
        className={`upload-zone ${isDragOver ? "dragover" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => activeInputRef.current?.click()}
        id="dropzone-box"
      >
        <input
          ref={activeInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          style={{ display: "none" }}
          onChange={handleFileChange}
          id="hidden-file-input"
        />

        <div className="upload-icon-box">
          <UploadCloud size={24} />
        </div>

        <div>
          <div className="upload-text-title">Drop your screenshot here</div>
          <div className="upload-text-browse">
            or <span>click to browse</span> from your computer
          </div>
        </div>

        <div className="upload-meta-footer">
          PNG, JPG, WEBP • Up to 10MB • Or paste with Ctrl+V
        </div>
      </div>

      {/* Instant Demo Examples Strip */}
      <div className="examples-strip">
        <span className="examples-strip-label">Try instant example:</span>
        {PRESET_SCENARIOS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="example-chip"
            onClick={() => onSelectPreset(preset)}
            id={`preset-btn-${preset.id}`}
          >
            <span style={{ color: "#3b82f6" }}>●</span>
            <span>{preset.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
