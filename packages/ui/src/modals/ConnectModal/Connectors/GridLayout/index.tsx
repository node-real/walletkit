import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/base/icons/WalletIcon';
import { cx } from '@/index';
import { clsNoWalletButton, clsWallets } from './styles.css';
import { WalletOption } from './WalletOption';
import { Button } from '@/base/components/Button';
import { useDataSource } from '@/components/DataSourceProvider/context';

export function GridLayout() {
  const { options, wallets } = useDataSource();

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
