import { useEffect } from 'react';

export function useScrollLock(isLocked = false) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}
