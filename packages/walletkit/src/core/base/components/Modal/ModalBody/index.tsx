import { clsModalBody } from './styles.css';
import { Box, BoxProps } from '../../Box';
import { cx } from '@/core/base/utils/css';

export type ModalBodyProps = BoxProps;

export function ModalBody(props: ModalBodyProps) {
  const { className, ...restProps } = props;

  return <Box className={cx(clsModalBody, 'wk-modal-body', className)} {...restProps} />;
}
