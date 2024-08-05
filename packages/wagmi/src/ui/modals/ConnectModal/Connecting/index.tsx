import { useWalletConfig } from '@/core/hooks/useWalletConfig';
import { useUIConnectingView } from '@/ui-data/useUIConnectingView';
import { useUIProviderConfig } from '@/ui-data/useUIProviderConfig';
import { Box } from '@/ui/base/components/Box';
import { Button } from '@/ui/base/components/Button';
import { ModalBody } from '@/ui/base/components/Modal/ModalBody';
import { ModalFooter } from '@/ui/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/ui/base/components/Modal/ModalHeader';
import { cx } from '@/ui/base/utils/css';
import { CONNECT_STATUS } from '@/ui/constants';
import { useWalletDownloadUrl } from '@/ui/hooks/useWalletDownloadUrl';
import { useWalletLogos } from '@/ui/hooks/useWalletLogos';
import { useEffect } from 'react';
import { ConnectSpinner } from './ConnectSpinner';
import { Content } from './Content';
import { Description } from './Content/Description';
import { ErrorTitle } from './Content/ErrorTitle';
import { InfoTitle } from './Content/InfoTitle';
import { clsContent, clsGap, clsFooter, clsButton } from './styles.css';
import { UnsupportedContent } from './UnsupportedContent';
import { useWalletKit } from '@/core/components/WalletKitProvider/context';

export function Connecting() {
  const { status, runConnect, onClickTryAgain } = useUIConnectingView();
  const { walletId } = useUIProviderConfig();

  const { log } = useWalletKit();

  const wallet = useWalletConfig(walletId);
  const logos = useWalletLogos(wallet.logos);
  const downloadUrl = useWalletDownloadUrl(wallet.downloadUrls);

  useEffect(() => {
    if (status === CONNECT_STATUS.UNAVAILABLE) return;

    const connectTimeout = setTimeout(runConnect, 600);
    return () => {
      clearTimeout(connectTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  log('[connecting page]', `name: ${wallet?.name}, status: ${status}`);

  const isError = [
    CONNECT_STATUS.FAILED,
    CONNECT_STATUS.NOTCONNECTED,
    CONNECT_STATUS.REJECTED,
  ].includes(status);
  const isLoading = status === CONNECT_STATUS.CONNECTING;

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

        {status === CONNECT_STATUS.UNAVAILABLE && <UnsupportedContent />}
      </ModalBody>

      {(status === CONNECT_STATUS.FAILED || status === CONNECT_STATUS.REJECTED) && (
        <ModalFooter className={clsFooter}>
          <Button className={cx('wk-retry-button', clsButton)} onClick={onClickTryAgain}>
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