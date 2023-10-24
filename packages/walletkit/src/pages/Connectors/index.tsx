import { Navbar } from '../../components/Navbar';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { Box } from '../../components/base/Box';
import { Link } from '../../components/base/Link';
import { ModalHeader } from '../../components/base/Modal/ModalHeader';
import { WalletIcon } from '../../components/icons/WalletIcon';
import { useConnectors } from '../../hooks/useConnectors';
import { WalletItem } from './WalletItem';
import * as styles from './styles';

export function ConnectorsPage() {
  const connectors = useConnectors();
  const { options } = useWalletKitContext();

  return (
    <>
      <Navbar />
      <ModalHeader>Connect Wallet</ModalHeader>

      <Box className="wk-modal-body wk-wallets" css={styles.wallets}>
        {connectors?.map((c) => <WalletItem key={c.id} connector={c} />)}
      </Box>

      {!options.hideNoWalletCTA && (
        <Box className="wk-modal-footer" css={styles.footer}>
          <Link
            className="wk-download-link"
            href={options.walletDownloadUrl}
            css={styles.downloadLink}
          >
            <WalletIcon />I don’t have a wallet
          </Link>
        </Box>
      )}
    </>
  );
}
