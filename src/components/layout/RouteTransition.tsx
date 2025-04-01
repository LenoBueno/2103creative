import { useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { ReactNode, useEffect, useState } from 'react';

interface RouteTransitionProps {
  children: ReactNode;
}

const RouteTransition = ({ children }: RouteTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  
  useEffect(() => {
    // Se a localização mudou
    if (location.pathname !== displayLocation.pathname) {
      // Iniciar a transição de saída
      setTransitionStage("fadeOut");
      
      // Atraso pequeno antes de mudar para a nova rota
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 150); // Metade da duração da transição
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);
  
  return (
    <PageTransition className={`transition-all duration-300 ${
      transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
    }`}>
      {children}
    </PageTransition>
  );
};

export default RouteTransition;
