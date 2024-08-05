import { clsModalContent } from './style.css';
import { cx } from '@/ui/index';
import { Box, BoxProps } from '../../Box';

export type ModalContentProps = BoxProps;

export function ModalContent(props: ModalContentProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-content', clsModalContent, className)} {...restProps} />;
}
