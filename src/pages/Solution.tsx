import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";

// ─── Color tokens ────────────────────────────────────────────────
const BG      = "transparent";
const BG_ALT  = "transparent";
const FG      = "#1a1d24";
const FG_MUT  = "#717a8a";
const BLUE    = "#3b9eff";
const DARK_BG = "#161b29";  // hero vidéo section reste sombre

// ─── Shared style primitives ─────────────────────────────────────
const serif: React.CSSProperties = {
  fontFamily: "'DM Serif Display', Georgia, serif",
};

const sans: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
};

const labelStyle: React.CSSProperties = {
  ...sans,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: BLUE,
  display: "block",
  marginBottom: "20px",
};

const labelDark: React.CSSProperties = {
  ...labelStyle,
  color: "rgba(255,255,255,0.35)",
};

// Glass card — fond clair
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.85)",
  boxShadow: "0 8px 32px rgba(60,100,180,0.10)",
  borderRadius: "18px",
  padding: "24px",
};

const glassCardLg: React.CSSProperties = {
  ...glassCard,
  borderRadius: "20px",
  padding: "32px 28px",
};

// Dark card (hero section)
const darkCard: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "0.5px solid rgba(255,255,255,0.13)",
  borderRadius: "18px",
  padding: "22px 20px",
};

const h2Style: React.CSSProperties = {
  ...serif,
  fontSize: "42px",
  letterSpacing: "-1.5px",
  lineHeight: 1.08,
  color: FG,
  marginBottom: "16px",
  marginTop: 0,
};

const introText: React.CSSProperties = {
  ...sans,
  fontSize: "16px",
  color: FG_MUT,
  lineHeight: 1.7,
  maxWidth: "540px",
  marginBottom: "52px",
  marginTop: "16px",
};

