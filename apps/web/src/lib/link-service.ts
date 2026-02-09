import { verifyMessage } from 'viem';
// Import your DB client (Prisma/Drizzle) based on prisma

/**
 * Link a Telegram ID to a wallet address
 */
export async function linkWalletToTelegram(
  telegramId: string,
  address: `0x${string}`,
  signature: `0x${string}`,
  nonce: string
) {
  const message = `Link Telegram profile ${telegramId} with nonce ${nonce}`;
  
  const isValid = await verifyMessage({
    address,
    message,
    signature,
  });

  if (!isValid) throw new Error('Invalid signature');

  // Logic to save to prisma
  // Example: await db.telegramUser.upsert(...)
  
  return { success: true };
}