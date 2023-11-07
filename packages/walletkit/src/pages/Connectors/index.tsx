import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Link } from '../../base/components/Link';
import { ModalBody } from '../../base/components/Modal/ModalBody';
import { ModalFooter } from '../../base/components/Modal/ModalFooter';
import { ModalHeader } from '../../base/components/Modal/ModalHeader';
import { WalletIcon } from '../../base/icons/WalletIcon';

import { useConnectors } from '../../hooks/useConnectors';
import { cx } from '../../base/utils/css';
import { WalletOption } from './WalletOption';
import { clsDownloadLink, clsWallets } from './styles.css';

export function ConnectorsPage() {
  const connectors = useConnectors();
  const { options } = useWalletKitContext();

  return (
    <>
      <Navbar />
      <ModalHeader>Connect Wallet</ModalHeader>

      <ModalBody className={cx('wk-wallets', clsWallets)}>
        {connectors?.map((c) => <WalletOption key={c.id} connector={c} />)}
      </ModalBody>

      {!options.hideNoWalletCTA && (
        <ModalFooter>
          <Link
            className={cx('wk-download-link', clsDownloadLink)}
            href={options.walletDownloadUrl}
          >
            <WalletIcon />I don’t have a wallet
          </Link>
        </ModalFooter>
      )}
    </>
  );
}
