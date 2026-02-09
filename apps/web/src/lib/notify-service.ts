import { telegramBot } from './bot-client';
import { getTemplate } from './templates';
import type { NotificationPayload } from './types';

/**
 * Send a notification to a specific Telegram chat
 */
export async function sendNotification(
  chatId: string | number,
  payload: NotificationPayload
) {
  const text = getTemplate(payload.type, payload.data);
  
  try {
    await telegramBot.api.sendMessage(chatId, text, {
      parse_mode: 'HTML',
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return { success: false, error };
  }
}