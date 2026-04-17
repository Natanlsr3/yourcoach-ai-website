import { Link } from "react-router-dom";
import { LogoIcon } from "@/components/ui/logo-icon";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const sans = "-apple-system, BlinkMacSystemFont, sans-serif";

const Footer = () => {
  return (
    <footer style={{ margin: "0 24px 24px", fontFamily: sans }}>
      <div style={{
        background: "rgba(15,23,42,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "24px",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "48px 40px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px" }}>

            {/* Logo et description */}
            <div>
              <Link to="/" style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px", textDecoration: "none" }}>
                <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LogoIcon className="w-6 h-6" style={{ color: "#3b9eff" }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: "20px", color: "rgba(255,255,255,0.90)" }}>
                  YourCoach<span style={{ color: "#3b9eff" }}> AI</span>
                </span>
              </Link>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.7, maxWidth: "380px", marginBottom: "24px", marginTop: 0 }}>
                Le coach virtuel 3D qui réinvente l'expérience sport et bien-être dans l'hôtellerie haut de gamme.
                Personnalisation, interactivité et expertise, au service de vos clients.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.40)", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#3b9eff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                >
                  <Linkedin style={{ width: "20px", height: "20px" }} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.40)", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#3b9eff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                >
                  <Twitter style={{ width: "20px", height: "20px" }} />
                </a>
              </div>
            </div>

            {/* Liens solution */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: "15px", color: "rgba(255,255,255,0.90)", marginBottom: "16px", marginTop: 0 }}>Solution</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { to: "/solution", label: "Comment ça marche" },
                  { to: "/avantages", label: "Avantages" },
                  { to: "/demo",     label: "Demander une démo" },
                  { to: "/pricing",  label: "Tarifs" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#3b9eff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: "15px", color: "rgba(255,255,255,0.90)", marginBottom: "16px", marginTop: 0 }}>Contact</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Mail style={{ width: "16px", height: "16px", color: "#3b9eff", flexShrink: 0 }} />
                  <a
                    href="mailto:natan.lasar@mikevirtualcoach.com"
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#3b9eff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    natan.lasar@mikevirtualcoach.com
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Phone style={{ width: "16px", height: "16px", color: "#3b9eff", flexShrink: 0 }} />
                  <a
                    href="tel:+33658161692"
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#3b9eff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    +33 6 58 16 16 92
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <MapPin style={{ width: "16px", height: "16px", color: "#3b9eff", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>
                    61 rue de Lyon, 75012 Paris France
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "40px",
            padding: "24px 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: 0 }}>
              © 2024 YourCoach AI. Tous droits réservés. — édité par MikeVirtualCoach (SAS)
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              {[
                { to: "/privacy", label: "Politique de confidentialité" },
                { to: "/terms",   label: "Conditions d'utilisation" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#3b9eff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
