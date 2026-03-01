import { Bot } from "grammy";
import { PozdravokUserDBManager } from "./db/pozdravok-user-db-manager.js";
import { PozdravokUserCommandHandler } from "./user/pozdravok-user-command-handler.js";
import { PozdravokChatDBManager } from "./db/pozdravok-chat-db-manager.js";
import { PozdravokChatCommandHandler } from "./chat/pozdravok-chat-command-handler.js";
import { PozdravokDatabaseManager } from "./db/pozdravok-db-manager.js";

const bot = new Bot(process.env.BOT_TOKEN!);
const database = new PozdravokDatabaseManager();

const userDBManager = new PozdravokUserDBManager(database);
const userCommandHandler = new PozdravokUserCommandHandler(userDBManager);

const chatDBManager = new PozdravokChatDBManager(database);
const chatCommandHandler = new PozdravokChatCommandHandler(chatDBManager);

bot.chatType(["group", "supergroup"]).command("register", async (context) => {
  const success = chatCommandHandler.register(context);

  if (success) {
    await context.reply("Бот готов поздравлять!");
  }
});

bot.chatType(["group", "supergroup"]).command("unregister", async (context) => {
  const success = chatCommandHandler.unregister(context);

  if (success) {
    await context.reply("Вас больше не поздравят :(");
  }
});

bot.catch(async (err) => {
  const ctx = err.ctx;
  const error = err.error;

  console.error(error);

  const message = error instanceof Error ? error.message : "Произошла ошибка";

  try {
    await ctx.reply(message);
  } catch {}
});

bot.chatType(["group", "supergroup"]).command("add", async (context) => {
  const { success, user } = userCommandHandler.addUser(context);

  if (success) {
    await context.reply("Бот готов поздравлять @" + user?.username + "!");
  }
});

bot.chatType(["group", "supergroup"]).command("addme", async (context) => {
  const success = userCommandHandler.addMe(context);

  if (success) {
    await context.reply("Скоро-скоро вас поздравим!");
  }
});

bot.chatType(["group", "supergroup"]).command("delete", async (context) => {
  const success = userCommandHandler.deleteUser(context);

  if (success) {
    await context.reply("Удалили кого-то!");
  }
});

bot.chatType(["group", "supergroup"]).command("deleteme", async (context) => {
  const success = userCommandHandler.deleteMe(context);

  if (success) {
    await context.reply("Удалили вас!");
  }
});

bot.start();
