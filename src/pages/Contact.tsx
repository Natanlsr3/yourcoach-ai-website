import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const NAVY = "#0A0E3D";
const INK = "#1A1D24";
const GREY = "#717A8A";
const BLUE = "#3B9EFF";
const BLUE_DEEP = "#1A56DB";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(10,14,61,0.08)",
  borderRadius: 20,
};

const Contact = () => {
  useDocumentTitle("YourCoach AI — Contact");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section style={{ background: "transparent", padding: "160px 80px 80px" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 64,
                  color: INK,
                  letterSpacing: "-2.5px",
                  lineHeight: 1.05,
                  marginBottom: 24,
                }}
              >
                Parlons de votre projet{" "}
                <span style={{ fontStyle: "italic", color: BLUE_DEEP }}>bien-être</span>
              </h1>
              <p
                style={{
                  fontSize: 18,
                  color: GREY,
                  maxWidth: 600,
                  margin: "0 auto 24px",
                  lineHeight: 1.6,
                }}
              >
                Nos experts vous accompagnent pour transformer l'expérience de vos clients.
                Contactez-nous pour une consultation personnalisée.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(59,158,255,0.10)",
                  color: BLUE_DEEP,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <CheckCircle size={16} />
                <span>Réponse garantie sous 2h en jours ouvrés</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section style={{ background: "transparent", padding: "0 0 80px" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 48,
                  color: INK,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Contactez nos experts
              </h2>
              <p style={{ fontSize: 16, color: GREY }}>
                Décrivez votre projet et vos besoins. Nous vous recontactons rapidement.
              </p>
            </div>

            <div style={{ ...glassCard, padding: 32 }}>
              <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Prénom *" required />
                  <Input placeholder="Nom *" required />
                </div>
                <Input type="email" placeholder="Email professionnel *" required />
                <Input placeholder="Nom de l'établissement *" required />
                <Input placeholder="Fonction" />
                <Input type="tel" placeholder="Téléphone" />
                <Textarea
                  placeholder="Décrivez votre projet..."
                  rows={6}
                  required
                />
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: NAVY,
                    color: "#F5F1EA",
                    border: "none",
                    borderRadius: 28,
                    padding: "14px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  <MessageCircle size={18} />
                  Envoyer ma demande
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: Phone,  label: "Téléphone", value: "+33 6 58 16 16 92" },
                { icon: Mail,   label: "Email",     value: "natan.lasar@mikevirtualcoach.com" },
                { icon: MapPin, label: "Adresse",   value: "61 rue de Lyon, 75012 Paris France" },
              ].map((item, index) => (
                <div key={index} style={{ ...glassCard, padding: 24, textAlign: "center" }}>
                  <item.icon size={28} style={{ color: BLUE, margin: "0 auto 12px" }} />
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 8 }}>
                    {item.label}
                  </h3>
                  <p style={{ fontSize: 13, color: GREY }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
