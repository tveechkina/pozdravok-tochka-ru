import { Bot } from "grammy";
import { PozdravokDBManager } from "./db/pozdravok-db-manager.js";
import { PozdravokCommandHandler } from "./db/pozdravok-command-handler.js";

const bot = new Bot(process.env.BOT_TOKEN!);
const dbManager = new PozdravokDBManager();
const commandHandler = new PozdravokCommandHandler(dbManager);

bot.command("add", (ctx) => {
  commandHandler.addUser(ctx);
});

bot.command("addme", (ctx) => {
  commandHandler.addAuthor(ctx);
});

bot.command("delete", (ctx) => {
  commandHandler.deleteUser(ctx);
});

bot.command("deleteme", (ctx) => {
  commandHandler.deleteAuthor(ctx);
});

bot.start();
