import { Box, BoxProps } from '@/core/base/components/Box';
import { useClipboard } from '@/core/base/hooks/useClipboard';
import { cssVar, cx } from '@/core/base/utils/css';
import { useEffect } from 'react';
import { clsCopy } from './style.css';
import { CopyIcon } from '@/core/base/icons/CopyIcon';
import { SuccessIcon } from '@/core/base/icons/SuccessIcon';

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
