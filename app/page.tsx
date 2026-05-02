"use client";

import { useState, useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface OracleReading {
  greeting: string;
  personality: {
    archetype: string;
    element: string;
    traits: string[];
    shadow: string;
  };
  fortune: { past: string; present: string; future: string };
  tarot: { card: string; symbol: string; meaning: string };
  prophecy: string;
  advice: string;
  celestialSign: string;
}

// ── Star Component ─────────────────────────────────────────────────────────
function Starfield() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {Array.from({ length: 120 }).map((_, i) => {
        const size = Math.random() * 2.5 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: i % 5 === 0 ? "#c9a84c" : i % 7 === 0 ? "#9b5de5" : "white",
              borderRadius: "50%",
              animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Mage SVG Character ─────────────────────────────────────────────────────
function MageCharacter({ size = 300, speaking = false }: { size?: number; speaking?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mage-aura"
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* Glow aura behind */}
      <ellipse cx="150" cy="350" rx="80" ry="20" fill="rgba(155,93,229,0.3)" />
      <ellipse cx="150" cy="200" rx="130" ry="180" fill="rgba(155,93,229,0.04)" />

      {/* Robe - flowing */}
      <path d="M80 180 Q60 260 50 380 Q150 400 250 380 Q240 260 220 180 Z" fill="#1a0533" stroke="#9b5de5" strokeWidth="1.5" />
      <path d="M80 180 Q90 240 100 380" stroke="#2d1060" strokeWidth="1" />
      <path d="M220 180 Q210 240 200 380" stroke="#2d1060" strokeWidth="1" />
      {/* Robe trim - gold */}
      <path d="M80 180 Q55 270 50 380" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <path d="M220 180 Q245 270 250 380" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      {/* Center robe line */}
      <path d="M150 180 L145 380" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />

      {/* Belt / sash */}
      <ellipse cx="150" cy="230" rx="65" ry="12" fill="#2d1060" stroke="#c9a84c" strokeWidth="1.5" />
      <rect x="140" y="222" width="20" height="16" rx="3" fill="#c9a84c" opacity="0.8" />
      <circle cx="150" cy="230" r="4" fill="#f0d080" />

      {/* Body */}
      <ellipse cx="150" cy="160" rx="52" ry="55" fill="#1e0b38" stroke="#9b5de5" strokeWidth="1.5" />

      {/* Arms */}
      {/* Left arm - raised with staff */}
      <path d="M100 160 Q70 170 55 150 Q45 135 55 125" stroke="#1e0b38" strokeWidth="22" strokeLinecap="round" />
      <path d="M100 160 Q70 170 55 150 Q45 135 55 125" stroke="#2d1060" strokeWidth="20" strokeLinecap="round" />

      {/* Right arm - outstretched */}
      <path d="M200 160 Q230 165 245 185 Q252 200 248 210" stroke="#1e0b38" strokeWidth="22" strokeLinecap="round" />
      <path d="M200 160 Q230 165 245 185 Q252 200 248 210" stroke="#2d1060" strokeWidth="20" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="55" cy="122" r="12" fill="#c9a06a" />
      <circle cx="248" cy="212" r="12" fill="#c9a06a" />

      {/* Right hand magic orb */}
      <circle cx="248" cy="212" r="18" fill="none" stroke="#00b4d8" strokeWidth="1.5" opacity="0.5" className="rotate-slow" style={{ transformOrigin: "248px 212px" }} />
      <circle cx="248" cy="212" r="12" fill="rgba(0,180,216,0.2)" />
      <circle cx="248" cy="212" r="6" fill="#00b4d8" opacity={speaking ? 1 : 0.7} className="orb-pulse" />
      <circle cx="248" cy="208" r="3" fill="white" opacity="0.6" />

      {/* Staff */}
      <line x1="55" y1="122" x2="30" y2="10" stroke="#8B6914" strokeWidth="5" strokeLinecap="round" />
      <line x1="55" y1="122" x2="30" y2="10" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Staff crystal */}
      <polygon points="30,0 22,20 30,15 38,20" fill="#9b5de5" opacity="0.9" />
      <polygon points="30,0 22,20 30,15 38,20" fill="none" stroke="#c77dff" strokeWidth="1" />
      <circle cx="30" cy="10" r="8" fill="rgba(155,93,229,0.3)" className="pulse-glow" />

      {/* Cloak / shoulders */}
      <path d="M98 140 Q80 120 85 100 Q90 90 100 95" fill="#0d0020" stroke="#9b5de5" strokeWidth="1.5" />
      <path d="M202 140 Q220 120 215 100 Q210 90 200 95" fill="#0d0020" stroke="#9b5de5" strokeWidth="1.5" />
      {/* Hood */}
      <path d="M100 100 Q90 60 150 55 Q210 60 200 100 Q180 80 150 80 Q120 80 100 100Z" fill="#0d0020" stroke="#9b5de5" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="136" y="95" width="28" height="25" rx="5" fill="#c9a06a" />

      {/* Head */}
      <ellipse cx="150" cy="80" rx="42" ry="46" fill="#c9a06a" />

      {/* Hair */}
      <path d="M108 70 Q105 40 120 25 Q135 10 150 15 Q165 10 180 25 Q195 40 192 70" fill="#1a0033" />
      <path d="M108 70 Q100 80 105 95 Q110 75 108 70Z" fill="#1a0033" />
      <path d="M192 70 Q200 80 195 95 Q190 75 192 70Z" fill="#1a0033" />
      {/* Hair strands */}
      <path d="M118 25 Q115 45 112 65" stroke="#2d0055" strokeWidth="2" opacity="0.5" />
      <path d="M150 15 Q148 35 147 60" stroke="#2d0055" strokeWidth="2" opacity="0.5" />
      <path d="M182 25 Q185 45 188 65" stroke="#2d0055" strokeWidth="2" opacity="0.5" />

      {/* Eyes */}
      <ellipse cx="132" cy="80" rx="10" ry="8" fill="#0a0020" />
      <ellipse cx="168" cy="80" rx="10" ry="8" fill="#0a0020" />
      {/* Iris */}
      <circle cx="132" cy="80" r="6" fill="#9b5de5" />
      <circle cx="168" cy="80" r="6" fill="#9b5de5" />
      {/* Pupil */}
      <circle cx="132" cy="80" r="3" fill="#050010" />
      <circle cx="168" cy="80" r="3" fill="#050010" />
      {/* Eye glow */}
      <circle cx="132" cy="80" r="6" fill="none" stroke="#c77dff" strokeWidth="1" opacity="0.6" />
      <circle cx="168" cy="80" r="6" fill="none" stroke="#c77dff" strokeWidth="1" opacity="0.6" />
      {/* Eye highlight */}
      <circle cx="129" cy="77" r="2" fill="white" opacity="0.8" />
      <circle cx="165" cy="77" r="2" fill="white" opacity="0.8" />

      {/* Eyebrows */}
      <path d="M122 68 Q132 63 142 68" stroke="#1a0033" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M158 68 Q168 63 178 68" stroke="#1a0033" strokeWidth="2.5" strokeLinecap="round" />

      {/* Nose */}
      <path d="M147 88 Q145 96 150 98 Q155 96 153 88" stroke="#a8835a" strokeWidth="1.5" fill="none" />

      {/* Mouth */}
      {speaking ? (
        <ellipse cx="150" cy="107" rx="9" ry="6" fill="#0a0020" stroke="#a8835a" strokeWidth="1" />
      ) : (
        <path d="M138 107 Q150 115 162 107" stroke="#a8835a" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* Facial runes / markings */}
      <path d="M118 85 L112 80 L118 75" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M182 85 L188 80 L182 75" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Hat */}
      <path d="M108 72 Q105 55 130 45 L150 5 L170 45 Q195 55 192 72Z" fill="#12003a" stroke="#9b5de5" strokeWidth="1.5" />
      <path d="M108 72 Q150 80 192 72" fill="#1a0050" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Hat band */}
      <path d="M112 73 Q150 82 188 73" stroke="#c9a84c" strokeWidth="2" opacity="0.8" />
      {/* Hat stars */}
      <circle cx="145" cy="40" r="2" fill="#c9a84c" className="pulse-glow" />
      <circle cx="158" cy="28" r="1.5" fill="#9b5de5" />
      <circle cx="163" cy="48" r="1" fill="#c9a84c" />

      {/* Floating magical particles */}
      {[...Array(6)].map((_, i) => (
        <circle
          key={i}
          cx={150 + Math.cos((i * 60 * Math.PI) / 180) * 80}
          cy={200 + Math.sin((i * 60 * Math.PI) / 180) * 60}
          r={2 + (i % 2)}
          fill={i % 2 === 0 ? "#c9a84c" : "#9b5de5"}
          style={{
            animation: `particleFloat ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
            transformOrigin: "150px 200px",
          }}
        />
      ))}

      {/* Rune circle around mage */}
      <circle cx="150" cy="200" r="120" stroke="#c9a84c" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 8" className="rotate-slow" />
      <circle cx="150" cy="200" r="100" stroke="#9b5de5" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 6" className="rotate-reverse" />
    </svg>
  );
}

// ── Rune Circle Decoration ─────────────────────────────────────────────────
function RuneCircle({ size = 200, className = "" }: { size?: number; className?: string }) {
  const runes = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ"];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} style={{ opacity: 0.25 }}>
      <circle cx="100" cy="100" r="90" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="75" stroke="#9b5de5" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="60" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="2 4" />
      {runes.map((r, i) => {
        const angle = (i * 360) / runes.length;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 82 * Math.cos(rad);
        const y = 100 + 82 * Math.sin(rad);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fill="#c9a84c" fontSize="9" fontFamily="serif" transform={`rotate(${angle + 90}, ${x}, ${y})`}>
            {r}
          </text>
        );
      })}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 60 * Math.cos(rad); const y1 = 100 + 60 * Math.sin(rad);
        const x2 = 100 + 90 * Math.cos(rad); const y2 = 100 + 90 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a84c" strokeWidth="0.8" />;
      })}
    </svg>
  );
}

// ── Loading Orb ────────────────────────────────────────────────────────────
function LoadingOrb() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", padding: "3rem 0" }}>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        {/* Outer rings */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.4)", animation: "rotateSlow 8s linear infinite"
        }} />
        <div style={{
          position: "absolute", inset: 10, borderRadius: "50%",
          border: "1px solid rgba(155,93,229,0.5)", animation: "rotateReverse 6s linear infinite"
        }} />
        {/* Core */}
        <div style={{
          position: "absolute", inset: 25, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(155,93,229,0.8) 0%, rgba(155,93,229,0.2) 60%, transparent 100%)",
          animation: "orbPulse 2s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", inset: 40, borderRadius: "50%",
          background: "radial-gradient(circle, #c9a84c 0%, rgba(201,168,76,0.4) 100%)",
          animation: "orbPulse 1.5s ease-in-out infinite"
        }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "1rem", letterSpacing: "0.2em" }}>
          ZYPHORIA GAZES INTO THE VOID
        </p>
        <p style={{ fontFamily: "'Crimson Text', serif", color: "#6b5c6e", fontStyle: "italic", marginTop: "0.5rem" }}>
          The ancient vision takes form...
        </p>
      </div>
    </div>
  );
}

// ── Fortune Display ────────────────────────────────────────────────────────
function FortuneDisplay({ reading }: { reading: OracleReading }) {
  const elementColors: Record<string, string> = {
    Fire: "#e63946", Water: "#00b4d8", Earth: "#588157",
    Air: "#a8c5da", Aether: "#9b5de5"
  };
  const elemColor = elementColors[reading.personality.element] || "#c9a84c";

  return (
    <div className="fortune-reveal" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Greeting */}
      <div style={{
        background: "linear-gradient(135deg, rgba(155,93,229,0.15) 0%, rgba(201,168,76,0.1) 100%)",
        border: "1px solid rgba(201,168,76,0.3)",
        borderRadius: "1rem",
        padding: "1.5rem 2rem",
        textAlign: "center"
      }}>
        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.3rem", color: "#f0e6d3", fontStyle: "italic" }}>
          {reading.greeting}
        </p>
        <p style={{ marginTop: "0.75rem", fontFamily: "'Cinzel', serif", fontSize: "0.75rem",
          color: "#c9a84c", letterSpacing: "0.2em", opacity: 0.7 }}>
          ✦ {reading.celestialSign} ✦
        </p>
      </div>

      {/* Personality */}
      <div className="card-mystic" style={{ borderRadius: "1rem", padding: "1.5rem 2rem" }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.8rem",
          letterSpacing: "0.25em", marginBottom: "1rem", opacity: 0.7 }}>
          ◈ SOUL READING
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <p style={{ color: "#6b5c6e", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.25rem" }}>ARCHETYPE</p>
            <p style={{ color: "#f0e6d3", fontSize: "1.2rem", fontWeight: 600 }}>{reading.personality.archetype}</p>
          </div>
          <div>
            <p style={{ color: "#6b5c6e", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.25rem" }}>ELEMENT</p>
            <p style={{ color: elemColor, fontSize: "1.2rem", fontWeight: 600 }}>{reading.personality.element}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {reading.personality.traits.map((t, i) => (
            <span key={i} style={{
              background: "rgba(155,93,229,0.15)", border: "1px solid rgba(155,93,229,0.3)",
              borderRadius: "2rem", padding: "0.25rem 0.75rem",
              fontFamily: "'Cinzel', serif", fontSize: "0.7rem", color: "#c77dff", letterSpacing: "0.1em"
            }}>{t}</span>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "1rem" }}>
          <p style={{ color: "#6b5c6e", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.25rem" }}>
            ⚡ SHADOW TRAIT
          </p>
          <p style={{ color: "#e63946", fontStyle: "italic" }}>{reading.personality.shadow}</p>
        </div>
      </div>

      {/* Tarot */}
      <div style={{
        background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(26,15,46,0.9) 100%)",
        border: "1px solid rgba(201,168,76,0.25)",
        borderRadius: "1rem", padding: "1.5rem 2rem",
        display: "flex", gap: "1.5rem", alignItems: "center"
      }}>
        <div style={{
          width: 70, height: 70, flexShrink: 0,
          background: "linear-gradient(135deg, #2d1b69, #1a0f3e)",
          border: "2px solid rgba(201,168,76,0.4)",
          borderRadius: "0.75rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem"
        }}>
          {reading.tarot.symbol}
        </div>
        <div>
          <p style={{ color: "#6b5c6e", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.25rem" }}>YOUR TAROT CARD</p>
          <p style={{ color: "#c9a84c", fontFamily: "'Cinzel', serif", fontSize: "1.1rem", marginBottom: "0.4rem" }}>{reading.tarot.card}</p>
          <p style={{ color: "#b8a99a", fontStyle: "italic", fontSize: "1rem" }}>{reading.tarot.meaning}</p>
        </div>
      </div>

      {/* Timeline Fortune */}
      <div className="card-mystic" style={{ borderRadius: "1rem", padding: "1.5rem 2rem" }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.8rem",
          letterSpacing: "0.25em", marginBottom: "1.25rem", opacity: 0.7 }}>◈ THE THREADS OF TIME</h3>
        {[
          { label: "PAST", text: reading.fortune.past, color: "#9b5de5" },
          { label: "PRESENT", text: reading.fortune.present, color: "#c9a84c" },
          { label: "FUTURE", text: reading.fortune.future, color: "#00b4d8" },
        ].map(({ label, text, color }) => (
          <div key={label} style={{ marginBottom: "1.25rem", paddingLeft: "1rem",
            borderLeft: `2px solid ${color}`, paddingBottom: "0.25rem" }}>
            <p style={{ color, fontFamily: "'Cinzel', serif", fontSize: "0.7rem",
              letterSpacing: "0.2em", marginBottom: "0.4rem" }}>{label}</p>
            <p style={{ color: "#f0e6d3", lineHeight: 1.7, fontStyle: "italic" }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Prophecy */}
      <div style={{
        background: "linear-gradient(135deg, rgba(155,93,229,0.12) 0%, rgba(201,168,76,0.08) 100%)",
        border: "1px solid rgba(155,93,229,0.3)",
        borderRadius: "1rem", padding: "2rem",
        textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "radial-gradient(circle at 50% 50%, #9b5de5 0%, transparent 70%)" }} />
        <p style={{ color: "#6b5c6e", fontFamily: "'Cinzel', serif", fontSize: "0.7rem",
          letterSpacing: "0.25em", marginBottom: "1rem" }}>✦ THE PROPHECY ✦</p>
        <p style={{ color: "#f0d080", fontFamily: "'Crimson Text', serif", fontSize: "1.35rem",
          fontStyle: "italic", lineHeight: 1.7, position: "relative" }}>
          "{reading.prophecy}"
        </p>
      </div>

      {/* Advice */}
      <div className="card-mystic" style={{ borderRadius: "1rem", padding: "1.5rem 2rem" }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.8rem",
          letterSpacing: "0.25em", marginBottom: "1rem", opacity: 0.7 }}>◈ ZYPHORIA SPEAKS</h3>
        <p style={{ color: "#f0e6d3", lineHeight: 1.8, fontStyle: "italic", fontSize: "1.1rem" }}>
          {reading.advice}
        </p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Home() {
  const [step, setStep] = useState<"landing" | "form" | "loading" | "result">("landing");
  const [form, setForm] = useState({
    name: "", birthDate: "", birthTime: "", question: "", traits: "", mood: ""
  });
  const [reading, setReading] = useState<OracleReading | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "result" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  async function seekFortune() {
    if (!form.name.trim()) { setError("Zyphoria requires your name to see your fate."); return; }
    setError("");
    setStep("loading");
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setReading(data.reading);
      setStep("result");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "The oracle's vision is clouded.");
      setStep("form");
    }
  }

  const moods = ["✨ Hopeful", "🌊 Uncertain", "🔥 Determined", "🌑 Lost", "⚡ Restless", "🌸 At Peace"];
  const traitOptions = ["Intuitive", "Ambitious", "Empathic", "Creative", "Analytical", "Adventurous", "Loyal", "Independent"];

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <Starfield />

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: "-200px", left: "-200px",
          background: "radial-gradient(circle, rgba(155,93,229,0.12) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: "-100px", right: "-150px",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          animation: "float 13s ease-in-out 2s infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", top: "40%", left: "60%",
          background: "radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%)",
          animation: "float 8s ease-in-out 4s infinite" }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── LANDING ── */}
        {(step === "landing" || step === "form" || step === "loading" || step === "result") && (
          <section style={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "2rem 1.5rem", textAlign: "center"
          }}>
            {/* Logo & Title */}
            <div style={{ marginBottom: "0.5rem" }}>
              <RuneCircle size={80} className="rotate-slow" />
            </div>

            <p style={{ fontFamily: "'Cinzel', serif", color: "#6b5c6e", fontSize: "0.7rem",
              letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              ✦ Ancient Oracle ✦
            </p>

            <h1 className="font-display shimmer-text" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 1.1, marginBottom: "0.5rem" }}>
              MYSTICA
            </h1>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: "#9b5de5",
              fontSize: "clamp(0.9rem, 3vw, 1.3rem)", letterSpacing: "0.5em", marginBottom: "2rem" }}>
              ORACLE
            </h2>

            {/* Mage */}
            <div style={{ margin: "1rem 0 2rem" }}>
              <MageCharacter size={240} speaking={step === "loading"} />
            </div>

            <p style={{ fontFamily: "'Crimson Text', serif", color: "#b8a99a",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontStyle: "italic",
              maxWidth: 480, lineHeight: 1.8, marginBottom: "2.5rem" }}>
              I am <strong style={{ color: "#c9a84c" }}>Zyphoria</strong>, keeper of the ancient sight.
              Seekers of truth come to me when the stars speak and the veil grows thin.
              Let me read the thread of your fate.
            </p>

            {step === "landing" && (
              <button className="btn-oracle" onClick={() => setStep("form")}
                style={{ padding: "1rem 2.5rem", borderRadius: "0.5rem", fontSize: "0.95rem" }}>
                ✦ Seek the Oracle ✦
              </button>
            )}
          </section>
        )}

        {/* ── FORM ── */}
        {step === "form" && (
          <section style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
            <div className="rune-divider" style={{ marginBottom: "2.5rem" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.3em" }}>
                TELL ZYPHORIA YOUR TRUTH
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Name */}
              <div>
                <label style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem",
                  letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>
                  YOUR NAME *
                </label>
                <input className="input-mystic" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="What name were you given at birth?"
                  style={{ width: "100%", padding: "0.85rem 1.25rem", borderRadius: "0.5rem" }}
                />
              </div>

              {/* Birth details */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem",
                    letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>BIRTH DATE</label>
                  <input type="date" className="input-mystic" value={form.birthDate}
                    onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))}
                    style={{ width: "100%", padding: "0.85rem 1.25rem", borderRadius: "0.5rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem",
                    letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>BIRTH TIME</label>
                  <input type="time" className="input-mystic" value={form.birthTime}
                    onChange={e => setForm(f => ({ ...f, birthTime: e.target.value }))}
                    style={{ width: "100%", padding: "0.85rem 1.25rem", borderRadius: "0.5rem" }}
                  />
                </div>
              </div>

              {/* Question */}
              <div>
                <label style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem",
                  letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>
                  YOUR QUESTION FOR THE ORACLE
                </label>
                <textarea className="input-mystic" value={form.question}
                  onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
                  placeholder="What truth do you seek? What weighs upon your soul?"
                  rows={3}
                  style={{ width: "100%", padding: "0.85rem 1.25rem", borderRadius: "0.5rem", resize: "vertical" }}
                />
              </div>

              {/* Traits */}
              <div>
                <label style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem",
                  letterSpacing: "0.2em", display: "block", marginBottom: "0.75rem" }}>
                  YOUR TRAITS (choose or type your own)
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  {traitOptions.map(trait => {
                    const selected = form.traits.includes(trait);
                    return (
                      <button key={trait} onClick={() => {
                        setForm(f => ({
                          ...f, traits: selected
                            ? f.traits.replace(trait, "").replace(/, ,|^, |, $|^,|,$/, "").trim()
                            : f.traits ? `${f.traits}, ${trait}` : trait
                        }));
                      }}
                        style={{
                          padding: "0.3rem 0.9rem", borderRadius: "2rem", cursor: "pointer",
                          fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.1em",
                          border: `1px solid ${selected ? "#c9a84c" : "rgba(155,93,229,0.3)"}`,
                          background: selected ? "rgba(201,168,76,0.15)" : "rgba(10,5,18,0.6)",
                          color: selected ? "#c9a84c" : "#9b5de5", transition: "all 0.2s"
                        }}>
                        {trait}
                      </button>
                    );
                  })}
                </div>
                <input className="input-mystic" value={form.traits}
                  onChange={e => setForm(f => ({ ...f, traits: e.target.value }))}
                  placeholder="Or describe yourself freely..."
                  style={{ width: "100%", padding: "0.85rem 1.25rem", borderRadius: "0.5rem" }}
                />
              </div>

              {/* Mood */}
              <div>
                <label style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem",
                  letterSpacing: "0.2em", display: "block", marginBottom: "0.75rem" }}>
                  YOUR CURRENT ENERGY
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {moods.map(mood => {
                    const selected = form.mood === mood;
                    return (
                      <button key={mood} onClick={() => setForm(f => ({ ...f, mood: selected ? "" : mood }))}
                        style={{
                          padding: "0.4rem 1rem", borderRadius: "2rem", cursor: "pointer",
                          fontFamily: "'Crimson Text', serif", fontSize: "0.95rem",
                          border: `1px solid ${selected ? "#c9a84c" : "rgba(155,93,229,0.25)"}`,
                          background: selected ? "rgba(201,168,76,0.12)" : "rgba(10,5,18,0.6)",
                          color: selected ? "#f0d080" : "#b8a99a", transition: "all 0.2s"
                        }}>
                        {mood}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p style={{ color: "#e63946", fontFamily: "'Cinzel', serif", fontSize: "0.8rem",
                  letterSpacing: "0.1em", textAlign: "center" }}>
                  ⚠ {error}
                </p>
              )}

              <button className="btn-oracle" onClick={seekFortune}
                style={{ padding: "1.1rem", borderRadius: "0.5rem", fontSize: "1rem", marginTop: "0.5rem" }}>
                ✦ Reveal My Fate ✦
              </button>
            </div>
          </section>
        )}

        {/* ── LOADING ── */}
        {step === "loading" && (
          <section style={{ maxWidth: 480, margin: "0 auto", padding: "2rem 1.5rem" }}>
            <LoadingOrb />
          </section>
        )}

        {/* ── RESULT ── */}
        {step === "result" && reading && (
          <section ref={resultRef} style={{ maxWidth: 680, margin: "0 auto", padding: "0 1.5rem 5rem" }}>
            <div className="rune-divider" style={{ marginBottom: "2rem" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.3em" }}>
                THE VISION IS REVEALED
              </span>
            </div>

            <FortuneDisplay reading={reading} />

            <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              <button className="btn-oracle" onClick={() => { setStep("form"); setReading(null); }}
                style={{ flex: 1, padding: "0.9rem", borderRadius: "0.5rem", fontSize: "0.85rem" }}>
                ✦ Seek Again
              </button>
              <button onClick={() => {
                const text = `✦ My Mystica Oracle Reading ✦\n\nArchetype: ${reading.personality.archetype}\nElement: ${reading.personality.element}\nTarot: ${reading.tarot.card}\n\nProphecy: "${reading.prophecy}"\n\n— Mystica Oracle by Zyphoria`;
                navigator.clipboard.writeText(text).then(() => alert("Reading copied to clipboard!"));
              }}
                style={{
                  flex: 1, padding: "0.9rem", borderRadius: "0.5rem",
                  border: "1px solid rgba(155,93,229,0.4)",
                  background: "rgba(10,5,18,0.8)", color: "#c77dff",
                  fontFamily: "'Cinzel', serif", fontSize: "0.85rem", letterSpacing: "0.1em", cursor: "pointer",
                  transition: "all 0.3s"
                }}>
                ✦ Copy Reading
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{
          textAlign: "center", padding: "2rem 1.5rem",
          borderTop: "1px solid rgba(201,168,76,0.08)"
        }}>
          <p style={{ fontFamily: "'Cinzel', serif", color: "#3a2a4a", fontSize: "0.7rem", letterSpacing: "0.3em" }}>
            MYSTICA ORACLE · ZYPHORIA THE ANCIENT SEER · wealthypeople.id
          </p>
        </footer>
      </div>
    </main>
  );
}
