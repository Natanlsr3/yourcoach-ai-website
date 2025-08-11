import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Index = () => {
  useDocumentTitle("YourCoach AI — Coach Virtuel 3D pour Hôtels");

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <Hero />
        {/* Autres sections seront ajoutées ici */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
