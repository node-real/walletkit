import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Link } from '../../base/components/Link';
import { ModalHeader } from '../../base/components/Modal/ModalHeader';
import { useWalletConfig } from '../../hooks/useWalletConfig';
import { useWalletConnectModal } from '../../hooks/useWalletConnectModal';
import { cx } from '../../base/utils/css';
import { clsContainer, clsOfficialButton } from './styles.css';
import { ForwardIcon } from '../../base/icons/ForwardIcon';
import { ModalBody } from '../../base/components/Modal/ModalBody';
import { CustomQRCode } from '../../components/CustomQRCode';
import { useWalletConnectUri } from '../../components/WalletConnectUriProvider/context';
import { ModalFooter } from '../../base/components/Modal/ModalFooter';
import { useWalletLogos } from '../../hooks/useWalletLogos';

export function ConnectWithQRCodePage() {
  const { selectedConnector, options } = useWalletKitContext();

  const wallet = useWalletConfig(selectedConnector);
  const logos = useWalletLogos(wallet.logos);

  const { wcUri } = useWalletConnectUri();
  const { onOpenWcModal } = useWalletConnectModal();

  return (
    <>
      <Navbar showBack />
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={wcUri} logo={logos?.default} />
      </ModalBody>

      {!options.hideOfficialWalletConnectCTA && (
        <ModalFooter>
          <Link className={cx('wk-official-wc-button', clsOfficialButton)} onClick={onOpenWcModal}>
            Open the official WalletConnect modal
            <ForwardIcon />
          </Link>
        </ModalFooter>
      )}
    </>
  );
}
