import { cx } from '@/base/utils/css';
import { clsModalBody } from './styles.css';
import { Box, BoxProps } from '../../Box';

export type ModalBodyProps = BoxProps;

export function ModalBody(props: ModalBodyProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-body', clsModalBody, className)} {...restProps} />;
}
