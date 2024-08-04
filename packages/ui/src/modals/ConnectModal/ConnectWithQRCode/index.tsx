import { Link } from '@/base/components/Link';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { ForwardIcon } from '@/base/icons/ForwardIcon';
import { CustomQRCode } from '@/components/CustomQRCode';
import { cx } from '@/index';
import { clsContainer, clsOfficialButton } from './styles.css';
import { useDataSource } from '@/components/DataSourceProvider/context';
import { useWalletConfig } from '@/hooks/useWalletConfig';
import { useWalletLogos } from '@/hooks/useWalletLogos';

export function ConnectWithQRCode() {
  const { options, useConnectWithQRCodeView, useProvider } = useDataSource();
  const { qrCodeUri, onClickOpenWcModal } = useConnectWithQRCodeView();
  const { walletId } = useProvider();

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
