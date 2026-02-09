import { Bot } from 'grammy';
import { commandsComposer } from './composers/commands';
/* @ts-ignore - AI composer might not exist yet */
import { aiComposer } from './composers/ai-agent';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not defined');

export const telegramBot = new Bot(token);

// Register feature-specific composers
telegramBot.use(commandsComposer);

// AI Agent integration (if present)
try {
  telegramBot.use(aiComposer);
} catch (e) {
  // AI component missing, skipping
}