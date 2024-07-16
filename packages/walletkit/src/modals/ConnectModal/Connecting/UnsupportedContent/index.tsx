import { isMetaMaskConnector } from '@/wallets';
import { Content } from '../Content';
import { Description } from '../Content/Description';
import { InfoTitle } from '../Content/InfoTitle';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useWalletConfig } from '@/hooks/useWalletConfig';

export function UnsupportedContent() {
  const { selectedConnector } = useWalletKit();
  const wallet = useWalletConfig(selectedConnector);

  if (
    typeof window !== 'undefined' &&
    window.ethereum?.isTokenPocket &&
    isMetaMaskConnector(selectedConnector)
  ) {
    return (
      <Content>
        <InfoTitle>Switch Wallet</InfoTitle>
        <Description>
          Please install the {wallet.name} extension first, then switch the wallet manually in the
          corresponding extension, and refresh the page to log in.
        </Description>
      </Content>
    );
  }

  return (
    <Content>
      <InfoTitle>Install {wallet.name}</InfoTitle>
      <Description>To connect your {wallet.name}, install the browser extension.</Description>
    </Content>
  );
}
