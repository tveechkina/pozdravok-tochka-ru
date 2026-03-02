import type { Bot } from "grammy";
import type { BotDependencies } from "../../models/bot.models.js";

export function registerUserCommands(bot: Bot, deps: BotDependencies) {
  const { userCommandHandler } = deps;

  bot.chatType(["group", "supergroup"]).command("addme", async (ctx) => {
    const success = userCommandHandler.addMe(ctx);
    if (success)
      await ctx.reply(
        "Скоро-скоро тебя поздравим! Только расскажи мне на ушко о твоих праздниках.",
      );
  });

  bot.chatType(["group", "supergroup"]).command("deleteme", async (ctx) => {
    const success = userCommandHandler.deleteMe(ctx);
    if (success) await ctx.reply("Удалили тебя! Ждём обратно!");
  });
}
