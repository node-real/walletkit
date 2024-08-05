import { useWalletConfig } from '@/core/hooks/useWalletConfig';
import { Link } from '@/ui/base/components/Link';
import { ModalBody } from '@/ui/base/components/Modal/ModalBody';
import { ModalFooter } from '@/ui/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/ui/base/components/Modal/ModalHeader';
import { ForwardIcon } from '@/ui/base/icons/ForwardIcon';
import { cx } from '@/ui/base/utils/css';
import { CustomQRCode } from '@/ui/components/CustomQRCode';
import { useWalletLogos } from '@/ui/hooks/useWalletLogos';
import { clsContainer, clsOfficialButton } from './styles.css';
import { useUIProviderConfig } from '@/ui-data/useUIProviderConfig';
import { useUIConnectWithQRCodeView } from '@/ui-data/useUIConnectWithQRCodeView';
import { useWalletKit } from '@/core/components/WalletKitProvider/context';

export function ConnectWithQRCode() {
  const { options } = useWalletKit();
  const { qrCodeUri, onClickOpenWcModal } = useUIConnectWithQRCodeView();
  const { walletId } = useUIProviderConfig();

  const wallet = useWalletConfig(walletId);
  const logos = useWalletLogos(wallet?.logos);

  return (
    <>
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={qrCodeUri} logo={logos.default} />
      </ModalBody>

      {walletId === 'walletConnect' && !options.hideOfficialWalletConnectCTA && (
        <ModalFooter>
          <Link
            className={cx('wk-official-wc-button', clsOfficialButton)}
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
