import { Link } from '@/core/base/components/Link';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { ForwardIcon } from '@/core/base/icons/ForwardIcon';
import { cx } from '@/core/base/utils/css';
import { CustomQRCode } from '@/core/components/CustomQRCode';
import { useWalletLogos } from '@/core/hooks/useWalletLogos';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { clsContainer, clsOfficialButton } from './styles.css';
import { useAutoCloseConnectModal } from '@/core/hooks/useAutoCloseConnectModal';
import { BaseWallet } from '@/core/configs/types';

export interface TemplateQRCodeViewProps {
  wallet: BaseWallet;
  qrCodeUri?: string;
  onClickOpenWcModal?: () => void;
  isConnected: boolean;
  isWalletConnect: boolean;
  address: string | undefined | null;
}

export function TemplateQRCodeView(props: TemplateQRCodeViewProps) {
  const { wallet, qrCodeUri, onClickOpenWcModal, isConnected, isWalletConnect, address } = props;

  const { options } = useWalletKit();
  const logos = useWalletLogos(wallet?.logos);

  useAutoCloseConnectModal(isConnected, address);

  return (
    <>
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={qrCodeUri} logo={logos.default} />
      </ModalBody>

      {isWalletConnect && !options?.hideOfficialWalletConnectCTA && (
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
