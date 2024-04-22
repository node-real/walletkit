import { BoxProps, Box } from '@/base/components/Box';
import { IconButton } from '@/base/components/IconButton';
import { BackIcon } from '@/base/icons/BackIcon';
import { CloseIcon } from '@/base/icons/CloseIcon';
import { cx } from '@/index';
import { clsNavbar } from './styles.css';
import { useRouter } from '../RouteProvider/context';

export interface NavbarProps extends BoxProps {
  onClose?: () => void;
}

export function Navbar(props: NavbarProps) {
  const { className, onClose, ...restProps } = props;

  const { history, back } = useRouter();

  const showBack = history.length > 1;

  return (
    <Box className={cx('wk-navbar', clsNavbar, className)} {...restProps}>
      {showBack && (
        <IconButton className="wk-navbar-back-button" icon={<BackIcon />} onClick={back} />
      )}
      <Box style={{ flex: 1 }} />
      <IconButton className="wk-navbar-close-button" icon={<CloseIcon />} onClick={onClose} />
    </Box>
  );
}
