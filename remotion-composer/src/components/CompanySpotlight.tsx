import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export interface CompanySpotlightProps {
  name: string;
  role?: string;
  company?: string;
  logoUrl?: string;
  avatarUrl?: string;
  brollUrl?: string;
  overlayOpacity?: number;
  accentColor?: string;
  headline?: string;
  metrics?: Array<{ label: string; value: string }>;
  tag?: string;
}

export const CompanySpotlight: React.FC<CompanySpotlightProps> = ({
  name,
  role,
  company,
  logoUrl,
  avatarUrl,
  brollUrl,
  overlayOpacity = 0.72,
  accentColor = "#3B82F6",
  headline,
  metrics = [],
  tag = "COMPANY SPOTLIGHT",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background slow push/zoom
  const bgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  // Card entrance with spring
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
    from: 0.9,
    to: 1,
  });

  const cardOpacity = spring({
    frame,
    fps,
    config: { damping: 18 },
  });

  // Avatar / Logo entrance
  const badgeScale = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 120 },
    from: 0.5,
    to: 1,
  });

  // Text entrance
  const textOpacity = spring({
    frame: frame - 8,
    fps,
    config: { damping: 20 },
  });

  const Container = AbsoluteFill as any;
  const ImgElement = Img as any;

  return (
    <Container
      style={{
        position: "relative",
        backgroundColor: "#070B14",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Authentic B-Roll Background with readability overlay */}
      {brollUrl && (
        <ImgElement
          src={resolveAsset(brollUrl)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${bgScale})`,
          }}
        />
      )}

      {/* Dark Vignette & Readability Gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at center, rgba(11, 15, 26, ${Math.max(
            overlayOpacity - 0.2,
            0.5
          )}) 0%, rgba(5, 7, 15, ${overlayOpacity + 0.15}) 100%)`,
        }}
      />

      {/* Main Glassmorphic Showcase Card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "82%",
          maxWidth: 1300,
          padding: "54px 64px",
          backgroundColor: "rgba(15, 23, 42, 0.78)",
          backdropFilter: "blur(24px)",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px ${accentColor}33`,
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Left Column: Portrait / Logo Badge */}
        {(avatarUrl || logoUrl) && (
          <div
            style={{
              position: "relative",
              flexShrink: 0,
              transform: `scale(${badgeScale})`,
            }}
          >
            {avatarUrl ? (
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `4px solid ${accentColor}`,
                  boxShadow: `0 0 35px ${accentColor}55`,
                  position: "relative",
                  backgroundColor: "#1E293B",
                }}
              >
                <ImgElement
                  src={resolveAsset(avatarUrl)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : null}

            {/* If both avatar and company logo exist, anchor company logo on corner */}
            {logoUrl && (
              <div
                style={{
                  position: avatarUrl ? "absolute" : "relative",
                  bottom: avatarUrl ? -10 : undefined,
                  right: avatarUrl ? -10 : undefined,
                  width: avatarUrl ? 80 : 180,
                  height: avatarUrl ? 80 : 180,
                  borderRadius: 18,
                  backgroundColor: "#0F172A",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                }}
              >
                <ImgElement
                  src={resolveAsset(logoUrl)}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Right Column: Information, Role, Metrics */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: textOpacity,
          }}
        >
          {/* Top Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: accentColor,
              backgroundColor: `${accentColor}1A`,
              padding: "6px 14px",
              borderRadius: 20,
              alignSelf: "flex-start",
              border: `1px solid ${accentColor}40`,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: accentColor,
              }}
            />
            {tag}
          </div>

          {/* Founder / Company Name */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>

          {/* Role & Company Affiliation */}
          {(role || company) && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "#94A3B8",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              {role}
              {role && company && <span style={{ color: "#475569" }}>•</span>}
              {company && (
                <span style={{ color: "#E2E8F0", fontWeight: 600 }}>{company}</span>
              )}
            </div>
          )}

          {/* Optional Headline or Thesis Statement */}
          {headline && (
            <div
              style={{
                fontSize: 22,
                color: "#CBD5E1",
                lineHeight: 1.5,
                marginTop: 6,
                fontStyle: "italic",
                borderLeft: `3px solid ${accentColor}`,
                paddingLeft: 14,
              }}
            >
              "{headline}"
            </div>
          )}

          {/* Metrics / Key Stats Grid */}
          {metrics.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`,
                gap: 20,
                marginTop: 18,
                paddingTop: 20,
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {metrics.map((m, idx) => {
                const metricDelay = frame - 12 - idx * 4;
                const metricProgress = spring({
                  frame: metricDelay,
                  fps,
                  config: { damping: 14, stiffness: 100 },
                });
                return (
                  <div key={idx} style={{ opacity: metricProgress }}>
                    <div
                      style={{
                        fontSize: 34,
                        fontWeight: 800,
                        color: accentColor,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 4,
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
