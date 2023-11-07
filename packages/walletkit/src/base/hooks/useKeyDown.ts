import { useEffect } from 'react';

export interface UseKeyDownProps {
  key?: string;
  enabled?: boolean;
  handler?: () => void;
}

export function useKeyDown(props: UseKeyDownProps = {}) {
  const { key = 'Enter', enabled = true, handler } = props;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onEnter = (e: KeyboardEvent) => {
      if (e.code === key) {
        handler?.();
      }
    };

    window.addEventListener('keydown', onEnter);
    return () => {
      window.removeEventListener('keydown', onEnter);
    };
  }, [enabled, handler, key]);
}
