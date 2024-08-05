import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { clsNoWalletButton, clsWallets } from './styles.css';
import { Button } from '@/ui/base/components/Button';
import { ModalBody } from '@/ui/base/components/Modal/ModalBody';
import { ModalFooter } from '@/ui/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/ui/base/icons/WalletIcon';
import { cx } from '@/ui/base/utils/css';
import { WalletOption } from './WalletOption';

export function GridLayout() {
  const { options, wallets } = useWalletKit();

  return (
    <>
      <ModalBody className={cx('wk-wallets', clsWallets)} data-layout="grid">
        {wallets?.map((w) => <WalletOption key={w.id} wallet={w} />)}
      </ModalBody>

      {!options.hideNoWalletCTA && (
        <ModalFooter>
          <Button
            as="a"
            className={cx('wk-nowallet-button', clsNoWalletButton)}
            href={options.walletDownloadUrl}
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
