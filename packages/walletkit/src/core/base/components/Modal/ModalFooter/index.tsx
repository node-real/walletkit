import { clsModalFooter } from './styles.css';
import { Box, BoxProps } from '../../Box';
import { cx } from '@/core/base/utils/css';

export type ModalFooterProps = BoxProps;

export function ModalFooter(props: ModalFooterProps) {
  const { className, ...restProps } = props;

  return <Box className={cx(clsModalFooter, 'wk-modal-footer', className)} {...restProps} />;
}
