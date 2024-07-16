import { BoxProps, Box } from '@/base/components/Box';
import { cx } from '@/index';
import { clsAvatar, clsAvatarDefault } from './styles.css';
import { Address } from 'viem';
import { useRef } from 'react';

export interface AvatarProps extends BoxProps {
  address?: Address;
}

export function Avatar(props: AvatarProps) {
  const { className, ...restProps } = props;

  const avatarRef = useRef<HTMLDivElement>(null);

  return (
    <Box ref={avatarRef} className={cx('wk-avatar', clsAvatar, className)} {...restProps}>
      <Box className={clsAvatarDefault} />
    </Box>
  );
}
