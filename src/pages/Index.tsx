import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";

const FG      = "#1a1d24";
const FG_MUTED = "#717a8a";
const BLUE    = "#3b9eff";

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "2px",
  textTransform: "uppercase",
  marginBottom: "24px",
  display: "block",
};

const serifTitle = (size: number): React.CSSProperties => ({
  fontFamily: "'DM Serif Display', Georgia, serif",
  fontSize: `${size}px`,
  color: FG,
  lineHeight: 1.1,
  letterSpacing: "-1px",
  marginBottom: "24px",
});

const Index = () => {
  useDocumentTitle("MikeVirtualCoach — Studio Fitness & Wellness Tech Premium");

  const teaserRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const [vignetteVisible, setVignetteVisible] = useState<boolean[]>(Array(10).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.vigIdx);
            setVignetteVisible(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    const container = vignetteRef.current;
    if (container) {
      container.querySelectorAll('[data-vig-idx]').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = teaserRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">

        {/* BANDEAU 1 — Hero */}
        <Hero />

        {/* BANDEAU 2 — Transition immersive */}
        {/* TODO: effet carte qui s'agrandit au scroll */}
        <section
          style={{
            backgroundColor: "hsl(220, 20%, 14%)",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 120px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Particle orbs */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-100px", left: "-80px", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(59,158,255,0.06)", filter: "blur(80px)" }} />
            <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(59,158,255,0.06)", filter: "blur(80px)" }} />
            <div style={{ position: "absolute", top: "30%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(59,158,255,0.06)", filter: "blur(80px)" }} />
          </div>

          <div style={{ maxWidth: "720px", position: "relative", zIndex: 1, textAlign: "center" }}>
            <span style={{ ...labelStyle, color: "rgba(255,255,255,0.35)" }}>
              Notre vision
            </span>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "52px",
                color: "#f9f7f4",
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Ce que votre corps dit. Ce que vos données révèlent. Ce que nos experts en font.
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(255,255,255,0.2)",
                margin: "24px 0 0",
              }}
            />
          </div>
        </section>

        {/* BANDEAU 3 — Technologies & Experts */}
        {/* TODO: design final à définir */}
        <section
          style={{
            backgroundColor: "transparent",
            minHeight: "100vh",
            padding: "120px 80px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ ...labelStyle, color: BLUE }}>
              Technologie &amp; Expertise
            </span>
            <h2 style={serifTitle(44)}>
              Capter ce qui compte. Analyser. Agir.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: FG_MUTED,
                maxWidth: "560px",
                lineHeight: 1.7,
                marginBottom: "64px",
              }}
            >
              Les technologies modernes permettent de collecter des données que personne n'utilisait vraiment. Nos experts les transforment en décisions.
            </p>

            <div ref={vignetteRef}>
            {/* BLOC 1 — Technologies */}
            <p style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(30,80,180,0.55)",
              marginBottom: "16px",
              marginTop: "48px",
            }}>LES TECHNOLOGIES</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "12px",
                marginBottom: "48px",
              }}
            >
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3C9 3 7 6 7 9c0 2 1 4 2.5 5.5L12 21l2.5-6.5C16 13 17 11 17 9c0-3-2-6-5-6z" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "Analyse posture",
                  text: "Détection en temps réel des positions",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "Scan corporel",
                  text: "Morphologie et composition analysées",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9.24 5 10.91 6.01 12 7.09C13.09 6.01 14.76 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: "Paramètres vitaux",
                  text: "Fréquence, récupération, énergie",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5"/><path d="M9 12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "État mental",
                  text: "Humeur et niveau de stress détectés",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: "Historique santé",
                  text: "Blessures et contraintes mémorisées",
                },
              ].map((v, idx) => (
                <div
                  key={v.title}
                  data-vig-idx={idx}
                  style={{
                    background: "rgba(255,255,255,0.52)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.88)",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 4px 20px rgba(60,100,180,0.07)",
                    cursor: "default",
                    opacity: vignetteVisible[idx] ? 1 : 0,
                    transform: vignetteVisible[idx] ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${idx * 0.05}s, transform 0.5s ease ${idx * 0.05}s, box-shadow 0.25s ease`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(60,100,180,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = vignetteVisible[idx] ? "translateY(0)" : "translateY(20px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(60,100,180,0.07)";
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>{v.icon}</div>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.3 }}>{v.title}</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.48)", lineHeight: 1.55, margin: 0 }}>{v.text}</p>
                </div>
              ))}
            </div>

            <hr style={{
              border: "none",
              borderTop: "0.5px solid rgba(0,0,0,0.08)",
              marginBottom: "48px",
            }} />

            {/* BLOC 2 — Experts */}
            <p style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(30,80,180,0.55)",
              marginBottom: "16px",
            }}>LES EXPERTS</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "12px",
              }}
            >
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5"/><path d="M5 21v-2a7 7 0 0114 0v2" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "Coach sportif",
                  text: "Programme adapté à chaque séance",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M8 6h8M8 10h5M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 15v5M9 20h6" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "Médecin du sport",
                  text: "Validation médicale des exercices",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4M4 21c0-4 3.58-7 8-7s8 3 8 7" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 11c2.5.5 4 2 4 4" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "Nutritionniste",
                  text: "Conseils alimentation personnalisés",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="9" ry="6" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5"/><path d="M12 6v12M6 9l12 6M18 9L6 15" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  title: "Psychologue",
                  text: "Accompagnement mental et motivation",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 17C6 17 8 14 10 12C12 10 13 9 14 9C16 9 17 11 19 13" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 11L19 13L21 11" stroke="rgba(26,86,219,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: "Kinésithérapeute",
                  text: "Récupération et prévention blessures",
                },
              ].map((v, idx) => {
                const globalIdx = idx + 5;
                return (
                  <div
                    key={v.title}
                    data-vig-idx={globalIdx}
                    style={{
                      background: "rgba(255,255,255,0.52)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.88)",
                      borderRadius: "20px",
                      padding: "20px",
                      boxShadow: "0 4px 20px rgba(60,100,180,0.07)",
                      cursor: "default",
                      opacity: vignetteVisible[globalIdx] ? 1 : 0,
                      transform: vignetteVisible[globalIdx] ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.5s ease ${globalIdx * 0.05}s, transform 0.5s ease ${globalIdx * 0.05}s, box-shadow 0.25s ease`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(60,100,180,0.12)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = vignetteVisible[globalIdx] ? "translateY(0)" : "translateY(20px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(60,100,180,0.07)";
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>{v.icon}</div>
                    <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.3 }}>{v.title}</p>
                    <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.48)", lineHeight: 1.55, margin: 0 }}>{v.text}</p>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </section>

        {/* BANDEAU 4 — Les profils (masqué) */}
        <section
          style={{
            display: "none",
            background: "transparent",
            padding: "120px 80px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ ...labelStyle, color: "rgba(30,80,180,0.55)" }}>
              Chaque personne est différente
            </span>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "44px",
                color: "#0f172a",
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: "24px",
              }}
            >
              Pas un programme. Le vôtre.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(15,23,42,0.5)",
                maxWidth: "480px",
                lineHeight: 1.7,
                marginBottom: "64px",
              }}
            >
              Votre passé, vos objectifs, vos limites, votre personnalité. Tout compte.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: "0", maxWidth: "800px" }}>
              {[
                {
                  num: "01",
                  name: "Thomas, 34 ans",
                  text: "Reprise après opération du genou. Objectif : retrouver le trail.",
                },
                {
                  num: "02",
                  name: "Sarah, 28 ans",
                  text: "Préparation semi-marathon. Gestion du stress et de la nutrition.",
                },
                {
                  num: "03",
                  name: "Marc, 52 ans",
                  text: "Prévention et longévité. Garder la forme, vieillir mieux.",
                },
              ].map((card, i) => (
                <div
                  key={card.name}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "32px",
                    padding: "28px 0",
                    borderBottom: "0.5px solid rgba(0,0,0,0.08)",
                    borderTop: i === 0 ? "0.5px solid rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "80px", color: "rgba(15,23,42,0.06)", lineHeight: 1, flexShrink: 0, width: "80px", display: "block" }}>{card.num}</span>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "28px", color: "#0f172a", flexShrink: 0, width: "220px", margin: 0, lineHeight: 1.2 }}>{card.name}</p>
                  <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "15px", color: "rgba(15,23,42,0.48)", lineHeight: 1.65, flex: 1, margin: 0 }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANDEAU 5 — Teaser YourCoach AI */}
        {/* TODO: visuel produit, ambiance finale */}
        <section
          style={{
            backgroundColor: "transparent",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "80px 24px",
          }}
        >
          <div
            ref={teaserRef}
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <span style={{ ...labelStyle, color: BLUE }}>
              Notre premier produit
            </span>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "72px",
                color: FG,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: "24px",
              }}
            >
              YourCoach AI
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: FG_MUTED,
                maxWidth: "380px",
                lineHeight: 1.7,
                margin: "0 auto 40px",
              }}
            >
              Un coach virtuel 3D. Pour les établissements qui veulent faire mieux.
            </p>
            <Link
              to="/solution"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{
                backgroundColor: BLUE,
                color: "#fff",
                borderRadius: "28px",
                padding: "13px 28px",
                fontSize: "14px",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                textDecoration: "none",
                display: "inline-block",
                transition: "transform 0.2s ease",
              }}
            >
              Découvrir →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;
