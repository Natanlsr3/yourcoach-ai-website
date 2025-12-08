import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award,
  Sparkles,
  Heart,
  Globe,
  TrendingUp
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDocumentTitle } from "@/hooks/use-document-title";

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
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Révolutionner le <span className="text-accent">bien-être</span> hôtelier
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
                Née de la rencontre entre expertise IA et savoir-faire hôtelier, 
                YourCoach AI transforme l'expérience well-being des hôtels de luxe.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Notre Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Démocratiser l'accès à un coaching bien-être premium pour chaque client d'hôtel, 
                    quels que soient sa langue, son niveau ou ses contraintes. Nous croyons que le 
                    bien-être de qualité ne doit plus être réservé à une élite.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Notre Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Devenir la référence mondiale du coaching IA dans l'hôtellerie de luxe. 
                    Un monde où chaque établissement peut offrir une expérience bien-être 
                    personnalisée et accessible, sans contrainte opérationnelle.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Nos valeurs
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Les principes qui guident chaque décision et chaque innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-border text-center hover:shadow-medium transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center mb-4">
                      <value.icon className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Notre équipe
              </h2>
              <p className="text-xl text-muted-foreground">
                Des experts passionnés au service de votre succès
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => {
                // Mapping des photos des membres de l'équipe
                const imageSrc =
                  member.name === "Natan Lasar" ? "/coach-natan.png" :
                  member.name === "Amandine Garlopeau" ? "/coach-amandine.png" :
                  member.name === "Raphaël Touitou" ? "/coach-raphael.png" :
                  member.name === "Claire de Labachelerie" ? "/coach-claire.png" :
                  member.name === "Roman Pierrard" ? "/coach-roman.png" :
                  member.name === "Antoine Cerino" ? "/coach-antoine.png" :
                  member.name === "Thomas Raposo" ? "/coach-thomas.png" :
                  member.name === "Walid El Ghouti" ? "/coach-walid.png" :
                  undefined;
                const avatarSize =
                  member.name === "Raphaël Touitou" ? "w-28 h-28" : "w-32 h-32";

                return (
                  <Card key={index} className="border-border text-center">
                    <CardHeader>
                      <div className={`${avatarSize} mx-auto rounded-full overflow-hidden mb-4`}>
                        {imageSrc ? (
                          <Avatar className={avatarSize}>
                            <AvatarImage src={imageSrc} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                            <Users className="w-16 h-16 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <div className="text-accent font-medium">{member.role}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-2">{member.background}</p>
                      <p className="text-foreground text-sm font-medium">{member.expertise}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Notre histoire</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  YourCoach AI est née d'un constat évident : le tourisme bien-être connaît une croissance rapide, et les clients attendent bien plus que des équipements en libre-service. Ils recherchent un accompagnement sur mesure, accessible à tout moment, et une expérience moderne qui valorise pleinement leur séjour.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Pourtant, dans la majorité des hôtels, l'offre bien-être reste très standardisée : quelques machines dans une petite salle de sport, un spa, un espace détente… Ces infrastructures, bien que coûteuses à installer et à entretenir, sont souvent sous-exploitées et ne se distinguent pas réellement de la concurrence.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  À cela s'ajoute le coût important du recrutement de personnel dédié au coaching sportif ou bien-être, ainsi que l'investissement élevé en infrastructures et en équipements, souvent difficilement rentabilisable et rarement optimisé pour répondre à toutes les typologies de clients.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  C'est pour relever ces défis que nous avons créé YourCoach AI : un coach virtuel 3D animé par IA, multilingue et interactif, qui valorise les équipements existants, optimise leur utilisation, augmente l'engagement et la satisfaction des clients, et maximise le retour sur investissement des espaces bien-être.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Avec YourCoach AI, chaque établissement peut offrir une expérience différenciante, incitant les clients à prolonger leur séjour, à consommer davantage de services et à revenir dans un lieu où bien-être et innovation se rencontrent.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Rejoignez l'aventure
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Découvrez comment YourCoach AI peut transformer votre établissement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-accent-foreground"
              >
                <Link to="/demo">Voir notre solution</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
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


