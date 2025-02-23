import { TemplateQRCodeView } from '@/core/modals/ConnectModal/TemplateQRCodeView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWalletBehavior, isWalletConnect, metaMask } from '@/evm/wallets';
import { useMetaMaskUri } from '@/evm/hooks/userMetaMaskUri';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';

export function EvmQRCodeView() {
  const { selectedWallet } = useWalletKit();

  const { wcUri } = useWalletConnectUri({
    enabled: selectedWallet.id !== metaMask().id,
  });
  const { metaMaskUri } = useMetaMaskUri({
    enabled: selectedWallet.id === metaMask().id,
  });

  const qrCodeUri = useMemo(() => {
    if (selectedWallet.id === metaMask().id) {
      return metaMaskUri;
    }

    const behavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(selectedWallet);
    return wcUri ? behavior?.getUri?.(wcUri) : wcUri;
  }, [metaMaskUri, selectedWallet, wcUri]);

  const wcModal = useWalletConnectModal();
  const isConnected = useIsConnected();
  const { address } = useAccount();

  return (
    <TemplateQRCodeView
      wallet={selectedWallet}
      qrCodeUri={qrCodeUri}
      onClickOpenWcModal={wcModal.onOpen}
      isConnected={isConnected}
      isWalletConnect={isWalletConnect(selectedWallet.id)}
      address={address}
    />
  );
}
