import { Bot } from "grammy";
import { createDeps } from "./bot/dependencies.js";
import { registerHandlers } from "./bot/register-handlers.js";

const bot = new Bot(process.env.BOT_TOKEN!);
const deps = createDeps();

registerHandlers(bot, deps);

bot.start();
