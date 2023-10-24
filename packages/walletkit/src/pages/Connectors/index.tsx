import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Box } from '../../components/base/Box';
import { Link } from '../../components/base/Link';
import { ModalHeader } from '../../components/base/Modal/ModalHeader';
import { WalletIcon } from '../../components/icons/WalletIcon';
import { useConnectors } from '../../hooks/useConnectors';
import { cx } from '../../utils/css';
import { WalletItem } from './WalletItem';
import { downloadLink, footer, wallets } from './styles.css';

export function ConnectorsPage() {
  const connectors = useConnectors();
  const { options } = useWalletKitContext();

  return (
    <>
      <Navbar />
      <ModalHeader>Connect Wallet</ModalHeader>

      <Box className={cx('wk-modal-body wk-wallets', wallets)}>
        {connectors?.map((c) => <WalletItem key={c.id} connector={c} />)}
      </Box>

      {!options.hideNoWalletCTA && (
        <Box className={cx('wk-modal-footer', footer)}>
          <Link className={cx('wk-download-link', downloadLink)} href={options.walletDownloadUrl}>
            <WalletIcon />I don’t have a wallet
          </Link>
        </Box>
      )}
    </>
  );
}
