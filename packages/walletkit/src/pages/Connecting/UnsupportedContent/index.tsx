import { useWalletKitContext } from '../../../components/WalletKitProvider/context';
import { isMetaMaskConnector } from '../../../wallets';
import { Content } from '../Content';
import { Description } from '../Content/Description';
import { InfoTitle } from '../Content/InfoTitle';

export function UnsupportedContent() {
  const { selectedConnector } = useWalletKitContext();

  if (
    typeof window !== 'undefined' &&
    window.ethereum?.isTokenPocket &&
    isMetaMaskConnector(selectedConnector)
  ) {
    return (
      <Content>
        <InfoTitle>Switch Wallet</InfoTitle>
        <Description>
          Please install the {selectedConnector?._wallet.name} extension first, then switch the
          wallet manually in the corresponding extension, and refresh the page to log in.
        </Description>
      </Content>
    );
  }

  return (
    <Content>
      <InfoTitle>Install {selectedConnector?._wallet.name}</InfoTitle>
      <Description>
        To continue, please install {selectedConnector?._wallet.name} extension to your browser.
      </Description>
    </Content>
  );
}
