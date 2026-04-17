import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ROTATING_WORDS = [
  "repousser ses limites",
  "aller plus loin",
  "performer au quotidien",
  "prendre soin de soi",
  "s'entraîner sans se blesser",
  "ne jamais s'arrêter",
  "transformer son séjour",
  "progresser à son rythme",
];

type Phase = "visible" | "exiting" | "entering";

const Hero = () => {
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase("exiting");
      setTimeout(() => {
        setDisplayedIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setPhase("entering");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("visible");
          });
        });
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const wordStyle: React.CSSProperties = {
    fontStyle: "italic",
    display: "inline-block",
    color: "#3b9eff",
    ...(phase === "visible" && {
      opacity: 1,
      transform: "translateY(0)",
      transition: "opacity 400ms ease, transform 400ms ease",
    }),
    ...(phase === "exiting" && {
      opacity: 0,
      transform: "translateY(-8px)",
      transition: "opacity 400ms ease, transform 400ms ease",
    }),
    ...(phase === "entering" && {
      opacity: 0,
      transform: "translateY(8px)",
      transition: "none",
    }),
  };

  return (
    <section
      style={{
        background: "linear-gradient(145deg, #dceffe 0%, #f0ece5 50%, #faeadb 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col items-center text-center px-4 py-20 max-w-2xl mx-auto">
        {/* Logo / Silhouette */}
        <img
          src="/logo-original.svg"
          alt="MikeVirtualCoach"
          style={{ height: 120 }}
          className="mb-10"
        />

        {/* Titre avec mot qui tourne */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "52px",
            color: "#1a1d24",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginBottom: "24px",
          }}
        >
          MikeVirtualCoach
          <br />
          pour <span style={wordStyle}>{ROTATING_WORDS[displayedIndex]}</span>
        </h1>

        {/* Sous-titre */}
        <p
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "16px",
            color: "#717a8a",
            maxWidth: "380px",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          La technologie et l'expertise humaine. Pour vous, vraiment.
        </p>

        {/* CTA */}
        <Link
          to="/solution"
          style={{
            backgroundColor: "#1a1d24",
            color: "#fff",
            borderRadius: "28px",
            padding: "13px 28px",
            fontSize: "14px",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Découvrir YourCoach AI
        </Link>
      </div>
    </section>
  );
};

export default Hero;
