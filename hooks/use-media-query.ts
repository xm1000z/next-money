import { useEffect, useState } from "react";

type MediaQueryProps = {
  isMobile: boolean;
  isSm: boolean;
  isTablet: boolean;
};

// Función sobrecargada para manejar ambos casos
export function useMediaQuery(): MediaQueryProps;
export function useMediaQuery(query: string): boolean;
export function useMediaQuery(query?: string) {
  if (query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  }

  const [matches, setMatches] = useState<MediaQueryProps>({
    isMobile: false,
    isSm: false,
    isTablet: false,
  });

  useEffect(() => {
    const updateMatches = () => {
      setMatches({
        isMobile: window.matchMedia("(max-width: 480px)").matches,
        isSm: window.matchMedia("(max-width: 768px)").matches,
        isTablet: window.matchMedia("(max-width: 1024px)").matches,
      });
    };

    updateMatches();
    window.addEventListener("resize", updateMatches);
    return () => window.removeEventListener("resize", updateMatches);
  }, []);

  return matches;
}
