import { Link } from '@/base/components/Link';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/base/icons/WalletIcon';
import { useWalletKitContext, cx } from '@/index';
import { useConnect } from 'wagmi';

import { WalletOption } from './WalletOption';
import { clsWallets, clsNoWalletLink } from './styles.css';

export function ListLayout() {
  const { connectors } = useConnect();
  const { options } = useWalletKitContext();

  return (
    <>
      <ModalBody className={cx('wk-wallets', clsWallets)} data-layout="list">
        {connectors?.map((c) => <WalletOption key={c.id} connector={c} />)}
      </ModalBody>

      {!options.hideNoWalletCTA && (
        <ModalFooter>
          <Link
            className={cx('wk-nowallet-link', clsNoWalletLink)}
            href={options.walletDownloadUrl}
          >
            <WalletIcon />I don’t have a wallet
          </Link>
        </ModalFooter>
      )}
    </>
  );
}
