import { useEffect, useState } from 'react';
import { ToastOptions } from '.';
import { ToastManager } from './ToastManager';
import { Box } from '../Box';
import { clsContainer, clsDescWrapper, clsIconWrapper } from './styles.css';
import { Animation } from '../Animation';
import { InfoIcon } from '../../icons/InfoIcon';
import { ErrorIcon } from '../../icons/ErrorIcon';

const iconMap: Record<string, React.ReactNode> = {
  info: <InfoIcon />,
  error: <ErrorIcon />,
};

export function ToastComponent(props: ToastOptions) {
  const { variant = 'info', description, duration, toastId } = props;

  const [show, setShow] = useState(true);
  const [delay, setDelay] = useState(duration);

  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => {
        setShow(false);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay]);

  const onExit = () => {
    ToastManager.remove(toastId);
  };

  const onMouseEnter = () => {
    setDelay(undefined);
  };

  const onMouseLeave = () => {
    setDelay(duration);
  };

  return (
    <Animation in={show} variant="toast-slide" onExit={onExit}>
      <Box className="wk-toast">
        <Box className={clsContainer} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Box className={clsIconWrapper}>{iconMap[variant]}</Box>
          <Box className={clsDescWrapper}>{description}</Box>
        </Box>
      </Box>
    </Animation>
  );
}
