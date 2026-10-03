import React from "react";
import { Image as ImageIcon, RefreshCw, Trash2, Maximize2 } from "lucide-react";

export function ImagePreview({ imageObj, onReplace, onRemove, onZoom }) {
  if (!imageObj) return null;

  const { dataUrl, fileName = "screenshot.png", fileSize = "1.8 MB" } = imageObj;

  return (
    <div className="source-image-card" id="source-image-card">
      <div className="source-image-header">
        <span className="source-image-title">
          <ImageIcon size={14} />
          <span>Source image</span>
        </span>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => onZoom(dataUrl)}
          title="Zoom full image"
          id="btn-zoom-image"
          style={{ padding: "0.2rem 0.4rem" }}
        >
          <Maximize2 size={13} />
        </button>
      </div>

      <div className="image-preview-wrapper" onClick={() => onZoom(dataUrl)} style={{ cursor: "pointer" }}>
        <img
          src={dataUrl}
          alt="Technical error screenshot"
          className="image-preview-img"
          id="preview-screenshot-img"
        />
      </div>

      <div className="source-image-footer">
        <div className="source-file-info">
          <span className="source-file-name" title={fileName}>{fileName}</span>
          <span className="source-file-size">{fileSize}</span>
        </div>

        <div className="source-image-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onReplace}
            id="btn-replace-image"
          >
            <RefreshCw size={12} />
            <span>Replace</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onRemove}
            id="btn-remove-image"
            style={{ color: "#ef4444" }}
          >
            <Trash2 size={12} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
