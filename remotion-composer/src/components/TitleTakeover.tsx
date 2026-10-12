import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface TitleTakeoverProps {
  title: string;
  supportingLine?: string;
  badge?: string;
  accentColor?: string;
  textColor?: string;
  fontFamily?: string;
  punchScale?: number;
}

export const TitleTakeover: React.FC<TitleTakeoverProps> = ({
  title,
  supportingLine,
  badge = "CORE PRINCIPLE",
  accentColor = "#EC4899",
  textColor = "#FFFFFF",
  fontFamily = "'Space Grotesk', 'Inter', -apple-system, sans-serif",
  punchScale = 1.18,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fast headline punch-in with settle (0 -> 12 frames)
  const punchSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.8 },
  });

  const scale = interpolate(punchSpring, [0, 1], [punchScale, 1.0]);
  const opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Supporting line entrance (triggers at frame 20 / ~0.66s)
  const supportSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const supportOpacity = interpolate(frame, [20, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ending fade
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const AbsoluteFillElement = AbsoluteFill as any;

  return (
    <AbsoluteFillElement
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        opacity: fadeOut,
        overflow: "hidden",
      }}
    >
      {/* Background Grid Lines (creator-motion dark aesthetic) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.6,
        }}
      />

      {/* Radial vignette glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Foreground Content */}
      <div
        style={{
          maxWidth: 1600,
          textAlign: "center",
          padding: "0 60px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Category Pill */}
        {badge && (
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}66`,
              color: accentColor,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 28,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            {badge}
          </div>
        )}

        {/* Oversized Punch Headline */}
        <h1
          style={{
            fontSize: title.length > 25 ? 76 : 94,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: textColor,
            textTransform: "uppercase",
            margin: 0,
            opacity,
            transform: `scale(${scale})`,
            textShadow: `0 10px 40px rgba(0, 0, 0, 0.8), 0 0 60px ${accentColor}44`,
          }}
        >
          {title}
        </h1>

        {/* Subordinate Supporting Statement */}
        {supportingLine && (
          <div
            style={{
              marginTop: 32,
              fontSize: 26,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: 1050,
              lineHeight: 1.35,
              opacity: supportOpacity,
              transform: `translateY(${interpolate(supportSpring, [0, 1], [24, 0])}px)`,
              letterSpacing: "-0.01em",
            }}
          >
            {supportingLine}
          </div>
        )}
      </div>
    </AbsoluteFillElement>
  );
};
