import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TitleTakeover } from "./components/TitleTakeover";
import { BarChart, BarDatum } from "./components/charts/BarChart";
import { CompanySpotlight } from "./components/CompanySpotlight";
import { StatCard } from "./components/StatCard";
import { ComparisonCard } from "./components/ComparisonCard";
import { CalloutBox } from "./components/CalloutBox";
import { ActionChecklist, ChecklistTask } from "./components/ActionChecklist";
import { AnimeScene } from "./components/AnimeScene";
import { CaptionOverlay } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";

// Word timestamps for Episode 03 (5 Acts)
import wordsAct1 from "../public/techtheory_ep03/audio/words_act1.json";
import wordsAct2 from "../public/techtheory_ep03/audio/words_act2.json";
import wordsAct3 from "../public/techtheory_ep03/audio/words_act3.json";
import wordsAct4 from "../public/techtheory_ep03/audio/words_act4.json";
import wordsAct5 from "../public/techtheory_ep03/audio/words_act5.json";

// React 19 JSX element wrappers
const Container = AbsoluteFill as any;
const AudioElement = Audio as any;
const SequenceElement = Sequence as any;

// ============================================================================
// ACT 1: Cold Open & The Twenty-Year Playbook (0:00 - 88.34s | 5301 frames @ 60 FPS)
// Sentences: 16 cuts with authentic documentary B-Roll on every cut
// ============================================================================
export const TechTheoryEp03Act1: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Clean Voice Narration Audio (No Background Music / Zero SFX) */}
      <AudioElement src={resolveAsset("techtheory_ep03/audio/act1.mp3")} volume={1.0} />

      {/* Sentence 1 (0.10s - 8.79s | 522 frames) */}
      <SequenceElement from={6} durationInFrames={522}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_klarna_briefing.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Klarna CEO Drops Enterprise Bombshell"}
            headline={"In late 2024, the chief executive of Swedish fintech giant Klarna walked into an investor briefing and announced something that sent a chill through Silicon Valley:"}
            tag={"STOCKHOLM INVESTOR BRIEFING"}
            accentColor={"#FFB3C7"}
            metrics={[{"label": "Fintech Valuation", "value": "$14.6B"}, {"label": "Global Users", "value": "150M+"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 2 (8.79s - 14.80s | 357 frames) */}
      <SequenceElement from={528} durationInFrames={357}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_enterprise_contracts.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"Salesforce & Workday Cut"}
            changeIndicator={"MULTI-MILLION CONTRACT CANCELLATION"}
            leftLabel={"Salesforce CRM Contract"}
            leftValue={"CANCELLED"}
            rightLabel={"Workday HR/ERP Contract"}
            rightValue={"CANCELLED"}
            leftColor={"#EF4444"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 3 (14.75s - 18.50s | 225 frames) */}
      <SequenceElement from={885} durationInFrames={225}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_oracle_microsoft_hq.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"No Oracle. No Microsoft."}
            text={"Not a vendor switch. A total architecture departure."}
            borderColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 4 (18.50s - 25.78s | 437 frames) */}
      <SequenceElement from={1110} durationInFrames={437}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_internal_ai_tools.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ActionChecklist
            title={"Replaced by In-House AI"}
            badge={"INTERNAL AI ENGINE"}
            accentColor={"#10B981"}
            tasks={[{ label: "Custom AI CRM Assistant", at: 0.5, badge: "ACTIVE" }, { label: "Autonomous HR Workflow Agents", at: 2.0, badge: "ACTIVE" }, { label: "Direct Database Function Calling", at: 3.5, badge: "ACTIVE" }]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 5 (25.78s - 29.90s | 247 frames) */}
      <SequenceElement from={1547} durationInFrames={247}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_wall_street_nyse.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Treated as a Tech Curiosity"}
            headline={"On Wall Street, that announcement was treated like a curiosity."}
            tag={"WALL STREET REACTION"}
            accentColor={"#F59E0B"}
            metrics={[{"label": "Initial Impact", "value": "Ignored"}, {"label": "Analyst Consensus", "value": "Anomaly"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 6 (29.90s - 34.55s | 279 frames) */}
      <SequenceElement from={1794} durationInFrames={279}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_executive_boardroom.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"THE WARNING SHOT"}
            supportingLine={"Enterprise Software Execs Realize The Moat Is Breached"}
            badge={"CONFIDENTIAL BRIEFINGS"}
            accentColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 7 (34.55s - 40.43s | 353 frames) */}
      <SequenceElement from={2073} durationInFrames={353}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_datacenter_corridor.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"2004 - 2024"}
            subtitle={"Two Decades of Guaranteed Annual Recurring Revenue"}
            accentColor={"#38BDF8"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 8 (40.43s - 43.88s | 207 frames) */}
      <SequenceElement from={2426} durationInFrames={207}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_crumbling_code.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"The Engine Is Falling Apart"}
            text={"The economic fundamentals of per-seat software have broken down."}
            borderColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 9 (43.88s - 49.74s | 352 frames) */}
      <SequenceElement from={2633} durationInFrames={352}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_andreessen_wsj.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Marc Andreessen / a16z"}
            headline={"In 2011, venture capitalist Marc Andreessen coined the defining phrase of the internet age:"}
            tag={"THE 2011 THESIS"}
            accentColor={"#38BDF8"}
            metrics={[{"label": "Essay Published", "value": "Aug 20, 2011"}, {"label": "Wall Street Journal", "value": "Op-Ed"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 10 (49.74s - 51.62s | 112 frames) */}
      <SequenceElement from={2985} durationInFrames={112}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_wsj_headline_macro.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"\"SOFTWARE IS EATING THE WORLD\""}
            supportingLine={"The 13-Year Playbook That Minted Trillions"}
            badge={"THE DEFINING PHRASE"}
            accentColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 11 (51.62s - 54.98s | 202 frames) */}
      <SequenceElement from={3097} durationInFrames={202}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_profit_gold_cash.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Miraculously Profitable"}
            text={"Write code once. Sell it infinitely. Zero marginal cost of replication."}
            borderColor={"#10B981"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 12 (54.98s - 65.83s | 651 frames) */}
      <SequenceElement from={3299} durationInFrames={651}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_corporate_office_seats.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"The Cloud Software Tax"}
            changeIndicator={"PER-SEAT ENTERPRISE PRICING"}
            leftLabel={"Standard Seat Price"}
            leftValue={"$50 - $200 / user / mo"}
            rightLabel={"Billing Structure"}
            rightValue={"100% Guaranteed ARR"}
            leftColor={"#38BDF8"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 13 (65.83s - 74.70s | 532 frames) */}
      <SequenceElement from={3950} durationInFrames={532}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_market_cap_trillions.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"80% Gross Margins Created $3T in Value"}
            badge={"THE SAAS EMPIRE"}
            accentColor={"#10B981"}
            data={[{ label: "Cloud Gross Margin", value: 80, subLabel: "80%", logoUrl: "techtheory_ep03/logos/salesforce.svg", color: "#10B981" }, { label: "Public SaaS Market Cap", value: 3200, subLabel: "3200B", logoUrl: "techtheory_ep03/logos/workday.svg", color: "#38BDF8" }]}
            maxValue={3840.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 14 (74.70s - 79.64s | 296 frames) */}
      <SequenceElement from={4482} durationInFrames={296}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_silicon_valley_campus.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"$3,200,000,000,000+"}
            subtitle={"Built on the belief that software moats could never be crossed"}
            accentColor={"#38BDF8"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 15 (79.64s - 81.92s | 137 frames) */}
      <SequenceElement from={4778} durationInFrames={137}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_fractured_glass_skyscrapers.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"BUT THAT IS NOT WHAT HAPPENED."}
            supportingLine={"The 20-Year Monopoly Encountered An Unstoppable Force"}
            badge={"THE REVERSAL"}
            accentColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 16 (81.92s - 88.34s | 386 frames) */}
      <SequenceElement from={4915} durationInFrames={386}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_neural_compiler_breakdown.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Broke The Fundamental Economics"}
            text={"Autonomous code didn't enhance SaaS. It invalidated per-seat pricing forever."}
            borderColor={"#F59E0B"}
          />
        </Container>
      </SequenceElement>

      {/* Synchronized Dynamic Word-by-Word Caption Overlay */}
      <CaptionOverlay
        words={((wordsAct1 as any).words || (wordsAct1 as any)).map((w: any) => ({
          word: w.w || w.word || "",
          startMs: Math.round((w.s ?? w.start ?? 0) * 1000),
          endMs: Math.round((w.e ?? w.end ?? 0) * 1000),
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
// ACT 2: The Per-Seat Death Spiral (0:00 - 90.52s | 5432 frames @ 60 FPS)
// Sentences: 14 cuts with authentic documentary B-Roll on every cut
// ============================================================================
export const TechTheoryEp03Act2: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Clean Voice Narration Audio (No Background Music / Zero SFX) */}
      <AudioElement src={resolveAsset("techtheory_ep03/audio/act2.mp3")} volume={1.0} />

      {/* Sentence 1 (0.10s - 4.09s | 236 frames) */}
      <SequenceElement from={6} durationInFrames={236}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_stock_market_terminal.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Cracks In The Cloud Castle"}
            headline={"And this is where the math gets dangerous for the software industry."}
            tag={"WALL STREET TELEMETRY"}
            accentColor={"#EF4444"}
            metrics={[{"label": "BVP Cloud Index", "value": "-55%"}, {"label": "Peak Valuation", "value": "2021"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 2 (4.04s - 9.35s | 319 frames) */}
      <SequenceElement from={242} durationInFrames={319}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_2021_bubble_trading.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"Dizzying Price-to-Sales Multiples"}
            badge={"THE 2021 PEAK MULTIPLES"}
            accentColor={"#F59E0B"}
            data={[{ label: "Historical SaaS Average", value: 8, subLabel: "8x Sales", logoUrl: "techtheory_ep03/logos/servicenow.svg", color: "#64748B" }, { label: "2021 Bubble Peak", value: 38, subLabel: "38x Sales", logoUrl: "techtheory_ep03/logos/salesforce.svg", color: "#F59E0B" }]}
            maxValue={120.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 3 (9.35s - 19.17s | 589 frames) */}
      <SequenceElement from={561} durationInFrames={589}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_hyperscale_servers.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"90%+ Flow-Through"}
            subtitle={"Every incremental dollar went directly to gross profit"}
            accentColor={"#10B981"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 4 (19.17s - 23.38s | 253 frames) */}
      <SequenceElement from={1150} durationInFrames={253}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_market_crash_screens.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"BRUTAL REALITY CHECK"}
            supportingLine={"The Narrative Collapses Under Fundamental Pressure"}
            badge={"LATE 2024 CRASH"}
            accentColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 5 (23.38s - 32.17s | 527 frames) */}
      <SequenceElement from={1403} durationInFrames={527}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_multiple_collapse_chart.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"Multiples Crater From 35x Down to 6x"}
            badge={"VALUATION CONTRACTION"}
            accentColor={"#EF4444"}
            data={[{ label: "2021 Peak Multiples", value: 35.4, subLabel: "35.4x", logoUrl: "techtheory_ep03/logos/adobe.svg", color: "#EF4444" }, { label: "2024 Compressed Multiples", value: 6.8, subLabel: "6.8x", logoUrl: "techtheory_ep03/logos/workday.svg", color: "#38BDF8" }]}
            maxValue={120.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 6 (32.17s - 35.10s | 176 frames) */}
      <SequenceElement from={1930} durationInFrames={176}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_salesforce_workday_hq.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"Growth Sinks to Single Digits"}
            changeIndicator={"GROWTH DECELERATION"}
            leftLabel={"Historical SaaS Growth"}
            leftValue={"+25% to +35% YoY"}
            rightLabel={"2024 Enterprise Growth"}
            rightValue={"+7% to +9% YoY"}
            leftColor={"#F59E0B"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 7 (35.10s - 43.73s | 518 frames) */}
      <SequenceElement from={2106} durationInFrames={518}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_fed_reserve_rates.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Analysts Blamed High Interest Rates"}
            text={"The easy narrative: macro budget cuts and rate hikes froze IT spending."}
            borderColor={"#64748B"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 8 (43.73s - 51.91s | 491 frames) */}
      <SequenceElement from={2624} durationInFrames={491}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_procurement_redline.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"The Belt-Tightening Excuse"}
            headline={"At first glance, that sounded like a problem software vendors could simply solve by slapping an AI button into their existing toolbars."}
            tag={"CORPORATE PROCUREMENT"}
            accentColor={"#F59E0B"}
            metrics={[{"label": "IT Spend Reviews", "value": "100%"}, {"label": "Vendor Scrutiny", "value": "Extreme"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 9 (51.91s - 53.41s | 90 frames) */}
      <SequenceElement from={3115} durationInFrames={90}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_circuit_red_alert.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"IT WASN'T."}
            supportingLine={"Something Far More Dangerous Was Happening Beneath The Surface"}
            badge={"THE HIDDEN REALITY"}
            accentColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 10 (53.41s - 61.07s | 459 frames) */}
      <SequenceElement from={3205} durationInFrames={459}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_ai_addon_invoice.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"Customers Pushed Back"}
            changeIndicator={"THE $30 AI ADD-ON TAX"}
            leftLabel={"Vendor Copilot Fee"}
            leftValue={"+$30 / seat / mo"}
            rightLabel={"Customer Response"}
            rightValue={"REJECTED & SCRUTINIZED"}
            leftColor={"#EF4444"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 11 (61.07s - 75.12s | 843 frames) */}
      <SequenceElement from={3664} durationInFrames={843}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_bloated_enterprise_ui.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Millions For Cluttered Dropdowns"}
            text={"Paying enterprise millions for interfaces designed around human cognitive bottlenecks."}
            borderColor={"#F59E0B"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 12 (75.12s - 79.10s | 239 frames) */}
      <SequenceElement from={4507} durationInFrames={239}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_headless_agent_code.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"0 Clicks Needed"}
            subtitle={"Headless execution eliminates the need for human-facing dashboards"}
            accentColor={"#38BDF8"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 13 (79.10s - 85.34s | 374 frames) */}
      <SequenceElement from={4746} durationInFrames={374}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_api_endpoints_mesh.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ActionChecklist
            title={"Raw Headless Interaction"}
            badge={"THE AGENTIC STACK"}
            accentColor={"#10B981"}
            tasks={[{ label: "Direct REST/gRPC Endpoints", at: 0.5, badge: "ACTIVE" }, { label: "Autonomous Function Calling", at: 2.0, badge: "ACTIVE" }, { label: "Real-Time SQL Vector Queries", at: 3.5, badge: "ACTIVE" }]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 14 (85.34s - 90.52s | 312 frames) */}
      <SequenceElement from={5120} durationInFrames={312}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_deprecated_frontend_code.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"80% OF CODE RENDERED IRRELEVANT"}
            supportingLine={"The Entire UI Wrapper Layer Lost Its Economic Justification"}
            badge={"THE OBSOLESCENCE RATIO"}
            accentColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Synchronized Dynamic Word-by-Word Caption Overlay */}
      <CaptionOverlay
        words={((wordsAct2 as any).words || (wordsAct2 as any)).map((w: any) => ({
          word: w.w || w.word || "",
          startMs: Math.round((w.s ?? w.start ?? 0) * 1000),
          endMs: Math.round((w.e ?? w.end ?? 0) * 1000),
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
// ACT 3: The Era of Disposable Code (0:00 - 89.76s | 5386 frames @ 60 FPS)
// Sentences: 14 cuts with authentic documentary B-Roll on every cut
// ============================================================================
export const TechTheoryEp03Act3: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Clean Voice Narration Audio (No Background Music / Zero SFX) */}
      <AudioElement src={resolveAsset("techtheory_ep03/audio/act3.mp3")} volume={1.0} />

      {/* Sentence 1 (0.10s - 2.67s | 151 frames) */}
      <SequenceElement from={6} durationInFrames={151}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_developer_terminal_neon.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"The Developer Revolution"}
            text={"The fundamental cost structure of software development just flipped."}
            borderColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 2 (2.62s - 11.78s | 550 frames) */}
      <SequenceElement from={157} durationInFrames={550}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_legacy_monolithic_software.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"Decades of Bloat"}
            subtitle={"Companies were held hostage because bespoke development cost too much"}
            accentColor={"#64748B"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 3 (11.78s - 19.53s | 465 frames) */}
      <SequenceElement from={707} durationInFrames={465}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_software_dev_payroll.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"$500,000 Dev Squad vs 9 Months"}
            badge={"THE OLD DEVELOPMENT COST"}
            accentColor={"#EF4444"}
            data={[{ label: "Engineer Payroll Cost", value: 500, subLabel: "500k USD", logoUrl: "techtheory_ep03/logos/salesforce.svg", color: "#EF4444" }, { label: "Development Timeline", value: 9, subLabel: "9 Months", logoUrl: "techtheory_ep03/logos/workday.svg", color: "#F59E0B" }]}
            maxValue={600.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 4 (19.53s - 25.40s | 352 frames) */}
      <SequenceElement from={1172} durationInFrames={352}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_autonomous_coding_agent.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"$0.00 / Line"}
            subtitle={"Generating verified production code has become essentially free"}
            accentColor={"#10B981"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 5 (25.40s - 36.41s | 660 frames) */}
      <SequenceElement from={1524} durationInFrames={660}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_andrej_karpathy_portrait.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Andrej Karpathy: \"Vibe Coding\""}
            headline={"Former OpenAI research director Andrej Karpathy termed this shift vibe coding\u2014a world where human intent and natural language compile directly into executable production applications."}
            tag={"THE PARADIGM SHIFT"}
            accentColor={"#38BDF8"}
            metrics={[{"label": "Concept Origin", "value": "OpenAI / Tesla AI"}, {"label": "Mechanism", "value": "Natural Language -> App"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 6 (36.41s - 40.47s | 244 frames) */}
      <SequenceElement from={2184} durationInFrames={244}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_natural_language_ide.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Psychological Barrier Evaporated"}
            text={"Anyone who can articulate a business problem can now build software."}
            borderColor={"#10B981"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 7 (40.47s - 44.23s | 226 frames) */}
      <SequenceElement from={2428} durationInFrames={226}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_gothic_cathedral_software.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"Death of Monumental Code"}
            subtitle={"Software used to be built to stand for a decade. Not anymore."}
            accentColor={"#64748B"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 8 (44.23s - 47.03s | 168 frames) */}
      <SequenceElement from={2654} durationInFrames={168}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_disposable_utility_cloud.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"DISPOSABLE UTILITY"}
            supportingLine={"Code Is Now Like Electricity \u2014 Used Once and Recycled"}
            badge={"THE NEW REALITY"}
            accentColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 9 (47.03s - 50.84s | 228 frames) */}
      <SequenceElement from={2822} durationInFrames={228}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_enterprise_balance_sheet.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"The Enterprise Impact"}
            headline={"Think about what that actually means for the enterprise economy."}
            tag={"ECONOMIC CONSEQUENCES"}
            accentColor={"#F59E0B"}
            metrics={[{"label": "Old Annual SaaS", "value": "$100k-$1M"}, {"label": "New In-House AI", "value": "<$500"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 10 (50.84s - 65.86s | 902 frames) */}
      <SequenceElement from={3050} durationInFrames={902}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_3_dollar_vs_100k_invoice.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"$3 API Tokens vs $100k Contract"}
            changeIndicator={"THE ASYMMETRIC CONTRAST"}
            leftLabel={"Bespoke AI Micro-App"}
            leftValue={"$3.00 Tokens (20 Mins)"}
            rightLabel={"Off-The-Shelf SaaS Suite"}
            rightValue={"$100,000 / Year Locked In"}
            leftColor={"#10B981"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 11 (65.86s - 72.09s | 373 frames) */}
      <SequenceElement from={3952} durationInFrames={373}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_5_year_contract_binders.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"5-Year Lock-In"}
            subtitle={"Bought once, suffered through for half a decade"}
            accentColor={"#64748B"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 12 (72.09s - 75.41s | 200 frames) */}
      <SequenceElement from={4325} durationInFrames={200}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_disposable_microapps.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"SOFTWARE IS DISPOSABLE"}
            supportingLine={"Built for the Problem. Discarded After Resolution."}
            badge={"THE NEW WORLD"}
            accentColor={"#10B981"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 13 (75.41s - 85.16s | 584 frames) */}
      <SequenceElement from={4525} durationInFrames={584}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_agile_microapp_team.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ActionChecklist
            title={"Micro-Apps on Demand"}
            badge={"DYNAMIC WORKFLOWS"}
            accentColor={"#38BDF8"}
            tasks={[{ label: "Built on a Tuesday afternoon", at: 0.5, badge: "ACTIVE" }, { label: "Tailored to exact 3-person team", at: 2.0, badge: "ACTIVE" }, { label: "Zero legacy technical debt", at: 3.5, badge: "ACTIVE" }]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 14 (85.16s - 89.76s | 277 frames) */}
      <SequenceElement from={5109} durationInFrames={277}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_agent_regenerate_terminal.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Regenerate From Scratch"}
            text={"Don't debug legacy spaghetti code. Just re-prompt the agent to recreate it."}
            borderColor={"#10B981"}
          />
        </Container>
      </SequenceElement>

      {/* Synchronized Dynamic Word-by-Word Caption Overlay */}
      <CaptionOverlay
        words={((wordsAct3 as any).words || (wordsAct3 as any)).map((w: any) => ({
          word: w.w || w.word || "",
          startMs: Math.round((w.s ?? w.start ?? 0) * 1000),
          endMs: Math.round((w.e ?? w.end ?? 0) * 1000),
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
// ACT 4: The Counter-Punch & Systems of Record (0:00 - 93.22s | 5594 frames @ 60 FPS)
// Sentences: 14 cuts with authentic documentary B-Roll on every cut
// ============================================================================
export const TechTheoryEp03Act4: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Clean Voice Narration Audio (No Background Music / Zero SFX) */}
      <AudioElement src={resolveAsset("techtheory_ep03/audio/act4.mp3")} volume={1.0} />

      {/* Sentence 1 (0.10s - 3.81s | 220 frames) */}
      <SequenceElement from={6} durationInFrames={220}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_sand_hill_road_vc.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"The Great Software Shift"}
            headline={"This triggered an unprecedented land grab across tech."}
            tag={"SILICON VALLEY LAND GRAB"}
            accentColor={"#38BDF8"}
            metrics={[{"label": "Venture Capital Deployed", "value": "$45B+"}, {"label": "Target TAM", "value": "Global Labor"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 2 (3.76s - 12.32s | 513 frames) */}
      <SequenceElement from={226} durationInFrames={513}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_300b_it_budget.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"$300,000,000,000"}
            subtitle={"Total annual spending on software tools for human employees"}
            accentColor={"#64748B"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 3 (12.32s - 20.14s | 470 frames) */}
      <SequenceElement from={739} durationInFrames={470}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_10t_labor_budget.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"Software ($300B) vs Global Labor ($10T)"}
            badge={"THE REAL PRIZE"}
            accentColor={"#10B981"}
            data={[{ label: "Legacy Software Budget", value: 300, subLabel: "300B", logoUrl: "techtheory_ep03/logos/salesforce.svg", color: "#64748B" }, { label: "Global Payroll & Labor Budget", value: 10000, subLabel: "10000B", logoUrl: "techtheory_ep03/logos/openai.svg", color: "#10B981" }]}
            maxValue={12000.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 4 (20.14s - 30.34s | 611 frames) */}
      <SequenceElement from={1209} durationInFrames={611}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_sdr_sales_floor.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"Selling Outcomes, Not Software Seats"}
            changeIndicator={"SEATS VS OUTCOMES"}
            leftLabel={"Legacy SaaS Model"}
            leftValue={"Sell CRM Seat + Hire Human SDR ($90k)"}
            rightLabel={"Autonomous Agent Model"}
            rightValue={"Sell The Completed Outcome Directly"}
            leftColor={"#38BDF8"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 5 (30.34s - 35.11s | 286 frames) */}
      <SequenceElement from={1820} durationInFrames={286}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_three_deliverables_montage.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ActionChecklist
            title={"The Completed Business Outcomes"}
            badge={"AUTONOMOUS DELIVERABLES"}
            accentColor={"#10B981"}
            tasks={[{ label: "Qualified Sales Meetings Booked", at: 0.5, badge: "ACTIVE" }, { label: "Insurance Claims Audited in Seconds", at: 2.0, badge: "ACTIVE" }, { label: "Complex Legal Contracts Redlined", at: 3.5, badge: "ACTIVE" }]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 6 (35.11s - 40.26s | 310 frames) */}
      <SequenceElement from={2106} durationInFrames={310}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_digital_labor_workforce.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"SELLING DIGITAL LABOR"}
            supportingLine={"The Shift From Selling Hammers To Selling The Finished Building"}
            badge={"PARADIGM EVOLUTION"}
            accentColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 7 (40.26s - 46.17s | 354 frames) */}
      <SequenceElement from={2416} durationInFrames={354}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_boardroom_dark_twist.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Reality Fought Back"}
            text={"Just as SaaS looked completely doomed, enterprise reality intervened."}
            borderColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 8 (46.17s - 52.42s | 375 frames) */}
      <SequenceElement from={2770} durationInFrames={375}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_klarna_stockholm_office.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Vendor Elimination Hits Friction"}
            headline={"When Klarna attempted to aggressively eliminate their legacy software vendors, reality fought back."}
            tag={"THE KLARNA CASE STUDY"}
            accentColor={"#FFB3C7"}
            metrics={[{"label": "Original Goal", "value": "100% In-House AI"}, {"label": "Encountered", "value": "Operational Edge Cases"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 9 (52.42s - 63.35s | 656 frames) */}
      <SequenceElement from={3145} durationInFrames={656}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_tax_compliance_ledgers.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ActionChecklist
            title={"Why Enterprise Software Survives"}
            badge={"THE MOAT OF REALITY"}
            accentColor={"#F59E0B"}
            tasks={[{ label: "Audited Financial General Ledgers", at: 0.5, badge: "ACTIVE" }, { label: "Payroll Taxes in 50 Jurisdictions", at: 2.0, badge: "ACTIVE" }, { label: "SOC2 Type II & Security Governance", at: 3.5, badge: "ACTIVE" }]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 10 (63.35s - 70.26s | 415 frames) */}
      <SequenceElement from={3801} durationInFrames={415}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_human_compliance_experts.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"Edge-Case Reality"}
            subtitle={"Pure AI hallucinations in financial reporting carry severe legal liability"}
            accentColor={"#EF4444"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 11 (70.26s - 74.95s | 281 frames) */}
      <SequenceElement from={4216} durationInFrames={281}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_enterprise_architecture_diagram.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"Software Is Not Disappearing"}
            text={"The architecture is bifurcating into two extremes."}
            borderColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 12 (74.95s - 82.75s | 468 frames) */}
      <SequenceElement from={4497} durationInFrames={468}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_middle_layer_squeeze.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"The $50/Seat Middle Layer Squeezed Out"}
            badge={"THE DEAD ZONE"}
            accentColor={"#EF4444"}
            data={[{ label: "Shallow Dashboard Apps", value: 15, subLabel: "15% Value Retained", logoUrl: "techtheory_ep03/logos/adobe.svg", color: "#EF4444" }, { label: "Core Systems & AI Engines", value: 85, subLabel: "85% Value Retained", logoUrl: "techtheory_ep03/logos/salesforce.svg", color: "#10B981" }]}
            maxValue={120.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 13 (82.75s - 86.22s | 208 frames) */}
      <SequenceElement from={4965} durationInFrames={208}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_barbell_economy_terminal.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"THE BARBELL ECONOMY"}
            supportingLine={"The Middle Is Dead. Only The Extremes Win."}
            badge={"VALUE CONCENTRATION"}
            accentColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 14 (86.22s - 93.22s | 421 frames) */}
      <SequenceElement from={5173} durationInFrames={421}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_systems_of_record_pillars.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"Systems of Record vs Autonomous Orchestrators"}
            changeIndicator={"THE TWO SURVIVORS"}
            leftLabel={"Systems of Record"}
            leftValue={"Compliant, Audited Data Vaults (Salesforce, Workday)"}
            rightLabel={"Agent Orchestrators"}
            rightValue={"Autonomous Intelligence Routing Workflows"}
            leftColor={"#10B981"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Synchronized Dynamic Word-by-Word Caption Overlay */}
      <CaptionOverlay
        words={((wordsAct4 as any).words || (wordsAct4 as any)).map((w: any) => ({
          word: w.w || w.word || "",
          startMs: Math.round((w.s ?? w.start ?? 0) * 1000),
          endMs: Math.round((w.e ?? w.end ?? 0) * 1000),
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
// ACT 5: The Post-Software World & The Nuclear CTA (0:00 - 86.27s | 5177 frames @ 60 FPS)
// Sentences: 15 cuts with authentic documentary B-Roll on every cut
// ============================================================================
export const TechTheoryEp03Act5: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#070B14" }}>
      {/* Clean Voice Narration Audio (No Background Music / Zero SFX) */}
      <AudioElement src={resolveAsset("techtheory_ep03/audio/act5.mp3")} volume={1.0} />

      {/* Sentence 1 (0.10s - 5.22s | 304 frames) */}
      <SequenceElement from={6} durationInFrames={304}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_zero_marginal_cost_globe.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"$0.0000"}
            subtitle={"When creating software costs nothing, what happens to society?"}
            accentColor={"#38BDF8"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 2 (5.17s - 10.08s | 295 frames) */}
      <SequenceElement from={310} durationInFrames={295}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_jevons_paradox_portrait.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Jevons Paradox (1865)"}
            headline={"Economics points to an eighteenth-century principle known as Jevons Paradox."}
            tag={"ECONOMIC LAW"}
            accentColor={"#F59E0B"}
            metrics={[{"label": "Discovered By", "value": "William Stanley Jevons"}, {"label": "Core Law", "value": "Efficiency Increases Consumption"}]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 3 (10.08s - 19.16s | 545 frames) */}
      <SequenceElement from={605} durationInFrames={545}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_industrial_steam_coal.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"The Coal Engine Paradox"}
            changeIndicator={"HISTORICAL PRECEDENT"}
            leftLabel={"Engine Efficiency"}
            leftValue={"10x Less Coal Per Unit Work"}
            rightLabel={"Total Coal Burned"}
            rightValue={"100x Increase Across Society"}
            leftColor={"#F59E0B"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 4 (19.16s - 23.30s | 248 frames) */}
      <SequenceElement from={1150} durationInFrames={248}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_software_explosion_servers.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"We Won't Stop Using Software"}
            text={"Lower cost doesn't reduce demand. It triggers explosive, exponential proliferation."}
            borderColor={"#10B981"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 5 (23.30s - 25.17s | 112 frames) */}
      <SequenceElement from={1398} durationInFrames={112}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_drowning_in_code_matrix.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"WE WILL DROWN IN IT."}
            supportingLine={"Billions of Ephemeral Programs Running In The Background"}
            badge={"THE INEVITABILITY"}
            accentColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 6 (25.17s - 38.81s | 819 frames) */}
      <SequenceElement from={1510} durationInFrames={819}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_global_automated_economy.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ActionChecklist
            title={"Behind-The-Scenes Orchestration"}
            badge={"THE INVISIBLE WEB"}
            accentColor={"#10B981"}
            tasks={[{ label: "Autonomous Global Supply Chain Routing", at: 0.5, badge: "ACTIVE" }, { label: "Self-Executing Digital Legal Agreements", at: 2.0, badge: "ACTIVE" }, { label: "Algorithmic Continuous Market Clearing", at: 3.5, badge: "ACTIVE" }]}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 7 (38.81s - 43.19s | 262 frames) */}
      <SequenceElement from={2329} durationInFrames={262}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_vintage_screen_powerdown.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"2004 - 2024"}
            subtitle={"Twenty years of clicking through dropdown web menus has concluded"}
            accentColor={"#EF4444"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 8 (43.19s - 46.99s | 229 frames) */}
      <SequenceElement from={2591} durationInFrames={229}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_autonomous_infrastructure_datacenter.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"AUTONOMOUS DIGITAL INFRASTRUCTURE"}
            supportingLine={"The Machines Talk Directly To The Machines"}
            badge={"THE NEW FRONTIER"}
            accentColor={"#38BDF8"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 9 (46.99s - 51.67s | 280 frames) */}
      <SequenceElement from={2820} durationInFrames={280}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_high_voltage_power_grid.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CalloutBox
            title={"The Physical Reality Wall"}
            text={"Code has no physical weight. But the servers running it consume staggering gigawatts."}
            borderColor={"#F59E0B"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 10 (51.67s - 59.92s | 495 frames) */}
      <SequenceElement from={3100} durationInFrames={495}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_transformer_spark_overload.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <BarChart
            title={"Billions in AI CapEx vs The Power Grid"}
            badge={"THE POWER CRUNCH"}
            accentColor={"#EF4444"}
            data={[{ label: "Projected AI Energy Demand", value: 45, subLabel: "45 GW", logoUrl: "techtheory_ep03/logos/microsoft.svg", color: "#EF4444" }, { label: "Available US Grid Capacity", value: 8, subLabel: "8 GW", logoUrl: "techtheory_ep03/logos/amazon.svg", color: "#F59E0B" }]}
            maxValue={120.0}
            showLogoOnBar={true}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 11 (59.92s - 62.50s | 155 frames) */}
      <SequenceElement from={3595} durationInFrames={155}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_neural_network_glowing.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"Trillions of Parameters"}
            subtitle={"Deep learning architectures have solved reasoning and coding"}
            accentColor={"#38BDF8"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 12 (62.50s - 64.83s | 140 frames) */}
      <SequenceElement from={3750} durationInFrames={140}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_blackwell_silicon_wafer.jpg"]}
            animation="pan-right"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <StatCard
            stat={"208 Billion Transistors"}
            subtitle={"The world's most sophisticated computational silicon"}
            accentColor={"#76B900"}
            backgroundColor="transparent"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 13 (64.83s - 68.39s | 213 frames) */}
      <SequenceElement from={3890} durationInFrames={213}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_grid_blackout_warning.jpg"]}
            animation="ken-burns"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <TitleTakeover
            title={"THE POWER GRID IS EMPTY"}
            supportingLine={"There Is No More Electricity For New Hyperscale Data Centers"}
            badge={"THE PHYSICAL WALL"}
            accentColor={"#EF4444"}
          />
        </Container>
      </SequenceElement>

      {/* Sentence 14 (68.39s - 81.27s | 773 frames) */}
      <SequenceElement from={4103} durationInFrames={773}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_nuclear_cherenkov_blue.jpg"]}
            animation="pan-left"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <ComparisonCard
            title={"The Nuclear Tech War"}
            changeIndicator={"EPISODE 04 INVESTIGATION PREVIEW"}
            leftLabel={"Big Tech Nuclear Deals"}
            leftValue={"Microsoft, Amazon, Google Restarting Reactors"}
            rightLabel={"Next Episode"}
            rightValue={"Why AI Hit The Physical Energy Wall"}
            leftColor={"#38BDF8"}
            rightColor="#38BDF8"
          />
        </Container>
      </SequenceElement>

      {/* Sentence 15 (81.27s - 86.27s | 301 frames) */}
      <SequenceElement from={4876} durationInFrames={301}>
        <Container>
          <AnimeScene
            images={["techtheory_ep03/images/broll_techtheory_outro_studio.jpg"]}
            animation="zoom-in"
            particles="none"
            vignette={true}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(7, 11, 20, 0.76)",
              backdropFilter: "blur(6px)",
            }}
          />
          <CompanySpotlight
            name={"Stay Ahead of the Curve"}
            headline={"Subscribe to Tech Theory Lab, click the bell, and stay ahead of the curve."}
            tag={"TECH THEORY LAB"}
            accentColor={"#38BDF8"}
            metrics={[{"label": "Investigation", "value": "Every Week"}, {"label": "Subscribe", "value": "Turn On Notifications"}]}
          />
        </Container>
      </SequenceElement>

      {/* Synchronized Dynamic Word-by-Word Caption Overlay */}
      <CaptionOverlay
        words={((wordsAct5 as any).words || (wordsAct5 as any)).map((w: any) => ({
          word: w.w || w.word || "",
          startMs: Math.round((w.s ?? w.start ?? 0) * 1000),
          endMs: Math.round((w.e ?? w.end ?? 0) * 1000),
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
