import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function useBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState<{ formatted: string; symbol: string }>();

  useEffect(() => {
    if (publicKey) {
      const getBalance = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
          const balance = await connection.getBalance(publicKey);
          setBalance({
            formatted: String(balance / LAMPORTS_PER_SOL),
            symbol: 'SOL',
          });
        } catch (err) {
          setIsError(true);
          setBalance(undefined);
        } finally {
          setIsLoading(false);
        }
      };
      getBalance();
    } else {
      setBalance(undefined);
    }
  }, [connection, publicKey]);

  return { balance, isLoading, isError };
}
