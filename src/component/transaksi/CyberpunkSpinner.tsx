import React from "react";

type CyberpunkSpinnerProps = {
  size?: number;
  text?: string;
};

const CyberpunkSpinner: React.FC<CyberpunkSpinnerProps> = ({
  size = 80,
  text = "LOADING",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div
        className="relative rounded-full border-4 border-cyan-400/30"
        style={{
          width: size,
          height: size,
        }}
      >
        <div
          className="absolute inset-0 rounded-full border-t-4 border-fuchsia-500"
          style={{
            animation: "spin 1.2s linear infinite",
            boxShadow: "0 0 18px #ff00ff",
          }}
        />
        <div
          className="absolute inset-1 rounded-full border border-cyan-300/40"
          style={{
            boxShadow: "0 0 12px #00ffff",
          }}
        />
      </div>

      {/* Cyberpunk text */}
      <div className="relative font-mono text-sm tracking-widest uppercase">
        <span className="text-cyan-300">{text}</span>
        <span
          className="absolute left-0 top-0 text-fuchsia-500 opacity-70"
          style={{
            animation: "pulse 1s infinite",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default CyberpunkSpinner;
