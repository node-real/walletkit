import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Address } from 'viem';
import { useBalance, useBlockNumber } from 'wagmi';

export function useWalletKitBalance(address?: Address) {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, queryKey } = useBalance({
    address,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  return {
    balance,
  };
}
