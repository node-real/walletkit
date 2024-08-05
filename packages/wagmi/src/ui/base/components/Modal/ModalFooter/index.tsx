import { clsModalFooter } from './styles.css';
import { cx } from '@/ui/index';
import { Box, BoxProps } from '../../Box';

export type ModalFooterProps = BoxProps;

export function ModalFooter(props: ModalFooterProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-footer', clsModalFooter, className)} {...restProps} />;
}
