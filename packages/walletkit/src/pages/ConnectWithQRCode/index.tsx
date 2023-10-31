import { useCallback } from 'react';
import { Navbar } from '../../components/Navbar';
import { QRCode } from '../../components/QRCode';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Box } from '../../components/base/Box';
import { Link } from '../../components/base/Link';
// import { Link } from '../../components/base/Link';
import { ModalHeader } from '../../components/base/Modal/ModalHeader';
import { useWalletConfig } from '../../hooks/useWalletConfig';
import { useWalletConnectModal } from '../../hooks/useWalletConnectModal';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';
import { cx } from '../../utils/css';
import { officialButton, qrCodeContainer, qrCodeWrapper } from './styles.css';
import { MODAL_AUTO_CLOSE_DELAY } from '../../constants/common';
import { ForwardIcon } from '../../components/base/icons/ForwardIcon';

export function ConnectWithQRCodePage() {
  const { selectedConnector, onClose } = useWalletKitContext();

  const wallet = useWalletConfig(selectedConnector);
  const { wcUri } = useWalletConnectUri();

  const { onOpenWcModal } = useWalletConnectModal();

  const logo = wallet?.logos?.mobile ?? wallet?.logos?.default;

  const onClickOpenWcModal = useCallback(() => {
    onOpenWcModal();
    setTimeout(() => {
      onClose();
    }, MODAL_AUTO_CLOSE_DELAY);
  }, [onClose, onOpenWcModal]);

  return (
    <>
      <Navbar showBack />
      <ModalHeader>Scan with your phone</ModalHeader>

      <Box className={cx('wk-modal-body', 'wk-wc-qrcode', qrCodeContainer)}>
        <Box className={cx('wk-qrcode-wrapper', qrCodeWrapper)}>
          {wcUri && <QRCode uri={wcUri} logo={logo} size={212} />}
        </Box>

        <Link className={cx('wk-official-button', officialButton)} onClick={onClickOpenWcModal}>
          Open the official WalletConnect modal
          <ForwardIcon />
        </Link>
      </Box>
    </>
  );
}
