import { useEffect } from 'react';
import { Link } from '@/core/base/components/Link';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { ForwardIcon } from '@/core/base/icons/ForwardIcon';
import { CopyIcon } from '@/core/base/icons/CopyIcon';
import { SuccessIcon } from '@/core/base/icons/SuccessIcon';
import { cx } from '@/core/base/utils/css';
import { CustomQRCode } from '@/core/components/CustomQRCode';
import { useClipboard } from '@/core/base/hooks/useClipboard';
import { useWalletLogos } from '@/core/hooks/useWalletLogos';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { clsContainer, clsOfficialButton, clsCopyButton, clsFooter } from './styles.css';
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
  const { onCopy, hasCopied, setValue } = useClipboard(qrCodeUri ?? '');

  useEffect(() => {
    if (qrCodeUri) {
      setValue(qrCodeUri);
    }
  }, [qrCodeUri, setValue]);

  useAutoCloseConnectModal(isConnected, address);

  const showFooter = !!qrCodeUri || (isWalletConnect && !options?.hideOfficialWalletConnectCTA);

  return (
    <>
      <ModalHeader>Scan with your phone</ModalHeader>

      <ModalBody className={cx('wk-scan-qrcode', clsContainer)}>
        <CustomQRCode value={qrCodeUri} logo={logos.default} />
      </ModalBody>

      {showFooter && (
        <ModalFooter className={clsFooter}>
          {!!qrCodeUri && (
            <button className={cx('wk-copy-link-button', clsCopyButton)} onClick={onCopy}>
              {hasCopied ? (
                <>
                  <SuccessIcon width={16} height={16} />
                  Copied
                </>
              ) : (
                <>
                  <CopyIcon width={16} height={16} />
                  Copy Link
                </>
              )}
            </button>
          )}
          {isWalletConnect && !options?.hideOfficialWalletConnectCTA && (
            <Link
              className={cx('wk-official-wc-button', clsOfficialButton)}
              onClick={onClickOpenWcModal}
            >
              Open the official WalletConnect modal
              <ForwardIcon />
            </Link>
          )}
        </ModalFooter>
      )}
    </>
  );
}
