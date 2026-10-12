import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { resolveAsset } from "../../lib/resolveAsset";

export interface BarDatum {
  label: string;
  value: number;
  delaySeconds?: number;
  logoUrl?: string;
  logoSize?: number;
  subLabel?: string;
  color?: string;
}

type BarAnimationStyle = "grow-up" | "slide-in" | "pop";

export interface BarChartProps {
  data: BarDatum[];
  title?: string;
  colors?: string[];
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  bgImage?: string;
  overlayOpacity?: number;
  gridColor?: string;
  showGrid?: boolean;
  showValues?: boolean;
  animationStyle?: BarAnimationStyle;
  barGap?: number;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  colors = ["#2563EB", "#F59E0B", "#10B981", "#EC4899", "#06B6D4", "#8B5CF6"],
  fontFamily = "Inter, system-ui, sans-serif",
  textColor = "#F8FAFC",
  backgroundColor = "#0B0F19",
  bgImage,
  overlayOpacity = 0.75,
  gridColor = "#334155",
  showGrid = true,
  showValues = true,
  animationStyle = "grow-up",
  barGap = 16,
  valuePrefix = "",
  valueSuffix = "",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  // Chart layout constants (within 1920x1080 canvas)
  const chartLeft = 140;
  const chartRight = 1780;
  const chartTop = title ? 170 : 100;
  const chartBottom = 880;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;

  const barCount = data.length;
  const totalGap = barGap * (barCount + 1);
  const barWidth = Math.min(
    (chartWidth - totalGap) / barCount,
    130
  );
  const actualTotalWidth = barCount * barWidth + (barCount + 1) * barGap;
  const offsetX = chartLeft + (chartWidth - actualTotalWidth) / 2;

  // Grid lines
  const gridLineCount = 5;
  const gridLines = Array.from({ length: gridLineCount + 1 }, (_, i) => {
    const value = (maxValue / gridLineCount) * i;
    const y = chartBottom - (i / gridLineCount) * chartHeight;
    return { value, y };
  });

  const Container = AbsoluteFill as any;
  const ImgElement = Img as any;