const btnPrimary: React.CSSProperties = {
  ...sans,
  backgroundColor: FG,
  color: "#ffffff",
  borderRadius: "28px",
  padding: "13px 28px",
  fontSize: "14px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const btnSecondary: React.CSSProperties = {
  ...sans,
  backgroundColor: "transparent",
  color: "hsl(220, 15%, 25%)",
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: "28px",
  padding: "13px 24px",
  fontSize: "14px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const TABS = ["Hôtel", "Salle de sport", "Entreprise"] as const;
type Tab = typeof TABS[number];

// ─── Component ───────────────────────────────────────────────────
const Solution = () => {
  useDocumentTitle("YourCoach AI — Coach Virtuel pour Hôtels");
  const contentRef    = useRef<HTMLDivElement>(null);
  const selectorRef   = useRef<HTMLDivElement>(null);
  const heroBgRef     = useRef<HTMLDivElement>(null);
  const processStepsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab]     = useState<Tab>("Hôtel");
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [hoveredCard, setHoveredCard] = useState<Tab | null>(null);
  const [progress, setProgress]       = useState<Record<string, number>>({});
  const [overlayCard, setOverlayCard]       = useState<Tab | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const timerRef    = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const intervalRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const TAB_CONFIGS = [
    {
      id: "Hôtel" as Tab,
      label: "Hôtel de luxe",
      title: "Pour vos clients en séjour",
      sub: "24/7 · Multilingue · White label",
      accentColor: "#d4960a",
      borderColor: "rgba(212,150,10,0.30)",
      shadowColor: "rgba(212,150,10,0.15)",
      bgColor:     "rgba(255,255,255,0.52)",
    },
    {
      id: "Salle de sport" as Tab,
      label: "Salle de sport",
      title: "Pour vos adhérents",
      sub: "Engagement · Fidélisation · Performance",
      accentColor: "#3b9eff",
      borderColor: "rgba(59,158,255,0.28)",
      shadowColor: "rgba(59,158,255,0.14)",
      bgColor:     "rgba(255,255,255,0.52)",
    },
    {
      id: "Entreprise" as Tab,
      label: "Entreprise",
      title: "Pour vos équipes",
      sub: "Bien-être · Prévention · ROI",
      accentColor: "#8b5cf6",
      borderColor: "rgba(139,92,246,0.28)",
      shadowColor: "rgba(139,92,246,0.13)",
      bgColor:     "rgba(255,255,255,0.52)",
    },
  ];

  useEffect(() => {
    return () => {
      Object.values(intervalRef.current).forEach(clearInterval);
      Object.values(timerRef.current).forEach(clearTimeout);
    };
  }, []);

  const sectionRef    = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const [scrollingUp,  setScrollingUp]  = useState(false);
  const [titleParallax, setTitleParallax] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);

  const bloc2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const y   = window.scrollY;
      const dir = y < lastScrollRef.current;
      lastScrollRef.current = y;
      setScrollingUp(dir);

      const rect     = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total    = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      if      (progress >= 0.55) setVisibleItems(3);
      else if (progress >= 0.38) setVisibleItems(2);
      else if (progress >= 0.20) setVisibleItems(1);
      else                       setVisibleItems(0);
      setTitleParallax(progress * -30);
      setSectionProgress(progress);
    };

    const onScrollBlur = () => {
      if (!heroBgRef.current) return;
      const vh = window.innerHeight;
      // Le sélecteur entre dans le viewport depuis le bas dès scrollY > 0
      // On atteint le flou max quand le sélecteur couvre ~60% du hero (scrollY ≈ 0.6 * vh)
      const blurProgress = Math.max(0, Math.min(1, window.scrollY / (vh * 0.6)));
      const blurValue    = blurProgress * 10;
      heroBgRef.current.style.filter = blurValue > 0 ? `blur(${blurValue}px)` : "";
    };

    window.addEventListener("scroll", onScroll,     { passive: true });
    window.addEventListener("scroll", onScrollBlur, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollBlur);
    };
  }, []);

  // Parallax: hero content remonte quand le sélecteur entre dans le viewport
  useEffect(() => {
    const onParallax = () => {
      const next = nextSectionRef.current;
      const content = heroContentRef.current;
      if (!next || !content) return;
      const rect = next.getBoundingClientRect();
      const overlap = window.innerHeight - rect.top;
      if (overlap > 0) {
        content.style.transform = `translateY(${-overlap * 0.15}px)`;
      } else {
        content.style.transform = "translateY(0)";
      }
    };
    window.addEventListener("scroll", onParallax, { passive: true });
    return () => window.removeEventListener("scroll", onParallax);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );
    const el = bloc2Ref.current;
    if (el) {
      el.querySelectorAll('.problem-item').forEach((item) => observer.observe(item));
    }
    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.stepIdx);
            setVisibleSteps(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    const container = processStepsRef.current;
    if (container) {
      container.querySelectorAll('[data-step-idx]').forEach(el => observer.observe(el));
    }
    return () => {
      observer.disconnect();
      setVisibleSteps([false, false, false, false]);
    };
  }, [activeTab]);

  const completeCard = (id: Tab) => {
    clearInterval(intervalRef.current[id]);
    setActiveTab(id);
    setHoveredCard(null);
    setProgress(p => ({ ...p, [id]: 0 }));
    setOverlayCard(id);
    requestAnimationFrame(() => requestAnimationFrame(() => setOverlayVisible(true)));
    timerRef.current[`scroll_${id}`] = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
    timerRef.current[`fade_${id}`] = setTimeout(() => {
      setOverlayVisible(false);
      timerRef.current[`clear_${id}`] = setTimeout(() => setOverlayCard(null), 500);
    }, 700);
  };

  const OVERLAY_BG: Record<Tab, string> = {
    "Hôtel":          "linear-gradient(160deg, rgba(235,246,255,0.97) 0%, rgba(210,235,255,0.95) 60%, rgba(190,220,255,0.93) 100%)",
    "Salle de sport": "linear-gradient(160deg, rgba(235,255,247,0.97) 0%, rgba(200,245,225,0.95) 60%, rgba(175,230,210,0.93) 100%)",
    "Entreprise":     "linear-gradient(160deg, rgba(248,245,255,0.97) 0%, rgba(230,220,255,0.95) 60%, rgba(215,205,255,0.93) 100%)",
  };

  return (
    <div style={{ backgroundColor: BG, color: FG, minHeight: "100vh" }}>

      {/* ── Overlay gradient plein écran ── */}
      {overlayCard && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: OVERLAY_BG[overlayCard],
          opacity: overlayVisible ? 1 : 0,
          transition: overlayVisible ? "opacity 0.28s ease" : "opacity 0.5s ease",
          pointerEvents: "none",
        }} />
      )}

      <Header />
      <main id="main">

        {/* ── Wrapper hero + sélecteur (sticky limité) ── */}
        <div ref={selectorRef} style={{ position: "relative" }}>

        {/* ── BLOC 0 — Hero ── */}
        <section style={{ minHeight: "200vh", paddingBottom: "500px", position: "sticky", top: 0, zIndex: 1, overflow: "hidden" }}>

          {/* Fond ciel bleu profond */}
          <div ref={heroBgRef} style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(145deg, #dceffe 0%, #f0ece5 50%, #faeadb 100%)",
            transition: "filter 0.1s linear",
          }} />

          {/* Contenu principal */}
          <div ref={heroContentRef} style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", transition: "transform 0.05s linear" }}>

            {/* Titres — en haut, centrés */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "80px", marginBottom: "40px" }}>
              <h1 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "82px", color: "#0f172a",
                letterSpacing: "-3.5px", lineHeight: 1.0,
                margin: "0 0 16px",
              }}>Votre Coach sans contraintes</h1>
              <p style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "17px", color: "rgba(15,23,42,0.48)",
                maxWidth: "400px", lineHeight: 1.6, margin: 0,
              }}>La technologie et l'expertise humaine,<br />au service de votre performance.</p>
            </div>

            {/* Grid 3 colonnes */}
            <div style={{ display: "grid", gridTemplateColumns: "320px auto 320px", alignItems: "center", gap: 0, width: "100%", maxWidth: "1100px", margin: "0 auto" }}>

              {/* Colonne gauche */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px", alignItems: "flex-end", height: "600px" }}>

                <div style={{ width: "280px", borderRadius: "22px", padding: "24px 22px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <path d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9.24 5 10.91 6.01 12 7.09C13.09 6.01 14.76 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.3 }}>Relation de confiance</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.48)", lineHeight: 1.55, margin: 0 }}>Un coach qui vous connaît, s'adapte et crée un vrai lien dans la durée.</p>
                </div>

                <div style={{ width: "280px", borderRadius: "22px", padding: "24px 22px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <circle cx="12" cy="12" r="2.5" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" />
                    <circle cx="4.5" cy="7" r="2" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" />
                    <circle cx="19.5" cy="7" r="2" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" />
                    <circle cx="12" cy="20" r="2" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" />
                    <line x1="6.3" y1="8.2" x2="10" y2="11" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="17.7" y1="8.2" x2="14" y2="11" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="14.5" x2="12" y2="18" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.3 }}>IA × Coachs & Médecins</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.48)", lineHeight: 1.55, margin: 0 }}>Algorithmes co-construits avec des experts. Chaque recommandation validée.</p>
                </div>

              </div>

              {/* Colonne centrale — smartphone */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  width: "300px", height: "600px",
                  background: "#f4f4f2",
                  borderRadius: "50px",
                  border: "8px solid #1a1a1a",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.15), 0 40px 80px rgba(0,0,0,0.20)",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <div style={{ position: "absolute", top: "14px", left: "50%", transform: "translateX(-50%)", width: "75px", height: "5px", background: "rgba(0,0,0,0.10)", borderRadius: "3px", zIndex: 2 }} />
                  <img
                    src="/mike_face.png"
                    alt="YourCoach AI Coach"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                      transform: 'scale(0.96)',
                      transformOrigin: 'center bottom',
                    }}
                  />
                </div>
              </div>

              {/* Colonne droite */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px", alignItems: "flex-start", height: "600px" }}>

                <div style={{ width: "280px", borderRadius: "22px", padding: "24px 22px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <path d="M4 17C6 17 8 14 10 12C12 10 13 9 14 9C16 9 17 11 19 13" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M17 11L19 13L21 11" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.3 }}>Évolue à chaque séance</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.48)", lineHeight: 1.55, margin: 0 }}>Le coach apprend de chaque session. Plus vous l'utilisez, plus il vous connaît.</p>
                </div>

                <div style={{ width: "280px", borderRadius: "22px", padding: "24px 22px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <circle cx="12" cy="4" r="1.5" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" />
                    <path d="M9 8.5L7 14H10L9 19" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8.5L14 11L17 10" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 14L13 15L15 19" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.3 }}>Démonstration des mouvements</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.48)", lineHeight: 1.55, margin: 0 }}>Chaque exercice démontré en temps réel par l'avatar 3D.</p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════
            TEST C — 4 cards hover expand (masqué)
        ══════════════════════════════════════════ */}
        <div style={{ display: "none" }}>
        <section style={{ height: "100vh", background: "transparent", display: "flex", flexDirection: "row", overflow: "hidden", position: "relative" }}>

          <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10, fontSize: "10px", color: "rgba(0,0,0,0.2)", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>VERSION C</div>

          {([
            { img: "/relation_de_confiance.jpg",   title: "Relation de confiance",        text: "Un coach qui vous connaît, s'adapte et crée un vrai lien dans la durée." },
            { img: "/IAxcoachs.jpg",               title: "IA × Coachs & Médecins",       text: "Algorithmes co-construits avec des experts. Chaque recommandation validée." },
            { img: "/homme-progres-gym.jpg",       title: "Évolue à chaque séance",       text: "Le coach apprend de chaque session. Plus vous l'utilisez, plus il vous connaît." },
            { img: "/demonstration-mouvement.jpg", title: "Démonstration des mouvements", text: "Chaque exercice démontré en temps réel par l'avatar 3D pour une exécution parfaite." },
          ] as const).map((card) => (
            <div
              key={card.title}
              onMouseEnter={(e) => {
                const container = e.currentTarget.parentElement;
                if (!container) return;
                Array.from(container.children).forEach((child) => {
                  const el = child as HTMLElement;
                  if (el.dataset.versionLabel) return;
                  el.style.flex = "0.33";
                  const ov = el.querySelector<HTMLElement>("[data-overlay]");
                  if (ov) ov.style.background = "rgba(0,0,0,0.25)";
                  const desc = el.querySelector<HTMLElement>("[data-desc]");
                  if (desc) { desc.style.opacity = "0"; desc.style.transform = "translateY(8px)"; }
                  const ttl = el.querySelector<HTMLElement>("[data-title]");
                  if (ttl) { ttl.style.fontSize = "14px"; ttl.style.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif"; }
                });
                e.currentTarget.style.flex = "3";
                const ov = e.currentTarget.querySelector<HTMLElement>("[data-overlay]");
                if (ov) ov.style.background = "rgba(0,0,0,0.45)";
                const desc = e.currentTarget.querySelector<HTMLElement>("[data-desc]");
                if (desc) { desc.style.opacity = "1"; desc.style.transform = "translateY(0)"; }
                const ttl = e.currentTarget.querySelector<HTMLElement>("[data-title]");
                if (ttl) { ttl.style.fontSize = "22px"; ttl.style.fontFamily = "'DM Serif Display', Georgia, serif"; }
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget.parentElement;
                if (!container) return;
                Array.from(container.children).forEach((child) => {
                  const el = child as HTMLElement;
                  if (el.dataset.versionLabel) return;
                  el.style.flex = "1";
                  const ov = el.querySelector<HTMLElement>("[data-overlay]");
                  if (ov) ov.style.background = "rgba(0,0,0,0.25)";
                  const desc = el.querySelector<HTMLElement>("[data-desc]");
                  if (desc) { desc.style.opacity = "0"; desc.style.transform = "translateY(8px)"; }
                  const ttl = el.querySelector<HTMLElement>("[data-title]");
                  if (ttl) { ttl.style.fontSize = "14px"; ttl.style.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif"; }
                });
              }}
              style={{ flex: 1, position: "relative", overflow: "hidden", cursor: "pointer", transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)" }}
            >
              <img src={card.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div data-overlay="" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", transition: "background 0.4s ease", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "32px", left: "28px", right: "28px" }}>
                <p data-title="" style={{ fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", margin: "0 0 8px", transition: "font-size 0.3s ease" }}>{card.title}</p>
                <p data-desc="" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", margin: 0, lineHeight: 1.55, opacity: 0, transform: "translateY(8px)", transition: "opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s" }}>{card.text}</p>
              </div>
            </div>
          ))}
        </section>
        </div>

        {/* ── Sélecteur de version — cards 85vh ── */}
        <section ref={nextSectionRef} style={{
          width: "100%",
          height: "85vh",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          padding: "0 16px",
          overflow: "hidden",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
          borderRadius: "28px 28px 0 0",
          marginTop: "220px",
        }}>
          {[
            {
              id:         TAB_CONFIGS[0].id,
              bg:         "rgba(255,255,255,0.52)",
              glassColor: "rgba(59,158,255,0.08)",
              label:      TAB_CONFIGS[0].label,
              title:      TAB_CONFIGS[0].title,
              sub:        TAB_CONFIGS[0].sub,
              labelColor: "#1a56db",
              accent:     "#3b9eff",
            },
            {
              id:         TAB_CONFIGS[1].id,
              bg:         "rgba(255,255,255,0.52)",
              glassColor: "rgba(16,185,129,0.08)",
              label:      TAB_CONFIGS[1].label,
              title:      TAB_CONFIGS[1].title,
              sub:        TAB_CONFIGS[1].sub,
              labelColor: "#059669",
              accent:     "#10b981",
            },
            {
              id:         TAB_CONFIGS[2].id,
              bg:         "rgba(255,255,255,0.52)",
              glassColor: "rgba(139,92,246,0.08)",
              label:      TAB_CONFIGS[2].label,
              title:      TAB_CONFIGS[2].title,
              sub:        TAB_CONFIGS[2].sub,
              labelColor: "#7c3aed",
              accent:     "#8b5cf6",
            },
          ].map((card) => {
            const isHov  = hoveredCard === card.id;
            const isAct  = activeTab   === card.id;
            const prog   = progress[card.id] ?? 0;
            const CIRC   = 2 * Math.PI * 23;

            // Flex logic
            let cardFlex: number;
            if      (isHov)               cardFlex = 2.3;
            else if (hoveredCard !== null) cardFlex = 0.72;
            else if (isAct)               cardFlex = 3.5;
            else                          cardFlex = 1;

            const showContent = isHov || isAct;

            return (
              <div
                key={card.id}
                onClick={() => completeCard(card.id)}
                onMouseEnter={() => {
                  setHoveredCard(card.id);
                  clearInterval(intervalRef.current[card.id]);
                  let count = 0;
                  const TICKS = 50; // 2500ms / 50ms
                  intervalRef.current[card.id] = setInterval(() => {
                    count++;
                    setProgress(p => ({ ...p, [card.id]: count / TICKS }));
                    if (count >= TICKS) completeCard(card.id);
                  }, 50);
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  clearInterval(intervalRef.current[card.id]);
                  setProgress(p => ({ ...p, [card.id]: 0 }));
                }}
                style={{
                  flex: cardFlex,
                  height: "100%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  background: card.bg,
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(3px)",
                  border: "1px solid rgba(255,255,255,0.60)",
                  borderBottom: isAct ? `3px solid ${card.accent}` : "1px solid rgba(255,255,255,0.60)",
                  borderRadius: "20px",
                  transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1), border-bottom 0.2s ease",
                  boxSizing: "border-box",
                }}
              >
                {/* Image de fond conditionnelle */}
                {(card.id === "Hôtel" || card.id === "Salle de sport" || card.id === "Entreprise") && (() => {
                  const imgSrc = card.id === "Hôtel"
                    ? "/spa_hotel_luxe.jpg"
                    : card.id === "Salle de sport"
                      ? "/gym-salle.jpg"
                      : "/entreprise.jpg";
                  return (
                    <img
                      src={imgSrc}
                      alt=""
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        opacity: isAct || isHov ? 0.85 : 0.75,
                        transition: "opacity 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />
                  );
                })()}

                {/* Overlay blanc léger */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: isAct || isHov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.18)",
                  transition: "background 0.4s ease",
                  pointerEvents: "none",
                }} />

                {/* Halo ambiance */}
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 20%, ${card.glassColor} 0%, transparent 60%)`, pointerEvents: "none" }} />

                {/* Inset glass highlight */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.80)", pointerEvents: "none" }} />

                {/* Contenu — ancré bas gauche */}
                <div style={{ position: "absolute", bottom: "40px", left: "40px", right: "80px", zIndex: 2 }}>
                  <p style={{
                    ...sans,
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: card.labelColor,
                    margin: "0 0 10px",
                    opacity: showContent ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}>
                    {card.label}
                  </p>
                  <p style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "38px",
                    color: "#0f172a",
                    letterSpacing: "-1.3px",
                    lineHeight: 1.1,
                    margin: 0,
                  }}>
                    {card.title}
                  </p>
                  <p style={{
                    ...sans,
                    fontSize: "14px",
                    color: "rgba(15,23,42,0.52)",
                    marginTop: "10px",
                    marginBottom: 0,
                    lineHeight: 1.55,
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
                  }}>
                    {card.sub}
                  </p>
                </div>

                {/* Bouton timer circulaire — bas droite */}
                <div style={{
                  position: "absolute",
                  bottom: "36px",
                  right: "32px",
                  width: "52px",
                  height: "52px",
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "scale(1)" : "scale(0.7)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  zIndex: 3,
                  pointerEvents: "none",
                }}>
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="23" fill="rgba(255,255,255,0.30)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                    <circle
                      cx="26" cy="26" r="23"
                      fill="none"
                      stroke={card.accent}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC * (1 - prog)}
                      transform="rotate(-90 26 26)"
                      style={{ transition: "stroke-dashoffset 0.05s linear" }}
                    />
                    <polyline points="21,20 29,26 21,32" fill="none" stroke={card.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </section>
        </div>{/* fin wrapper hero + sélecteur */}

        {/* ── Espacement après sélecteur ── */}
        <div style={{ height: "120px" }} />

        {/* ── Contenu par onglet ── */}
        <div ref={contentRef}>
        {activeTab === "Hôtel" && <>

        {/* ── BLOC 1 — Header hôtel — 2 photos fond + sticky scroll ── */}
        <div ref={sectionRef} style={{ height: "380vh", position: "relative" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex" }}>

            {/* Fond — 2 photos côte à côte (sans séparateur) */}
            <div style={{ position: "absolute", inset: 0, display: "flex" }}>

              {/* Photo gauche — gym */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <img src="/Gym_hotel_luxe.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transform: `scale(${1 + sectionProgress * 0.05})`, transition: "transform 0.1s linear" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,12,0.55) 0%, rgba(8,8,12,0.35) 100%)" }} />
              </div>

              {/* Photo droite — spa */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <img src="/spa_hotel_luxe.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transform: `scale(${1 + sectionProgress * 0.05})`, transition: "transform 0.1s linear" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(8,8,12,0.55) 0%, rgba(8,8,12,0.35) 100%)" }} />
              </div>
            </div>

            {/* Overlay global */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,12,0.15) 0%, rgba(8,8,12,0.05) 40%, rgba(8,8,12,0.25) 100%)", pointerEvents: "none" }} />

            {/* Contenu centré */}
            <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ maxWidth: "680px", textAlign: "center", padding: "0 40px" }}>

                <p style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.90)",
                  textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                  marginBottom: "20px",
                  marginTop: "-140px",
                }}>
                  YourCoach AI pour votre établissement
                </p>

                <h2 style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: "58px",
                  color: "#ffffff",
                  letterSpacing: "-2px",
                  lineHeight: 1.05,
                  marginBottom: "36px",
                  marginTop: "140px",
                  textShadow: "0 2px 20px rgba(0,0,0,0.35)",
                  transform: `translateY(${titleParallax}px)`,
                  transition: "transform 0.1s linear",
                }}>
                  Transformez votre fitness en avantage concurrentiel
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", marginTop: "16px" }}>
                  {(["Sans recruter", "Sans contrainte opérationnelle", "Disponible 24/7 en multilingue"] as const).map((item, index) => (
                    <div
                      key={item}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "50px",
                        padding: "18px 36px",
                        width: "fit-content",
                        margin: "0 auto",
                        opacity: visibleItems > index ? (index === visibleItems - 1 ? 1 : 0.75) : 0,
                        transform: index === visibleItems - 1
                          ? "translateY(0) scale(1.05)"
                          : visibleItems > index
                            ? "translateY(0) scale(1.0)"
                            : "translateY(12px) scale(0.95)",
                        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                        transitionDelay: scrollingUp ? `${(2 - index) * 0.12}s` : `${index * 0.15}s`,
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
                      <span style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "19px",
                        fontWeight: 500,
                        color: "#ffffff",
                        letterSpacing: "-0.2px",
                        textShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── BLOC 2 — Le problème — Eight Sleep style ── */}
        <section
          ref={bloc2Ref}
          style={{
            background: "#0f0f12",
            minHeight: "100vh",
            padding: "120px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Orbes décoratifs */}
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(59,158,255,0.04)", filter: "blur(100px)", top: -100, left: -200, pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(250,200,100,0.03)", filter: "blur(80px)", bottom: 0, right: -100, pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(139,92,246,0.03)", filter: "blur(60px)", top: "50%", left: "50%", pointerEvents: "none", zIndex: 0 }} />

          {/* Contenu */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <span style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "11px",
              letterSpacing: "2.5px",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.28)",
              display: "block",
              marginBottom: "24px",
            }}>
              LE VOYAGEUR MODERNE A CHANGÉ
            </span>

            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "58px",
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "20px",
              marginTop: 0,
            }}>
              Vos clients attendent plus.<br />
              Vos infrastructures font moins.
            </h2>

            <p style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.38)",
              maxWidth: 480,
              margin: "0 auto 80px",
              lineHeight: 1.65,
            }}>
              Le voyageur moderne veut un vrai accompagnement.<br />
              Les solutions actuelles ne suffisent plus.
            </p>
          </div>

          {/* 3 problèmes */}
          <div style={{ maxWidth: 640, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            {[
              {
                num: "01",
                title: "Le voyageur veut maintenir sa routine",
                text: "Il choisit l'hôtel qui offre un vrai accompagnement, pas juste des machines.",
              },
              {
                num: "02",
                title: "Les infrastructures sont sous-exploitées",
                text: "Coûteuses, peu différenciantes. Le ROI est difficile à justifier.",
              },
              {
                num: "03",
                title: "Recruter un coach n'est pas scalable",
                text: "Coût élevé, disponibilité limitée, barrière linguistique.",
              },
            ].map((item, i) => (
              <div
                key={item.num}
                className="problem-item"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "12px",
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
                }}
              >
                <span style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: "32px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: 1,
                  flexShrink: 0,
                  width: "48px",
                }}>
                  {item.num}
                </span>
                <div>
                  <p style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "4px",
                    marginTop: 0,
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOC 3 — 3 leviers business — fond impair ── */}
        <section style={{ backgroundColor: BG, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Notre solution</span>
            <h2 style={h2Style}>3 leviers business</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "52px" }}>
              {[
                {
                  tag: "Service autonome",
                  tagStyle: { backgroundColor: "rgba(59,158,255,0.10)", border: "1px solid rgba(59,158,255,0.25)", color: "hsl(210, 85%, 40%)" },
                  title: "Un service wellness premium, sans ressource humaine",
                  text: "Disponible 24h/24, 7j/7, en multilingue. Aucun recrutement, aucune gestion. YourCoach AI fonctionne en totale autonomie.",
                },
                {
                  tag: "Expérience différenciante",
                  tagStyle: { backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.12)", color: "hsl(220, 15%, 25%)" },
                  title: "Une expérience client activable immédiatement",
                  text: "Différenciation technologique, personnalisation par profil, déployé en marque blanche aux couleurs de votre établissement.",
                },
                {
                  tag: "Revenus additionnels",
                  tagStyle: { backgroundColor: "rgba(224,122,53,0.10)", border: "1px solid rgba(224,122,53,0.25)", color: "hsl(28, 75%, 38%)" },
                  title: "Activation des revenus annexes",
                  text: "Upsell intelligent, cross-selling intégré. Chaque interaction devient une opportunité de valoriser vos services.",
                },
              ].map((item) => (
                <div key={item.tag} style={glassCardLg}>
                  <span style={{ ...sans, borderRadius: "12px", padding: "4px 12px", fontSize: "11px", ...item.tagStyle }}>
                    {item.tag}
                  </span>
                  <p style={{ ...serif, fontSize: "20px", color: FG, marginTop: "20px", marginBottom: "0", lineHeight: 1.2 }}>{item.title}</p>
                  <p style={{ ...sans, fontSize: "14px", color: FG_MUT, lineHeight: 1.7, marginTop: "12px", marginBottom: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 4 — Technologie — fond pair ── */}
        <section style={{ backgroundColor: BG_ALT, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Technologie</span>
            <h2 style={h2Style}>Une technologie avant-gardiste</h2>
            <p style={introText}>
              Les fonctionnalités qui font de YourCoach AI la solution de référence pour les établissements exigeants.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {[
                { title: "Coach 3D Animé par IA", text: "Avatar 3D réaliste capable d'analyser les mouvements, corriger la posture et adapter les exercices en temps réel." },
                { title: "Programmes Personnalisés", text: "L'IA génère des séances sur-mesure basées sur les objectifs, niveau de forme, contraintes physiques et préférences." },
                { title: "Intégration Transparente", text: "Déploiement en 24h avec QR codes dans vos espaces. Formation de votre équipe incluse." },
                { title: "Support Multilingue", text: "Interface disponible en français, anglais, allemand, espagnol et italien." },
                { title: "Accessible sur Mobile", text: "Application native iOS et Android. Vos clients utilisent leur propre smartphone." },
                { title: "Analytiques Avancées", text: "Dashboard en temps réel pour suivre l'engagement, satisfaction client et ROI." },
              ].map((item) => (
                <div key={item.title} style={glassCard}>
                  <p style={{ ...sans, fontSize: "14px", fontWeight: 600, color: FG, marginBottom: "8px", marginTop: 0 }}>{item.title}</p>
                  <p style={{ ...sans, fontSize: "13px", color: FG_MUT, lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 5 — Cas d'usage — fond impair ── */}
        <section style={{ backgroundColor: BG, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Cas d'usage</span>
            <h2 style={h2Style}>Où s'intègre YourCoach AI ?</h2>

            <div style={{ display: "flex", gap: "20px", marginTop: "52px", flexWrap: "wrap" }}>
              {[
                { zone: "En chambre", title: "Méditation & entraînement", text: "Séances guidées depuis la chambre. Mobilité matinale, yoga, récupération. Sans quitter la suite.", img: "/enchambre.jpg" },
                { zone: "En zone fitness", title: "Coaching temps réel", text: "Programmes sur mesure, démonstration des mouvements, correction de posture. L'espace fitness devient une vraie expérience.", img: "/enzonefitness.jpg" },
                { zone: "Dans tout l'hôtel", title: "Conseil & nutrition", text: "Conseils nutrition, planification bien-être, accompagnement global sur toute la durée du séjour.", img: "/danstoutlhotel.jpg" },
              ].map((item) => (
                <div
                  key={item.zone}
                  style={{
                    flex: 1,
                    minWidth: "260px",
                    minHeight: "340px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={e => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {/* Image de fond */}
                  <img
                    src={item.img}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      transform: "scale(1)",
                      transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                  {/* Gradient overlay sombre en bas */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(8,8,16,0.05) 0%, rgba(8,8,16,0.18) 40%, rgba(8,8,16,0.68) 100%)",
                    pointerEvents: "none",
                  }} />
                  {/* Contenu texte — ancré bas gauche */}
                  <div style={{ position: "absolute", bottom: "32px", left: "28px", right: "28px", zIndex: 2 }}>
                    <p style={{ ...sans, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 8px" }}>{item.zone}</p>
                    <p style={{ ...serif, fontSize: "22px", color: "#ffffff", lineHeight: 1.15, margin: "0 0 8px" }}>{item.title}</p>
                    <p style={{ ...sans, fontSize: "13px", color: "rgba(255,255,255,0.68)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 6 — Profils clients — fond pair ── */}
        <section style={{ backgroundColor: BG_ALT, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Profils clients</span>
            <h2 style={h2Style}>Chaque client. Une expérience sur mesure.</h2>
            <p style={introText}>
              YourCoach AI s'adapte à chaque profil, chaque objectif, chaque niveau.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                {
                  tag: "35-40 ans · Actif",
                  name: "Alexandre",
                  situation: "Cadre en déplacement 3 jours. Veut maintenir sa routine de sport sans perdre sa progression.",
                  items: ["Programme force 45 min adapté à la salle", "Récupération post-vol", "Suivi de sa progression habituelle"],
                },
                {
                  tag: "65 ans · Bien-être",
                  name: "Michel",
                  situation: "Retraité en vacances avec sa femme. Veut rester en forme, sans se blesser, à son rythme.",
                  items: ["Mobilité douce quotidienne 20 min", "Conseils posture et prévention", "Programme adapté aux contraintes articulaires"],
                },
                {
                  tag: "50-55 ans · Découverte",
                  name: "Isabelle",
                  situation: "En vacances à l'hôtel, elle veut profiter d'une séance de stretching pour se détendre, mais ne sait pas par où commencer.",
                  items: ["Séance stretching débutant 20 min", "Guidage pas à pas avec démonstrations", "Conseils posture et respiration"],
                },
              ].map((p) => (
                <div key={p.name} style={{ ...glassCardLg, display: "flex", flexDirection: "column", gap: "16px" }}>
                  <span style={{ ...sans, backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.10)", borderRadius: "10px", padding: "3px 10px", fontSize: "11px", color: FG_MUT, alignSelf: "flex-start" }}>
                    {p.tag}
                  </span>
                  <p style={{ ...serif, fontSize: "22px", color: FG, margin: 0 }}>{p.name}</p>
                  <p style={{ ...sans, fontSize: "13px", color: FG_MUT, lineHeight: 1.6, margin: 0 }}>{p.situation}</p>
                  <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)", margin: "4px 0" }} />
                  <p style={{ ...sans, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                    YourCoach lui propose :
                  </p>
                  <ul style={{ ...sans, listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {p.items.map((item) => (
                      <li key={item} style={{ fontSize: "13px", color: FG_MUT, borderLeft: `2px solid ${BLUE}`, paddingLeft: "8px" }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 7 — Résultats — fond impair ── */}
        <section style={{ backgroundColor: BG, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Résultats</span>
            <h2 style={h2Style}>Des résultats mesurables dès les premières semaines</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "52px" }}>
              {[
                { title: "Expérience client premium", text: "Accompagnement bien-être sur-mesure, disponible 24h/24. Satisfaction et fidélité renforcées." },
                { title: "ROI optimisé", text: "Valorise vos équipements existants. Augmentation du taux d'utilisation et du panier moyen." },
                { title: "Engagement maximisé", text: "Stimule l'utilisation régulière des installations grâce à une expérience engageante et personnalisée." },
                { title: "Image différenciante", text: "Positionnez-vous comme précurseur des services bien-être digitaux. Avantage concurrentiel réel." },
                { title: "Aucune charge opérationnelle", text: "Fonctionne en totale autonomie. Pas de personnel dédié, pas d'équipement supplémentaire." },
              ].map((item, idx) => (
                <div key={item.title} style={{ ...glassCard, ...(idx === 4 ? { gridColumn: "1 / -1", maxWidth: "50%", margin: "0 auto", width: "100%" } : {}) }}>
                  <p style={{ ...sans, fontSize: "15px", fontWeight: 600, color: FG, marginBottom: "8px", marginTop: 0 }}>{item.title}</p>
                  <p style={{ ...sans, fontSize: "13px", color: FG_MUT, lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 8 — Process — fond pair ── */}
        <section style={{ backgroundColor: BG_ALT, padding: "96px 80px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={labelStyle}>Déploiement</span>
            <h2 style={h2Style}>Opérationnel en 24h</h2>

            <div ref={processStepsRef} style={{ marginTop: "52px", borderLeft: `1px solid rgba(59,158,255,0.20)`, paddingLeft: "32px", position: "relative" }}>
              {[
                { num: "1", title: "Audit personnalisé", text: "Analyse de vos installations et besoins clients lors de l'onboarding." },
                { num: "2", title: "Déploiement express", text: "Installation et configuration en 24h, sans interruption de vos services." },
                { num: "3", title: "Formation équipe", text: "Accompagnement de vos équipes inclus pour une prise en main optimale." },
                { num: "4", title: "Suivi performance", text: "Dashboard analytique et support continu pour optimiser les résultats." },
              ].map((step, i) => (
                <div key={step.num} data-step-idx={i} style={{ position: "relative", paddingBottom: i < 3 ? "40px" : 0, opacity: visibleSteps[i] ? 1 : 0, transform: visibleSteps[i] ? "translateX(0)" : "translateX(-16px)", transition: "opacity 0.5s ease, transform 0.5s ease", transitionDelay: `${i * 0.1}s` }}>
                  <div style={{
                    position: "absolute",
                    left: "-47px",
                    top: 0,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: `1px solid rgba(59,158,255,0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: BLUE,
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 600,
                  }}>
                    {step.num}
                  </div>
                  <p style={{ ...sans, fontSize: "15px", fontWeight: 600, color: FG, margin: "4px 0 5px" }}>{step.title}</p>
                  <p style={{ ...sans, fontSize: "13px", color: FG_MUT, lineHeight: 1.6, margin: 0 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 9 — CTA final — glassmorphism ── */}
        <section
          style={{
            background: "transparent",
            padding: "120px 80px",
            textAlign: "center",
          }}
        >
          <div style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: "28px",
            padding: "64px 80px",
            maxWidth: "700px",
            margin: "0 auto",
          }}>
            <h2 style={{ ...serif, fontSize: "52px", color: FG, letterSpacing: "-2px", lineHeight: 1.05, margin: 0 }}>
              Prêt à transformer votre expérience wellness ?
            </h2>
            <p style={{ ...sans, fontSize: "16px", color: FG_MUT, marginTop: "16px", marginBottom: "48px" }}>
              Discutons de votre établissement. Call de découverte gratuit, sans engagement.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" style={btnPrimary}>
                Demander un call de découverte
              </Link>
              <a href="mailto:natan.lasar@mikevirtualcoach.com" style={btnSecondary}>
                Nous écrire
              </a>
              <a href="tel:+33658161692" style={btnSecondary}>
                Appeler directement
              </a>
            </div>
          </div>
        </section>

        </>}

        {(activeTab === "Salle de sport" || activeTab === "Entreprise") && (
          <section style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "120px 40px",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.52)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.85)",
              borderRadius: "28px",
              padding: "64px 80px",
              maxWidth: "560px",
            }}>
              <span style={{
                ...sans,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: BLUE,
                display: "block",
                marginBottom: "20px",
              }}>
                {activeTab === "Salle de sport" ? "Salle de sport" : "Entreprise"}
              </span>
              <h2 style={{
                ...serif,
                fontSize: "42px",
                color: FG,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                margin: "0 0 16px",
              }}>
                À venir bientôt
              </h2>
              <p style={{
                ...sans,
                fontSize: "15px",
                color: FG_MUT,
                lineHeight: 1.7,
                margin: "0 0 40px",
              }}>
                Cette section est en cours de préparation.<br />
                Revenez bientôt pour découvrir notre offre {activeTab === "Salle de sport" ? "Salle de sport" : "Entreprise"}.
              </p>
              <button
                onClick={() => selectorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })}
                style={{
                  ...sans,
                  backgroundColor: FG,
                  color: "#fff",
                  borderRadius: "28px",
                  padding: "13px 28px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ← Choisir un établissement
              </button>
            </div>
          </section>
        )}

        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Solution;
