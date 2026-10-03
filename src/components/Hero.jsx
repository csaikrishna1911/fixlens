import React from "react";
import { ArrowRight, Sparkles, Image as ImageIcon } from "lucide-react";

export function Hero({ onTriggerUpload, onSelectExample }) {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-eyebrow">
        <Sparkles size={12} />
        <span>AI VISUAL TROUBLESHOOTING</span>
      </div>

      <h1 className="hero-heading">
        See the problem.
        <br />
        Understand the problem.
        <br />
        <span className="accent">Fix it.</span>
      </h1>

      <p className="hero-subtitle">
        Upload a screenshot of an error and let Gemma 4 understand what happened and tell you
        exactly what to do next.
      </p>

      <div className="hero-actions">
        <button
          type="button"
          className="btn btn-primary btn-large"
          onClick={onTriggerUpload}
          id="hero-analyze-cta"
        >
          <span>Analyze a Screenshot</span>
          <ArrowRight size={16} />
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-large"
          onClick={onSelectExample}
          id="hero-example-cta"
        >
          <ImageIcon size={16} />
          <span>See Example</span>
        </button>
      </div>
    </section>
  );
}