  return (
    <Container
      style={{
        background: backgroundColor,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 40,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Authentic B-Roll Background (if provided) */}
      {bgImage && (
        <>
          <ImgElement
            src={resolveAsset(bgImage)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(
                frame,
                [0, durationInFrames],
                [1.0, 1.06],
                { extrapolateRight: "clamp" }
              )})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at center, rgba(15, 23, 42, ${Math.max(
                overlayOpacity - 0.15,
                0.4
              )}) 0%, rgba(10, 15, 29, ${overlayOpacity}) 100%)`,
            }}
          />
        </>
      )}

      <svg
        viewBox="0 0 1920 1080"
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}
      >
        {/* Title */}
        {title && (
          <text
            x={960}
            y={80}
            textAnchor="middle"
            fill={textColor}
            fontFamily={fontFamily}
            fontWeight={800}
            fontSize={52}
            letterSpacing="-0.02em"
            opacity={spring({ frame, fps, config: { damping: 20 } })}
          >
            {title}
          </text>
        )}

        {/* Grid lines */}
        {showGrid &&
          gridLines.map((line, i) => {
            const gridOpacity = interpolate(
              frame,
              [0, 10],
              [0, 0.45],
              { extrapolateRight: "clamp" }
            );
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={chartLeft}
                  y1={line.y}
                  x2={chartRight}
                  y2={line.y}
                  stroke={gridColor}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={gridOpacity}
                />
                <text
                  x={chartLeft - 16}
                  y={line.y + 6}
                  textAnchor="end"
                  fill={textColor}
                  fontFamily={fontFamily}
                  fontWeight={500}
                  fontSize={20}
                  opacity={gridOpacity}
                >
                  {valuePrefix}{formatNumber(line.value)}{valueSuffix}
                </text>
              </g>
            );
          })}

        {/* Axis lines */}
        <line
          x1={chartLeft}
          y1={chartTop}
          x2={chartLeft}
          y2={chartBottom}
          stroke={gridColor}
          strokeWidth={2}
          opacity={interpolate(frame, [0, 8], [0, 1], {
            extrapolateRight: "clamp",
          })}
        />
        <line
          x1={chartLeft}
          y1={chartBottom}
          x2={chartRight}
          y2={chartBottom}
          stroke={gridColor}
          strokeWidth={2}
          opacity={interpolate(frame, [0, 8], [0, 1], {
            extrapolateRight: "clamp",
          })}
        />

        {/* Bars with Staggered Rise & Logo-Over-Bar dynamics */}
        {data.map((datum, i) => {
          const color = datum.color || colors[i % colors.length];
          const barX = offsetX + barGap + i * (barWidth + barGap);
          const barHeightFull = (datum.value / maxValue) * chartHeight;
          const staggerDelay = datum.delaySeconds != null
            ? Math.round(datum.delaySeconds * fps)
            : i * 5;

          let barProgress = 0;
          let barOpacity = 0;

          if (frame >= staggerDelay) {
            if (animationStyle === "grow-up") {
              barProgress = spring({
                frame: frame - staggerDelay,
                fps,
                config: { damping: 14, stiffness: 80 },
              });
              barOpacity = interpolate(
                frame,
                [staggerDelay, staggerDelay + 6],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
            } else if (animationStyle === "slide-in") {
              barProgress = interpolate(
                frame,
                [staggerDelay + 5, staggerDelay + 25],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              barOpacity = interpolate(
                frame,
                [staggerDelay + 5, staggerDelay + 12],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
            } else {
              // pop
              const s = spring({
                frame: frame - staggerDelay,
                fps,
                config: { damping: 8, stiffness: 150, mass: 0.6 },
              });
              barProgress = s;
              barOpacity = interpolate(
                frame,
                [staggerDelay, staggerDelay + 3],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
            }
          }

          const animatedHeight = barHeightFull * barProgress;
          const barY = chartBottom - animatedHeight;

          // Logo-over-bar positioning
          const hasLogo = Boolean(datum.logoUrl);
          const logoSize = datum.logoSize || Math.min(barWidth * 0.72, 48);
          const logoBadgeY = barY - logoSize - 12;
          const valueY = hasLogo ? logoBadgeY - 14 : barY - 14;

          // Fade out near end
          const fadeOut = interpolate(
            frame,
            [durationInFrames - 15, durationInFrames],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={datum.label} opacity={fadeOut}>
              {/* Bar */}
              <rect
                x={barX}
                y={barY}
                width={barWidth}
                height={Math.max(animatedHeight, 0)}
                fill={color}
                rx={6}
                opacity={barOpacity}
              />

              {/* Company Logo Badge Riding On Top Of Bar */}
              {hasLogo && datum.logoUrl && (
                <g opacity={barOpacity}>
                  <rect
                    x={barX + (barWidth - logoSize) / 2 - 4}
                    y={logoBadgeY - 4}
                    width={logoSize + 8}
                    height={logoSize + 8}
                    rx={8}
                    fill="#0F172A"
                    stroke={color}
                    strokeWidth={2}
                    opacity={barProgress > 0.1 ? 1 : 0}
                  />
                  <image
                    href={resolveAsset(datum.logoUrl)}
                    x={barX + (barWidth - logoSize) / 2}
                    y={logoBadgeY}
                    width={logoSize}
                    height={logoSize}
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
              )}

              {/* Value label */}
              {showValues && (
                <text
                  x={barX + barWidth / 2}
                  y={valueY}
                  textAnchor="middle"
                  fill={textColor}
                  fontFamily={fontFamily}
                  fontWeight={700}
                  fontSize={24}
                  opacity={interpolate(
                    barProgress,
                    [0.6, 1],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )}
                >
                  {valuePrefix}{formatNumber(datum.value)}{valueSuffix}
                </text>
              )}

              {/* Company / Founder Label below axis */}
              <text
                x={barX + barWidth / 2}
                y={chartBottom + 40}
                textAnchor="middle"
                fill={textColor}
                fontFamily={fontFamily}
                fontWeight={600}
                fontSize={22}
                opacity={barOpacity}
              >
                {datum.label}
              </text>

              {/* Optional sublabel below name (e.g. market share or subtitle) */}
              {datum.subLabel && (
                <text
                  x={barX + barWidth / 2}
                  y={chartBottom + 68}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontFamily={fontFamily}
                  fontWeight={400}
                  fontSize={16}
                  opacity={barOpacity}
                >
                  {datum.subLabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Container>
  );
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(1);
}

