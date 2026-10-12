import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TitleTakeover } from "./components/TitleTakeover";
import { BarChart, BarDatum } from "./components/charts/BarChart";
import { CompanySpotlight } from "./components/CompanySpotlight";
import { StatCard } from "./components/StatCard";
import { ComparisonCard } from "./components/ComparisonCard";
import { CalloutBox } from "./components/CalloutBox";
import { ActionChecklist } from "./components/ActionChecklist";
import { HeroTitle } from "./components/HeroTitle";
import { AnimeScene } from "./components/AnimeScene";
import { CaptionOverlay } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";

// Load timing and word timestamps for all 5 acts
import wordsAct1 from "../public/techtheory_ep02/audio/words_act1.json";
import wordsAct2 from "../public/techtheory_ep02/audio/words_act2.json";
import wordsAct3 from "../public/techtheory_ep02/audio/words_act3.json";
import wordsAct4 from "../public/techtheory_ep02/audio/words_act4.json";
import wordsAct5 from "../public/techtheory_ep02/audio/words_act5.json";

// React 19 JSX element wrappers
const Container = AbsoluteFill as any;
const AudioElement = Audio as any;
const SequenceElement = Sequence as any;

// ----------------------------------------------------------------------------
// Custom Visual: Big Tech 80% Gross Margin Engines (Microsoft, Google, Meta)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Custom Visual: Big Tech 80% Gross Margin Engines (Microsoft, Google, Meta)
// ----------------------------------------------------------------------------
const BigTechTitanCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titans = [
    { name: "Microsoft", logo: "techtheory_ep02/logos/microsoft.svg", margin: "80%", color: "#00A4EF" },
    { name: "Google", logo: "techtheory_ep02/logos/google.svg", margin: "76%", color: "#4285F4" },
    { name: "Meta", logo: "techtheory_ep02/logos/meta.svg", margin: "81%", color: "#0081FB" },
  ];

  return (
    <Container style={{ justifyContent: "center", alignItems: "center", background: "#070B14" }}>
      {/* Authentic Silicon Valley Campus B-Roll Background */}
      <AnimeScene
        images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
        animation="pan-left"
        particles="none"
        vignette={true}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(7, 11, 20, 0.78)",
          backdropFilter: "blur(6px)",
        }}
      />

      <div style={{ textAlign: "center", zIndex: 10, maxWidth: 1400, width: "100%", padding: "0 40px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: 30,
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.5)",
            color: "#38BDF8",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: spring({ frame, fps, config: { damping: 16 } }),
          }}
        >
          THE ECONOMIC ENGINE
        </div>
        <h2
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
            margin: "0 0 12px 0",
            fontFamily: "Space Grotesk, Inter, sans-serif",
            textShadow: "0 10px 30px rgba(0,0,0,0.8)",
          }}
        >
          80% GROSS MARGIN CASH COMPACT
        </h2>
        <p
          style={{
            fontSize: 22,
            color: "rgba(248, 250, 252, 0.8)",
            margin: "0 0 44px 0",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Near-zero marginal cost transformed three companies into multi-trillion-dollar monopolies
        </p>

        {/* 3 Titan Cards */}
        <div style={{ display: "flex", justifyContent: "center", gap: 36 }}>
          {titans.map((titan, idx) => {
            const cardSpring = spring({
              frame: frame - idx * 6,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                key={titan.name}
                style={{
                  flex: 1,
                  maxWidth: 380,
                  background: "rgba(15, 23, 42, 0.92)",
                  borderRadius: 24,
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: `0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px ${titan.color}25`,
                  transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
                  opacity: cardSpring,
                }}
              >
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: `0 0 20px ${titan.color}33`,
                  }}
                >
                  <img
                    src={resolveAsset(titan.logo)}
                    alt={titan.name}
                    style={{ width: 48, height: 48, objectFit: "contain" }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#F8FAFC",
                    marginBottom: 6,
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  {titan.name}
                </div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    color: titan.color,
                    letterSpacing: "-0.02em",
                    fontFamily: "Space Grotesk, sans-serif",
                    margin: "10px 0 6px 0",
                    textShadow: `0 0 24px ${titan.color}55`,
                  }}
                >
                  {titan.margin}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}
                >
                  Historical Gross Margin
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

// ============================================================================
// ACT 1: Cold Open & The $600B AI Lie (0:00 - 1:01.66 | 3,699 frames @ 60 FPS)
// Pacing: 9 cuts fully synchronized word-by-word with authentic B-Roll on every cut
// ============================================================================
export const TechTheoryAct1: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Audio Layer - Clean Voice Only (No Music / No SFX) */}
      <AudioElement src={resolveAsset("techtheory_ep02/audio/act1.mp3")} volume={1.0} />

      {/* Cut 1: "$600 BILLION IN AI" (0.00 - 6.80s | 408 frames)
          Dialogue: "Over the past twenty-four months, Big Tech committed more than six hundred billion dollars to artificial intelligence." */}
      <SequenceElement from={0} durationInFrames={408}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
            animation="ken-burns"
            particles="dust"
            particleColor="#06B6D4"
            particleIntensity={0.5}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.70)",
            }}
          />
          <TitleTakeover
            title="$600 BILLION IN AI"
            supportingLine="Big Tech Capex Committed Across Just 24 Months"
            badge="THE SILICON VALLEY INVESTMENT"
            accentColor="#06B6D4"
          />
        </Container>
      </SequenceElement>

      {/* Cut 2: "THE FASTEST REVOLUTION" (6.80 - 12.21s | 325 frames)
          Dialogue: "On Wall Street, this was sold as the fastest technology revolution in human history." */}
      <SequenceElement from={408} durationInFrames={325}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.72)",
            }}
          />
          <TitleTakeover
            title="THE FASTEST REVOLUTION"
            supportingLine="Sold on Wall Street as the Greatest Technology Supercycle in Human History"
            badge="THE WALL STREET PITCH"
            accentColor="#10B981"
          />
        </Container>
      </SequenceElement>

      {/* Cut 3: Three Conference Call Promises (12.21 - 20.83s | 517 frames)
          Dialogue: "Every conference call featured the same promises: automated workflows, supercharged productivity, and trillion-dollar software markets." */}
      <SequenceElement from={733} durationInFrames={517}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="zoom-in"
            particles="dust"
            particleColor="#06B6D4"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <ActionChecklist
            title="THE EARNINGS CALL PROMISES"
            subtitle="What Tech Executives Pitched to Wall Street Analysts"
            badge="THE CORPORATE ROADMAP"
            accentColor="#06B6D4"
            tasks={[
              { label: "Automated Workflows", at: 3.1, detail: "Autonomous execution across entire enterprise pipelines", badge: "PROMISED" },
              { label: "Supercharged Productivity", at: 4.4, detail: "10x output acceleration for knowledge workers", badge: "PROMISED" },
              { label: "Trillion-Dollar Software TAM", at: 6.2, detail: "Massive corporate spending rotation into generative AI", badge: "PROMISED" },
            ]}
          />
        </Container>
      </SequenceElement>

      {/* Cut 4: Silicon Valley Campus B-Roll (20.83 - 24.63s | 228 frames)
          Dialogue: "At first glance, that sounded completely reasonable." */}
      <SequenceElement from={1250} durationInFrames={228}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <HeroTitle
            title="A REASONABLE BET"
            subtitle="Why enterprise boards and retail investors bought the narrative."
            tag="THE CONSENSUS THESIS"
            accentColor="#38BDF8"
            scrimBackground="rgba(7, 11, 20, 0.72)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 5: The Math Falls Apart (24.63 - 29.43s | 288 frames)
          Dialogue: "But if you actually open the quarterly balance sheets, the math falls apart." */}
      <SequenceElement from={1478} durationInFrames={288}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(24, 7, 7, 0.82)",
            }}
          />
          <CalloutBox
            type="warning"
            title="THE BALANCE SHEET DISCONNECT"
            text="Quarterly 10-Q Filings: Datacenter Capex is accelerating exponentially, while generative AI software revenue fails to materialize."
            borderColor="#EF4444"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(28, 11, 11, 0.95)"
            textColor="#F8FAFC"
          />
        </Container>
      </SequenceElement>

      {/* Cut 6: The Golden Rule of Software (29.43 - 40.58s | 669 frames)
          Dialogue: "For twenty years, the software industry operated on a simple, golden rule: write the code once, host it on the cloud, and sell it to millions of users with near-zero marginal cost." */}
      <SequenceElement from={1766} durationInFrames={669}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_programmer_code.jpg"]}
            animation="drift-up"
            particles="dust"
            particleColor="#38BDF8"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
            }}
          />
          <ActionChecklist
            title="THE GOLDEN RULE OF SOFTWARE"
            subtitle="The 20-Year Economic Engine of Cloud Computing"
            badge="TRADITIONAL SAAS ECONOMICS"
            accentColor="#38BDF8"
            tasks={[
              { label: "1. Write Code Once", at: 4.7, detail: "Fixed upfront engineering cost", badge: "FIXED R&D" },
              { label: "2. Host on Shared Cloud", at: 6.8, detail: "Multi-tenant servers serving millions concurrently", badge: "SCALE" },
              { label: "3. Near-Zero Marginal Cost", at: 9.5, detail: "Serving user 1,000,001 costs virtually $0.00", badge: "80%+ MARGIN" },
            ]}
          />
        </Container>
      </SequenceElement>

      {/* Cut 7: Big Tech 80% Gross Margin Engines (40.58 - 49.66s | 545 frames)
          Dialogue: "That single economic engine built Microsoft, Google, and Meta, generating eighty percent gross margins and unprecedented corporate cash reserves." */}
      <SequenceElement from={2435} durationInFrames={545}>
        <BigTechTitanCards />
      </SequenceElement>

      {/* Cut 8: The Assumption (49.66 - 54.64s | 298 frames)
          Dialogue: "Investors assumed artificial intelligence would follow the exact same playbook." */}
      <SequenceElement from={2980} durationInFrames={298}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <HeroTitle
            tag="THE INVESTOR ASSUMPTION"
            title="THE SAME PLAYBOOK"
            subtitle="Wall Street assumed GenAI would produce traditional 80% SaaS software margins."
            accentColor="#38BDF8"
            scrimBackground="rgba(7, 11, 20, 0.75)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 9: Reality & Broken Software Physics (54.64 - 61.66s | 421 frames)
          Dialogue: "But that is not what happened. Generative AI broke the fundamental physics of software economics." */}
      <SequenceElement from={3278} durationInFrames={421}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(24, 7, 7, 0.80)",
            }}
          />
          <TitleTakeover
            title="BROKEN SOFTWARE PHYSICS"
            supportingLine="Generative AI is not zero-marginal-cost software. Every token burns specialized silicon."
            badge="BUT THAT IS NOT WHAT HAPPENED"
            accentColor="#EF4444"
          />
        </Container>
      </SequenceElement>

      {/* Syllable-Synced Subtitles */}
      <CaptionOverlay
        words={wordsAct1.words.map((w: any) => ({
          word: w.w,
          startMs: Math.round(w.s * 1000),
          endMs: Math.round(w.e * 1000),
        }))}
        wordsPerPage={4}
        fontSize={40}
        color="#F8FAFC"
        highlightColor="#22D3EE"
        backgroundColor="rgba(15, 23, 42, 0.85)"
        fontFamily="Inter, system-ui, sans-serif"
      />
    </Container>
  );
};

