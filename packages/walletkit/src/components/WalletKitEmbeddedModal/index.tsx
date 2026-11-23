import { useState } from 'react';
import { Button } from '@/base/components/Button';
import { ModalContent } from '@/base/components/Modal/ModalContent';
import { Connectors } from '../WalletKitModal/Connectors';
import { cx } from '@/base/utils/css';
import { clsModal, clsContent } from './style.css';
import { Box, BoxProps } from '@/base/components/Box';
import { WalletKitModal } from '../WalletKitModal';
import { IOSSecurityNotice } from '../WalletKitModal/IOSSecurityNotice';
import { useWalletKitModal } from '../WalletKitModal/WalletKitModalProvider/context';
import { clsWalletkitButton } from '../WalletKitButton/ConnectButton/styles.css';

export function WalletKitEmbeddedModal(props: BoxProps) {
  const { className, ...restProps } = props;
  const { iosRisk, checkIOSRisk, acknowledgeIOSRisk } = useWalletKitModal();
  const [isRiskNoticeDismissed, setIsRiskNoticeDismissed] = useState(false);

  let content;
  if (iosRisk === null) {
    content = <Connectors />;
  } else if (iosRisk && isRiskNoticeDismissed) {
    content = (
      <Button
        type="button"
        className={cx('wk-connect-button', clsWalletkitButton)}
        onClick={() => {
          checkIOSRisk();
          setIsRiskNoticeDismissed(false);
        }}
      >
        Connect Wallet
      </Button>
    );
  } else if (iosRisk) {
    content = (
      <IOSSecurityNotice
        risk={iosRisk}
        onContinue={acknowledgeIOSRisk}
        onCancel={() => setIsRiskNoticeDismissed(true)}
      />
    );
  }

  return (
    <>
      <Box className={cx('wk-embedded-modal', clsModal, className)} {...restProps}>
        <ModalContent className={clsContent} {...restProps}>
          {content}
        </ModalContent>
      </Box>

      <WalletKitModal />
    </>
  );
}
