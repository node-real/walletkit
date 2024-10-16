import { Link } from '@/core/base/components/Link';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/core/base/icons/WalletIcon';
import { cx } from '@/core/base/utils/css';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { clsWallets, clsNoWalletLink } from './styles.css';
import { WalletOption } from './WalletOption';
import { BaseWallet } from '@/core/configs/types';

export function ListLayout(props: { visibleWallets: BaseWallet[] }) {
  const { visibleWallets } = props;
  const { options } = useWalletKit();

  return (
    <>
      <ModalBody className={cx(clsWallets, 'wk-wallets')} data-layout="list">
        {visibleWallets?.map((w, index) => <WalletOption key={index} wallet={w} />)}
      </ModalBody>

      {!options.hideNoWalletCTA && (
        <ModalFooter>
          <Link
            className={cx(clsNoWalletLink, 'wk-nowallet-link')}
            href={options.walletDownloadUrl}
          >
            <WalletIcon />I don’t have a wallet
          </Link>
        </ModalFooter>
      )}
    </>
  );
}
