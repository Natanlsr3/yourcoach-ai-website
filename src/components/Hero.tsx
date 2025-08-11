import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogoIcon } from "@/components/ui/logo-icon";
import { Play, ArrowRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const videoRef = useRef(null);

  const [showPlayButton, setShowPlayButton] = useState(true); // Bouton visible par défaut
  const [videoLoaded, setVideoLoaded] = useState(false);



  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Espacement initial */}
            <div className="mb-8 md:mb-12"></div>
            
            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-12 animate-slide-up whitespace-nowrap">
              <span className="block">Le Coach Sport/Bien-être</span>
              <span className="block"><span className="text-accent">3D</span> Révolutionnaire</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-16 max-w-2xl animate-slide-up">
              YourCoach AI transforme l'accompagnement de vos clients avec un coaching IA personnalisé, accessible 24h/24 sur smartphone
            </p>

            {/* Bloc découverte */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 mb-12 animate-scale-in">
              <p className="text-primary-foreground/90 mb-6 text-center">
                Découvrez en quelques secondes comment YourCoach AI peut enrichir l'expérience de vos clients, sans coût de personnel supplémentaire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link to="/solution">Notre Solution</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link to="/avantages">Avantages</Link>
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold shadow-accent"
              >
                <Link to="/demo" className="flex items-center space-x-2">
                  <span>Voir la démo interactive</span>
                  <Play className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Parler à un expert</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 pt-12 border-t border-primary-foreground/20 animate-fade-in">
              <p className="text-primary-foreground/60 text-sm mb-4">
                Déjà adopté par des établissements de prestige
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-60">
                {/* Placeholder pour logos partenaires */}
                <div className="w-20 h-8 bg-primary-foreground/20 rounded"></div>
                <div className="w-20 h-8 bg-primary-foreground/20 rounded"></div>
                <div className="w-20 h-8 bg-primary-foreground/20 rounded"></div>
              </div>
            </div>
          </div>

                      {/* Visual */}
          <div className="relative animate-scale-in">
            {/* Espacement initial pour décaler le téléphone */}
            <div className="mb-8 md:mb-12"></div>
            
            <div className="relative">
              {/* Smartphone mockup */}
              <div className="mr-0 lg:mr-16 ml-auto w-80 h-[600px] bg-primary-foreground rounded-[3rem] p-2 shadow-strong">
                <div className="w-full h-full bg-gradient-primary rounded-[2.5rem] relative overflow-hidden">
                  {/* Vidéo MP4 dans l'écran du téléphone */}
                  <video
                    ref={videoRef}
                    playsInline
                    preload="auto"
                    muted
                    className="w-full h-full object-cover rounded-[2rem] scale-98"
                    aria-hidden="true"
                    onLoadStart={(e) => {
                      console.log('Vidéo commence à charger');
                    }}
                    onCanPlay={(e) => {
                      console.log('Vidéo peut être jouée');
                      setVideoLoaded(true);
                    }}
                    onTimeUpdate={(e) => {
                      const video = e.target;
                      if (video.duration && video.currentTime >= video.duration - 0.2) {
                        video.style.display = 'none';
                        const img = video.parentNode.querySelector('img');
                        if (img) img.style.display = 'block';
                      }
                    }}
                  >
                    <source src="/Character_turns_around_202508111552.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Bouton play par défaut */}
                  {showPlayButton && (
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          const video = videoRef.current;
                          video.muted = true;
                          video.play().then(() => {
                            video.muted = false;
                            setShowPlayButton(false);
                          }).catch(() => {
                            console.log('Erreur de lancement manuel');
                          });
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-[2rem] text-white hover:bg-black/80 transition-all duration-300 transform hover:scale-110"
                    >
                      <div className="text-center">
                        <Play className="w-20 h-20 mx-auto mb-2" />
                        <p className="text-sm font-medium">Cliquez pour lancer</p>
                      </div>
                    </button>
                  )}
                  
                  {/* Image de fallback après la vidéo */}
                  <img
                    src="/coach.jpg"
                    alt="Coach YourCoach AI"
                    className="w-full h-full object-cover rounded-[2rem] scale-105 hidden cursor-pointer"
                    onClick={(e) => {
                      const img = e.target;
                      const video = img.parentNode.querySelector('video');
                      if (video) {
                        img.style.display = 'none';
                        video.style.display = 'block';
                        video.currentTime = 0;
                        video.play();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;