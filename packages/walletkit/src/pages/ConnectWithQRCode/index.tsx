import { useCallback } from 'react';
import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Link } from '../../base/Link';
import { ModalHeader } from '../../base/Modal/ModalHeader';
import { useWalletConfig } from '../../hooks/useWalletConfig';
import { useWalletConnectModal } from '../../hooks/useWalletConnectModal';
import { cx } from '../../utils/css';
import { clsContainer, clsOfficialButton } from './styles.css';
import { MODAL_AUTO_CLOSE_DELAY } from '../../constants/common';
import { ForwardIcon } from '../../base/icons/ForwardIcon';
import { ModalBody } from '../../base/Modal/ModalBody';
import { CustomQRCode } from '../../components/CustomQRCode';
import { useWalletConnectUri } from '../../components/WalletConnectUriProvider/context';
import { ModalFooter } from '../../base/Modal/ModalFooter';
import { useWalletLogos } from '../../hooks/useWalletLogos';

export function ConnectWithQRCodePage() {
  const { selectedConnector, onClose, options } = useWalletKitContext();

  const wallet = useWalletConfig(selectedConnector);
  const logos = useWalletLogos(wallet.logos);

  const { wcUri } = useWalletConnectUri();
  const { onOpenWcModal } = useWalletConnectModal();

  const onClickOpenWcModal = useCallback(() => {
    onOpenWcModal();
    setTimeout(() => {
      onClose();
    }, MODAL_AUTO_CLOSE_DELAY);
  }, [onClose, onOpenWcModal]);

  const logo = logos?.mobile ?? logos?.default;

  return (
    <>
      <Navbar showBack />
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={wcUri} logo={logo} />
      </ModalBody>

      {!options.hideOfficialWalletConnectCTA && (
        <ModalFooter>
          <Link
            className={cx('wk-official-button', clsOfficialButton)}
            onClick={onClickOpenWcModal}
          >
            Open the official WalletConnect modal
            <ForwardIcon />
          </Link>
        </ModalFooter>
      )}
    </>
  );
}
