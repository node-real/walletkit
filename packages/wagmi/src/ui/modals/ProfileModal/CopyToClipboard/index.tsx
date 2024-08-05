import { useEffect } from 'react';
import { clsCopy } from './styles.css';
import { BoxProps, Box } from '@/ui/base/components/Box';
import { useClipboard } from '@/ui/base/hooks/useClipboard';
import { CopyIcon } from '@/ui/base/icons/CopyIcon';
import { SuccessIcon } from '@/ui/base/icons/SuccessIcon';
import { cx, cssVar } from '@/ui/base/utils/css';

export interface CopyToClipboardProps extends BoxProps {
  value?: string;
}

export function CopyToClipboard(props: CopyToClipboardProps) {
  const { className, value = '', children, ...restProps } = props;

  const { hasCopied, onCopy, setValue } = useClipboard(value);

  useEffect(() => {
    setValue(value);
  }, [setValue, value]);

  return (
    <Box className={cx('wk-copy', clsCopy, className)} onClick={onCopy} {...restProps}>
      {children} {hasCopied ? <SuccessIcon /> : <CopyIcon color={cssVar('textSecondary')} />}
    </Box>
  );
}
