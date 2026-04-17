import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Lightbulb,
  Globe,
  TrendingUp,
  Users
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDocumentTitle } from "@/hooks/use-document-title";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.85)",
  boxShadow: "0 8px 32px rgba(60,80,120,0.10)",
  borderRadius: 20,
};

const About = () => {
  useDocumentTitle("YourCoach AI — À propos");

  const values = [
    {
      icon: Heart,
      title: "Excellence client",
      description: "Chaque interaction doit apporter une valeur réelle et mesurable à l'expérience client."
    },
    {
      icon: Lightbulb,
      title: "Innovation responsable",
      description: "La technologie au service de l'humain, pas l'inverse. Simplicité et efficacité avant tout."
    },
    {
      icon: Globe,
      title: "Ouverture internationale",
      description: "Des solutions pensées pour un monde connecté et multiculturel, adaptées à chaque marché."
    },
    {
      icon: TrendingUp,
      title: "Performance durable",
      description: "Des résultats qui s'inscrivent dans la durée, avec un impact positif sur votre business."
    }
  ];

  const team = [
    {
      name: "Natan Lasar",
      role: "CEO",
      background: "Ingénieur numérique, spécialisé en entrepreneuriat et intelligence artificielle",
      expertise: "Direction générale & Stratégie"
    },
    {
      name: "Raphaël Touitou",
      role: "Head of 3D",
      background: "CEO d'Insane Digital Production, expert en création et animation 3D",
      expertise: "3D & Animation"
    },
    {
      name: "Walid El Ghouti",
      role: "Head of AI",
      background: "Ingénieur numérique, spécialisé en recherche sur les modèles de langage (LLM)",
      expertise: "Intelligence Artificielle & LLM"
    },
    {
      name: "Roman Pierrard",
      role: "Expert Collaborateur",
      background: "Préparateur physique et joueur de football professionnel",
      expertise: "Sport & Performance"
    },
    {
      name: "Claire de Labachelerie",
      role: "Expert Collaborateur",
      background: "Médecin du sport, spécialisée en médecine physique & réadaptation",
      expertise: "Médecine physique & Réadaptation"
    },
    {
      name: "Antoine Cerino",
      role: "Expert Collaborateur",
      background: "Médecin du sport, spécialisé en IA & santé",
      expertise: "Médecine sportive & IA"
    },
    {
      name: "Thomas Raposo",
      role: "Expert Collaborateur",
      background: "Enseignant en STAPS, agrégé d'EPS et entraîneur de rugby",
      expertise: "Formation sportive & Rugby"
    },
    {
      name: "Amandine Garlopeau",
      role: "Expert Collaborateur",
      background: "Coach sportive et nutritionniste",
      expertise: "Sport & Nutrition"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section style={{ background: "transparent", padding: "160px 80px 80px" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 64,
                  color: "#0f172a",
                  letterSpacing: "-2.5px",
                  lineHeight: 1.05,
                  marginBottom: 24,
                }}
              >
                Révolutionner le bien-être hôtelier
              </h1>
              <p
                style={{
                  fontSize: 18,
                  color: "rgba(15,23,42,0.5)",
                  maxWidth: 560,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Née de la rencontre entre expertise IA et savoir-faire hôtelier,
                YourCoach AI transforme l'expérience well-being des hôtels de luxe.
              </p>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ────────────────────────────── */}
        <section style={{ background: "transparent", padding: "80px 0" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div style={{ ...glassCard, padding: "40px" }}>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: 40,
                    color: "rgba(26,86,219,0.15)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  01
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                  Notre Mission
                </h3>
                <p style={{ fontSize: 17, color: "rgba(15,23,42,0.55)", lineHeight: 1.7 }}>
                  Démocratiser l'accès à un coaching bien-être premium pour chaque client d'hôtel,
                  quels que soient sa langue, son niveau ou ses contraintes. Nous croyons que le
                  bien-être de qualité ne doit plus être réservé à une élite.
                </p>
              </div>

              <div style={{ ...glassCard, padding: "40px" }}>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: 40,
                    color: "rgba(26,86,219,0.15)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  02
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                  Notre Vision
                </h3>
                <p style={{ fontSize: 17, color: "rgba(15,23,42,0.55)", lineHeight: 1.7 }}>
                  Devenir la référence mondiale du coaching IA dans l'hôtellerie de luxe.
                  Un monde où chaque établissement peut offrir une expérience bien-être
                  personnalisée et accessible, sans contrainte opérationnelle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALEURS ─────────────────────────────────────── */}
        <section style={{ background: "transparent", padding: "80px 0" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" style={{ marginBottom: 64 }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 48,
                  color: "#0f172a",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Nos valeurs
              </h2>
              <p style={{ fontSize: 18, color: "rgba(15,23,42,0.5)", maxWidth: 560, margin: "0 auto" }}>
                Les principes qui guident chaque décision et chaque innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  style={{
                    ...glassCard,
                    padding: "32px 24px",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(60,100,180,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(60,80,120,0.10)";
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      margin: "0 auto 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <value.icon
                      size={28}
                      strokeWidth={1.5}
                      style={{ color: "#1a56db", opacity: 0.6 }}
                    />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(15,23,42,0.5)", lineHeight: 1.6 }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÉQUIPE ──────────────────────────────────────── */}
        <section style={{ background: "transparent", padding: "80px 0" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" style={{ marginBottom: 64 }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 48,
                  color: "#0f172a",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Notre équipe
              </h2>
              <p style={{ fontSize: 18, color: "rgba(15,23,42,0.5)" }}>
                Des experts passionnés au service de votre succès
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => {
                const imageSrc =
                  member.name === "Natan Lasar"            ? "/pp-natan.png" :
                  member.name === "Amandine Garlopeau"     ? "/pp-amandine.png" :
                  member.name === "Raphaël Touitou"        ? "/coach-raphael.png" :
                  member.name === "Claire de Labachelerie" ? "/pp-claire.png" :
                  member.name === "Roman Pierrard"         ? "/pp-roman.png" :
                  member.name === "Antoine Cerino"         ? "/pp-antoine.png" :
                  member.name === "Thomas Raposo"          ? "/pp-thomas.png" :
                  member.name === "Walid El Ghouti"        ? "/coach-walid.png" :
                  undefined;

                return (
                  <div
                    key={index}
                    style={{ ...glassCard, padding: "32px 24px", textAlign: "center" }}
                  >
                    <div style={{ marginBottom: 16 }}>
                      {imageSrc ? (
                        <Avatar className="w-28 h-28 mx-auto" style={{ border: "2px solid rgba(255,255,255,0.8)" }}>
                          <AvatarImage src={imageSrc} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div
                          style={{
                            width: 112,
                            height: 112,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.8)",
                            background: "rgba(26,86,219,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                          }}
                        >
                          <Users size={48} strokeWidth={1.5} style={{ color: "#1a56db", opacity: 0.5 }} />
                        </div>
                      )}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: 13, color: "#1a56db", fontWeight: 600, marginBottom: 12 }}>
                      {member.role}
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(15,23,42,0.5)", lineHeight: 1.5, marginBottom: 6 }}>
                      {member.background}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
                      {member.expertise}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HISTOIRE ────────────────────────────────────── */}
        <section style={{ background: "transparent", padding: "80px 0" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ ...glassCard, padding: 48, borderRadius: 24 }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 32,
                  color: "#0f172a",
                  letterSpacing: "-1px",
                  textAlign: "center",
                  marginBottom: 32,
                }}
              >
                Notre histoire
              </h2>
              {[
                "YourCoach AI est née d'un constat évident : le tourisme bien-être connaît une croissance rapide, et les clients attendent bien plus que des équipements en libre-service. Ils recherchent un accompagnement sur mesure, accessible à tout moment, et une expérience moderne qui valorise pleinement leur séjour.",
                "Pourtant, dans la majorité des hôtels, l'offre bien-être reste très standardisée : quelques machines dans une petite salle de sport, un spa, un espace détente… Ces infrastructures, bien que coûteuses à installer et à entretenir, sont souvent sous-exploitées et ne se distinguent pas réellement de la concurrence.",
                "À cela s'ajoute le coût important du recrutement de personnel dédié au coaching sportif ou bien-être, ainsi que l'investissement élevé en infrastructures et en équipements, souvent difficilement rentabilisable et rarement optimisé pour répondre à toutes les typologies de clients.",
                "C'est pour relever ces défis que nous avons créé YourCoach AI : un coach virtuel 3D animé par IA, multilingue et interactif, qui valorise les équipements existants, optimise leur utilisation, augmente l'engagement et la satisfaction des clients, et maximise le retour sur investissement des espaces bien-être.",
                "Avec YourCoach AI, chaque établissement peut offrir une expérience différenciante, incitant les clients à prolonger leur séjour, à consommer davantage de services et à revenir dans un lieu où bien-être et innovation se rencontrent.",
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 17,
                    color: "rgba(15,23,42,0.55)",
                    lineHeight: 1.7,
                    marginBottom: i < 4 ? 24 : 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ───────────────────────────────────── */}
        <section style={{ padding: "0 40px 80px" }}>
          <div
            style={{
              background: "#0f172a",
              borderRadius: 24,
              padding: "80px 40px",
              textAlign: "center",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 42,
                color: "#ffffff",
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Rejoignez l'aventure
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
              Découvrez comment YourCoach AI peut transformer votre établissement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                style={{
                  background: "#1a56db",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 600,
                  padding: "14px 32px",
                  fontSize: 15,
                }}
              >
                <Link to="/demo">Voir notre solution</Link>
              </Button>
              <Button
                asChild
                size="lg"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 12,
                  fontWeight: 600,
                  padding: "14px 32px",
                  fontSize: 15,
                }}
              >
                <Link to="/contact">Nous rencontrer</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
