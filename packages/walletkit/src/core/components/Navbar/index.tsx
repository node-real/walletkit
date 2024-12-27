import { BoxProps, Box } from '@/core/base/components/Box';
import { IconButton } from '@/core/base/components/IconButton';
import { BackIcon } from '@/core/base/icons/BackIcon';
import { CloseIcon } from '@/core/base/icons/CloseIcon';
import { cx } from '@/core/base/utils/css';
import { clsNavbar } from './styles.css';

export interface NavbarProps extends BoxProps {
  showBack?: boolean;
  showClose?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

export function Navbar(props: NavbarProps) {
  const { className, showBack, showClose = true, onBack, onClose, ...restProps } = props;

  return (
    <Box className={cx('wk-navbar', clsNavbar, className)} {...restProps}>
      {showBack && (
        <IconButton className="wk-navbar-back-button" icon={<BackIcon />} onClick={onBack} />
      )}
      <Box style={{ flex: 1 }} />
      {showClose && (
        <IconButton className="wk-navbar-close-button" icon={<CloseIcon />} onClick={onClose} />
      )}
    </Box>
  );
}
