import { cx } from '../../../utils/css';
import { Box, BoxProps } from '../../Box';
import { clsModalFooter } from './styles.css';

export type ModalFooterProps = BoxProps;

export function ModalFooter(props: ModalFooterProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-footer', clsModalFooter, className)} {...restProps} />;
}
