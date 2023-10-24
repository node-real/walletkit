import { useEffect, useState } from 'react';
import { Portal } from '../Portal';
import { ToastManager } from './ToastManager';
import { ToastOptions } from '.';
import { ToastComponent } from './ToastComponent';
import { Box } from '../Box';
import { toastRoot } from './styles.css';

export const ToastProvider = () => {
  const [toastList, setToastList] = useState<ToastOptions[]>([]);

  useEffect(() => {
    const update = (newList: ToastOptions[]) => {
      setToastList(newList);
    };

    ToastManager.subscribe(update);
    return () => {
      ToastManager.unsubscribe(update);
    };
  }, []);

  return (
    <>
      {toastList.length > 0 && (
        <Portal>
          <Box className={toastRoot}>
            {toastList.map((item) => (
              <ToastComponent key={item.toastId} {...item} />
            ))}
          </Box>
        </Portal>
      )}
    </>
  );
};

ToastProvider.displayName = 'ToastProvider';
