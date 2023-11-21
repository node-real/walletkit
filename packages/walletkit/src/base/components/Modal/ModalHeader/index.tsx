import { cx } from '@/base/utils/css';
import { clsModalHeader } from './styles.css';
import { Box, BoxProps } from '../../Box';

export type ModalHeaderProps = BoxProps;

export function ModalHeader(props: ModalHeaderProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-header', clsModalHeader, className)} {...restProps} />;
}
