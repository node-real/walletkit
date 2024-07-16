import { Link } from '@/base/components/Link';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/base/icons/WalletIcon';
import { cx } from '@/index';

import { WalletOption } from './WalletOption';
import { clsWallets, clsNoWalletLink } from './styles.css';
import { useWalletKit } from '@/components/WalletKitProvider/context';

export function ListLayout() {
  const { options, wallets } = useWalletKit();

  return (
    <>
      <ModalBody className={cx('wk-wallets', clsWallets)} data-layout="list">
        {wallets?.map((w) => <WalletOption key={w.id} wallet={w} />)}
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
