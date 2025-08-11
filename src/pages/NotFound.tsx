import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useDocumentTitle("Page non trouvée — YourCoach AI");

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Désolé, cette page n'existe pas.</p>
        <Link to="/" className="text-accent underline font-medium">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
