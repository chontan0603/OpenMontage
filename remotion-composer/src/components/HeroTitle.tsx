import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type HeroTitleProps = {
  title: string;
  subtitle?: string;
  tag?: string;
  accentColor?: string;
  textColor?: string;
  subtitleColor?: string;
  scrimBackground?: string;
};

const DEFAULT_SCRIM =
  "radial-gradient(ellipse at center, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.85) 100%)";

export const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  subtitle,
  tag,
  accentColor = "#EC4899",
  textColor = "#F8FAFC",
  subtitleColor = "#94A3B8",
  scrimBackground = DEFAULT_SCRIM,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split title into words to guarantee NO awkward mid-word breaks
  const words = title.split(" ");
  const isLongTitle = title.length > 35;
  const titleFontSize = isLongTitle ? 56 : 68;

  // Track global character index for staggered entrance
  let globalCharIdx = 0;

  // Cast AbsoluteFill to bypass React 19 / Remotion JSX type definition mismatch
  const Container = AbsoluteFill as any;

  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: scrimBackground,
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 1440,
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Optional Tag Badge */}
        {tag && (
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}66`,
              color: accentColor,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
              opacity: spring({ frame, fps, config: { damping: 16 } }),
            }}
          >
            {tag}
          </div>
        )}

        {/* Main title with word-safe flexbox and per-letter spring entrance */}
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: 800,
            fontFamily: "Space Grotesk, Inter, system-ui, sans-serif",
            lineHeight: 1.25,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            rowGap: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          {words.map((word, wIdx) => {
            const wordChars = word.split("");
            // High-impact accent rule: highlight words that contain numbers, dollar signs, or key terms
            const isAccentedWord =
              wIdx === 1 ||
              word.includes("$") ||
              word.toUpperCase() === "MIDJOURNEY" ||
              word.toUpperCase() === "TROJAN" ||
              word.toUpperCase() === "ZERO-VC" ||
              word.toUpperCase() === "FILTER" ||
              word.toUpperCase() === "BLUEPRINT";

            const wordColor = isAccentedWord ? accentColor : textColor;

            return (
              <span
                key={wIdx}
                style={{
                  display: "inline-flex",
                  whiteSpace: "nowrap",
                  marginRight: wIdx < words.length - 1 ? "0.32em" : 0,
                }}
              >
                {wordChars.map((char, cIdx) => {
                  const currentIdx = globalCharIdx++;
                  const charSpring = spring({
                    frame: frame - currentIdx * 1.0,
                    fps,
                    config: { damping: 14, stiffness: 140 },
                  });

                  return (
                    <span
                      key={cIdx}
                      style={{
                        display: "inline-block",
                        opacity: charSpring,
                        transform: `translateY(${interpolate(
                          charSpring,
                          [0, 1],
                          [24, 0]
                        )}px)`,
                        color: wordColor,
                        textShadow: isAccentedWord
                          ? `0 0 30px ${accentColor}44`
                          : "none",
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              marginTop: 28,
              opacity: spring({
                frame: frame - words.length * 3 - 5,
                fps,
                config: { damping: 20 },
              }),
              fontSize: 26,
              fontWeight: 500,
              color: subtitleColor,
              fontFamily: "Space Grotesk, Inter, system-ui, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              maxWidth: 960,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Animated neon underline */}
        <div
          style={{
            marginTop: 24,
            height: 4,
            backgroundColor: accentColor,
            borderRadius: 2,
            boxShadow: `0 0 16px ${accentColor}`,
            width: interpolate(
              spring({
                frame: frame - 15,
                fps,
                config: { damping: 18 },
              }),
              [0, 1],
              [0, 180]
            ),
          }}
        />
      </div>
    </Container>
  );
};
