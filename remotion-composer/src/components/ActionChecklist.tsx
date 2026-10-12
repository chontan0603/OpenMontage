import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface ChecklistTask {
  label: string;
  at: number; // seconds into the cut when this task completes
  detail?: string;
  badge?: string;
}

interface ActionChecklistProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  tasks: ChecklistTask[];
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({
  title = "EXECUTION CHECKLIST",
  subtitle,
  badge = "Verified Operational Protocol",
  tasks,
  accentColor = "#10B981",
  textColor = "#F8FAFC",
  backgroundColor = "rgba(15, 23, 42, 0.92)",
  fontFamily = "'Space Grotesk', 'Inter', -apple-system, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const currentTime = frame / fps;

  // Container entrance
  const containerEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // End fade out
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
        opacity: fadeOut,
        fontFamily,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          background: backgroundColor,
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px ${accentColor}22`,
          padding: "48px 56px",
          transform: `scale(${interpolate(containerEntrance, [0, 1], [0.92, 1])}) translateY(${interpolate(
            containerEntrance,
            [0, 1],
            [30, 0]
          )}px)`,
          opacity: containerEntrance,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.2em",
                fontWeight: 700,
                color: accentColor,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {badge}
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: textColor,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 18, color: "rgba(255, 255, 255, 0.6)", marginTop: 4 }}>
                {subtitle}
              </div>
            )}
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {tasks.filter((t) => currentTime >= t.at).length} / {tasks.length} Completed
          </div>
        </div>

        {/* Task Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {tasks.map((task, idx) => {
            const isCompleted = currentTime >= task.at;
            const checkFrame = Math.round(task.at * fps);
            const checkSpring = spring({
              frame: frame - checkFrame,
              fps,
              config: { damping: 12, stiffness: 140 },
            });

            const rowEntrance = spring({
              frame: frame - idx * 4,
              fps,
              config: { damping: 15, stiffness: 100 },
            });

            return (
              <div
                key={task.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderRadius: 16,
                  background: isCompleted
                    ? "rgba(16, 185, 129, 0.08)"
                    : "rgba(255, 255, 255, 0.03)",
                  border: isCompleted
                    ? `1px solid ${accentColor}55`
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: isCompleted ? `0 0 20px ${accentColor}18` : "none",
                  transform: `translateX(${interpolate(rowEntrance, [0, 1], [-20, 0])}px)`,
                  opacity: rowEntrance,
                  transition: "background 0.3s ease, border 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {/* Checkbox Icon */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: isCompleted ? accentColor : "rgba(255, 255, 255, 0.06)",
                      border: isCompleted ? "none" : "2px solid rgba(255, 255, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: isCompleted
                        ? `scale(${interpolate(checkSpring, [0, 1], [0.6, 1])})`
                        : "scale(1)",
                      boxShadow: isCompleted ? `0 0 12px ${accentColor}88` : "none",
                    }}
                  >
                    {isCompleted && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  {/* Task text */}
                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: isCompleted ? 700 : 500,
                        color: isCompleted ? textColor : "rgba(255, 255, 255, 0.65)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {task.label}
                    </div>
                    {task.detail && (
                      <div
                        style={{
                          fontSize: 14,
                          color: isCompleted ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.4)",
                          marginTop: 3,
                        }}
                      >
                        {task.detail}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                {task.badge ? (
                  <div
                    style={{
                      padding: "4px 12px",
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      background: isCompleted ? `${accentColor}25` : "rgba(255, 255, 255, 0.06)",
                      color: isCompleted ? accentColor : "rgba(255, 255, 255, 0.4)",
                      border: isCompleted ? `1px solid ${accentColor}44` : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {task.badge}
                  </div>
                ) : (
                  isCompleted && (
                    <div
                      style={{
                        padding: "4px 12px",
                        borderRadius: 12,
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        background: `${accentColor}25`,
                        color: accentColor,
                        border: `1px solid ${accentColor}44`,
                      }}
                    >
                      LOCKED
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFillElement>
  );
};
