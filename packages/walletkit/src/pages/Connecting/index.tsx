import { useCallback, useEffect, useState } from 'react';
import { useWalletKitContext } from '../../components/WalletKitProvider/context';
import { useWalletConfig } from '../../hooks/useWalletConfig';
import { useWalletKitConnect } from '../../hooks/useWalletKitConnect';
import { Navbar } from '../../components/Navbar';
import { ModalHeader } from '../../components/base/Modal/ModalHeader';
import { Box } from '../../components/base/Box';
import { Content } from './Content';
import { ErrorTitle } from './Content/ErrorTitle';
import { Description } from './Content/Description';
import { InfoTitle } from './Content/InfoTitle';
import { UnsupportedContent } from './UnsupportedContent';
import { CircleSpinner } from '../../components/CircleSpinner';
import { center, content, logoWrapper, refreshIconWrapper } from './styles.css';
import { RefreshIcon } from '../../components/base/icons/RefreshIcon';
import { ModalBody } from '../../components/base/Modal/ModalBody';

export const states = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  FAILED: 'failed',
  REJECTED: 'rejected',
  NOTCONNECTED: 'notconnected',
  UNAVAILABLE: 'unavailable',
};

export function ConnectingPage() {
  const { selectedConnector, options, connectVariant, log } = useWalletKitContext();

  const wallet = useWalletConfig(selectedConnector);

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
          connectVariant === 'add-network'
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

  log('[Connect]', status, selectedConnector);

  return (
    <>
      <Navbar showBack={true} />
      <ModalHeader>{wallet?.name}</ModalHeader>

      <ModalBody className={content}>
        <Box className={center}>
          <CircleSpinner
            isLoading={status === states.CONNECTING}
            isError={status !== states.CONNECTING && status !== states.CONNECTED}
          >
            <Box className={logoWrapper} onClick={runConnect}>
              {wallet.logos.default}
            </Box>
            {(status === states.FAILED || status === states.REJECTED) && (
              <Box className={refreshIconWrapper} onClick={runConnect}>
                <RefreshIcon
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 10,
                    width: 16,
                    height: 16,
                  }}
                />
              </Box>
            )}
          </CircleSpinner>
        </Box>

        {status === states.FAILED && (
          <Content>
            <ErrorTitle>Connection Failed</ErrorTitle>
            <Description>Sorry, something went wrong. Please try connecting again.</Description>
          </Content>
        )}

        {status === states.REJECTED && (
          <Content>
            <InfoTitle>Request Cancelled</InfoTitle>
            <Description>You cancelled the request. Click above to try again.</Description>
          </Content>
        )}

        {status === states.CONNECTING && (
          <Content>
            <InfoTitle>Requesting Connection</InfoTitle>
            <Description>
              Open the {wallet.name} browser extension to connect your wallet.
            </Description>
          </Content>
        )}

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
    </>
  );
}
