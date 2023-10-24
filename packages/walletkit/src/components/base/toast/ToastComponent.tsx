import { useEffect, useState } from 'react';
import { ToastOptions } from '.';
import { ToastManager } from './ToastManager';
import { Box } from '../Box';
import { InfoIcon } from '../../icons/InfoIcon';
import { ErrorIcon } from '../../icons/ErrorIcon';
import { container, descWrapper, iconWrapper } from './styles.css';
import { Animation } from '../Animation';

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
        <Box className={container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Box className={iconWrapper}>{iconMap[variant]}</Box>
          <Box className={descWrapper}>{description}</Box>
        </Box>
      </Box>
    </Animation>
  );
}
