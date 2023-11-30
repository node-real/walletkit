import { Box } from '@/base/components/Box';
import { Button } from '@/base/components/Button';
import { ModalBody } from '@/base/components/Modal/ModalBody';
import { ModalFooter } from '@/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/base/components/Modal/ModalHeader';
import { Navbar } from '@/components/Navbar';
import { useWalletConfig } from '@/hooks/useWalletConfig';
import { useWalletDownloadUrl } from '@/hooks/useWalletDownloadUrl';
import { useWalletKitConnect } from '@/hooks/useWalletKitConnect';
import { useWalletLogos } from '@/hooks/useWalletLogos';
import { cx, useWalletKitContext } from '@/index';
import { useState, useCallback, useEffect } from 'react';
import { ConnectSpinner } from './ConnectSpinner';
import { Content } from './Content';
import { Description } from './Content/Description';
import { ErrorTitle } from './Content/ErrorTitle';
import { InfoTitle } from './Content/InfoTitle';
import { UnsupportedContent } from './UnsupportedContent';
import { clsContent, clsGap, clsFooter, clsButton } from './styles.css';

export const states = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  FAILED: 'failed',
  REJECTED: 'rejected',
  NOTCONNECTED: 'notconnected',
  UNAVAILABLE: 'unavailable',
};

export function ConnectingPage() {
  const { selectedConnector, options, connectRole, log } = useWalletKitContext();

  const wallet = useWalletConfig(selectedConnector);
  const logos = useWalletLogos(wallet.logos);
  const downloadUrl = useWalletDownloadUrl(wallet.downloadUrls);

  const [status, setStatus] = useState(!wallet.installed ? states.UNAVAILABLE : states.CONNECTING);

  const { connect } = useWalletKitConnect({
    onMutate: (connector?: any) => {
      if (connector.connector) {
        setStatus(states.CONNECTING);
      } else {
        setStatus(states.UNAVAILABLE);
      }
    },
    onSettled(data?: any, error?: any) {
      if (error) {
        if (error.code) {
          // https://github.com/MetaMask/eth-rpc-errors/blob/main/src/error-constants.ts
          switch (error.code) {
            case -32002:
              setStatus(states.NOTCONNECTED);
              break;
            case 4001:
              setStatus(states.REJECTED);
              break;
            default:
              setStatus(states.FAILED);
              break;
          }
        } else {
          // Sometimes the error doesn't respond with a code
          if (error.message) {
            switch (error.message) {
              case 'User rejected request':
                setStatus(states.REJECTED);
                break;
              default:
                setStatus(states.FAILED);
                break;
            }
          }
        }
      } else if (data) {
        if (
          options.initialChainId &&
          data.chain.id === options.initialChainId &&
          connectRole === 'add-network'
        ) {
          options.onChainAlreadyAdded?.(selectedConnector, options.initialChainId);
        }
      }
    },
  });

  const runConnect = useCallback(() => {
    if (!wallet.installed) return;

    if (selectedConnector) {
      connect({ connector: selectedConnector });
    } else {
      setStatus(states.UNAVAILABLE);
    }
  }, [connect, selectedConnector, wallet.installed]);

  useEffect(() => {
    if (status === states.UNAVAILABLE) return;

    const connectTimeout = setTimeout(runConnect, 600);
    return () => {
      clearTimeout(connectTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  log('[connecting page]', `name: ${selectedConnector?.name}, status: ${status}`);

  const isError = [states.FAILED, states.NOTCONNECTED, states.REJECTED].includes(status);
  const isLoading = status === states.CONNECTING;

  return (
    <>
      <Navbar showBack={true} />
      <ModalHeader>{wallet?.name}</ModalHeader>

      <ModalBody className={clsContent}>
        <ConnectSpinner isLoading={isLoading} isError={isError} loadingColor={wallet.spinnerColor}>
          {logos.transparent}
        </ConnectSpinner>

        <Box className={clsGap} />

        {/* typo ok */}
        {status === states.FAILED && (
          <Content>
            <ErrorTitle>Connection Failed</ErrorTitle>
            <Description>Sorry, something went wrong. Please try connecting again.</Description>
          </Content>
        )}

        {/* typo ok */}
        {status === states.REJECTED && (
          <Content>
            <InfoTitle>Request Cancelled</InfoTitle>
            <Description>You cancelled the request. Click above to try again.</Description>
          </Content>
        )}

        {/* typo ok */}
        {status === states.CONNECTING && (
          <Content>
            <InfoTitle>Requesting Connection</InfoTitle>
            <Description>
              Open the {wallet.name} browser extension to connect your wallet.
            </Description>
          </Content>
        )}

        {/* typo ok */}
        {status === states.CONNECTED && (
          <Content>
            <InfoTitle>Already Connected</InfoTitle>
            <Description>It is now okay to close this popup</Description>
          </Content>
        )}

        {status === states.NOTCONNECTED && (
          <Content>
            <ErrorTitle>Login to {wallet.name}</ErrorTitle>
            <Description>To continue, please login to your {wallet.name} extension.</Description>
          </Content>
        )}

        {status === states.UNAVAILABLE && <UnsupportedContent />}
      </ModalBody>

      {(status === states.FAILED || status === states.REJECTED) && (
        <ModalFooter className={clsFooter}>
          <Button className={cx('wk-retry-button', clsButton)} onClick={runConnect}>
            Try Again
          </Button>
        </ModalFooter>
      )}

      {status === states.UNAVAILABLE && (
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