// ============================================================================
// ACT 2: The Shift & The Hyperscaler Arms Race (0:00 - 1:12.10 | 4,326 frames)
// Pacing: 9 rapid cuts with Rising Logo-On-Bar Chart
// ============================================================================
export const TechTheoryAct2: React.FC = () => {
  const barChartData: BarDatum[] = [
    { label: "Amazon", value: 75, logoUrl: "techtheory_ep02/logos/amazon.svg", color: "#FF9900", subLabel: "Capex: $75B", delaySeconds: 1.2 },
    { label: "Microsoft", value: 64, logoUrl: "techtheory_ep02/logos/microsoft.svg", color: "#00A4EF", subLabel: "Capex: $64B", delaySeconds: 5.8 },
    { label: "Google", value: 52, logoUrl: "techtheory_ep02/logos/google.svg", color: "#4285F4", subLabel: "Capex: $52B", delaySeconds: 8.8 },
    { label: "Meta", value: 40, logoUrl: "techtheory_ep02/logos/meta.svg", color: "#0081FB", subLabel: "Capex: $40B", delaySeconds: 11.2 },
  ];

  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Audio Layer - Clean Voice Only */}
      <AudioElement src={resolveAsset("techtheory_ep02/audio/act2.mp3")} volume={1.0} />

      {/* Cut 1: Title Takeover (0.00 - 6.24s | 374 frames)
          Dialogue: "When ChatGPT launched in late 2022, corporate boardroom panic set in overnight." */}
      <SequenceElement from={0} durationInFrames={374}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <TitleTakeover
            title="THE HYPERSCALER ARMS RACE"
            supportingLine="Corporate Boardroom Panic Set In Overnight"
            badge="LATE 2022 CATALYST"
            accentColor="#00A4EF"
          />
        </Container>
      </SequenceElement>

      {/* Cut 2: An Existential Threat Callout (6.24 - 13.71s | 449 frames)
          Dialogue: "Chief executives realized that falling behind in foundation models wasn't just a missed product cycle—it was an existential threat." */}
      <SequenceElement from={374} durationInFrames={449}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(24, 7, 7, 0.80)",
            }}
          />
          <CalloutBox
            type="warning"
            title="AN EXISTENTIAL THREAT"
            text="Chief executives realized that falling behind in foundation models was not just a missed cycle—it was an existential threat to market survival."
            borderColor="#EF4444"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(28, 11, 11, 0.90)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 3: The Hardware Arms Race (13.71 - 19.00s | 317 frames)
          Dialogue: "Almost immediately, capital expenditure exploded into an unprecedented hardware arms race." */}
      <SequenceElement from={823} durationInFrames={317}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="pan-right"
            particles="dust"
            particleColor="#38BDF8"
            particleIntensity={0.4}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <TitleTakeover
            title="THE HARDWARE ARMS RACE"
            supportingLine="Capital Expenditure Exploded Overnight Into Mega-Datacenters"
            badge="EXPONENTIAL CAPEX"
            accentColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Cut 4: Rising Logo-On-Bar Chart (19.00 - 36.00s | 1020 frames)
          Dialogue: "In 2024 alone, Amazon committed seventy-five billion dollars. Microsoft poured in sixty-four billion. Google allocated fifty-two billion, and Meta spent forty billion dollars, buying every advanced computing cluster they could find." */}
      <SequenceElement from={1140} durationInFrames={1020}>
        <BarChart
          title="ANNUAL AI INFRASTRUCTURE SPENDING"
          data={barChartData}
          bgImage="techtheory_ep02/images/tpu_cluster_authentic.jpg"
          overlayOpacity={0.78}
          valuePrefix="$"
          valueSuffix="B"
          animationStyle="grow-up"
          textColor="#F8FAFC"
          gridColor="#334155"
        />
      </SequenceElement>

      {/* Cut 5: The Historical Paradox Callout (36.00 - 44.00s | 480 frames)
          Dialogue: "And this is where the story gets strange. In every previous technology cycle, infrastructure investments lasted for decades." */}
      <SequenceElement from={2160} durationInFrames={480}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
            animation="drift-up"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <CalloutBox
            type="info"
            title="THE HISTORICAL PARADOX"
            text="In every previous technology cycle, infrastructure investments lasted for decades. Fiber cables laid in the 1990s powered twenty-five years of the modern digital economy."
            borderColor="#0081FB"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 6: 25-Year Asset Lifespan Stat Card (44.00 - 52.00s | 480 frames)
          Dialogue: "When telecom companies laid undersea fiber optic cables in the late nineties, those cables remained operational for twenty-five years." */}
      <SequenceElement from={2640} durationInFrames={480}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="zoom-in"
            particles="dust"
            particleColor="#38BDF8"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <StatCard
            stat="25 YEARS"
            subtitle="Undersea Fiber Optic Lifespan (1990s Infrastructure Cycle)"
            accentColor="#38BDF8"
            backgroundColor="rgba(11, 19, 38, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 7: Velocity Comparison (52.00 - 58.00s | 360 frames)
          Dialogue: "Datacenter AI clusters, by contrast, burn through capital at staggering velocity." */}
      <SequenceElement from={3120} durationInFrames={360}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <ComparisonCard
            title="DEPRECIATION VELOCITY"
            leftLabel="1990s Undersea Fiber"
            leftValue="25-Year Operational Asset"
            rightLabel="2020s AI Compute"
            rightValue="3-5 Year Economic Lifespan"
            backgroundColor="transparent"
            cardBackgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 8: Rapid Obsolescence Warning (58.00 - 67.00s | 540 frames)
          Dialogue: "High-density GPU racks run blistering hot, consume megawatts of grid power, and become economically obsolete in just three to five years." */}
      <SequenceElement from={3480} durationInFrames={540}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="zoom-in"
            particles="dust"
            particleColor="#EF4444"
            particleIntensity={0.5}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(24, 7, 7, 0.80)",
            }}
          />
          <CalloutBox
            type="warning"
            title="ECONOMIC OBSOLESCENCE"
            text="High-density GPU clusters run blistering hot, consume megawatts of grid power, and become economically obsolete in just 3 to 5 years."
            borderColor="#EF4444"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(28, 11, 11, 0.90)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 9: Ticking Clock Title Takeover (67.00 - 72.10s | 306 frames)
          Dialogue: "Big Tech wasn't just investing capital—they were burning it on a ticking clock." */}
      <SequenceElement from={4020} durationInFrames={306}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <TitleTakeover
            title="A TICKING CLOCK"
            supportingLine="Big Tech is burning capital against rapid silicon obsolescence"
            badge="BURNING HORIZON"
            accentColor="#EF4444"
          />
        </Container>
      </SequenceElement>

      {/* Syllable-Synced Subtitles */}
      <CaptionOverlay
        words={wordsAct2.words.map((w: any) => ({
          word: w.w,
          startMs: Math.round(w.s * 1000),
          endMs: Math.round(w.e * 1000),
        }))}
        wordsPerPage={4}
        fontSize={40}
        color="#F8FAFC"
        highlightColor="#38BDF8"
        backgroundColor="rgba(15, 23, 42, 0.85)"
        fontFamily="Inter, system-ui, sans-serif"
      />
    </Container>
  );
};

