import { Bot } from "grammy";
import { PozdravokDBManager } from "./db/pozdravok-db-manager.js";
import { PozdravokCommandHandler } from "./db/pozdravok-command-handler.js";

const bot = new Bot(process.env.BOT_TOKEN!);
const dbManager = new PozdravokDBManager();
const commandHandler = new PozdravokCommandHandler(dbManager);

bot.command("add", (ctx) => {
  try {
    const { username, success } = commandHandler.addUser(ctx);

    if (!success) {
      throw new Error("Праздник для данного пользователя уже добавлен в чат.");
    }

    if (success) {
      ctx.reply("Праздник для @" + username + " успешно добавлен!");
    }
  } catch (error) {
    ctx.reply("Не удалось добавить пользователя. " + error);
  }
});

bot.command("addme", (ctx) => {
  try {
    const success = commandHandler.addAuthor(ctx);

    if (!success) {
      throw new Error("Праздник для данного пользователя уже добавлен в чат.");
    }

    if (success) {
      ctx.reply("Праздник для @" + ctx.from?.username + " успешно добавлен!");
    }
  } catch (error) {
    ctx.reply("Не удалось добавить вас. " + error);
  }
});

bot.command("delete", (ctx) => {
  try {
    const { success, username } = commandHandler.deleteUser(ctx);

    if (!success) {
      throw new Error(
        "Кажется, праздника для пользователя никогда не существовало.",
      );
    }

    if (success) {
      ctx.reply("Праздник для @" + username + " удален.");
    }
  } catch (error) {
    ctx.reply("Не удалось удалить пользователя. " + error);
  }
});

bot.command("deleteme", (ctx) => {
  try {
    const success = commandHandler.deleteAuthor(ctx);

    if (!success) {
      throw new Error("Кажется, праздника для вас никогда не существовало.");
    }

    if (success) {
      ctx.reply("Праздник для @" + ctx.from?.username + " удален.");
    }
  } catch (error) {
    ctx.reply("Не удалось удалить праздник для вас. " + error);
  }
});

bot.start();
