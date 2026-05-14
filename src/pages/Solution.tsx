import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";

// ─── Color tokens ────────────────────────────────────────────────
const BG      = "transparent";
const BG_ALT  = "transparent";
const FG      = "#1a1d24";
const FG_MUT  = "#717a8a";
const BLUE    = "#3b9eff";
const DARK_BG = "#0A0E3D";  // hero vidéo section reste sombre

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
  backgroundColor: "#3B9EFF",
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

// ── Sélecteur style ── false = ancien (85vh glass), true = nouveau (60vh cas d'usage expansion)
const USE_EXPANDED_SELECTOR = true;

// ─── Component ───────────────────────────────────────────────────
const Solution = () => {
  useDocumentTitle("YourCoach AI — Coach Virtuel pour Hôtels");
  const contentRef    = useRef<HTMLDivElement>(null);
  const selectorRef   = useRef<HTMLDivElement>(null);
  const heroBgRef     = useRef<HTMLDivElement>(null);
  const processStepsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const bloc1CardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const location = useLocation();
  const [activeTab, setActiveTab]     = useState<Tab>("Hôtel");
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [videoPlaying, setVideoPlaying] = useState(true);

  // ─── Responsive ─────────────────────────────
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = winW < 768;
  const isCompact = winW < 1100;

  // Si on arrive avec #avantages (ou hashchange en cours de page), forcer Hôtel + scroll
  useEffect(() => {
    const scrollToAvantages = () => {
      if (window.location.hash === "#avantages") {
        setActiveTab("Hôtel");
        setTimeout(() => {
          const el = document.getElementById("avantages");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    };
    scrollToAvantages();
    window.addEventListener("hashchange", scrollToAvantages);
    return () => window.removeEventListener("hashchange", scrollToAvantages);
  }, []);
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
      accentColor: "#3b9eff",
      borderColor: "rgba(59,158,255,0.30)",
      shadowColor: "rgba(59,158,255,0.15)",
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
      accentColor: "#1a56db",
      borderColor: "rgba(26,86,219,0.28)",
      shadowColor: "rgba(26,86,219,0.13)",
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

  // Un seul scroll listener unifié, throttlé par rAF
  const rafRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const y = window.scrollY;

        // Direction scroll
        const dir = y < lastScrollRef.current;
        lastScrollRef.current = y;
        setScrollingUp(dir);

        // BLOC 1 sticky progress
        const el = sectionRef.current;
        if (el) {
          const rect     = el.getBoundingClientRect();
          const scrolled = -rect.top;
          // Pills animent sur les premiers 35vh de scroll (zone BLOC 1 uniquement)
          const total    = window.innerHeight * 0.35;
          const progress = Math.max(0, Math.min(1, scrolled / total));
          if      (progress >= 0.30) setVisibleItems(3);
          else if (progress >= 0.18) setVisibleItems(2);
          else if (progress >= 0.08) setVisibleItems(1);
          else                       setVisibleItems(0);
          setTitleParallax(progress * -30);
          setSectionProgress(progress);
        }

        // Hero blur — opacity overlay au lieu de filter blur dynamique
        if (heroBgRef.current) {
          const vh = window.innerHeight;
          const blurProgress = Math.max(0, Math.min(1, y / (vh * 0.6)));
          heroBgRef.current.style.opacity = String(1 - blurProgress * 0.4);
        }

        // Parallax hero content — facteur réduit pour rester cohérent avec les métriques
        const next = nextSectionRef.current;
        const content = heroContentRef.current;
        if (next && content) {
          const rect = next.getBoundingClientRect();
          const overlap = window.innerHeight - rect.top;
          content.style.transform = overlap > 0 ? `translateY(${-overlap * 0.05}px)` : "translateY(0)";
        }

        // BLOC 1 card — scale up quand le centre arrive au centre du viewport
        const card = bloc1CardRef.current;
        if (card) {
          const r = card.getBoundingClientRect();
          const cardCenter = r.top + r.height / 2;
          const vpCenter = window.innerHeight / 2;
          const dist = Math.abs(cardCenter - vpCenter);
          const maxDist = window.innerHeight;
          const t = Math.max(0, Math.min(1, 1 - dist / maxDist));
          const s = 0.70 + t * 0.26; // 0.70 → 0.96
          card.style.transform = `scale(${s})`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
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

  // Observer pour bandeau métriques — animation au premier scroll
  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // P37 — Stagger fade-in sur grilles de cards (BLOCS 3, 4, 7)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-stagger]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  // Counter animation — défilement des chiffres
  useEffect(() => {
    if (!metricsVisible) return;
    const targets = [24, 5, 24, 0];
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounters(targets.map(v => Math.round(eased * v)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [metricsVisible]);

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
    "Entreprise":     "linear-gradient(160deg, rgba(235,242,255,0.97) 0%, rgba(210,225,255,0.95) 60%, rgba(195,215,255,0.93) 100%)",
  };

  return (
    <div style={{ background: "linear-gradient(145deg, #dceffe 0%, #f0ece5 50%, #e8f0fe 100%)", backgroundAttachment: "fixed", color: FG, minHeight: "100vh" }}>

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

        {/* ── BLOC 0 — Hero (sticky : le fond reste, le sélecteur glisse par-dessus) ── */}
        <section style={{ position: "relative", zIndex: 1, paddingBottom: "5vh" }}>

          {/* Overlay fade au scroll — le gradient est maintenant sur le wrapper parent */}
          <div ref={heroBgRef} style={{
            position: "absolute", inset: 0,
            willChange: "opacity",
          }} />

          <div style={{ position: "sticky", top: 0, minHeight: "100vh" }}>

            {/* Contenu principal */}
            <div ref={heroContentRef} style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", transition: "transform 0.05s linear" }}>

            {/* Titres — en haut, centrés */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "80px", marginBottom: isCompact ? "24px" : "40px" }}>
              <h1 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: isMobile ? "36px" : isCompact ? "52px" : "82px",
                color: "#0A0E3D",
                letterSpacing: isMobile ? "-1px" : isCompact ? "-2px" : "-3.5px",
                lineHeight: 1.0,
                margin: "0 0 16px",
                padding: isCompact ? "0 20px" : undefined,
              }}>Votre Coach sans contraintes</h1>
              <p style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: isMobile ? "15px" : "17px",
                color: "rgba(15,23,42,0.48)",
                maxWidth: isMobile ? "90%" : "400px",
                lineHeight: 1.6,
                margin: 0,
              }}>L'IA et les meilleurs coachs,<br />réunis dans un seul service.</p>
            </div>

            {/* Grid 3 colonnes */}
            <div style={{ display: isCompact ? "flex" : "grid", flexDirection: isCompact ? "column" : undefined, gridTemplateColumns: isCompact ? undefined : "1fr auto 1fr", alignItems: "center", gap: isMobile ? "24px" : isCompact ? "32px" : "52px", width: "100%", maxWidth: "1340px", margin: "0 auto", padding: isCompact ? "0 20px" : undefined }}>

              {/* Colonne gauche */}
              <div style={{ order: isCompact ? 2 : undefined, display: "flex", flexDirection: isCompact ? (isMobile ? "column" : "row") : "column", justifyContent: "center", gap: isCompact ? "16px" : "28px", alignItems: isCompact ? "stretch" : "flex-end", height: isCompact ? "auto" : "600px", width: isCompact ? "100%" : undefined }}>

                <div style={{ width: isCompact ? undefined : "350px", maxWidth: "350px", flex: isCompact ? "1 1 0" : undefined, borderRadius: "22px", padding: isCompact ? "24px" : "28px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                  animation: "hero-float 4s cubic-bezier(0.4,0,0.2,1) 0s infinite",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <path d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9.24 5 10.91 6.01 12 7.09C13.09 6.01 14.76 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1D24", margin: "0 0 6px", lineHeight: 1.3 }}>Relation de confiance</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#717A8A", lineHeight: 1.55, margin: 0 }}>Un coach qui vous connaît, s'adapte et crée un vrai lien dans la durée.</p>
                </div>

                <div style={{ width: isCompact ? undefined : "350px", maxWidth: "350px", flex: isCompact ? "1 1 0" : undefined, borderRadius: "22px", padding: isCompact ? "24px" : "28px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                  animation: "hero-float 4s cubic-bezier(0.4,0,0.2,1) 0.7s infinite",
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
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1D24", margin: "0 0 6px", lineHeight: 1.3 }}>IA × Coachs & Médecins</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#717A8A", lineHeight: 1.55, margin: 0 }}>Algorithmes co-construits avec des experts. Chaque recommandation validée.</p>
                </div>

              </div>

              {/* Colonne centrale — smartphone */}
              <div style={{ order: isCompact ? 1 : undefined, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  width: isMobile ? "220px" : isCompact ? "260px" : "300px",
                  height: isMobile ? "440px" : isCompact ? "520px" : "600px",
                  background: "#f4f4f2",
                  borderRadius: "50px",
                  border: "8px solid #1a1a1a",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.15), 0 40px 80px rgba(0,0,0,0.20)",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <div style={{ position: "absolute", top: "14px", left: "50%", transform: "translateX(-50%)", width: "75px", height: "5px", background: "rgba(0,0,0,0.10)", borderRadius: "3px", zIndex: 2 }} />
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/demo-video.mp4"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* Colonne droite */}
              <div style={{ order: isCompact ? 3 : undefined, display: "flex", flexDirection: isCompact ? (isMobile ? "column" : "row") : "column", justifyContent: "center", gap: isCompact ? "16px" : "28px", alignItems: isCompact ? "stretch" : "flex-start", height: isCompact ? "auto" : "600px", width: isCompact ? "100%" : undefined }}>

                <div style={{ width: isCompact ? undefined : "350px", maxWidth: "350px", flex: isCompact ? "1 1 0" : undefined, borderRadius: "22px", padding: isCompact ? "24px" : "28px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                  animation: "hero-float 4s cubic-bezier(0.4,0,0.2,1) 1.4s infinite",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <path d="M4 17C6 17 8 14 10 12C12 10 13 9 14 9C16 9 17 11 19 13" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M17 11L19 13L21 11" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1D24", margin: "0 0 6px", lineHeight: 1.3 }}>Évolue à chaque séance</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#717A8A", lineHeight: 1.55, margin: 0 }}>Le coach apprend de chaque session. Plus vous l'utilisez, plus il vous connaît.</p>
                </div>

                <div style={{ width: isCompact ? undefined : "350px", maxWidth: "350px", flex: isCompact ? "1 1 0" : undefined, borderRadius: "22px", padding: isCompact ? "24px" : "28px",
                  background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 36px rgba(60,100,180,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                  animation: "hero-float 4s cubic-bezier(0.4,0,0.2,1) 2.1s infinite",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "12px", display: "block" }}>
                    <circle cx="12" cy="4" r="1.5" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" />
                    <path d="M9 8.5L7 14H10L9 19" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8.5L14 11L17 10" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 14L13 15L15 19" stroke="rgba(30,80,180,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1D24", margin: "0 0 6px", lineHeight: 1.3 }}>Démonstration des mouvements</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#717A8A", lineHeight: 1.55, margin: 0 }}>Chaque exercice démontré en temps réel par l'avatar 3D.</p>
                </div>

              </div>

            </div>

          </div>

          </div>{/* fin sticky */}
        </section>

        {USE_EXPANDED_SELECTOR ? (
        /* ── Sélecteur V2 — cards cas d'usage avec expansion hover ── */
        <section ref={nextSectionRef} style={{
          width: "100%",
          height: "72vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          padding: "0 80px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
          borderRadius: "28px 28px 0 0",
          marginTop: "0",
        }}>
          {[
            { id: "Hôtel" as Tab, label: "Hôtel de luxe", title: "Pour vos clients en séjour", sub: "24/7 · Multilingue · White label", img: "/spa_hotel_luxe.jpg" },
            { id: "Salle de sport" as Tab, label: "Salle de sport", title: "Pour vos adhérents", sub: "Engagement · Fidélisation · Performance", img: "/gym-salle.jpg" },
            { id: "Entreprise" as Tab, label: "Entreprise", title: "Pour vos équipes", sub: "Bien-être · Prévention · ROI", img: "/entreprise.jpg" },
          ].map((card) => {
            const isHov = hoveredCard === card.id;
            const isCollapsed = hoveredCard !== null && !isHov;
            let cardFlex: number;
            if (isHov) cardFlex = 2.3;
            else if (isCollapsed) cardFlex = 0.6;
            else cardFlex = 1;

            return (
              <div
                key={card.id}
                onClick={() => completeCard(card.id)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  flex: cardFlex,
                  height: isHov ? "96%" : "75%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "20px",
                  transition: "flex 0.6s cubic-bezier(0.4,0,0.2,1), height 0.6s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <img src={card.img} alt="" loading="lazy" style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center", display: "block",
                  transform: isHov ? "scale(1.005)" : "scale(1)",
                  transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(8,8,16,0.05) 0%, rgba(8,8,16,0.18) 40%, rgba(8,8,16,0.68) 100%)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", bottom: "32px", left: "28px", right: "28px", zIndex: 2,
                  opacity: isCollapsed ? 0 : 1,
                  transition: "opacity 0.4s ease",
                }}>
                  <p style={{ ...sans, fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 10px" }}>
                    {card.label}
                  </p>
                  <p style={{
                    ...serif, fontSize: "26px", color: "#ffffff", lineHeight: 1.15,
                    margin: "0 0 8px", textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                  }}>
                    {card.title}
                  </p>
                  <p style={{
                    ...sans, fontSize: "14px", color: "rgba(255,255,255,0.70)", lineHeight: 1.6, margin: 0,
                    opacity: isHov ? 1 : 0,
                    maxHeight: isHov ? "40px" : "0px",
                    overflow: "hidden",
                    transition: "opacity 0.35s ease 0.15s, max-height 0.35s ease",
                  }}>
                    {card.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
        ) : (
        /* ── Sélecteur V1 — cards 85vh (ancien, USE_EXPANDED_SELECTOR = false pour restaurer) ── */
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
          marginTop: "0",
          backgroundColor: "rgba(255,255,255,0.97)",
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
              glassColor: "rgba(26,86,219,0.08)",
              label:      TAB_CONFIGS[2].label,
              title:      TAB_CONFIGS[2].title,
              sub:        TAB_CONFIGS[2].sub,
              labelColor: "#1a56db",
              accent:     "#1a56db",
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
                  const TICKS = 80; // 4000ms / 50ms
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
                {/* Image de fond */}
                {(() => {
                  const imgSrc = card.id === "Hôtel"
                    ? "/spa_hotel_luxe.jpg"
                    : card.id === "Salle de sport"
                      ? "/gym-salle.jpg"
                      : "/entreprise.jpg";
                  return (
                    <img
                      src={imgSrc}
                      alt=""
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        opacity: isAct || isHov ? 1 : 0.9,
                        transition: "opacity 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />
                  );
                })()}

                {/* Overlay sombre léger pour lisibilité du texte */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: isAct || isHov
                    ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 60%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.02) 60%)",
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
                    color: "rgba(255,255,255,0.75)",
                    margin: "0 0 10px",
                    opacity: showContent ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}>
                    {card.label}
                  </p>
                  <p style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "38px",
                    color: "#ffffff",
                    letterSpacing: "-1.3px",
                    lineHeight: 1.1,
                    margin: 0,
                    textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                  }}>
                    {card.title}
                  </p>
                  <p style={{
                    ...sans,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.70)",
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
        )}
        </div>{/* fin wrapper hero + sélecteur */}

        {/* ── Espacement après sélecteur ── */}
        <div style={{ height: "60px" }} />

        {/* ── Contenu par onglet ── */}
        <div ref={contentRef}>
        {activeTab === "Hôtel" && <>

        {/* ── BLOC 1 + BLOC 2 — wrapper sticky layers ── */}
        <div ref={sectionRef} style={{ position: "relative" }}>
          {/* BLOC 1 — sticky layer 1 */}
          <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 40px" }}>
            <div ref={bloc1CardRef} style={{ width: "100%", height: "85vh", borderRadius: "28px", overflow: "hidden", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", transform: "scale(0.70)", transition: "transform 0.05s linear" }}>

            {/* Fond — 2 photos côte à côte (sans séparateur) */}
            <div style={{ position: "absolute", inset: 0, display: "flex" }}>

              {/* Photo gauche — gym */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <img src="/Gym_hotel_luxe.jpg" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,12,0.55) 0%, rgba(8,8,12,0.35) 100%)" }} />
              </div>

              {/* Photo droite — spa */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <img src="/spa_hotel_luxe.jpg" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
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
                        opacity: visibleItems > index ? 1 : 0,
                        transform: visibleItems > index
                          ? "translateY(0)"
                          : "translateY(16px)",
                        transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                        transitionDelay: `${index * 0.12}s`,
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
            </div>{/* fin card arrondie */}
          </div>

        {/* Espace de scroll pour scaling carte + pills */}
        <div style={{ height: "35vh" }} />

        {/* ── BLOC 3 — "Notre solution" — sticky derrière BLOC 2, révélé quand BLOC 2 part ── */}
        <section id="avantages" style={{ background: "linear-gradient(145deg, #dceffe 0%, #f0ece5 50%, #e8f0fe 100%)", backgroundAttachment: "fixed", minHeight: "100vh", padding: "96px 80px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 2 }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Pourquoi YourCoach AI</span>
            <h2 style={h2Style}>L'approche YourCoach AI</h2>

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
                  tagStyle: { backgroundColor: "rgba(26,86,219,0.10)", border: "1px solid rgba(26,86,219,0.25)", color: "hsl(221, 79%, 40%)" },
                  title: "Activation des revenus annexes",
                  text: "Upsell intelligent, cross-selling intégré. Chaque interaction devient une opportunité de valoriser vos services.",
                },
              ].map((item, idx) => (
                <div key={item.tag} data-stagger className="glass-card" style={{ ...glassCardLg, opacity: 0, transform: "translateY(20px)", transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${idx * 80}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${idx * 80}ms` }}>
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

        {/* ── BLOC 2 — "Le voyageur moderne" — foreground, glisse par-dessus BLOC 1 puis repart en révélant BLOC 3 ── */}
        <section
          ref={bloc2Ref}
          className="mvc-dark-grain"
          data-theme="dark"
          style={{
            background: "#0A0E3D",
            minHeight: "100vh",
            padding: "120px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 3,
            overflow: "hidden",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(10,14,61,0.3), 0 -20px 60px rgba(10,14,61,0.3)",
            marginTop: "-100vh",
          }}
        >
          {/* Orbes décoratifs — animation lente P36 */}
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(59,158,255,0.32)", filter: "blur(105px)", top: -100, left: -200, pointerEvents: "none", zIndex: 0, animation: "orb-drift-1 20s cubic-bezier(0.4,0,0.2,1) infinite", willChange: "transform" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(26,86,219,0.22)", filter: "blur(115px)", bottom: 0, right: -100, pointerEvents: "none", zIndex: 0, animation: "orb-drift-2 22s cubic-bezier(0.4,0,0.2,1) infinite", willChange: "transform" }} />

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

        {/* Espace pour que BLOC 3 reste sticky pendant toute la sortie de BLOC 2 + temps de lecture */}
        <div style={{ height: "150vh" }} />
        </div>{/* fin wrapper sticky layers */}

        {/* ── BLOC 4 — Technologie — fond pair ── */}
        <section style={{ backgroundColor: BG_ALT, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Comment ça fonctionne</span>
            <h2 style={h2Style}>L'expertise derrière chaque séance</h2>
            <p style={introText}>
              Les fondations techniques d'une expérience qui fonctionne.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {[
                { title: "Coach 3D Animé par IA", text: "Avatar 3D réaliste capable d'analyser les mouvements, corriger la posture et adapter les exercices en temps réel." },
                { title: "Programmes Personnalisés", text: "L'IA génère des séances sur-mesure basées sur les objectifs, niveau de forme, contraintes physiques et préférences." },
                { title: "Intégration Transparente", text: "Déploiement en 24h avec QR codes dans vos espaces. Formation de votre équipe incluse." },
                { title: "Support Multilingue", text: "Interface disponible en français, anglais, allemand, espagnol et italien." },
                { title: "Accessible sur Mobile", text: "Application native iOS et Android. Vos clients utilisent leur propre smartphone." },
                { title: "Analytiques Avancées", text: "Dashboard en temps réel pour suivre l'engagement, satisfaction client et ROI." },
              ].map((item, idx) => (
                <div key={item.title} data-stagger className="glass-card" style={{ ...glassCard, opacity: 0, transform: "translateY(20px)", transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${idx * 80}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${idx * 80}ms` }}>
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
                    loading="lazy"
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
                  img: "/persona-alexandre.jpg",
                  situation: "Cadre en déplacement 3 jours. Veut maintenir sa routine de sport sans perdre sa progression.",
                  items: ["Programme force 45 min adapté à la salle", "Récupération post-vol", "Suivi de sa progression habituelle"],
                },
                {
                  tag: "65 ans · Bien-être",
                  name: "Michel",
                  img: "/persona-michel.jpg",
                  situation: "Retraité en vacances avec sa femme. Veut rester en forme, sans se blesser, à son rythme.",
                  items: ["Mobilité douce quotidienne 20 min", "Conseils posture et prévention", "Programme adapté aux contraintes articulaires"],
                },
                {
                  tag: "50-55 ans · Découverte",
                  name: "Isabelle",
                  img: "/persona-isabelle.jpg",
                  situation: "En vacances à l'hôtel, elle veut profiter d'une séance de stretching pour se détendre, mais ne sait pas par où commencer.",
                  items: ["Séance stretching débutant 20 min", "Guidage pas à pas avec démonstrations", "Conseils posture et respiration"],
                },
              ].map((p) => (
                <div key={p.name} style={{ display: "flex", flexDirection: "column", overflow: "hidden", padding: 0, borderRadius: "24px", background: "transparent", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", cursor: "default" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: "100%", aspectRatio: "5/6", overflow: "hidden", borderRadius: "24px 24px 0 0", position: "relative" }}>
                    <img src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: "20px", left: "24px", right: "24px" }}>
                      <p style={{ ...serif, fontSize: "24px", color: "#fff", margin: "0 0 6px" }}>{p.name}</p>
                      <span style={{ ...sans, backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: "20px", padding: "4px 14px", fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 4px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOC 7 — Résultats — fond impair ── */}
        <section style={{ backgroundColor: BG, padding: "96px 80px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span style={labelStyle}>Impact mesurable</span>
            <h2 style={h2Style}>Des effets visibles, sans effort supplémentaire</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "52px" }}>
              {[
                { title: "Expérience client premium", text: "Accompagnement bien-être sur-mesure, disponible 24h/24. Satisfaction et fidélité renforcées." },
                { title: "ROI optimisé", text: "Valorise vos équipements existants. Augmentation du taux d'utilisation et du panier moyen." },
                { title: "Engagement maximisé", text: "Stimule l'utilisation régulière des installations grâce à une expérience engageante et personnalisée." },
                { title: "Image différenciante", text: "Positionnez-vous comme précurseur des services bien-être digitaux. Avantage concurrentiel réel." },
                { title: "Aucune charge opérationnelle", text: "Fonctionne en totale autonomie. Pas de personnel dédié, pas d'équipement supplémentaire." },
              ].map((item, idx) => (
                <div key={item.title} data-stagger className="glass-card" style={{ ...glassCard, opacity: 0, transform: "translateY(20px)", transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${idx * 80}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${idx * 80}ms`, ...(idx === 4 ? { gridColumn: "1 / -1", maxWidth: "50%", margin: "0 auto", width: "100%" } : {}) }}>
                  <p style={{ ...sans, fontSize: "15px", fontWeight: 600, color: FG, marginBottom: "8px", marginTop: 0 }}>{item.title}</p>
                  <p style={{ ...sans, fontSize: "13px", color: FG_MUT, lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BANDEAU CHIFFRES CLÉS — sous Résultats ── */}
        <div
          ref={metricsRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "24px 40px" : "64px",
            padding: isMobile ? "40px 20px 32px" : "56px 40px 64px",
          }}
        >
          {[
            { prefix: "", suffix: "/7", counterIdx: 0, label: "Disponibilité", delay: 0 },
            { prefix: "", suffix: "+",  counterIdx: 1, label: "Langues supportées", delay: 0.1 },
            { prefix: "<", suffix: "h", counterIdx: 2, label: "Déploiement", delay: 0.2 },
            { prefix: "", suffix: "",   counterIdx: 3, label: "Personnel requis", delay: 0.3 },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                textAlign: "center",
                opacity: metricsVisible ? 1 : 0,
                transform: metricsVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${item.delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${item.delay}s`,
              }}
            >
              <p style={{
                ...serif,
                fontSize: "40px",
                color: "#0A0E3D",
                letterSpacing: "-1.5px",
                margin: "0 0 4px",
                lineHeight: 1,
              }}>
                {item.prefix}{counters[item.counterIdx]}{item.suffix}
              </p>
              <p style={{
                ...sans,
                fontSize: "13px",
                color: FG_MUT,
                margin: 0,
                lineHeight: 1.4,
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="30" height="30" viewBox="0 0 30 30" style={{ position: "absolute" }}>
                      <circle cx="15" cy="15" r="13.5" fill="#fff" stroke="none" />
                      <circle
                        cx="15" cy="15" r="13.5"
                        fill="none"
                        stroke={BLUE}
                        strokeWidth="1"
                        strokeDasharray={`${Math.PI * 27}`}
                        strokeDashoffset={visibleSteps[i] ? 0 : Math.PI * 27}
                        style={{ transition: `stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s` }}
                      />
                    </svg>
                    <span style={{ position: "relative", fontSize: "12px", color: BLUE, fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 600 }}>
                      {step.num}
                    </span>
                  </div>
                  <p style={{ ...sans, fontSize: "15px", fontWeight: 600, color: FG, margin: "4px 0 5px" }}>{step.title}</p>
                  <p style={{ ...sans, fontSize: "13px", color: FG_MUT, lineHeight: 1.6, margin: 0 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "transparent", padding: "96px 80px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span style={labelStyle}>Questions fréquentes</span>
            <h2 style={h2Style}>Tout ce que vous devez savoir</h2>
            <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                {
                  q: "L'installation nécessite-t-elle des travaux ou du matériel ?",
                  a: "Non. YourCoach AI fonctionne sur les smartphones de vos clients. Aucun équipement, aucune installation physique. Un simple QR code dans vos espaces suffit."
                },
                {
                  q: "Les séances sont-elles adaptées à tous les niveaux ?",
                  a: "Oui. L'IA adapte chaque séance au profil, au niveau de forme, aux contraintes physiques et aux objectifs de chaque utilisateur — du débutant au sportif confirmé."
                },
                {
                  q: "En combien de temps le service est-il opérationnel ?",
                  a: "24 heures. Nous configurons votre environnement, personnalisons l'interface à votre marque, et déployons les QR codes. Votre équipe est formée en une session."
                },
                {
                  q: "Le coach est-il disponible en plusieurs langues ?",
                  a: "Oui. YourCoach AI est disponible en français, anglais, allemand, espagnol et italien — idéal pour une clientèle internationale."
                },
                {
                  q: "Quel engagement est requis ?",
                  a: "Aucun engagement longue durée. Nous proposons des formules flexibles, adaptées à la saisonnalité et à la taille de votre établissement."
                },
              ].map((item, idx) => {
                const faqId = `faq-${idx}`;
                return (
                  <details
                    key={idx}
                    style={{
                      borderTop: idx === 0 ? "0.5px solid rgba(0,0,0,0.08)" : "none",
                      borderBottom: "0.5px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <summary
                      style={{
                        ...sans,
                        fontSize: "15px",
                        fontWeight: 600,
                        color: FG,
                        padding: "20px 0",
                        cursor: "pointer",
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {item.q}
                      <span style={{ fontSize: "20px", color: FG_MUT, flexShrink: 0, marginLeft: "16px", transition: "transform 0.2s" }}>+</span>
                    </summary>
                    <p style={{ ...sans, fontSize: "14px", color: FG_MUT, lineHeight: 1.7, margin: "0 0 20px", paddingRight: "40px" }}>
                      {item.a}
                    </p>
                  </details>
                );
              })}
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
              Parlons de votre établissement
            </h2>
            <p style={{ ...sans, fontSize: "16px", color: FG_MUT, marginTop: "16px", marginBottom: "48px" }}>
              Un échange confidentiel, sans engagement.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" style={btnPrimary}>
                Planifier mon call
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

        {activeTab === "Salle de sport" && (
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
                Salle de sport
              </span>
              <h2 style={{
                ...serif,
                fontSize: "42px",
                color: FG,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                margin: "0 0 16px",
              }}>
                Fidélisez vos adhérents
              </h2>
              <p style={{
                ...sans,
                fontSize: "15px",
                color: FG_MUT,
                lineHeight: 1.7,
                margin: "0 0 40px",
              }}>
                Offrez à vos membres un coach IA personnalisé qui booste l'engagement et réduit le churn. Parlons de votre salle.
              </p>
              <Link
                to="/contact"
                style={{
                  ...sans,
                  backgroundColor: "#0A0E3D",
                  color: "#fff",
                  borderRadius: "28px",
                  padding: "13px 28px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Discuter de mon projet
              </Link>
            </div>
          </section>
        )}

        {activeTab === "Entreprise" && (
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
                Entreprise
              </span>
              <h2 style={{
                ...serif,
                fontSize: "42px",
                color: FG,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                margin: "0 0 16px",
              }}>
                Le bien-être au travail
              </h2>
              <p style={{
                ...sans,
                fontSize: "15px",
                color: FG_MUT,
                lineHeight: 1.7,
                margin: "0 0 40px",
              }}>
                Proposez à vos collaborateurs un accompagnement sport et bien-être personnalisé, directement sur leur smartphone.
              </p>
              <Link
                to="/contact"
                style={{
                  ...sans,
                  backgroundColor: "#0A0E3D",
                  color: "#fff",
                  borderRadius: "28px",
                  padding: "13px 28px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Discuter de mon projet
              </Link>
            </div>
          </section>
        )}

        </div>

      </main>
      <Footer />

      {/* Bouton stop vidéo — discret, bas droite */}
      <button
        onClick={() => {
          const v = videoRef.current;
          if (!v) return;
          if (v.paused) { v.play(); setVideoPlaying(true); }
          else { v.pause(); setVideoPlaying(false); }
        }}
        aria-label={videoPlaying ? "Mettre en pause la vidéo" : "Reprendre la vidéo"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(10,14,61,0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)",
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          transition: "opacity 0.3s",
          opacity: 0.5,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
      >
        {videoPlaying ? "❚❚" : "▶"}
      </button>
    </div>
  );
};

export default Solution;
