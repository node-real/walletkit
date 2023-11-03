import { useEffect } from 'react';
import { Box, BoxProps } from '../../base/Box';
import { useClipboard } from '../../hooks/useClipboard';
import { SuccessIcon } from '../../base/icons/SuccessIcon';
import { CopyIcon } from '../../base/icons/CopyIcon';
import { cssVar, cx } from '../../utils/css';
import { clsCopy } from './styles.css';

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
