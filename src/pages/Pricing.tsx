import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Phone,
  Mail,
  Star
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const sans = "-apple-system, BlinkMacSystemFont, sans-serif";
const serif = "'DM Serif Display', Georgia, serif";
const FG = "#1A1D24";
const FG_MUT = "#717A8A";
const BLUE = "#3B9EFF";
const BLUE_DEEP = "#1A56DB";
const NAVY = "#0A0E3D";
const CREAM = "#F5F1EA";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.85)",
  boxShadow: "0 8px 32px rgba(60,100,180,0.10)",
  borderRadius: "18px",
};

const btnPrimary: React.CSSProperties = {
  fontFamily: sans,
  backgroundColor: BLUE,
  color: "#fff",
  borderRadius: "28px",
  padding: "13px 28px",
  fontSize: "14px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  boxSizing: "border-box",
};

const btnDark: React.CSSProperties = {
  ...btnPrimary,
  backgroundColor: NAVY,
  color: CREAM,
};

const btnOutline: React.CSSProperties = {
  ...btnPrimary,
  backgroundColor: "transparent",
  color: CREAM,
  border: "1.5px solid rgba(245,241,234,0.20)",
};

const Pricing = () => {
  useDocumentTitle("YourCoach AI — Tarifs");

  const standardFeatures = [
    "Coach virtuel 3D animé par IA",
    "Programmes personnalisés (sport, mobilité, récupération)",
    "Multilingue (FR, EN, DE, ES, IT)",
    "Déploiement express 48h + formation équipes",
    "Analytics temps réel (tableau de bord standard)",
    "Personnalisation à l'identité visuelle (logo/couleurs)"
  ];

  const premiumFeatures = [
    "Tout le Standard, plus :",
    "Reporting avancé (usage, créneaux, préférences, comparatifs)",
    "Décor 3D personnalisé (tenue/décor du coach aux codes de l'hôtel)",
    "Défis & badges saisonniers (animations sur-mesure)"
  ];

  const comparisonTable = [
    { feature: "Coach 3D animé par IA", standard: true, premium: true },
    { feature: "Programmes personnalisés", standard: true, premium: true },
    { feature: "Multilingue (FR, EN, DE, ES, IT)", standard: true, premium: true },
    { feature: "Déploiement 48h + formation", standard: true, premium: true },
    { feature: "Analytics temps réel (standard)", standard: true, premium: true },
    { feature: "Reporting avancé", standard: false, premium: true },
    { feature: "Décor 3D personnalisé", standard: false, premium: true },
    { feature: "Défis & badges saisonniers", standard: false, premium: true },
    { feature: "Personnalisation identité (logo/couleurs)", standard: true, premium: true }
  ];

  const faq = [
    {
      q: "Combien de temps pour être opérationnel ?",
      a: "L'installation et la mise en service sont réalisées en moins de 24 heures, sans travaux ni interruption de vos services."
    },
    {
      q: "Faut-il du personnel dédié ?",
      a: "Non. La solution est entièrement autonome et inclut une courte formation pour que votre équipe puisse en maîtriser l'usage."
    },
    {
      q: "Langues supportées",
      a: "Français et anglais dès le lancement. Espagnol, italien, allemand et chinois seront ajoutés très prochainement dans les prochaines mises à jour."
    },
    {
      q: "Peut-on l'adapter à l'identité de l'hôtel ?",
      a: "Oui. Le branding de votre établissement est intégré (logo, couleurs, charte graphique) et, en formule Premium, un décor 3D immersif avec animations personnalisées est ajouté."
    },
    {
      q: "Quelles données sont collectées ?",
      a: "Seules des statistiques anonymisées sont recueillies afin d'optimiser le service, dans le strict respect des réglementations en vigueur."
    }
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: sans }}>
      <Header />
      <main id="main" style={{ paddingTop: "64px" }}>

        {/* Hero */}
        <section style={{ background: "transparent", padding: "80px 24px" }}>
          <div style={{ maxWidth: "896px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontFamily: sans, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: BLUE_DEEP, display: "block", marginBottom: "20px" }}>
              Tarifs
            </span>
            <h1 style={{ fontFamily: serif, fontSize: "58px", color: FG, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "20px", marginTop: 0 }}>
              Des formules simples,<br />pensées pour l'hôtellerie de luxe
            </h1>
            <p style={{ fontFamily: sans, fontSize: "18px", color: FG_MUT, lineHeight: 1.65, maxWidth: "540px", margin: "0 auto" }}>
              Deux niveaux, un même objectif : sublimer votre expérience bien-être sans complexité.
            </p>
          </div>
        </section>

        {/* Plans Cards */}
        <section style={{ background: "transparent", padding: "0 40px 80px" }}>
          <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>

              {/* Standard */}
              <div style={{ ...glassCard, padding: "40px 36px" }}>
                <h2 style={{ fontFamily: serif, fontSize: "36px", color: FG, letterSpacing: "-1px", marginTop: 0, marginBottom: "8px" }}>Standard</h2>
                <p style={{ fontFamily: sans, fontSize: "15px", color: FG_MUT, lineHeight: 1.6, marginTop: 0, marginBottom: "32px" }}>
                  Le socle complet pour activer YourCoach AI rapidement.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                  {standardFeatures.map((feature, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckCircle style={{ width: "18px", height: "18px", color: BLUE, flexShrink: 0, marginTop: "1px" }} />
                      <span style={{ fontFamily: sans, fontSize: "14px", color: FG, lineHeight: 1.5 }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" style={btnDark}>Demander un devis Standard</Link>
              </div>

              {/* Premium */}
              <div style={{ ...glassCard, padding: "40px 36px", position: "relative", overflow: "hidden", border: "1px solid rgba(59,158,255,0.30)" }}>
                <div style={{ position: "absolute", top: 0, right: 0, background: BLUE, color: "#fff", padding: "4px 32px 4px 16px", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", borderBottomLeftRadius: "14px" }}>
                  Recommandé
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Star style={{ width: "16px", height: "16px", color: BLUE, fill: BLUE }} />
                  <span style={{ fontFamily: sans, fontSize: "12px", color: BLUE, fontWeight: 600 }}>Le plus choisi par les établissements 5★</span>
                </div>
                <h2 style={{ fontFamily: serif, fontSize: "36px", color: FG, letterSpacing: "-1px", marginTop: 0, marginBottom: "8px" }}>Premium</h2>
                <p style={{ fontFamily: sans, fontSize: "15px", color: FG_MUT, lineHeight: 1.6, marginTop: 0, marginBottom: "32px" }}>
                  Pour une expérience signature et pilotée finement.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckCircle style={{ width: "18px", height: "18px", color: BLUE, flexShrink: 0, marginTop: "1px" }} />
                      <span style={{ fontFamily: sans, fontSize: "14px", color: FG, lineHeight: 1.5 }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" style={btnPrimary}>Demander un devis Premium</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tableau comparatif */}
        <section style={{ background: "transparent", padding: "0 40px 80px" }}>
          <div style={{ maxWidth: "896px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontFamily: serif, fontSize: "44px", color: FG, letterSpacing: "-1.5px", lineHeight: 1.08, margin: 0 }}>
                Comparer en un coup d'œil
              </h2>
            </div>

            <div style={{ ...glassCard, overflow: "hidden", padding: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr" }}>
                <div style={{ padding: "18px 24px", background: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(0,0,0,0.06)", fontFamily: serif, fontSize: "16px", color: FG }}>Fonctionnalités</div>
                <div style={{ padding: "18px 24px", background: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(0,0,0,0.06)", fontFamily: serif, fontSize: "16px", color: FG, textAlign: "center", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>Standard</div>
                <div style={{ padding: "18px 24px", background: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(0,0,0,0.06)", fontFamily: serif, fontSize: "16px", color: BLUE, textAlign: "center", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>Premium</div>
              </div>
              {comparisonTable.map((row, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: index < comparisonTable.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                  <div style={{ padding: "14px 24px", fontFamily: sans, fontSize: "14px", color: FG }}>{row.feature}</div>
                  <div style={{ padding: "14px 24px", textAlign: "center", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
                    {row.standard ? <CheckCircle style={{ width: "18px", height: "18px", color: BLUE, margin: "0 auto" }} /> : <span style={{ color: FG_MUT }}>—</span>}
                  </div>
                  <div style={{ padding: "14px 24px", textAlign: "center", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
                    {row.premium ? <CheckCircle style={{ width: "18px", height: "18px", color: BLUE, margin: "0 auto" }} /> : <span style={{ color: FG_MUT }}>—</span>}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: sans, fontSize: "13px", color: FG_MUT, textAlign: "center", marginTop: "16px" }}>
              Pas de matériel additionnel requis. Fonctionne sur smartphone. Support et mises à jour inclus.
            </p>
          </div>
        </section>

        {/* Devis Express */}
        <section style={{ background: "transparent", padding: "0 40px 80px" }}>
          <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: serif, fontSize: "44px", color: FG, letterSpacing: "-1.5px", lineHeight: 1.08, marginTop: 0, marginBottom: "16px" }}>
                  Devis express en 15 minutes
                </h2>
                <p style={{ fontFamily: sans, fontSize: "17px", color: FG_MUT, lineHeight: 1.7, margin: 0 }}>
                  Un conseiller vous recontacte sous 24h avec une proposition adaptée à vos espaces.
                </p>
              </div>

              <div style={{ ...glassCard, padding: "36px 32px" }}>
                <h3 style={{ fontFamily: serif, fontSize: "24px", color: FG, letterSpacing: "-0.5px", textAlign: "center", marginTop: 0, marginBottom: "24px" }}>
                  Obtenez votre devis en 15 minutes
                </h3>
                <Link to="/contact" style={{ ...btnDark, marginBottom: "20px", display: "block" }}>Démarrer mon devis gratuit</Link>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: sans, fontSize: "13px", color: FG_MUT, marginBottom: "10px" }}>Ou contactez-nous directement :</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                    <a href="tel:+33658161692" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: sans, fontSize: "13px", color: BLUE, textDecoration: "none" }}>
                      <Phone style={{ width: "14px", height: "14px" }} />
                      +33 6 58 16 16 92
                    </a>
                    <a href="mailto:natan.lasar@mikevirtualcoach.com" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: sans, fontSize: "13px", color: BLUE, textDecoration: "none" }}>
                      <Mail style={{ width: "14px", height: "14px" }} />
                      natan.lasar@mikevirtualcoach.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "transparent", padding: "0 40px 80px" }}>
          <div style={{ maxWidth: "768px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: serif, fontSize: "44px", color: FG, letterSpacing: "-1.5px", textAlign: "center", marginTop: 0, marginBottom: "48px" }}>
              Questions fréquentes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faq.map((item, index) => (
                <div key={index} style={{ ...glassCard, padding: "24px 28px" }}>
                  <h3 style={{ fontFamily: sans, fontSize: "15px", fontWeight: 600, color: FG, margin: "0 0 8px" }}>{item.q}</h3>
                  <p style={{ fontFamily: sans, fontSize: "14px", color: FG_MUT, lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section style={{ margin: "0 40px 80px", borderRadius: "24px", background: NAVY, padding: "80px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: serif, fontSize: "48px", color: CREAM, letterSpacing: "-1.5px", lineHeight: 1.05, marginTop: 0, marginBottom: "40px" }}>
            Prêt à lancer YourCoach AI<br />dans votre établissement ?
          </h2>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ ...btnDark, width: "auto" }}>Choisir Standard</Link>
            <Link to="/contact" style={{ ...btnPrimary, width: "auto" }}>Choisir Premium</Link>
            <Link to="/contact" style={{ ...btnOutline, width: "auto" }}>Parler à un expert</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
