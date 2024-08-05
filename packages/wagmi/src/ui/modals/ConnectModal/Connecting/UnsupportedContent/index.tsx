import { useWalletConfig } from '@/core/hooks/useWalletConfig';
import { Content } from '../Content';
import { Description } from '../Content/Description';
import { InfoTitle } from '../Content/InfoTitle';
import { useUIConnectingView } from '@/ui-data/useUIConnectingView';
import { useUIProviderConfig } from '@/ui-data/useUIProviderConfig';

export function UnsupportedContent() {
  const { isWalletConflict } = useUIConnectingView();
  const { walletId } = useUIProviderConfig();

  const wallet = useWalletConfig(walletId);

  if (isWalletConflict) {
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
