import { BoxProps, Box } from '@/core/base/components/Box';
import { ModalContent } from '@/core/base/components/Modal/ModalContent';
import { cx } from '@/core/base/utils/css';
import { clsModal, clsContent } from './style.css';
import { useRouter } from '../ConnectModal/RouteProvider/context';
import { Navbar } from '@/core/components/Navbar';
import { useEffect } from 'react';
import { useConnectModal } from '../ConnectModal/context';
import { ViewRoutes } from '../ConnectModal/RouteProvider';

export function EmbeddedConnectModal(props: BoxProps) {
  const { className, ...restProps } = props;
  const { view, back, history } = useRouter();

  const { onOpen } = useConnectModal();

  useEffect(() => {
    onOpen({
      viewRoute: ViewRoutes.HOME,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={cx('wk-embedded-connect-modal', clsModal, className)} {...restProps}>
      <ModalContent className={clsContent} {...restProps}>
        <Navbar showBack={history.length > 1} showClose={false} onBack={back} />
        {view}
      </ModalContent>
    </Box>
  );
}
