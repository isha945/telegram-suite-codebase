import { Composer } from 'grammy';
import { aiAgentService } from '../ai-service';

export const aiComposer = new Composer();

aiComposer.on('message:text', async (ctx) => {
  // Only handle if not a command (handled by command composer)
  if (ctx.message.text.startsWith('/')) return;

  await ctx.replyWithChatAction('typing');
  
  try {
    const response = await aiAgentService.generateResponse(ctx.message.text);
    await ctx.reply(response || "I'm not sure how to respond to that.");
  } catch (error) {
    console.error('AI generation error:', error);
    await ctx.reply('Sorry, I encountered an error while processing your request.');
  }
});