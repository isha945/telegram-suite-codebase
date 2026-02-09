
      import { Composer } from 'grammy';

      export const commandsComposer = new Composer();

      
commandsComposer.command('start', async (ctx) => {
  await ctx.reply('Handled /start command!');
});


commandsComposer.command('help', async (ctx) => {
  await ctx.reply('Handled /help command!');
});


commandsComposer.command('balance', async (ctx) => {
  await ctx.reply('Handled /balance command!');
});

      
    