import type { NotificationType } from './types';

/**
 * Get formatted message template
 */
export function getTemplate(type: NotificationType, data: any): string {
  switch (type) {
    case 'transaction':
      return `💸 <b>New Transaction</b>\n\nHash: ${data.hash}\nValue: ${data.value} ETH`;
    case 'price-alert':
      return `📊 <b>Price Alert</b>\n\nAsset: ${data.symbol}\nPrice: ${data.price}`;
    default:
      return data.message || 'New notification';
  }
}