// ============================================================================
// ACT 3: The Hidden Reason & The Nvidia Monopoly (0:00 - 1:06.67 | 4,000 frames)
// Pacing: 8 dynamic cuts featuring authentic NVIDIA Spotlight & CUDA Moat
// ============================================================================
export const TechTheoryAct3: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Audio Layer - Clean Voice Only */}
      <AudioElement src={resolveAsset("techtheory_ep02/audio/act3.mp3")} volume={1.0} />

      {/* Cut 1: Title Takeover (0 - 4.5s | 270 frames) */}
      <SequenceElement from={0} durationInFrames={270}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <TitleTakeover
            title="THE SILICON MONOPOLY"
            supportingLine="One Company Captures Almost Every Single Dollar"
            badge="THE GOLD RUSH PICKAXE"
            accentColor="#76B900"
          />
        </Container>
      </SequenceElement>

      {/* Cut 2: Nvidia & Jensen Huang Spotlight (4.5 - 15.0s | 630 frames) */}
      <SequenceElement from={270} durationInFrames={630}>
        <CompanySpotlight
          name="NVIDIA"
          role="The Silicon Monopoly"
          company="Jensen Huang, Founder & CEO"
          logoUrl="techtheory_ep02/logos/nvidia.svg"
          brollUrl="techtheory_ep02/images/broll_silicon_valley.jpg"
          overlayOpacity={0.72}
          accentColor="#76B900"
          headline="Selling the pickaxes in the $600 Billion gold rush"
          tag="THE 78% PROFIT ENGINE"
          metrics={[
            { label: "Gross Margin", value: "78%" },
            { label: "Market Cap", value: "$3.5T" },
            { label: "Blackwell Rack", value: "$3.2M" },
          ]}
        />
      </SequenceElement>

      {/* Cut 3: 78% Gross Margin Stat Card (15.0 - 22.0s | 420 frames) */}
      <SequenceElement from={900} durationInFrames={420}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="drift-up"
            particles="dust"
            particleColor="#76B900"
            particleIntensity={0.4}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <StatCard
            stat="78% MARGIN"
            subtitle="Nvidia Net Profit Margin on Blackwell Architecture Compute"
            accentColor="#76B900"
            backgroundColor="rgba(11, 28, 11, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 4: Silicon Valley Campus B-Roll (22.0 - 29.0s | 420 frames) */}
      <SequenceElement from={1320} durationInFrames={420}>
        <AnimeScene
          images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
          animation="ken-burns"
          particles="dust"
          particleColor="#76B900"
          particleIntensity={0.5}
          vignette={true}
        />
      </SequenceElement>

      {/* Cut 5: The CUDA Software Moat Title (29.0 - 37.0s | 480 frames) */}
      <SequenceElement from={1740} durationInFrames={480}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_programmer_code.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <TitleTakeover
            title="THE CUDA SOFTWARE MOAT"
            supportingLine="18 Years of Developer Lock-In That Competitors Cannot Break"
            badge="SOFTWARE DEFENSE"
            accentColor="#76B900"
          />
        </Container>
      </SequenceElement>

      {/* Cut 6: Programmer Code B-Roll (37.0 - 44.0s | 420 frames) */}
      <SequenceElement from={2220} durationInFrames={420}>
        <AnimeScene
          images={["techtheory_ep02/images/broll_programmer_code.jpg"]}
          animation="zoom-in"
          particles="none"
          vignette={true}
        />
      </SequenceElement>

      {/* Cut 7: The Circular Funding Loop Callout (44.0 - 54.0s | 600 frames) */}
      <SequenceElement from={2640} durationInFrames={600}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <CalloutBox
            type="warning"
            title="THE CIRCULAR FUNDING LOOP"
            text="Cloud giants wire billions into AI startups -> Startups wire that cash straight back to Nvidia and cloud providers to buy computing clusters. Capital cycling in a closed loop."
            borderColor="#F59E0B"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 8: GPU Datacenter B-Roll Finale (54.0 - 66.67s | 760 frames) */}
      <SequenceElement from={3240} durationInFrames={760}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
            animation="drift-up"
            particles="dust"
            particleColor="#76B900"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <HeroTitle
            title="THE ONE-WAY CASH FLOW"
            subtitle="Money enters through venture capital and hyperscaler debt, but it exits in one direction: Santa Clara, California."
            tag="THE WINNER TAKE ALL"
            accentColor="#76B900"
          />
        </Container>
      </SequenceElement>

      {/* Syllable-Synced Subtitles */}
      <CaptionOverlay
        words={wordsAct3.words.map((w: any) => ({
          word: w.w,
          startMs: Math.round(w.s * 1000),
          endMs: Math.round(w.e * 1000),
        }))}
        wordsPerPage={4}
        fontSize={40}
        color="#F8FAFC"
        highlightColor="#84CC16"
        backgroundColor="rgba(15, 23, 42, 0.85)"
        fontFamily="Inter, system-ui, sans-serif"
      />
    </Container>
  );
};

