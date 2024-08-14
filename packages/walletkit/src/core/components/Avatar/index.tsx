import { clsAvatar, clsAvatarDefault } from './styles.css';
import { useEffect, useRef } from 'react';
import jazzicon from '@metamask/jazzicon';
import { BoxProps, Box } from '@/core/base/components/Box';
import { cx } from '@/core/base/utils/css';

export interface AvatarProps extends BoxProps {
  address?: string;
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
