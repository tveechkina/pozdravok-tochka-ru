import { Bot } from "grammy";
import { PozdravokUserDBManager } from "./db/pozdravok-user-db-manager.js";
import { PozdravokUserCommandHandler } from "./user/pozdravok-user-command-handler.js";
import { PozdravokChatDBManager } from "./db/pozdravok-chat-db-manager.js";
import { PozdravokChatCommandHandler } from "./chat/pozdravok-chat-command-handler.js";

const bot = new Bot(process.env.BOT_TOKEN!);
const userDBManager = new PozdravokUserDBManager();
const userCommandHandler = new PozdravokUserCommandHandler(userDBManager);

const chatDBManager = new PozdravokChatDBManager();
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

/////// FIXME: Регистрация пользователей в привате для расширенного описания.
bot.command("add", (ctx) => {
  try {
    const { username, success } = userCommandHandler.addUser(ctx);

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
    const success = userCommandHandler.addAuthor(ctx);

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
    const { success, username } = userCommandHandler.deleteUser(ctx);

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
    const success = userCommandHandler.deleteAuthor(ctx);

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
