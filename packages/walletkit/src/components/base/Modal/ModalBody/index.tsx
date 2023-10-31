import { cx } from '../../../../utils/css';
import { Box, BoxProps } from '../../Box';
import { modalBody } from '../styles.css';

export type ModalBodyProps = BoxProps;

export function ModalBody(props: ModalBodyProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-body', modalBody, className)} {...restProps} />;
}
