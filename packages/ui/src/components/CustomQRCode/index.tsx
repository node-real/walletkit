import { QRCode } from './QRCode';
import { QRCodePlaceHolder } from './QRCodePlaceHolder';
import { clsQrCodeContainer, clsQrCodeLogo, clsQrCodeWrapper } from './styles.css';
import { Box, BoxProps } from '@/base/components/Box';
import { cx } from '@/index';
import { Transition } from '@/base/components/Transition';

export interface CustomQRCodeProps extends BoxProps {
  logo?: React.ReactNode;
  logoSize?: number;
  value?: string;
}

export function CustomQRCode(props: CustomQRCodeProps) {
  const { className, logo, logoSize = 44, value, ...restProps } = props;

  return (
    <Box className={cx('wk-qrcode', clsQrCodeContainer, className)} {...restProps}>
      <Box className={clsQrCodeWrapper}>
        {value ? (
          <Transition in={!!value}>
            <QRCode uri={value} />
          </Transition>
        ) : (
          <QRCodePlaceHolder />
        )}
        <Box
          className={cx('wk-qrcode-logo', clsQrCodeLogo)}
          style={{
            width: logoSize,
            height: logoSize,
            opacity: value ? 1 : 0.3,
          }}
        >
          {logo}
        </Box>
      </Box>
    </Box>
  );
}
