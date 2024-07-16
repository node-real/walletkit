import { BoxProps, Box } from '@/base/components/Box';
import { cx } from '@/index';
import { clsAvatar, clsAvatarDefault } from './styles.css';
import { Address } from 'viem';
import { useEffect, useRef } from 'react';
import jazzicon from '@metamask/jazzicon';

export interface AvatarProps extends BoxProps {
  address?: Address;
}

export function Avatar(props: AvatarProps) {
  const { className, address, ...restProps } = props;

  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = avatarRef.current;
    if (element && address) {
      const seed = parseInt(address.slice(2, 10), 16);
      const icon = jazzicon(element.clientWidth, seed);

      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }

      element.appendChild(icon);
    }
  }, [address]);

  return (
    <Box ref={avatarRef} className={cx('wk-avatar', clsAvatar, className)} {...restProps}>
      <Box className={clsAvatarDefault} />
    </Box>
  );
}
