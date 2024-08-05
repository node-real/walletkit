import { useEffect, useState } from 'react';
import { Box } from '../Box';
import { clsIconWrapper, clsDescWrapper, clsContainer } from './styles.css';
import { ToastOptions } from '.';
import { Transition } from '../Transition';
import { ToastManager } from './ToastManager';
import { ErrorIcon } from '../../icons/ErrorIcon';
import { InfoIcon } from '../../icons/InfoIcon';

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
