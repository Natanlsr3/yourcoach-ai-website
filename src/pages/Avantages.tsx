import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Sparkles
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Avantages = () => {
  useDocumentTitle("YourCoach AI — Avantages");

  const benefits = [
    {
      icon: Users,
      title: "Expérience client premium",
      description: "Offrez à vos clients un accompagnement bien-être sur-mesure, disponible 24h/24, qui renforce leur satisfaction et leur fidélité.",
      stats: "Satisfaction maximale"
    },
    {
      icon: TrendingUp,
      title: "Retour sur investissement optimisé",
      description: "Valorise vos équipements existants tout en augmentant leur attractivité et leur taux d'utilisation.",
      stats: "ROI optimisé"
    },
    {
      icon: Zap,
      title: "Engagement client maximisé",
      description: "Stimule l'utilisation régulière des installations grâce à une expérience personnalisée et engageante qui incite vos clients à revenir.",
      stats: "Fidélisation renforcée"
    },
    {
      icon: Sparkles,
      title: "Image différenciante haut de gamme",
      description: "Renforce votre positionnement et vous différencie clairement de la concurrence en vous plaçant comme précurseur des services bien-être digitaux.",
      stats: "Leadership innovation"
    },
    {
      icon: CheckCircle,
      title: "Aucune charge opérationnelle supplémentaire",
      description: "Fonctionne en totale autonomie : pas de personnel dédié, pas d'équipement supplémentaire requis.",
      stats: "Zéro contrainte"
    }
  ];

  const testimonials = [
    {
      quote: "Témoignage à venir",
      author: "",
      role: "",
      hotel: ""
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20" style={{ background: "transparent" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-semibold mb-6" style={{ color: "#1A1D24" }}>
                Avantages <span style={{ color: "#3B9EFF" }}>concrets</span> pour votre hôtel
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: "#717A8A" }}>
                Découvrez pourquoi les établissements de prestige choisissent YourCoach AI
                pour transformer leur offre bien-être.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20" style={{ background: "transparent" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "#1A1D24" }}>
                5 avantages majeurs
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "#717A8A" }}>
                Des bénéfices concrets pour votre établissement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="glass-card hover:shadow-medium transition-all duration-300 group"
                >
                  <CardHeader className="text-center">
                    <div
                      className="w-16 h-16 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ background: "rgba(59,158,255,0.10)", borderRadius: "12px" }}
                    >
                      <benefit.icon className="w-8 h-8" style={{ color: "#1A56DB" }} />
                    </div>
                    <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                    <div className="text-sm font-medium" style={{ color: "#3B9EFF" }}>{benefit.stats}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center" style={{ color: "#717A8A" }}>{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20" style={{ background: "transparent" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "#1A1D24" }}>
                Témoignages clients
              </h2>
              <p className="text-xl" style={{ color: "#717A8A" }}>
                Ce que disent nos partenaires hôteliers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="w-5 h-5 fill-current" style={{ color: "#3B9EFF" }} />
                      ))}
                    </div>
                    <blockquote className="mb-6 italic text-lg" style={{ color: "#1A1D24" }}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold" style={{ color: "#1A1D24" }}>{testimonial.author}</div>
                      <div className="text-sm" style={{ color: "#717A8A" }}>{testimonial.role}</div>
                      <div className="text-sm font-medium" style={{ color: "#3B9EFF" }}>{testimonial.hotel}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20"
          style={{ background: "#0A0E3D", borderRadius: "24px", margin: "0 40px 80px" }}
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6" style={{ color: "#F5F1EA" }}>
              Prêt à bénéficier de ces avantages ?
            </h2>
            <p className="text-xl mb-8" style={{ color: "rgba(245,241,234,0.65)" }}>
              Découvrez comment YourCoach AI peut transformer votre offre bien-être
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" style={{ background: "#3B9EFF", color: "#fff", borderRadius: "28px", border: "none" }}>
                <Link to="/contact">Réserver ma démo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" style={{ borderColor: "rgba(245,241,234,0.20)", color: "#F5F1EA", background: "transparent", borderRadius: "28px" }}>
                <Link to="/contact">Parler à un expert</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Avantages;
