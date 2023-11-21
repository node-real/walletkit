import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const isMatched = window.matchMedia(query).matches;
      setIsMatched(isMatched);
    };

    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener('change', onChange);
    return () => {
      matchMedia.removeEventListener('change', onChange);
    };
  }, [query]);

  return isMatched;
}

export const useResponsive = () => {
  const isMobileLayout = useMediaQuery('(min-width: 0px) and (max-width: 767px)');

  return {
    isMobileLayout,
  };
};
