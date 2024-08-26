import { Box } from '@/core/base/components/Box';
import { Button } from '@/core/base/components/Button';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { cx } from '@/core/base/utils/css';
import { ConnectSpinner } from '@/core/components/ConnectSpinner';
import { Content } from '@/core/components/Content';
import { Description } from '@/core/components/Content/Description';
import { ErrorTitle } from '@/core/components/Content/ErrorTitle';
import { InfoTitle } from '@/core/components/Content/InfoTitle';
import { CONNECT_STATUS } from '@/core/constants';
import { useWalletDownloadUrl } from '@/core/hooks/useWalletDownloadUrl';
import { useWalletLogos } from '@/core/hooks/useWalletLogos';
import { useLogger } from '@/core/providers/WalletKitProvider/context';
import { useEffect } from 'react';
import { clsContent, clsGap, clsFooter, clsButton } from './styles.css';
import { useAutoCloseConnectModal } from '@/core/hooks/useAutoCloseConnectModal';
import { BaseWallet } from '@/core/configs/types';

interface ConnectingViewProps {
  status: CONNECT_STATUS;
  runConnect: () => void;
  wallet: BaseWallet;
  isConnected: boolean;
  isReady?: boolean;
}

export function ConnectingView(props: ConnectingViewProps) {
  const { status, runConnect, wallet, isConnected, isReady = true } = props;

  const log = useLogger();
  const logos = useWalletLogos(wallet.logos);
  const downloadUrl = useWalletDownloadUrl(wallet.downloadUrls);

  useEffect(() => {
    if (status === CONNECT_STATUS.UNAVAILABLE || !isReady) return;

    const connectTimeout = setTimeout(runConnect, 600);
    return () => {
      clearTimeout(connectTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  log('[connecting page]', `name: ${wallet?.name}, status: ${status}`);

  const isError = [
    CONNECT_STATUS.FAILED,
    CONNECT_STATUS.NOTCONNECTED,
    CONNECT_STATUS.REJECTED,
  ].includes(status);

  const isLoading = status === CONNECT_STATUS.CONNECTING;

  useAutoCloseConnectModal(isConnected);

  return (
    <>
      <ModalHeader>{wallet?.name}</ModalHeader>

      <ModalBody className={clsContent}>
        <ConnectSpinner isLoading={isLoading} isError={isError} loadingColor={wallet.spinnerColor}>
          {logos.transparent}
        </ConnectSpinner>

        <Box className={clsGap} />

        {/* typo ok */}
        {status === CONNECT_STATUS.FAILED && (
          <Content>
            <ErrorTitle>Connection Failed</ErrorTitle>
            <Description>Sorry, something went wrong. Please try connecting again.</Description>
          </Content>
        )}

        {/* typo ok */}
        {status === CONNECT_STATUS.REJECTED && (
          <Content>
            <InfoTitle>Request Cancelled</InfoTitle>
            <Description>You cancelled the request. Click above to try again.</Description>
          </Content>
        )}

        {/* typo ok */}
        {status === CONNECT_STATUS.CONNECTING && (
          <Content>
            <InfoTitle>Requesting Connection</InfoTitle>
            <Description>
              Open the {wallet.name} browser extension to connect your wallet.
            </Description>
          </Content>
        )}

        {/* typo ok */}
        {status === CONNECT_STATUS.CONNECTED && (
          <Content>
            <InfoTitle>Already Connected</InfoTitle>
            <Description>It is now okay to close this popup</Description>
          </Content>
        )}

        {status === CONNECT_STATUS.NOTCONNECTED && (
          <Content>
            <ErrorTitle>Login to {wallet.name}</ErrorTitle>
            <Description>To continue, please login to your {wallet.name} extension.</Description>
          </Content>
        )}

        {status === CONNECT_STATUS.UNAVAILABLE && (
          <Content>
            <InfoTitle>Install {wallet.name}</InfoTitle>
            <Description>To connect your {wallet.name}, install the browser extension.</Description>
          </Content>
        )}
      </ModalBody>

      {(status === CONNECT_STATUS.FAILED || status === CONNECT_STATUS.REJECTED) && (
        <ModalFooter className={clsFooter}>
          <Button className={cx('wk-retry-button', clsButton)} onClick={runConnect}>
            Try Again
          </Button>
        </ModalFooter>
      )}

      {status === CONNECT_STATUS.UNAVAILABLE && (
        <ModalFooter className={clsFooter}>
          <Button
            className={cx('wk-download-button', clsButton)}
            as="a"
            href={downloadUrl}
            target="_blank"
            rel="noopener"
          >
            Install the Extension
          </Button>
        </ModalFooter>
      )}
    </>
  );
}
