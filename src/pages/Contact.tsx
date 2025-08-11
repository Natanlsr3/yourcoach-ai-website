import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Building,
  Calendar,
  CheckCircle
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Contact = () => {
  useDocumentTitle("YourCoach AI — Contact");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Parlons de votre projet <span className="text-accent">bien-être</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
                Nos experts vous accompagnent pour transformer l'expérience de vos clients. 
                Contactez-nous pour une consultation personnalisée.
              </p>
              <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Réponse garantie sous 2h en jours ouvrés</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Contactez nos experts
              </h2>
              <p className="text-muted-foreground mb-8">
                Décrivez votre projet et vos besoins. Nous vous recontactons rapidement.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="p-8">
                <form className="space-y-6">
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
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-accent hover:opacity-90"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Envoyer ma demande
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Téléphone</h3>
                  <p className="text-muted-foreground">+33 6 58 16 16 92</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">natan.lasar@mikevirtualcoach.com</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Adresse</h3>
                  <p className="text-muted-foreground">61 rue de Lyon, 75012 Paris France</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;