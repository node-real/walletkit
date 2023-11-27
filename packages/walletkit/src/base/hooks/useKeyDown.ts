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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === key) {
        handler?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [enabled, handler, key]);
}
