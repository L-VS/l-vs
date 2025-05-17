import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Cette composante détecte une séquence de touches spécifique
// pour débloquer l'accès administrateur secret
export function SecretKeyHandler() {
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Séquence de touches à détecter: 'lvs'
    let keySequence: string[] = [];
    const secretCode = ['l', 'v', 's'];
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ajouter la touche à la séquence
      keySequence.push(event.key.toLowerCase());
      
      // Garder seulement les 3 dernières touches
      if (keySequence.length > 3) {
        keySequence = keySequence.slice(-3);
      }
      
      // Vérifier si la séquence correspond au code secret
      const isMatchingSequence = keySequence.join('') === secretCode.join('');
      
      // Rediriger vers la page secrète si la séquence correspond
      if (isMatchingSequence) {
        navigate('/lvs-secret-access');
      }
    };
    
    // Ajouter l'écouteur d'événements
    window.addEventListener('keydown', handleKeyDown);
    
    // Nettoyer l'écouteur d'événements à la destruction du composant
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
  
  // Ce composant ne rend rien visuellement
  return null;
}