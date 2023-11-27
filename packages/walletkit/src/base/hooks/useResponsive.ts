import { useEffect, useState } from 'react';
import { MOBILE_MEDIA } from '../constant';

export function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const isMatched = window.matchMedia(query).matches;
      setIsMatched(isMatched);
    };

    onChange();

    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener('change', onChange);
    return () => {
      matchMedia.removeEventListener('change', onChange);
    };
  }, [query]);

  return isMatched;
}

export const useResponsive = () => {
  const isMobileLayout = useMediaQuery(MOBILE_MEDIA);

  return {
    isMobileLayout,
  };
};
