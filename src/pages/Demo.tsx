import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Play,
  Phone,
  Mail,
  CheckCircle,
  Smartphone,
  Users,
  BarChart3,
  Sparkles
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Demo = () => {
  const demoFeatures = [
    {
      icon: Smartphone,
      title: "Interface Mobile Native",
      description: "Découvrez l'expérience utilisateur sur smartphone, optimisée pour vos clients internationaux."
    },
    {
      icon: Users,
      title: "Coach 3D Interactif",
      description: "Testez les interactions avec notre avatar IA multilingue et ses capacités d'adaptation."
    },
    {
      icon: BarChart3,
      title: "Dashboard Hôtelier",
      description: "Explorez les analytiques temps réel pour mesurer l'engagement de vos clients."
    }
  ];

  const testimonials = [
    {
      name: "",
      role: "",
      content: "Témoignage à venir",
      rating: 5
    }
  ];

  useDocumentTitle("YourCoach AI — Démo");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20" style={{ background: "transparent" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-semibold mb-6" style={{ color: "#1A1D24" }}>
                Vivez l'expérience <span style={{ color: "#3B9EFF" }}>YourCoach AI</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: "#717A8A" }}>
                Découvrez en situation réelle comment notre solution transforme
                l'expérience bien-être de vos clients en moins de 15 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20" style={{ background: "transparent" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "#1A1D24" }}>
                Démo interactive en direct
              </h2>
              <p className="text-xl" style={{ color: "#717A8A" }}>
                Cliquez pour découvrir YourCoach AI en action
              </p>
            </div>

            {/* Video Player Placeholder */}
            <div className="relative rounded-3xl overflow-hidden mb-12" style={{ background: "#0A0E3D", boxShadow: "0 20px 60px rgba(60,100,180,0.16)" }}>
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center" style={{ color: "#F5F1EA" }}>
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform cursor-pointer" style={{ background: "#3B9EFF" }}>
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">À venir bientôt</h3>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {demoFeatures.map((feature, index) => (
                <Card key={index} className="text-center glass-card hover:shadow-medium transition-all">
                  <CardHeader>
                    <div
                      className="w-16 h-16 mx-auto flex items-center justify-center mb-4"
                      style={{ background: "rgba(59,158,255,0.10)", borderRadius: "12px" }}
                    >
                      <feature.icon className="w-8 h-8" style={{ color: "#1A56DB" }} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p style={{ color: "#717A8A" }}>{feature.description}</p>
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
                Ce que disent nos partenaires
              </h2>
              <p className="text-xl" style={{ color: "#717A8A" }}>
                Témoignages d'hôteliers qui ont adopté YourCoach AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Sparkles key={i} className="w-5 h-5 fill-current" style={{ color: "#3B9EFF" }} />
                      ))}
                    </div>
                    <blockquote className="mb-6 italic" style={{ color: "#1A1D24" }}>
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold" style={{ color: "#1A1D24" }}>{testimonial.name}</div>
                      <div className="text-sm" style={{ color: "#717A8A" }}>{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Request Form */}
        <section className="py-20" style={{ background: "transparent" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "#1A1D24" }}>
                Demander une démo personnalisée
              </h2>
              <p className="text-xl" style={{ color: "#717A8A" }}>
                Nos experts vous présentent YourCoach AI adapté à votre établissement
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6" style={{ color: "#1A1D24" }}>
                  Ce que vous obtiendrez :
                </h3>
                <div className="space-y-4">
                  {[
                    "Démonstration complète en situation réelle",
                    "Analyse personnalisée de vos besoins",
                    "Estimation ROI pour votre établissement",
                    "Réponses à toutes vos questions techniques",
                    "Proposition commerciale sur-mesure"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#3B9EFF" }} />
                      <span style={{ color: "#1A1D24" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Planifiez votre démo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button asChild size="lg" className="w-full" style={{ background: "#3B9EFF", color: "#fff", borderRadius: "28px", border: "none" }}>
                      <a href="tel:+33658161692" className="flex items-center justify-center space-x-2">
                        <Phone className="w-5 h-5" />
                        <span>Appeler directement</span>
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full" style={{ borderRadius: "28px" }}>
                      <a href="mailto:natan.lasar@mikevirtualcoach.com?subject=Demande de démo YourCoach AI" className="flex items-center justify-center space-x-2">
                        <Mail className="w-5 h-5" />
                        <span>Envoyer un email</span>
                      </a>
                    </Button>
                  </div>
                  <div className="text-center text-sm" style={{ color: "#717A8A" }}>
                    <p>Réponse sous 2h en jours ouvrés</p>
                    <p>Démo disponible en français, anglais, allemand</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Demo */}
        <section className="py-20" style={{ background: "transparent" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4" style={{ color: "#1A1D24" }}>
                Questions fréquentes sur la démo
              </h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  q: "Combien de temps dure la démonstration ?",
                  a: "La démo complète dure environ 30 minutes : 15 minutes de présentation interactive et 15 minutes de questions-réponses personnalisées."
                },
                {
                  q: "Peut-on tester l'application pendant la démo ?",
                  a: "Absolument ! Vous pourrez manipuler l'interface, interagir avec le coach 3D et découvrir toutes les fonctionnalités en temps réel."
                },
                {
                  q: "La démo est-elle payante ?",
                  a: "Non, la démonstration est entièrement gratuite et sans engagement. C'est notre façon de vous faire découvrir le potentiel de YourCoach AI."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2" style={{ color: "#1A1D24" }}>{faq.q}</h3>
                    <p style={{ color: "#717A8A" }}>{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
