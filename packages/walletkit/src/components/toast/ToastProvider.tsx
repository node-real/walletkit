import { useEffect, useState } from 'react';
import { Portal } from '../base/Portal';
import { ToastManager } from './ToastManager';
import { ToastOptions } from '.';
import { ToastComponent } from './ToastComponent';
import { Box } from '../base/Box';
import { styles } from './styles';

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
          <Box css={styles.root}>
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
