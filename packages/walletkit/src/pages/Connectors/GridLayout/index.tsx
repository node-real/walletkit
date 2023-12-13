import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { WalletIcon } from '@/base/icons/WalletIcon';
import { useWalletKitContext, cx } from '@/index';
import { Connector } from 'wagmi';
import { clsNoWalletButton, clsWallets } from './styles.css';
import { WalletOption } from './WalletOption';
import { Button } from '@/base/components/Button';

export interface GridLayoutProps {
  connectors: Connector[];
}

export function GridLayout(props: GridLayoutProps) {
  const { connectors } = props;
  const { options } = useWalletKitContext();

  return (
    <>
      <ModalBody className={cx('wk-wallets', clsWallets)} data-layout="grid">
        {connectors?.map((c) => <WalletOption key={c.id} connector={c} />)}
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
