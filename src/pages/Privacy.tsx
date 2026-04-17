import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Privacy = () => {
  useDocumentTitle("YourCoach AI — Politique de confidentialité");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8">Politique de confidentialité</h1>
            <Card className="border-border">
              <CardContent className="prose prose-slate max-w-none p-6">
                <p>
                  Ce document présente nos engagements en matière de protection des données personnelles.
                </p>
                <p>
                  Contenu à personnaliser selon vos pratiques et obligations légales.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


