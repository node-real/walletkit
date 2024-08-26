import { Button } from '@/core/base/components/Button';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/core/base/icons/WalletIcon';
import { cx } from '@/core/base/utils/css';
import { WalletOption } from './WalletOption';
import { BaseWallet } from '@/core/configs/types';
import { useAppearance } from '@/core/providers/WalletKitProvider/context';
import { clsWallets, clsNoWalletButton } from './styles.css';

export function GridLayout(props: { visibleWallets: BaseWallet[] }) {
  const { visibleWallets } = props;
  const appearance = useAppearance();

  return (
    <>
      <ModalBody className={cx('wk-wallets', clsWallets)} data-layout="grid">
        {visibleWallets?.map((w, index) => <WalletOption key={index} wallet={w} />)}
      </ModalBody>

      {!appearance.hideNoWalletCTA && (
        <ModalFooter>
          <Button
            as="a"
            className={cx('wk-nowallet-button', clsNoWalletButton)}
            href={appearance.walletDownloadUrl}
            target="_blank"
            rel="noopener"
          >
            <WalletIcon />I don’t have a wallet
          </Button>
        </ModalFooter>
      )}
    </>
  );
}
