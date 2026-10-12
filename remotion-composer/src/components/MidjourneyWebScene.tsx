import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

interface MidjourneyWebSceneProps {
  title?: string;
  images?: string[];
  accentColor?: string;
}

export const MidjourneyWebScene: React.FC<MidjourneyWebSceneProps> = ({
  title = "Midjourney Standalone Web App",
  images = [
    "midjourney_longform/quadrants/q1.jpg",
    "midjourney_longform/quadrants/q2.jpg",
    "midjourney_longform/quadrants/q3.jpg",
    "midjourney_longform/quadrants/q4.jpg",
  ],
  accentColor = "#00D4FF",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance spring
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Slow smooth pan/drift of the masonry grid
  const driftY = interpolate(frame, [0, durationInFrames], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight card pop-in
  const cardDelay = fps * 1.5;
  const cardSpring = spring({
    frame: frame - cardDelay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const Container = AbsoluteFill as any;
  const ImgElement = Img as any;

  return (
    <Container
      style={{
        background: "#08090C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Web App Window Frame */}
      <div
        style={{
          width: 1840,
          height: 1020,
          background: "#0D0E14",
          borderRadius: 16,
          boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* 1. Top Navigation Bar */}
        <div
          style={{
            height: 64,
            padding: "0 28px",
            background: "#08090C",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          {/* Brand Logo & Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                <path d="M20 72C35 76 65 76 80 72C75 80 50 83 20 72Z" fill="#FFFFFF" />
                <path d="M48 20L48 68C48 68 32 64 28 44C26 34 38 24 48 20Z" fill="#FFFFFF" />
                <path d="M52 26L52 68C52 68 70 65 72 48C74 38 64 30 52 26Z" fill="#FFFFFF" opacity={0.8} />
              </svg>
            </div>
            <span style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
              Midjourney
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                color: "#FFFFFF",
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 10,
                fontWeight: 700,
                marginLeft: 4,
              }}
            >
              ALPHA WEB
            </span>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Explore", active: true },
              { label: "Create", active: false },
              { label: "Archive", active: false },
              { label: "Personalize", active: false },
            ].map((tab, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 18px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  color: tab.active ? "#FFFFFF" : "#8E929B",
                  background: tab.active ? "rgba(255,255,255,0.12)" : "transparent",
                  border: tab.active ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Search Bar & User */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 320,
                height: 38,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 19,
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#8E929B",
                fontSize: 13,
              }}
            >
              <span>🔍</span>
              <span>Search 50M+ community prompts...</span>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                background: "#7C3AED",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              DH
            </div>
          </div>
        </div>

        {/* 2. Main Explore Gallery & Masonry Grid */}
        <div
          style={{
            flex: 1,
            padding: "24px 32px",
            position: "relative",
            overflow: "hidden",
            background: "radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
          }}
        >
          {/* Subheader / Mode toggle */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
                Community Showcase (v6.0 Engine)
              </div>
              <div style={{ color: "#8E929B", fontSize: 14 }}>
                Real-time feed of millions of prompts rendered across Google Cloud TPU clusters
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {["Top Rated", "Hot", "Latest", "Collaborative"].map((filter, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 14,
                    fontSize: 12,
                    fontWeight: 600,
                    color: idx === 0 ? "#FFFFFF" : "#6E727D",
                    background: idx === 0 ? "rgba(0, 212, 255, 0.15)" : "transparent",
                    border: idx === 0 ? "1px solid rgba(0, 212, 255, 0.4)" : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>

          {/* Masonry Card Grid with subtle drifting animation */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              gap: 20,
              transform: `translateY(${driftY}px)`,
            }}
          >
            {/* Card 1: Hero Featured Generation */}
            <div
              style={{
                position: "relative",
                height: 560,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              }}
            >
              <ImgElement
                src={resolveAsset(images[0])}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 24,
                }}
              >
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#00D4FF",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    --v 6.0
                  </span>
                  <span
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(6px)",
                      color: "#FFFFFF",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    --ar 16:9
                  </span>
                  <span
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(6px)",
                      color: "#EC4899",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    --stylize 350
                  </span>
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>
                  "Cinematic neo-Tokyo research facility, volumetric golden hour smoke, 8k octane render"
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <span style={{ color: "#949BA4", fontSize: 13 }}>By @DavidHolz • 4,821 ❤️</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ padding: "4px 12px", background: "rgba(255,255,255,0.15)", borderRadius: 6, color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>
                      Upscale
                    </div>
                    <div style={{ padding: "4px 12px", background: "rgba(255,255,255,0.15)", borderRadius: 6, color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>
                      Vary (Subtle)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Two cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  height: 270,
                  borderRadius: 14,
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <ImgElement
                  src={resolveAsset(images[1])}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    background: "rgba(0,0,0,0.75)",
                    padding: "4px 10px",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Quantum Silicon Cores • 2.1k ❤️
                </div>
              </div>

              <div
                style={{
                  height: 270,
                  borderRadius: 14,
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <ImgElement
                  src={resolveAsset(images[2])}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    background: "rgba(0,0,0,0.75)",
                    padding: "4px 10px",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Datacenter Cloud Optical Grid • 3.4k ❤️
                </div>
              </div>
            </div>

            {/* Column 3: Detail Inspector Card */}
            <div
              style={{
                background: "rgba(18, 20, 28, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transform: `scale(${cardSpring})`,
                boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
              }}
            >
              <div style={{ color: "#00D4FF", fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>
                Generation Parameter Inspector
              </div>

              <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700 }}>
                Midjourney v6 Core Features
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "#949BA4" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 6 }}>
                  <span>Engine:</span>
                  <strong style={{ color: "#FFFFFF" }}>Midjourney v6.0</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 6 }}>
                  <span>Resolution:</span>
                  <strong style={{ color: "#FFFFFF" }}>2048 × 2048 (Upscaled)</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 6 }}>
                  <span>Hardware Cluster:</span>
                  <strong style={{ color: "#00D4FF" }}>Google Cloud TPU v4</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 6 }}>
                  <span>Render Latency:</span>
                  <strong style={{ color: "#10B981" }}>1.48 seconds</strong>
                </div>
              </div>

              <div style={{ height: 160, borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <ImgElement
                  src={resolveAsset(images[3])}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  marginTop: "auto",
                  padding: "10px",
                  background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                  borderRadius: 8,
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                100% Bootstrap Architecture
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
