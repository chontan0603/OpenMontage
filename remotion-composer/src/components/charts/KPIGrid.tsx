import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface Metric {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  change?: number | string;
  unit?: string;
  icon?: string;
}

type KPIAnimationStyle = "count-up" | "pop" | "cascade";

interface KPIGridProps {
  metrics: Metric[];
  title?: string;
  columns?: 2 | 3 | 4;
  colors?: string[];
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  positiveColor?: string;
  negativeColor?: string;
  animationStyle?: KPIAnimationStyle;
}

export const KPIGrid: React.FC<KPIGridProps> = ({
  metrics = [],
  title,
  columns = 4,
  colors = ["#EC4899", "#7C3AED", "#06B6D4", "#F59E0B"],
  fontFamily = "Space Grotesk, Inter, system-ui, sans-serif",
  textColor = "#F8FAFC",
  backgroundColor = "transparent",
  cardBackgroundColor = "#1E293B",
  positiveColor = "#10B981",
  negativeColor = "#EF4444",
  animationStyle = "pop",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const cols = Math.min(columns, metrics.length || 1);
  const rows = Math.ceil(metrics.length / cols);

  // Layout calculations
  const gridPadding = 80;
  const cardGap = 24;
  const titleHeight = title ? 100 : 0;
  const gridTop = 60 + titleHeight;
  const gridWidth = 1920 - gridPadding * 2;
  const gridHeight = 1080 - gridTop - 60;
  const cardWidth = (gridWidth - cardGap * (cols - 1)) / cols;
  const cardHeight = Math.min((gridHeight - cardGap * (rows - 1)) / rows, 300);

  const totalGridHeight = rows * cardHeight + (rows - 1) * cardGap;
  const gridTopOffset = gridTop + (gridHeight - totalGridHeight) / 2;

  // Smooth fade-out near end of scene
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const Container = AbsoluteFill as any;

  return (
    <Container
      style={{
        background: backgroundColor,
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily,
      }}
    >
      {/* Grid Title */}
      {title && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 44,
            fontWeight: 800,
            color: textColor,
            fontFamily,
            letterSpacing: "-0.01em",
            opacity: spring({ frame, fps, config: { damping: 18 } }) * fadeOut,
          }}
        >
          {title}
        </div>
      )}

      {/* KPI Cards */}
      {metrics.map((metric, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const left = gridPadding + col * (cardWidth + cardGap);
        const top = gridTopOffset + row * (cardHeight + cardGap);
        const accentColor = colors[idx % colors.length];
        const delay = idx * 4;

        const cardSpring = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, stiffness: 120 },
        });

        const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1]);
        const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

        return (
          <div
            key={metric.label || idx}
            style={{
              position: "absolute",
              left,
              top,
              width: cardWidth,
              height: cardHeight,
              backgroundColor: "rgba(30, 41, 59, 0.88)",
              backdropFilter: "blur(12px)",
              borderRadius: 16,
              border: `1px solid rgba(255, 255, 255, 0.1)`,
              borderTop: `4px solid ${accentColor}`,
              boxShadow: `0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${accentColor}22`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px 20px",
              opacity: cardOpacity * fadeOut,
              transform: `scale(${cardScale}) translateY(${interpolate(
                cardSpring,
                [0, 1],
                [20, 0]
              )}px)`,
            }}
          >
            {/* Value Display */}
            <div
              style={{
                fontSize: 54,
                fontWeight: 800,
                color: accentColor,
                fontFamily,
                lineHeight: 1.1,
                textAlign: "center",
                textShadow: `0 0 24px ${accentColor}44`,
              }}
            >
              {metric.prefix || ""}
              {String(metric.value)}
              {metric.suffix || ""}
            </div>

            {/* Metric Label */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#F8FAFC",
                fontFamily,
                marginTop: 12,
                textAlign: "center",
                lineHeight: 1.25,
              }}
            >
              {metric.label}
            </div>

            {/* Unit / Subtitle */}
            {metric.unit && (
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#94A3B8",
                  fontFamily,
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {metric.unit}
              </div>
            )}

            {/* Change Indicator / Pill Badge */}
            {metric.change !== undefined && (
              <div
                style={{
                  marginTop: 14,
                  padding: "4px 12px",
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: `1px solid ${accentColor}44`,
                  fontSize: 16,
                  fontWeight: 600,
                  color:
                    String(metric.change).startsWith("+")
                      ? positiveColor
                      : String(metric.change).startsWith("-")
                      ? negativeColor
                      : "#E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>
                  {String(metric.change).startsWith("+")
                    ? "▲"
                    : String(metric.change).startsWith("-")
                    ? "▼"
                    : "•"}
                </span>
                <span>{String(metric.change)}</span>
              </div>
            )}
          </div>
        );
      })}
    </Container>
  );
};
