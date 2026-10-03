import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { UploadZone } from "./components/UploadZone";
import { ImagePreview } from "./components/ImagePreview";
import { AnalyzeButton } from "./components/AnalyzeButton";
import { AnalysisProgress } from "./components/AnalysisProgress";
import { AnalysisResult } from "./components/AnalysisResult";
import { ErrorState } from "./components/ErrorState";
import { Footer } from "./components/Footer";
import { HowItWorksModal } from "./components/HowItWorksModal";
import { ExamplesModal } from "./components/ExamplesModal";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { ImageModal } from "./components/ImageModal";
import { PRESET_SCENARIOS } from "./data/presetScenarios";
import { analyzeScreenshot, DEFAULT_GEMMA_MODEL, discoverSupportedGemmaModel } from "./services/aiService";

export function App() {
  // Main state
  const [selectedImage, setSelectedImage] = useState(null); // { dataUrl, fileName, fileSize }
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Modals
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomImgSrc, setZoomImgSrc] = useState(null);

  // Audio Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // API Config - Strictly Gemma 4 Multimodal
  const [activeKey, setActiveKey] = useState(() => {
    return localStorage.getItem("fixlens_gemini_key") || "";
  });
  const [activeModel, setActiveModel] = useState(DEFAULT_GEMMA_MODEL);

  const fileInputRef = useRef(null);

  // Stop audio on unmount or reset
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSaveKey = async (newKey) => {
    setActiveKey(newKey);
    if (newKey) {
      localStorage.setItem("fixlens_gemini_key", newKey);
      try {
        const verified = await discoverSupportedGemmaModel(newKey);
        if (verified) {
          setActiveModel(verified);
        }
      } catch {
        // Fallback to default
      }
    } else {
      localStorage.removeItem("fixlens_gemini_key");
      setActiveModel(DEFAULT_GEMMA_MODEL);
    }
  };

  const handleImageSelected = ({ dataUrl, fileName, fileSize }) => {
    setSelectedImage({ dataUrl, fileName, fileSize });
    setSelectedPresetId(null);
    setDiagnosticResult(null);
    setErrorMessage(null);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setSelectedImage({
      dataUrl: preset.imageDataUri,
      fileName: preset.fileName || `${preset.id}.png`,
      fileSize: preset.fileSize || "1.8 MB"
    });
    setDiagnosticResult(null);
    setErrorMessage(null);
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const result = await analyzeScreenshot({
        imageBase64: selectedImage.dataUrl,
        presetId: selectedPresetId,
        apiKey: activeKey,
        model: activeModel
      });
      setDiagnosticResult(result);
    } catch (err) {
      console.error("Gemma analysis error:", err);
      setErrorMessage(err.message || "Failed to analyze image. Please try another screenshot or check your connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedPresetId(null);
    setDiagnosticResult(null);
    setErrorMessage(null);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleZoom = (dataUrl) => {
    setZoomImgSrc(dataUrl);
    setIsZoomOpen(true);
  };

  const handleToggleSpeech = () => {
    if (!window.speechSynthesis || !diagnosticResult) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const { problemDetected, whyItHappened, quickFix } = diagnosticResult;
    const text = `
      FixLens diagnosis complete. Problem identified: ${problemDetected?.title || "Technical error"}.
      ${whyItHappened?.explanation || ""}
      Recommended quick fix: ${quickFix?.command || ""}.
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="app-wrapper">
      {/* Top Navbar */}
      <Navbar
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenExamples={() => setIsExamplesOpen(true)}
        onTriggerUpload={handleTriggerUpload}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="main-content">
        {/* Landing Hero (shown when no image is selected yet) */}
        {!selectedImage && (
          <Hero
            onTriggerUpload={handleTriggerUpload}
            onSelectExample={() => handleSelectPreset(PRESET_SCENARIOS[0])}
          />
        )}

        {/* Inline Error State */}
        {errorMessage && (
          <div style={{ maxWidth: 840, margin: "1.5rem auto 0" }}>
            <ErrorState error={errorMessage} onRetry={handleAnalyze} />
          </div>
        )}

        {/* Default State: Upload Zone */}
        {!selectedImage && (
          <UploadZone
            onImageSelected={handleImageSelected}
            onSelectPreset={handleSelectPreset}
            fileInputRef={fileInputRef}
          />
        )}

        {/* Side-by-Side Workspace when image is selected */}
        {selectedImage && (
          <div className="workspace-columns" id="active-workspace-columns">
            {/* Left Column: Screenshot Source Image */}
            <div className="workspace-left">
              <ImagePreview
                imageObj={selectedImage}
                onReplace={handleTriggerUpload}
                onRemove={handleReset}
                onZoom={handleZoom}
              />
            </div>

            {/* Right Column: Pre-Analysis CTA OR Loading Progress OR Final Results */}
            <div className="workspace-right">
              {/* Hidden file input for replace action */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      handleImageSelected({
                        dataUrl: ev.target.result,
                        fileName: file.name,
                        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {isAnalyzing && <AnalysisProgress />}

              {!isAnalyzing && !diagnosticResult && (
                <AnalyzeButton onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
              )}

              {!isAnalyzing && diagnosticResult && (
                <AnalysisResult
                  diagnosticResult={diagnosticResult}
                  onReset={handleReset}
                  isSpeaking={isSpeaking}
                  onToggleSpeech={handleToggleSpeech}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <ExamplesModal
        isOpen={isExamplesOpen}
        onClose={() => setIsExamplesOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeKey={activeKey}
        onSaveKey={handleSaveKey}
        activeModel={activeModel}
        onSelectModel={setActiveModel}
      />

      <ImageModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageSrc={zoomImgSrc}
      />
    </div>
  );
}

export default App;
