import { cx } from '../../utils/css';
import { useRouter } from '../RouteProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { Box, BoxProps } from '../../base/Box';
import { IconButton } from '../../base/IconButton';
import { BackIcon } from '../../base/icons/BackIcon';
import { CloseIcon } from '../../base/icons/CloseIcon';
import { clsNavbar } from './styles.css';

export interface NavbarProps extends BoxProps {
  showBack?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

export function Navbar(props: NavbarProps) {
  const { className, showBack = false, onBack, onClose, ...restProps } = props;

  const { onClose: onCloseModal } = useWalletKitContext();
  const router = useRouter();

  const onBeforeBack = () => {
    onBack?.();
    router.back();
  };

  const onBeforeClose = () => {
    onClose?.();
    onCloseModal();
  };

  return (
    <Box className={cx('wk-navbar', clsNavbar, className)} {...restProps}>
      {showBack && (
        <IconButton className="wk-back-button" icon={<BackIcon />} onClick={onBeforeBack} />
      )}
      <Box style={{ flex: 1 }} />
      <IconButton className="wk-close-button" icon={<CloseIcon />} onClick={onBeforeClose} />
    </Box>
  );
}
