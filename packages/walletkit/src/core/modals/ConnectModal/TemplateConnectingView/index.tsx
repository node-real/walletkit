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
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useEffect } from 'react';
import { clsContent, clsGap, clsFooter, clsButton } from './styles.css';
import { useAutoCloseConnectModal } from '@/core/hooks/useAutoCloseConnectModal';
import { BaseWallet } from '@/core/configs/types';
import { isMobile } from '@/core/base/utils/mobile';

interface TemplateConnectingViewProps {
  status: CONNECT_STATUS;
  runConnect: () => void;
  onTryAgain: () => void;
  wallet: BaseWallet;
  isConnected: boolean;
}

export function TemplateConnectingView(props: TemplateConnectingViewProps) {
  const { status, runConnect, onTryAgain, wallet, isConnected } = props;

  const { log } = useWalletKit();
  const logos = useWalletLogos(wallet.logos);
  const downloadUrl = useWalletDownloadUrl(wallet.downloadUrls);

  useEffect(() => {
    log('[ConnectingView]', `name: ${wallet?.name}, status: ${status}`);

    if (status === CONNECT_STATUS.UNAVAILABLE) return;

    const connectTimeout = setTimeout(runConnect, 600);
    return () => {
      clearTimeout(connectTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              Open the {wallet.name} {isMobile() ? 'app' : 'browser extension'} to connect your
              wallet.
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
          <Button className={cx(clsButton, 'wk-retry-button')} onClick={onTryAgain}>
            Try Again
          </Button>
        </ModalFooter>
      )}

      {status === CONNECT_STATUS.UNAVAILABLE && (
        <ModalFooter className={clsFooter}>
          <Button
            className={cx(clsButton, 'wk-download-button')}
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
