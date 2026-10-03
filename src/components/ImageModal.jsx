import React from "react";
import { X } from "lucide-react";

export function ImageModal({ isOpen, onClose, imageSrc }) {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="image-modal-lightbox">
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "90vh", padding: "0.5rem", background: "#050810" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "0.4rem" }}>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close image lightbox">
            <X size={20} />
          </button>
        </div>
        <div style={{ overflow: "auto", textAlign: "center", maxHeight: "80vh" }}>
          <img
            src={imageSrc}
            alt="Full resolution view"
            style={{ maxWidth: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  );
}
