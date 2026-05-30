import { Bot } from "grammy";
import { createDeps } from "./bot/dependencies.js";
import { registerHandlers } from "./bot/register-handlers.js";

const bot = new Bot(process.env.BOT_TOKEN!);
const deps = createDeps();

registerHandlers(bot, deps);

console.log("Checking Telegram connection...");

const me = await bot.api.getMe();

console.log(`Bot connected: @${me.username}`);
console.log("Starting polling...");

bot.start();


bot.on("message:text", async (ctx) => {
    console.log(ctx.message.entities);
    await ctx.reply("Посмотрела entities в консоли");
});