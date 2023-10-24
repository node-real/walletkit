import { useEffect } from 'react';
import { ToastOptions } from '.';
import { ToastManager } from './ToastManager';
import { Box } from '../base/Box';
import { styles } from './styles';
import { InfoIcon } from '../icons/InfoIcon';
import { ErrorIcon } from '../icons/ErrorIcon';

const iconMap: Record<string, React.ReactNode> = {
  info: <InfoIcon />,
  error: <ErrorIcon />,
};

export function ToastComponent(props: ToastOptions) {
  const { variant = 'info', description, duration, toastId } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      ToastManager.remove(toastId);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, toastId]);

  return (
    <Box css={styles.container}>
      <Box css={styles.icon}>{iconMap[variant]}</Box>
      <Box css={styles.description}>{description}</Box>
    </Box>
  );
}
