import { clsModalContent } from './style.css';
import { Box, BoxProps } from '../../Box';
import { cx } from '@/core/base/utils/css';

export type ModalContentProps = BoxProps;

export function ModalContent(props: ModalContentProps) {
  const { className, ...restProps } = props;

  return <Box className={cx('wk-modal-content', clsModalContent, className)} {...restProps} />;
}
