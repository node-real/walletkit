import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Link } from '../../base/Link';
import { ModalBody } from '../../base/Modal/ModalBody';
import { ModalFooter } from '../../base/Modal/ModalFooter';
import { ModalHeader } from '../../base/Modal/ModalHeader';
import { WalletIcon } from '../../base/icons/WalletIcon';

import { useConnectors } from '../../hooks/useConnectors';
import { cx } from '../../utils/css';
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
