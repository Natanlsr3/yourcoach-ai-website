import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Bot, 
  Globe, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Solution = () => {
  const features = [
    {
      icon: Bot,
      title: "Coach 3D Animé par IA",
      description: "Avatar 3D réaliste capable d'analyser les mouvements, corriger la posture et adapter les exercices en temps réel selon le profil utilisateur."
    },
    {
      icon: Zap,
      title: "Programmes Personnalisés",
      description: "L'IA génère des séances sur-mesure basées sur les objectifs, niveau de forme, contraintes physiques et préférences de chaque utilisateur."
    },
    {
      icon: Users,
      title: "Intégration Transparente",
      description: "Déploiement en 24h avec QR codes dans vos espaces. Formation de votre équipe incluse pour un accompagnement optimal."
    },
    {
      icon: Globe,
      title: "Support Multilingue",
      description: "Interface disponible en français, anglais, allemand, espagnol et italien pour s'adapter à votre clientèle internationale."
    },
    {
      icon: Smartphone,
      title: "Accessible sur Mobile",
      description: "Application native iOS et Android. Vos clients utilisent leur propre smartphone, aucun équipement supplémentaire requis."
    },
    {
      icon: TrendingUp,
      title: "Analytiques Avancées",
      description: "Dashboard en temps réel pour suivre l'engagement, satisfaction client et ROI de vos installations bien-être."
    }
  ];

  const benefits = [
    "Valorisation de vos équipements existants",
    "Amélioration de l'expérience client global",
    "Augmentation de l'utilisation des installations fitness et bien être",
    "Engouement client qualitativement amélioré",
    "Suppression des plaintes liées au manque d'accompagnement",
    "Service différenciant face à la concurrence"
  ];

  useDocumentTitle("YourCoach AI — Solution");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Comment <span className="text-accent">YourCoach AI</span> transforme votre hôtel
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
                Une solution clé en main qui révolutionne l'expérience bien-être de vos clients 
                sans contrainte opérationnelle pour vos équipes.
              </p>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Une technologie avant-gardiste
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez les fonctionnalités qui font de YourCoach AI la solution de référence 
                pour les hôtels de luxe exigeants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:shadow-medium transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Des résultats mesurables pour votre établissement
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Nos clients partenaires constatent des améliorations significatives 
                  dès les premières semaines d'utilisation.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                    <Link to="/avantages" className="flex items-center space-x-2">
                      <span>Découvrir tous les avantages</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-card rounded-3xl p-8 shadow-medium">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Processus d'intégration</h3>
                  <div className="relative">
                    {/* Timeline moderne avec design épuré */}
                    <div className="relative space-y-4">
                      {/* Étape 1 */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg shadow-lg z-10">
                            1
                          </div>
                          <div className="w-0.5 h-10 bg-gradient-to-b from-accent to-accent/30 mt-2"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold text-foreground text-lg mb-2">Audit personnalisé</h4>
                          <p className="text-muted-foreground">Analyse de vos installations et besoins clients lors de l'onboarding de votre établissement</p>
                        </div>
                      </div>

                      {/* Étape 2 */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg shadow-lg z-10">
                            2
                          </div>
                          <div className="w-0.5 h-10 bg-gradient-to-b from-accent to-accent/30 mt-2"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold text-foreground text-lg mb-2">Déploiement express</h4>
                          <p className="text-muted-foreground">Installation et configuration en 24h, sans interruption de vos services</p>
                        </div>
                      </div>

                      {/* Étape 3 */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg shadow-lg z-10">
                            3
                          </div>
                          <div className="w-0.5 h-10 bg-gradient-to-b from-accent to-accent/30 mt-2"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold text-foreground text-lg mb-2">Formation équipe</h4>
                          <p className="text-muted-foreground">Accompagnement de vos équipes inclus</p>
                        </div>
                      </div>

                      {/* Étape 4 */}
                      <div className="flex items-start space-x-6">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg shadow-lg z-10">
                            4
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold text-foreground text-lg mb-2">Suivi performance</h4>
                          <p className="text-muted-foreground">Dashboard analytique et support continu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à révolutionner votre offre bien-être ?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Rejoignez les établissements visionnaires qui transforment déjà l'expérience de leurs clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-accent-foreground"
              >
                <Link to="/demo">Demander une démo personnalisée</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
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

export default Solution;