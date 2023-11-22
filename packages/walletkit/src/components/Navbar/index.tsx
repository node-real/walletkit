import { BoxProps, Box } from '@/base/components/Box';
import { IconButton } from '@/base/components/IconButton';
import { BackIcon } from '@/base/icons/BackIcon';
import { CloseIcon } from '@/base/icons/CloseIcon';
import { cx } from '@/index';
import { useModal } from '../ModalProvider/context';
import { useRouter } from '../RouteProvider/context';
import { clsNavbar } from './styles.css';

export interface NavbarProps extends BoxProps {
  showBack?: boolean;
  onBack?: () => void;
}

export function Navbar(props: NavbarProps) {
  const { className, showBack = false, onBack, ...restProps } = props;

  const { onClose: onCloseModal } = useModal();
  const router = useRouter();

  const onBeforeBack = () => {
    onBack?.();
    router.back();
  };

  return (
    <Box className={cx('wk-navbar', clsNavbar, className)} {...restProps}>
      {showBack && (
        <IconButton className="wk-navbar-back-button" icon={<BackIcon />} onClick={onBeforeBack} />
      )}
      <Box style={{ flex: 1 }} />
      <IconButton className="wk-navbar-close-button" icon={<CloseIcon />} onClick={onCloseModal} />
    </Box>
  );
}
