import { clsModalHeader } from './styles.css';
import { Box, BoxProps } from '../../Box';
import { cx } from '@/core/base/utils/css';

export type ModalHeaderProps = BoxProps;

export function ModalHeader(props: ModalHeaderProps) {
  const { className, ...restProps } = props;

  return <Box className={cx(clsModalHeader, 'wk-modal-header', className)} {...restProps} />;
}
