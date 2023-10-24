import { useEffect } from 'react';
import { ToastOptions } from '.';
import { ToastManager } from './ToastManager';
import { Box } from '../base/Box';
import { InfoIcon } from '../icons/InfoIcon';
import { ErrorIcon } from '../icons/ErrorIcon';
import { container, descWrapper, iconWrapper } from './styles.css';

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
    <Box className={container}>
      <Box className={iconWrapper}>{iconMap[variant]}</Box>
      <Box className={descWrapper}>{description}</Box>
    </Box>
  );
}
