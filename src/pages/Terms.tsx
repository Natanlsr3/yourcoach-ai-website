import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Terms = () => {
  useDocumentTitle("YourCoach AI — Conditions d'utilisation");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="pt-16">
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8">Conditions d'utilisation</h1>
            <Card className="border-border">
              <CardContent className="prose prose-slate max-w-none p-6">
                <p>
                  Termes et conditions d'utilisation du service YourCoach AI.
                </p>
                <p>
                  Contenu à compléter selon vos conditions contractuelles.
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

export default Terms;


