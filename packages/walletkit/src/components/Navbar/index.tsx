import { useRouter } from '../RouteProvider/context';
import { useWalletKitContext } from '../WalletKitProvider/context';
import { Box, BoxProps } from '../base/Box';
import { Flex } from '../base/Flex';
import { IconButton } from '../base/IconButton';
import { BackIcon } from '../icons/BackIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { navbar } from './styles';

export interface NavbarProps extends BoxProps {
  showBack?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

export function Navbar(props: NavbarProps) {
  const { showBack = false, onBack, onClose, ...restProps } = props;

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
    <Box className="wk-navbar" css={navbar} {...restProps}>
      {showBack && (
        <IconButton className="wk-back-button" icon={<BackIcon />} onClick={onBeforeBack} />
      )}
      <Flex css={{ flex: 1 }} />
      <IconButton className="wk-close-button" icon={<CloseIcon />} onClick={onBeforeClose} />
    </Box>
  );
}
