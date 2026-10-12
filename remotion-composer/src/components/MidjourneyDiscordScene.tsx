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

interface MidjourneyDiscordSceneProps {
  promptText?: string;
  quadrants?: [string, string, string, string];
  accentColor?: string;
}

// Discord Sailboat SVG icon for Midjourney
const MidjourneySailboatIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = "#FFFFFF",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 72C35 76 65 76 80 72C75 80 50 83 20 72Z"
      fill={color}
    />
    <path
      d="M48 20L48 68C48 68 32 64 28 44C26 34 38 24 48 20Z"
      fill={color}
    />
    <path
      d="M52 26L52 68C52 68 70 65 72 48C74 38 64 30 52 26Z"
      fill={color}
      opacity={0.9}
    />
  </svg>
);

export const MidjourneyDiscordScene: React.FC<MidjourneyDiscordSceneProps> = ({
  promptText = "a hyperrealistic cyberpunk laboratory in neon Tokyo, volumetric smoke, cinematic lighting, 8k octane render --v 6.0 --ar 16:9",
  quadrants = [
    "midjourney_longform/quadrants/q1.jpg",
    "midjourney_longform/quadrants/q2.jpg",
    "midjourney_longform/quadrants/q3.jpg",
    "midjourney_longform/quadrants/q4.jpg",
  ],
  accentColor = "#5865F2",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance spring for overall UI
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Prompt typing animation (chars 0 to length over 2.5s)
  const typingDurationFrames = fps * 2.2;
  const typedCharCount = Math.floor(
    interpolate(frame, [10, 10 + typingDurationFrames], [0, promptText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentPrompt = promptText.slice(0, typedCharCount);

  // Generation reveal spring (pops in at ~2.8s)
  const genRevealDelay = fps * 2.6;
  const genScale = spring({
    frame: frame - genRevealDelay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const genOpacity = interpolate(
    frame,
    [genRevealDelay, genRevealDelay + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Buttons reveal (pops in at ~3.4s)
  const btnDelay = fps * 3.3;
  const btnOpacity = interpolate(frame, [btnDelay, btnDelay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor animation to click [U1]
  const cursorStartFrame = fps * 4.0;
  const cursorClickFrame = fps * 5.2;
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorClickFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Cursor coords: starts at (1300, 300) and moves to U1 button at (675, 782)
  const cursorX = interpolate(cursorProgress, [0, 1], [1400, 672]);
  const cursorY = interpolate(cursorProgress, [0, 1], [280, 785]);

  const isClicked = frame >= cursorClickFrame;
  const clickPulse = spring({
    frame: frame - cursorClickFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const Container = AbsoluteFill as any;
  const ImgElement = Img as any;

  return (
    <Container
      style={{
        background: "#1E1F22",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Discord App Window Container */}
      <div
        style={{
          width: 1840,
          height: 1020,
          background: "#313338",
          borderRadius: 16,
          boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
          display: "flex",
          overflow: "hidden",
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* 1. Discord Left Server Rail */}
        <div
          style={{
            width: 72,
            background: "#1E1F22",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 14,
            gap: 10,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Discord Direct Message Pill */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "#313338",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#DBDEE1", fontSize: 22, fontWeight: 700 }}>💬</span>
          </div>

          {/* Separator line */}
          <div style={{ width: 32, height: 2, background: "#35363C", borderRadius: 1 }} />

          {/* Midjourney Server Icon with active indicator */}
          <div style={{ position: "relative" }}>
            {/* White active pill on left */}
            <div
              style={{
                position: "absolute",
                left: -12,
                top: 6,
                width: 4,
                height: 36,
                borderRadius: "0 4px 4px 0",
                background: "#FFFFFF",
              }}
            />
            {/* Midjourney Server Badge */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #5865F2",
                boxShadow: "0 0 16px rgba(88, 101, 242, 0.4)",
              }}
            >
              <MidjourneySailboatIcon size={30} />
            </div>
          </div>

          {/* Other community servers */}
          {["🤖", "⚡", "🎨", "🔬"].map((icon, idx) => (
            <div
              key={idx}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: "#313338",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#949BA4",
                fontSize: 18,
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* 2. Channel Sidebar */}
        <div
          style={{
            width: 250,
            background: "#2B2D31",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            borderRight: "1px solid #1F2023",
          }}
        >
          {/* Server Header */}
          <div
            style={{
              height: 52,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #1F2023",
              color: "#F2F3F5",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>Midjourney</span>
              <span
                style={{
                  background: "#5865F2",
                  color: "#FFFFFF",
                  fontSize: 10,
                  padding: "2px 5px",
                  borderRadius: 4,
                  fontWeight: 800,
                }}
              >
                VERIFIED
              </span>
            </div>
            <span style={{ fontSize: 14, color: "#949BA4" }}>▼</span>
          </div>

          {/* Channel categories */}
          <div style={{ padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#949BA4",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                padding: "6px 8px",
              }}
            >
              ── NEWCOMER ROOMS ──
            </div>

            {/* Active Channel: #newbies-42 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "#35373C",
                borderRadius: 6,
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              <span style={{ color: "#949BA4" }}>#</span>
              <span>🎨・newbies-42</span>
            </div>

            {["🎨・newbies-72", "🎨・newbies-102", "🎨・general-chat"].map((ch, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 6,
                  color: "#949BA4",
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                <span>#</span>
                <span>{ch}</span>
              </div>
            ))}

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#949BA4",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                padding: "16px 8px 6px 8px",
              }}
            >
              ── VOICE & STAGES ──
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                color: "#949BA4",
                fontSize: 14,
              }}
            >
              <span>🔊</span>
              <span>Wednesday Office Hours</span>
            </div>
          </div>

          {/* Member stats footer */}
          <div
            style={{
              marginTop: "auto",
              padding: "12px 16px",
              background: "#232428",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: "#7C3AED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              DH
            </div>
            <div>
              <div style={{ color: "#F2F3F5", fontSize: 13, fontWeight: 600 }}>DavidHolz</div>
              <div style={{ color: "#949BA4", fontSize: 11 }}>#0001 (Online)</div>
            </div>
          </div>
        </div>

        {/* 3. Main Chat Viewport */}
        <div
          style={{
            flex: 1,
            background: "#313338",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Channel Top Header */}
          <div
            style={{
              height: 52,
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #202225",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20, color: "#80848E", fontWeight: 700 }}>#</span>
              <span style={{ color: "#F2F3F5", fontSize: 17, fontWeight: 700 }}>newbies-42</span>
              <span style={{ width: 1, height: 18, background: "#3F4147" }} />
              <span style={{ color: "#949BA4", fontSize: 13 }}>
                Active generation feed • 18,412,980 Members
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  background: "#1E1F22",
                  borderRadius: 4,
                  padding: "4px 10px",
                  color: "#949BA4",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>🔍</span>
                <span>Search</span>
              </div>
              <span style={{ color: "#B5BAC1", fontSize: 16 }}>🔔</span>
              <span style={{ color: "#B5BAC1", fontSize: 16 }}>📌</span>
              <span style={{ color: "#B5BAC1", fontSize: 16 }}>👥</span>
            </div>
          </div>

          {/* Chat Feed */}
          <div
            style={{
              flex: 1,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              overflow: "hidden",
            }}
          >
            {/* User Command Message */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                DH
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ color: "#F2F3F5", fontSize: 16, fontWeight: 700 }}>DavidHolz</span>
                  <span style={{ color: "#949BA4", fontSize: 12 }}>Today at 2:48 PM</span>
                </div>
                <div
                  style={{
                    color: "#DBDEE1",
                    fontSize: 15,
                    lineHeight: 1.4,
                    background: "#2B2D31",
                    padding: "6px 12px",
                    borderRadius: 6,
                    display: "inline-block",
                  }}
                >
                  <span style={{ color: "#5865F2", fontWeight: 700 }}>/imagine </span>
                  <span style={{ color: "#00D4FF", fontWeight: 600 }}>prompt: </span>
                  <span>{currentPrompt}</span>
                  {frame < 10 + typingDurationFrames && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 16,
                        background: "#FFFFFF",
                        marginLeft: 4,
                        verticalAlign: "middle",
                        animation: "blink 1s infinite",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Midjourney Bot Output Message */}
            {frame >= genRevealDelay && (
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  opacity: genOpacity,
                  transform: `scale(${genScale})`,
                  transformOrigin: "top left",
                }}
              >
                {/* Bot Avatar */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    background: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #5865F2",
                    flexShrink: 0,
                  }}
                >
                  <MidjourneySailboatIcon size={26} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 900 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#F2F3F5", fontSize: 16, fontWeight: 700 }}>
                      Midjourney Bot
                    </span>
                    <span
                      style={{
                        background: "#5865F2",
                        color: "#FFFFFF",
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "1px 5px",
                        borderRadius: 3,
                      }}
                    >
                      BOT
                    </span>
                    <span style={{ color: "#949BA4", fontSize: 12 }}>Today at 2:48 PM</span>
                  </div>

                  <div style={{ color: "#DBDEE1", fontSize: 15, lineHeight: 1.4 }}>
                    <strong>**{promptText}**</strong>
                    <span style={{ color: "#949BA4" }}> - @DavidHolz (fast)</span>
                  </div>

                  {/* 2x2 Image Generation Grid */}
                  <div
                    style={{
                      width: 760,
                      height: 450,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridTemplateRows: "1fr 1fr",
                      gap: 4,
                      borderRadius: 12,
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    {quadrants.map((qSrc, idx) => (
                      <div key={idx} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                        <ImgElement
                          src={resolveAsset(qSrc)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        {/* Quadrant Number Badge */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: 6,
                            right: 6,
                            background: "rgba(0,0,0,0.65)",
                            backdropFilter: "blur(4px)",
                            color: "#FFFFFF",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: 4,
                          }}
                        >
                          #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons: Row 1 (Upscale) */}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      opacity: btnOpacity,
                    }}
                  >
                    {["U1", "U2", "U3", "U4", "🔄"].map((btn, idx) => {
                      const isU1 = btn === "U1";
                      const active = isU1 && isClicked;
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: "8px 20px",
                            background: active ? "#5865F2" : "#4E5058",
                            color: "#FFFFFF",
                            borderRadius: 6,
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: "pointer",
                            boxShadow: active
                              ? "0 0 16px rgba(88, 101, 242, 0.8)"
                              : "0 2px 4px rgba(0,0,0,0.2)",
                            transform: active ? `scale(${1 + clickPulse * 0.1})` : "scale(1)",
                            transition: "background 0.2s, transform 0.2s",
                          }}
                        >
                          {btn}
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons: Row 2 (Variations) */}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      opacity: btnOpacity,
                    }}
                  >
                    {["V1", "V2", "V3", "V4", "🌐 Web"].map((btn, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 20px",
                          background: "#4E5058",
                          color: "#FFFFFF",
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                      >
                        {btn}
                      </div>
                    ))}
                  </div>

                  {/* Reaction Badges */}
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    {[
                      { emoji: "❤️", count: "1,420" },
                      { emoji: "🔥", count: "892" },
                      { emoji: "🚀", count: "2,150" },
                    ].map((re, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: "#2B2D31",
                          border: "1px solid #3F4147",
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontSize: 13,
                          color: "#DBDEE1",
                        }}
                      >
                        <span>{re.emoji}</span>
                        <span style={{ fontWeight: 600 }}>{re.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div
            style={{
              height: 68,
              padding: "0 20px 20px 20px",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 48,
                background: "#383A40",
                borderRadius: 8,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#949BA4",
                fontSize: 15,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    background: "#4E5058",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  +
                </div>
                <span>Message #newbies-42</span>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 18 }}>
                <span>🎁</span>
                <span>GIF</span>
                <span>🙂</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Simulated Cursor */}
      {frame >= cursorStartFrame && (
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            pointerEvents: "none",
            zIndex: 9999,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5.5 3.2L18.8 12.3C19.7 12.9 19.4 14.3 18.3 14.5L13.1 15.3L15.9 20.8C16.3 21.6 15.8 22.5 15.0 22.8L12.8 23.6C12.0 23.9 11.1 23.4 10.7 22.6L7.9 17.1L4.2 19.8C3.3 20.4 2.1 19.7 2.2 18.6L3.5 4.3C3.6 3.2 4.6 2.6 5.5 3.2Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
    </Container>
  );
};
