import { Link } from "react-router-dom";
import { LogoIcon } from "@/components/ui/logo-icon";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-0.5 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <LogoIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                YourCoach<span className="text-accent"> AI</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Le coach virtuel 3D qui réinvente l'expérience sport et bien-être dans l'hôtellerie haut de gamme.
              Personnalisation, interactivité et expertise, au service de vos clients.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solution</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/solution" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link 
                  to="/avantages" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Avantages
                </Link>
              </li>
              <li>
                <Link 
                  to="/demo" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Demander une démo
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
                         <div className="space-y-3">
               <div className="flex items-center space-x-3">
                 <Mail className="w-4 h-4 text-accent" />
                 <a 
                   href="mailto:natan.lasar@mikevirtualcoach.com"
                   className="text-primary-foreground/80 hover:text-accent transition-colors"
                 >
                   natan.lasar@mikevirtualcoach.com
                 </a>
               </div>
               <div className="flex items-center space-x-3">
                 <Phone className="w-4 h-4 text-accent" />
                 <a 
                   href="tel:+33658161692"
                   className="text-primary-foreground/80 hover:text-accent transition-colors"
                 >
                   +33 6 58 16 16 92
                 </a>
               </div>
               <div className="flex items-center space-x-3">
                 <MapPin className="w-4 h-4 text-accent" />
                 <span className="text-primary-foreground/80">
                   61 rue de Lyon, 75012 Paris France
                 </span>
               </div>
             </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 YourCoach AI. Tous droits réservés. — édité par MikeVirtualCoach (SAS)
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link 
              to="/terms" 
              className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
            >
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;