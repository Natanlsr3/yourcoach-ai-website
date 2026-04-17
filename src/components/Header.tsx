import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [atTop, setAtTop]       = useState(true);
  const lastScrollY             = useRef(0);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 8);
      if (y > lastScrollY.current && y > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "12px",
          left: "20px",
          right: "20px",
          zIndex: 200,
          transform: isHidden ? "translateY(-120%)" : "translateY(0)",
          transition: `transform 380ms ${EASE}`,
        }}
      >
        <div
          style={{
            height: "68px",
            backgroundColor: atTop ? "transparent" : "rgba(225, 230, 238, 0.22)",
            backdropFilter: atTop ? "none" : "blur(28px)",
            WebkitBackdropFilter: atTop ? "none" : "blur(28px)",
            borderRadius: "18px",
            border: atTop ? "none" : "0.5px solid rgba(255,255,255,0.60)",
            boxShadow: atTop ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            transition: `background-color 300ms ${EASE}, backdrop-filter 300ms ${EASE}, border 300ms ${EASE}, box-shadow 300ms ${EASE}`,
          }}
        >

          {/* ── Gauche : Logo ── */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              flex: "1 0 0",
            }}
          >
            <img
              src="/logo-original.svg"
              alt=""
              style={{ height: "28px", width: "auto", opacity: 0.80 }}
            />
            <span
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: "19px",
                color: "#0f172a",
                letterSpacing: "-0.4px",
              }}
            >
              MikeVirtualCoach
            </span>
          </Link>

          {/* ── Centre : YourCoach AI ── */}
          <div className="hidden md:flex" style={{ justifyContent: "center", flex: "0 0 auto" }}>
            <Link
              to="/solution"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "32px",
                fontWeight: 400,
                color: "#0f172a",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "10px",
                letterSpacing: "-0.8px",
                transition: `opacity 180ms ${EASE}`,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.80"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              YourCoach AI
            </Link>
          </div>

          {/* ── Droite : nav + CTA ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: "1 0 0", justifyContent: "flex-end" }}>

            <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2px" }}>
              <Link
                to="/about"
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: isActive("/about") ? "#1a1f2e" : "rgba(15,23,42,0.75)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  transition: `color 180ms ${EASE}, background-color 180ms ${EASE}`,
                  backgroundColor: isActive("/about") ? "rgba(0,0,0,0.06)" : "transparent",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#1a1f2e";
                  if (!isActive("/about")) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive("/about") ? "#1a1f2e" : "rgba(15,23,42,0.75)";
                  e.currentTarget.style.backgroundColor = isActive("/about") ? "rgba(0,0,0,0.06)" : "transparent";
                }}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                À propos
              </Link>
            </nav>

            <div className="hidden md:block" style={{ width: "1px", height: "16px", backgroundColor: "rgba(0,0,0,0.10)", margin: "0 6px" }} />

            <Link
              to="/contact"
              className="hidden md:inline-block"
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "rgba(15,20,40,0.88)",
                borderRadius: "22px",
                padding: "9px 20px",
                textDecoration: "none",
                border: "none",
                whiteSpace: "nowrap",
                transition: `background-color 180ms ${EASE}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(15,20,40,1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(15,20,40,0.88)"; }}
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </header>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] px-3 py-2 rounded-md"
        style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
      >
        Aller au contenu principal
      </a>
    </>
  );
};

export default Header;
