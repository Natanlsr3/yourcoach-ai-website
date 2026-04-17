import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Users, 
  Building, 
  Phone, 
  Mail,
  Calculator,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Star,
  TrendingUp,
  Target,
  BarChart3
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

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

  const useCases = [
    {
      icon: TrendingUp,
      title: "Installations mieux valorisées",
      description: "Les clients découvrent et utilisent plus naturellement vos espaces bien-être."
    },
    {
      icon: Target,
      title: "Parcours client plus fluide",
      description: "Un accompagnement disponible à toute heure, sans charge opérationnelle additionnelle."
    },
    {
      icon: BarChart3,
      title: "Pilotage par la donnée",
      description: "Vous suivez l'usage et ajustez votre offre en continu."
    }
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
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        {/* Hero Pricing */}
        <section className="relative py-20 bg-gradient-hero text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Des formules simples, pensées pour l'hôtellerie de luxe
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80">
                Deux niveaux, un même objectif : sublimer votre expérience bien-être sans complexité.
              </p>
            </div>
          </div>
        </section>

        {/* Plans Cards */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Plan */}
              <Card className="border-border hover:shadow-medium transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-foreground">Standard</CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Le socle complet pour activer YourCoach AI rapidement.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {standardFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-accent hover:opacity-90"
                  >
                    <Link to="/contact">Demander un devis Standard</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="border-border hover:shadow-medium transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-10 py-2 text-sm font-medium transform rotate-45 translate-x-12 translate-y-6">
                  Recommandé
                </div>
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-accent fill-current" />
                    <span className="text-sm text-accent font-medium">Le plus choisi par les établissements 5★</span>
                  </div>
                  <CardTitle className="text-3xl text-foreground">Premium</CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Pour une expérience signature et pilotée finement.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    <Link to="/contact">Demander un devis Premium</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Comparer en un coup d'œil
              </h2>
            </div>

            <Card className="border-border">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-6 bg-muted/50 font-semibold text-foreground">Fonctionnalités</div>
                  <div className="p-6 bg-muted/50 font-semibold text-foreground text-center">Standard</div>
                  <div className="p-6 bg-muted/50 font-semibold text-foreground text-center">Premium</div>
                  
                  {comparisonTable.map((row, index) => (
                    <>
                      <div className="p-4 border-b border-border text-foreground">{row.feature}</div>
                      <div className="p-4 border-b border-border text-center">
                        {row.standard ? <CheckCircle className="w-5 h-5 text-accent mx-auto" /> : <span className="text-muted-foreground">—</span>}
                      </div>
                      <div className="p-4 border-b border-border text-center">
                        {row.premium ? <CheckCircle className="w-5 h-5 text-accent mx-auto" /> : <span className="text-muted-foreground">—</span>}
                      </div>
                    </>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              Pas de matériel additionnel requis. Fonctionne sur smartphone. Support et mises à jour inclus.
            </div>
          </div>
        </section>

        {/* Devis Express */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Devis express en 15 minutes
                </h2>
                <p className="text-xl text-muted-foreground">
                  Un conseiller vous recontacte sous 24h avec une proposition adaptée à vos espaces.
                </p>
              </div>
              
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Obtenez votre devis en 15 minutes</CardTitle>
                 
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-accent hover:opacity-90"
                  >
                    <Link to="/contact">Démarrer mon devis gratuit</Link>
                  </Button>

                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p>Ou contactez-nous directement :</p>
                    <div className="flex justify-center space-x-4">
                      <a 
                        href="tel:+33658161692" 
                        className="flex items-center space-x-1 text-accent hover:text-accent-light"
                      >
                        <Phone className="w-4 h-4" />
                        <span>+33 6 58 16 16 92</span>
                      </a>
                      <a 
                        href="mailto:natan.lasar@mikevirtualcoach.com" 
                        className="flex items-center space-x-1 text-accent hover:text-accent-light"
                      >
                        <Mail className="w-4 h-4" />
                        <span>natan.lasar@mikevirtualcoach.com</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>



        {/* FAQ */}
        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-6">
              {faq.map((item, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à lancer YourCoach AI dans votre établissement ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-accent-foreground"
              >
                <Link to="/contact">Choisir Standard</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-accent-foreground"
              >
                <Link to="/contact">Choisir Premium</Link>
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

export default Pricing;


