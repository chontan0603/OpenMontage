import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { TitleTakeover } from "./components/TitleTakeover";
import { BarChart, BarDatum } from "./components/charts/BarChart";
import { CompanySpotlight } from "./components/CompanySpotlight";
import { CaptionOverlay } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";

// Load word timestamps
import wordsData from "../public/techtheory_ep02/sample/words.json";

export const TechTheorySample: React.FC = () => {
  const { fps } = useVideoConfig(); // 60 fps

  // Timing markers in frames @ 60 FPS
  // Scene 1: 0 to 372 (0.0s to 6.2s)
  // Scene 2: 372 to 828 (6.2s to 13.8s)
  // Scene 3: 828 to 1276 (13.8s to 21.26s)
  const SCENE1_FRAMES = 372;
  const SCENE2_FRAMES = 828 - 372; // 456 frames
  const SCENE3_FRAMES = 1276 - 828; // 448 frames

  const barChartData: BarDatum[] = [
    {
      label: "Google",
      value: 52,
      logoUrl: "techtheory_ep02/logos/google.svg",
      color: "#4285F4",
      subLabel: "Capex: $52B",
      delaySeconds: 0.1,
    },
    {
      label: "Meta",
      value: 40,
      logoUrl: "techtheory_ep02/logos/meta.svg",
      color: "#0081FB",
      subLabel: "Capex: $40B",
      delaySeconds: 0.5,
    },
    {
      label: "Microsoft",
      value: 64,
      logoUrl: "techtheory_ep02/logos/microsoft.svg",
      color: "#00A4EF",
      subLabel: "Capex: $64B",
      delaySeconds: 0.9,
    },
    {
      label: "Amazon",
      value: 75,
      logoUrl: "techtheory_ep02/logos/amazon.svg",
      color: "#FF9900",
      subLabel: "Capex: $75B",
      delaySeconds: 1.3,
    },
  ];

  const Container = AbsoluteFill as any;

  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* ======================================================== */}
      {/* AUDIO LAYER: Voiceover + Ducked BGM + Studio SFX        */}
      {/* ======================================================== */}
      <Audio
        src={resolveAsset("techtheory_ep02/sample/narration.mp3")}
        volume={1.0}
      />
      <Audio
        src={resolveAsset("techtheory_ep02/sample/bgm.mp3")}
        volume={0.09}
      />

      {/* SFX: Opening Impact Bass */}
      <Sequence from={5} durationInFrames={180}>
        <Audio
          src={resolveAsset("techtheory_ep02/sample/impact.mp3")}
          volume={0.4}
        />
      </Sequence>

      {/* SFX: Chart Reveal Whoosh */}
      <Sequence from={370} durationInFrames={120}>
        <Audio
          src={resolveAsset("techtheory_ep02/sample/whoosh.mp3")}
          volume={0.35}
        />
      </Sequence>

      {/* SFX: Nvidia Spotlight Impact */}
      <Sequence from={826} durationInFrames={180}>
        <Audio
          src={resolveAsset("techtheory_ep02/sample/impact.mp3")}
          volume={0.4}
        />
      </Sequence>

      {/* ======================================================== */}
      {/* SCENE 1: Title Takeover ($600B AI Capex Gamble)           */}
      {/* ======================================================== */}
      <Sequence from={0} durationInFrames={SCENE1_FRAMES}>
        <TitleTakeover
          words={["$600B", "AI", "CAPEX", "GAMBLE"]}
          subtitle="Big Tech's Most Expensive Bet in Corporate History"
          accentColor="#06B6D4"
          bgImage="techtheory_ep02/images/broll_datacenter_racks.jpg"
          overlayOpacity={0.78}
        />
      </Sequence>

      {/* ======================================================== */}
      {/* SCENE 2: Rising Logo-On-Bar Chart (Capex Comparison)     */}
      {/* ======================================================== */}
      <Sequence from={SCENE1_FRAMES} durationInFrames={SCENE2_FRAMES}>
        <BarChart
          title="ANNUAL AI INFRASTRUCTURE SPENDING"
          data={barChartData}
          bgImage="techtheory_ep02/images/tpu_cluster_authentic.jpg"
          overlayOpacity={0.75}
          valuePrefix="$"
          valueSuffix="B"
          animationStyle="grow-up"
          textColor="#F8FAFC"
          gridColor="#334155"
        />
      </Sequence>

      {/* ======================================================== */}
      {/* SCENE 3: CompanySpotlight (Nvidia & 78% Gross Margin)    */}
      {/* ======================================================== */}
      <Sequence from={SCENE1_FRAMES + SCENE2_FRAMES} durationInFrames={SCENE3_FRAMES}>
        <CompanySpotlight
          name="NVIDIA"
          role="The Silicon Monopoly"
          company="Jensen Huang, Founder & CEO"
          logoUrl="techtheory_ep02/logos/nvidia.svg"
          brollUrl="techtheory_ep02/images/broll_silicon_valley.jpg"
          overlayOpacity={0.72}
          accentColor="#76B900"
          headline="Selling the pickaxes in the $600 Billion gold rush"
          tag="THE 78% PROFIT MACHINE"
          metrics={[
            { label: "Gross Margin", value: "78%" },
            { label: "Market Cap", value: "$3.5T" },
            { label: "Blackwell Rack", value: "$3.2M" },
          ]}
        />
      </Sequence>

      {/* ======================================================== */}
      {/* SUBTITLE LAYER: Syllable-synced Captions Overlay         */}
      {/* ======================================================== */}
      <CaptionOverlay
        words={wordsData.words.map((w: any) => ({
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

