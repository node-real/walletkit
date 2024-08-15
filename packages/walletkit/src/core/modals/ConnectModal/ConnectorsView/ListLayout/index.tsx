import { Link } from '@/core/base/components/Link';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/core/base/icons/WalletIcon';
import { cx } from '@/core/base/utils/css';
import { useConfig } from '@/core/providers/WalletKitProvider/context';
import { clsWallets, clsNoWalletLink } from './styles.css';
import { WalletOption } from './WalletOption';
import { BaseWallet } from '@/core/configs/wallets/types';

export function ListLayout(props: { wallets: BaseWallet[] }) {
  const { wallets } = props;
  const { appearance } = useConfig();

  return (
    <>
      <ModalBody className={cx('wk-wallets', clsWallets)} data-layout="list">
        {wallets?.map(
          (w, index) => w.isVisible !== false && <WalletOption key={index} wallet={w} />,
        )}
      </ModalBody>

      {!appearance.hideNoWalletCTA && (
        <ModalFooter>
          <Link
            className={cx('wk-nowallet-link', clsNoWalletLink)}
            href={appearance.walletDownloadUrl}
          >
            <WalletIcon />I don’t have a wallet
          </Link>
        </ModalFooter>
      )}
    </>
  );
}
