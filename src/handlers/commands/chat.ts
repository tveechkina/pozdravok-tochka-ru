import type { Bot } from "grammy";
import type { BotDependencies } from "../../models/bot.models.js";

export function registerChatCommands(bot: Bot, deps: BotDependencies) {
  const { chatCommandHandler } = deps;

  bot.chatType(["group", "supergroup"]).command("register", async (ctx) => {
    const success = chatCommandHandler.register(ctx);
    if (success) await ctx.reply("Бот готов вас всех поздравлять!");
  });

  bot.chatType(["group", "supergroup"]).command("unregister", async (ctx) => {
    const success = chatCommandHandler.unregister(ctx);
    if (success) await ctx.reply("Вас всех больше не поздравят :(");
  });
}
