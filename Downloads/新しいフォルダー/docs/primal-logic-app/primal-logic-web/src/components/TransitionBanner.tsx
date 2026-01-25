import React from "react";

interface TransitionBannerProps {
  progress: number;
  onClick: () => void;
}

export default function TransitionBanner({ progress, onClick }: TransitionBannerProps) {
  return (
    <div className="transition-banner" onClick={onClick} style={{
      background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
      padding: "12px",
      borderRadius: "8px",
      margin: "16px",
      color: "white",
      cursor: "pointer"
    }}>
      <div className="banner-content">
        <strong>🦁 Carnivore Transition</strong>
        <div className="progress-bar-bg" style={{ background: "rgba(255,255,255,0.3)", height: "4px", marginTop: "8px", borderRadius: "2px" }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, background: "white", height: "100%", borderRadius: "2px" }} />
        </div>
        <div style={{ fontSize: "12px", marginTop: "4px" }}>{progress}% Complete</div>
      </div>
    </div>
  );
}
