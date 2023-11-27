import { BoxProps, Box } from '@/base/components/Box';
import { cx } from '@/index';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { clsAvatar, clsAvatarImg, clsAvatarDefault } from './styles.css';

export interface AvatarProps extends BoxProps {
  address?: `0x${string}`;
  name?: string | undefined;
}

export function Avatar(props: AvatarProps) {
  const { className, address, name, ...restProps } = props;

  const { data: ensAddress } = useEnsAddress({
    chainId: 1,
    name,
  });

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address ?? ensAddress ?? undefined,
  });

  const { data: ensAvatar } = useEnsAvatar({
    chainId: 1,
    name: ensName,
  });

  const ens = {
    address: ensAddress ?? address,
    name: ensName ?? name,
    avatar: ensAvatar ?? undefined,
  };

  return (
    <Box className={cx('wk-avatar', clsAvatar, className)} {...restProps}>
      {ens.avatar ? (
        <Box className={clsAvatarImg} as="img" src={ens.avatar} alt={ens.name} />
      ) : (
        <Box className={clsAvatarDefault} />
      )}
    </Box>
  );
}
