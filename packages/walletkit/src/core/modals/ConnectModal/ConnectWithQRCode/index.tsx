import { Link } from '@/core/base/components/Link';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { ForwardIcon } from '@/core/base/icons/ForwardIcon';
import { cx } from '@/core/base/utils/css';
import { CustomQRCode } from '@/core/components/CustomQRCode';
import { BaseWallet } from '@/core/configs/wallets/types';
import { useWalletLogos } from '@/core/hooks/useWalletLogos';
import { useConfig } from '@/core/providers/WalletKitProvider/context';
import { clsContainer, clsOfficialButton } from './styles.css';
import { useAutoCloseConnectModal } from '@/core/hooks/useAutoCloseConnectModal';

export interface ConnectWithQRCodeProps {
  wallet: BaseWallet;
  qrCodeUri: string;
  onClickOpenWcModal: () => void;
  isConnected: boolean;
}

export function ConnectWithQRCode(props: ConnectWithQRCodeProps) {
  const { wallet, qrCodeUri, onClickOpenWcModal, isConnected } = props;

  const config = useConfig();
  const logos = useWalletLogos(wallet?.logos);

  useAutoCloseConnectModal(isConnected);

  return (
    <>
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={qrCodeUri} logo={logos.default} />
      </ModalBody>

      {wallet.id === 'walletConnect' && !config.appearance?.hideOfficialWalletConnectCTA && (
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