// ============================================================================
// ACT 4: Consequences & The $570B Revenue Hole (0:00 - 1:00.48 | 3,629 frames)
// Pacing: 8 dynamic cuts featuring Sequoia Capital Calculations & Failure Rates
// ============================================================================
export const TechTheoryAct4: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Audio Layer - Clean Voice Only */}
      <AudioElement src={resolveAsset("techtheory_ep02/audio/act4.mp3")} volume={1.0} />

      {/* Cut 1: The $570B Hole Title Takeover (0 - 5.0s | 300 frames) */}
      <SequenceElement from={0} durationInFrames={300}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(24, 7, 7, 0.80)",
            }}
          />
          <TitleTakeover
            title="THE $570B REVENUE HOLE"
            supportingLine="Wall Street's Most Dangerous Financial Disconnect"
            badge="SEQUOIA CAPITAL CALCULATION"
            accentColor="#EF4444"
          />
        </Container>
      </SequenceElement>

      {/* Cut 2: Hero Title - Sequoia Valuation Math (5.0 - 12.0s | 420 frames) */}
      <SequenceElement from={300} durationInFrames={420}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <HeroTitle
            title="THE MATH DOES NOT CLOSE"
            subtitle="Sequoia Capital estimated the AI ecosystem needs $600B in annual revenue to pay back current datacenter investment."
            tag="VALUATION CRISIS"
            accentColor="#EF4444"
          />
        </Container>
      </SequenceElement>

      {/* Cut 3: Required vs Actual GenAI Revenue (12.0 - 21.0s | 540 frames) */}
      <SequenceElement from={720} durationInFrames={540}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
            animation="drift-up"
            particles="dust"
            particleColor="#EF4444"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <ComparisonCard
            title="THE REVENUE RECKONING"
            leftLabel="Required Industry Revenue"
            leftValue="$600 Billion"
            rightLabel="Actual Software Revenue"
            rightValue="$25 Billion"
            backgroundColor="transparent"
            cardBackgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 4: Creative Artist B-Roll (21.0 - 28.0s | 420 frames) */}
      <SequenceElement from={1260} durationInFrames={420}>
        <AnimeScene
          images={["techtheory_ep02/images/broll_creative_artist.jpg"]}
          animation="ken-burns"
          particles="none"
          vignette={true}
        />
      </SequenceElement>

      {/* Cut 5: 80% Pilot Failure Rate Stat Card (28.0 - 36.0s | 480 frames) */}
      <SequenceElement from={1680} durationInFrames={480}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_creative_artist.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(24, 7, 7, 0.80)",
            }}
          />
          <StatCard
            stat="80% FAILED"
            subtitle="Enterprise Generative AI Pilots Failing to Reach Production Deployment"
            accentColor="#EF4444"
            backgroundColor="rgba(28, 11, 11, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 6: Enterprise Adoption Mirage Callout (36.0 - 44.0s | 480 frames) */}
      <SequenceElement from={2160} durationInFrames={480}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <CalloutBox
            type="warning"
            title="THE ENTERPRISE MIRAGE"
            text="Enterprises experimented with chatbot demos, but security concerns, hallucinations, and inference bills stopped rollout."
            borderColor="#EF4444"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 7: Programmer Debugging B-Roll (44.0 - 51.5s | 450 frames) */}
      <SequenceElement from={2640} durationInFrames={450}>
        <AnimeScene
          images={["techtheory_ep02/images/broll_programmer_code.jpg"]}
          animation="zoom-in"
          particles="dust"
          particleColor="#EF4444"
          particleIntensity={0.4}
          vignette={true}
        />
      </SequenceElement>

      {/* Cut 8: The Productivity Paradox Finale (51.5 - 60.48s | 539 frames) */}
      <SequenceElement from={3090} durationInFrames={539}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="drift-up"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <HeroTitle
            title="THE PRODUCTIVITY GAP"
            subtitle="Until AI automates complete organizational workflows rather than paragraphs, the revenue cannot materialize."
            tag="THE HARD TRUTH"
            accentColor="#F59E0B"
          />
        </Container>
      </SequenceElement>

      {/* Syllable-Synced Subtitles */}
      <CaptionOverlay
        words={wordsAct4.words.map((w: any) => ({
          word: w.w,
          startMs: Math.round(w.s * 1000),
          endMs: Math.round(w.e * 1000),
        }))}
        wordsPerPage={4}
        fontSize={40}
        color="#F8FAFC"
        highlightColor="#22D3EE"
        backgroundColor="rgba(15, 23, 42, 0.85)"
        fontFamily="Inter, system-ui, sans-serif"
      />
    </Container>
  );
};

