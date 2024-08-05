import { Link } from '@/ui/base/components/Link';
import { ModalBody } from '@/ui/base/components/Modal/ModalBody';
import { ModalFooter } from '@/ui/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/ui/base/icons/WalletIcon';
import { cx } from '@/ui/base/utils/css';
import { clsWallets, clsNoWalletLink } from './styles.css';
import { WalletOption } from './WalletOption';
import { useWalletKit } from '@/core/components/WalletKitProvider/context';

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
