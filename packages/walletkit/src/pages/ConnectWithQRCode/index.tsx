import { useCallback } from 'react';
import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Link } from '../../components/base/Link';
import { ModalHeader } from '../../components/base/Modal/ModalHeader';
import { useWalletConfig } from '../../hooks/useWalletConfig';
import { useWalletConnectModal } from '../../hooks/useWalletConnectModal';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';
import { cx } from '../../utils/css';
import { container, officialButton } from './styles.css';
import { MODAL_AUTO_CLOSE_DELAY } from '../../constants/common';
import { ForwardIcon } from '../../components/base/icons/ForwardIcon';
import { ModalBody } from '../../components/base/Modal/ModalBody';
import { CustomQRCode } from '../../components/CustomQRCode';

export function ConnectWithQRCodePage() {
  const { selectedConnector, onClose, options } = useWalletKitContext();

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

      <ModalBody className={cx('wk-scan-qrcode', container)}>
        <CustomQRCode value={wcUri} logo={logo} />

        {!options.hideOfficialWalletConnectCTA && (
          <Link className={cx('wk-official-button', officialButton)} onClick={onClickOpenWcModal}>
            Open the official WalletConnect modal
            <ForwardIcon />
          </Link>
        )}
      </ModalBody>
    </>
  );
}
