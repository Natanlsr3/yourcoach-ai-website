# Assets & contenu retirés du Hero — à réutiliser

## Vidéo coach
- Fichier : `/public/Character_turns_around_202508111552.mp4`
- Usage original : lecteur vidéo dans un smartphone mockup, lecture auto avec fallback manuel (bouton Play)
- Comportement : muted au départ, unmuted après click, freeze sur dernière frame + affiche coach.jpg à la fin
- À réutiliser sur : page /solution ou page /about pour présenter le produit

## Image fallback
- Fichier : `/public/coach.jpg`
- Usage original : affiché après la fin de la vidéo, cliquable pour relancer la vidéo
- Alt : "Coach YourCoach AI"

## Smartphone mockup
- Structure : div 320px × 600px, border-radius 3rem, fond blanc, inner gradient bg-gradient-primary, border-radius 2.5rem
- Contient la vidéo + image fallback
- À réutiliser pour : démo produit ou section "comment ça marche"

## Texte supprimé du Hero
- Sous-titre accroche : "Studio spécialisé Fitness & Wellness Tech Premium"
- Description : "Nous concevons les solutions IA qui transforment l'expérience sport & bien-être des établissements d'exception."
- Bouton secondaire : "Nous contacter" → /contact

## Code du player vidéo (à copier-coller)

```tsx
import { useRef, useState } from "react";
import { Play } from "lucide-react";

const videoRef = useRef(null);
const [showPlayButton, setShowPlayButton] = useState(true);
const [videoLoaded, setVideoLoaded] = useState(false);

// JSX :
<div className="w-80 h-[600px] bg-primary-foreground rounded-[3rem] p-2 shadow-strong">
  <div className="w-full h-full bg-gradient-primary rounded-[2.5rem] relative overflow-hidden">
    <video
      ref={videoRef}
      playsInline
      preload="auto"
      muted
      className="w-full h-full object-cover rounded-[2rem] scale-98"
      aria-hidden="true"
      onCanPlay={() => setVideoLoaded(true)}
      onTimeUpdate={(e) => {
        const video = e.target as HTMLVideoElement;
        if (video.duration && video.currentTime >= video.duration - 0.2) {
          video.style.display = "none";
          const img = video.parentNode?.querySelector("img") as HTMLImageElement | null;
          if (img) img.style.display = "block";
        }
      }}
    >
      <source src="/Character_turns_around_202508111552.mp4" type="video/mp4" />
    </video>

    {showPlayButton && (
      <button
        onClick={() => {
          if (videoRef.current) {
            const video = videoRef.current as HTMLVideoElement;
            video.muted = true;
            video.play().then(() => {
              video.muted = false;
              setShowPlayButton(false);
            }).catch(() => {
              console.log("Erreur de lancement manuel");
            });
          }
        }}
        className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-[2rem] text-white hover:bg-black/80 transition-all duration-300"
      >
        <div className="text-center">
          <Play className="w-20 h-20 mx-auto mb-2" />
          <p className="text-sm font-medium">Cliquez pour lancer</p>
        </div>
      </button>
    )}

    <img
      src="/coach.jpg"
      alt="Coach YourCoach AI"
      className="w-full h-full object-cover rounded-[2rem] scale-105 hidden cursor-pointer"
      onClick={(e) => {
        const img = e.target as HTMLImageElement;
        const video = img.parentNode?.querySelector("video") as HTMLVideoElement | null;
        if (video) {
          img.style.display = "none";
          video.style.display = "block";
          video.currentTime = 0;
          video.play();
        }
      }}
    />
  </div>
</div>
```
