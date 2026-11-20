import { BoxProps, Box } from '@/core/base/components/Box';
import { Button } from '@/core/base/components/Button';
import { ModalContent } from '@/core/base/components/Modal/ModalContent';
import { clsWalletkitButton } from '@/core/components/ConnectButton/style.css';
import { cx } from '@/core/base/utils/css';
import { clsModal, clsContent } from './style.css';
import { useRouter } from '../../providers/RouteProvider/context';
import { Navbar } from '@/core/components/Navbar';
import { useEffect, useState } from 'react';
import { useConnectModal } from '../ConnectModal/context';
import { ViewRoutes } from '../../providers/RouteProvider';
import { IOSSecurityNotice } from '../ConnectModal/IOSSecurityNotice';

export function EmbeddedConnectModal(props: BoxProps) {
  const { className, ...restProps } = props;
  const { view, back, history, route } = useRouter();

  const { onOpen, iosRisk, acknowledgeIOSRisk } = useConnectModal();
  const [isRiskNoticeDismissed, setIsRiskNoticeDismissed] = useState(false);

  useEffect(() => {
    onOpen({
      viewRoute: ViewRoutes.HOME,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={cx('wk-embedded-connect-modal', clsModal, className)} {...restProps}>
      {isRiskNoticeDismissed ? (
        <Button
          type="button"
          className={cx('wk-connect-button', clsWalletkitButton)}
          onClick={() => {
            onOpen({ viewRoute: ViewRoutes.HOME });
            setIsRiskNoticeDismissed(false);
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <ModalContent className={clsContent} {...restProps}>
          <Navbar showBack={history.length > 1} showClose={false} onBack={back} />
          {route === ViewRoutes.HOME && iosRisk ? (
            <IOSSecurityNotice
              risk={iosRisk}
              onContinue={acknowledgeIOSRisk}
              onCancel={() => setIsRiskNoticeDismissed(true)}
            />
          ) : (
            view
          )}
        </ModalContent>
      )}
    </Box>
  );
}
