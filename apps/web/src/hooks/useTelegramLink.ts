import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

/**
 * Hook for the wallet linking flow
 */
export function useTelegramLink() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isLinked, setIsLinked] = useState(false);

  const link = async () => {
    if (!address) return alert('Please connect wallet first');
    
    setIsLoading(true);
    try {
      // 1. Get auth parameters from Telegram (e.g., via Widget or deep link)
      const telegramId = 'USER_ID_FROM_CONTEXT'; 
      const nonce = Math.random().toString(36).substring(7);
      
      // 2. Sign message
      const message = `Link Telegram profile ${telegramId} with nonce ${nonce}`;
      const signature = await signMessageAsync({ message });

      // 3. Send to server
      const res = await fetch('/api/telegram/link', {
        method: 'POST',
        body: JSON.stringify({ telegramId, address, signature, nonce }),
      });

      if (res.ok) setIsLinked(true);
    } catch (error) {
      console.error('Linking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { link, isLoading, isLinked };
}