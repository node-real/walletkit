import { useEffect, useState } from 'react';
import { clsIconWrapper, clsDescWrapper, clsContainer } from './styles.css';
import { ErrorIcon } from '@/base/icons/ErrorIcon';
import { InfoIcon } from '@/base/icons/InfoIcon';
import { ToastOptions } from '.';
import { Box } from '../Box';
import { Transition } from '../Transition';
import { ToastManager } from './ToastManager';

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
    <Transition in={show} variant="toast-slide" onExit={onExit}>
      <Box className="wk-toast">
        <Box className={clsContainer} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Box className={clsIconWrapper}>{iconMap[variant]}</Box>
          <Box className={clsDescWrapper}>{description}</Box>
        </Box>
      </Box>
    </Transition>
  );
}
