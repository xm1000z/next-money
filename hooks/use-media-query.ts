import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Establecer el estado inicial
    setMatches(media.matches);

    // Definir el callback
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Añadir el listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