// ============================================================================
// ACT 5: The Reckoning & Historical Parallels (0:00 - 0:59.04 | 3,542 frames)
// Pacing: 7 dense cuts featuring Historical Checklist & Tech Theory Lab Signoff
// ============================================================================
export const TechTheoryAct5: React.FC = () => {
  const historyTasks = [
    { label: "1840s British Railway Mania", at: 2.0, detail: "Thousands of miles overbuilt, investors wiped, tracks powered century of commerce" },
    { label: "1990s Telecom Fiber Bubble", at: 5.5, detail: "95% dark fiber overbuilt, bankruptcies cleared, powered the modern internet" },
    { label: "2020s Datacenter Compute Buildout", at: 9.0, detail: "Datacenters rewired, software economics shattered forever" },
  ];

  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Audio Layer - Clean Voice Only */}
      <AudioElement src={resolveAsset("techtheory_ep02/audio/act5.mp3")} volume={1.0} />

      {/* Cut 1: The Reckoning Title Takeover (0 - 4.5s | 270 frames) */}
      <SequenceElement from={0} durationInFrames={270}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_boardroom_meeting.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <TitleTakeover
            title="THE INEVITABLE RESET"
            supportingLine="History Does Not Repeat Itself, But It Often Rhymes"
            badge="THE HISTORICAL CYCLE"
            accentColor="#A855F7"
          />
        </Container>
      </SequenceElement>

      {/* Cut 2: Historical Precedents Checklist (4.5 - 19.5s | 900 frames) */}
      <SequenceElement from={270} durationInFrames={900}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
            animation="drift-up"
            particles="dust"
            particleColor="#06B6D4"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <ActionChecklist
            title="HISTORICAL PRECEDENTS"
            subtitle="How Infrastructure Bubbles Transform Civilization"
            badge="VERIFIED OPERATIONAL PROTOCOL"
            accentColor="#06B6D4"
            tasks={historyTasks}
          />
        </Container>
      </SequenceElement>

      {/* Cut 3: TPU Cluster Compute B-Roll (19.5 - 27.0s | 450 frames) */}
      <SequenceElement from={1170} durationInFrames={450}>
        <AnimeScene
          images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
          animation="ken-burns"
          particles="dust"
          particleColor="#A855F7"
          particleIntensity={0.5}
          vignette={true}
        />
      </SequenceElement>

      {/* Cut 4: Who Wins Comparison Card (27.0 - 37.0s | 600 frames) */}
      <SequenceElement from={1620} durationInFrames={600}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_datacenter_racks.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <ComparisonCard
            title="WHO SURVIVES THE CRASH"
            leftLabel="The First Wave"
            leftValue="Overleveraged Hype"
            rightLabel="The Second Wave"
            rightValue="Real Utility Giants"
            backgroundColor="transparent"
            cardBackgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 5: The Secondary Builders Callout (37.0 - 45.0s | 480 frames) */}
      <SequenceElement from={2220} durationInFrames={480}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/tpu_cluster_authentic.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <CalloutBox
            type="tip"
            title="THE REAL WEALTH"
            text="The dot-com crash built the fiber that gave us Google, Amazon, and Netflix. The AI crash will give us cheap infinite compute."
            borderColor="#A855F7"
            containerBackgroundColor="transparent"
            backgroundColor="rgba(15, 23, 42, 0.88)"
          />
        </Container>
      </SequenceElement>

      {/* Cut 6: Silicon Valley B-Roll (45.0 - 51.5s | 390 frames) */}
      <SequenceElement from={2700} durationInFrames={390}>
        <AnimeScene
          images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
          animation="zoom-in"
          particles="none"
          vignette={true}
        />
      </SequenceElement>

      {/* Cut 7: Tech Theory Lab Channel Signoff (51.5 - 59.04s | 452 frames) */}
      <SequenceElement from={3090} durationInFrames={452}>
        <Container>
          <AnimeScene
            images={["techtheory_ep02/images/broll_silicon_valley.jpg"]}
            animation="ken-burns"
            particles="dust"
            particleColor="#06B6D4"
            particleIntensity={0.3}
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.75)",
            }}
          />
          <HeroTitle
            title="TECH THEORY LAB"
            subtitle="Question the narrative. Follow the capital. Subscribe for next week's investigation."
            tag="EPISODE 02 ARCHIVE"
            accentColor="#06B6D4"
          />
        </Container>
      </SequenceElement>

      {/* Syllable-Synced Subtitles */}
      <CaptionOverlay
        words={wordsAct5.words.map((w: any) => ({
          word: w.w,
          startMs: Math.round(w.s * 1000),
          endMs: Math.round(w.e * 1000),
        }))}
        wordsPerPage={4}
        fontSize={40}
        color="#F8FAFC"
        highlightColor="#A855F7"
        backgroundColor="rgba(15, 23, 42, 0.85)"
        fontFamily="Inter, system-ui, sans-serif"
      />
    </Container>
  );
};
