import { Link } from '@/base/components/Link';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { ForwardIcon } from '@/base/icons/ForwardIcon';
import { CustomQRCode } from '@/components/CustomQRCode';
import { useWalletConfig } from '@/hooks/useWalletConfig';
import { useWalletConnectModal } from '@/hooks/useWalletConnectModal';
import { useWalletLogos } from '@/hooks/useWalletLogos';
import { cx } from '@/index';
import { clsContainer, clsOfficialButton } from './styles.css';
import { isWalletConnectConnector } from '@/wallets';
import { useQRCodeUri } from '@/hooks/useQRCodeUri';
import { useWalletKitContext } from '@/components/WalletKitProvider/context';

export function ConnectWithQRCode() {
  const { selectedConnector, options } = useWalletKitContext();

  const wallet = useWalletConfig(selectedConnector);
  const logos = useWalletLogos(wallet.logos);

  const wcUri = useQRCodeUri();
  const { onOpenWcModal } = useWalletConnectModal();
  const isWalletConnect = isWalletConnectConnector(selectedConnector);
  const qrCodeUri = wcUri && (wallet.getQRCodeUri?.(wcUri) ?? wcUri);

  return (
    <>
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={qrCodeUri} logo={logos?.default} />
      </ModalBody>

      {isWalletConnect && !options.hideOfficialWalletConnectCTA && (
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
