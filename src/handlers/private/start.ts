import { Bot, InlineKeyboard } from "grammy";
import type { BotDependencies } from "../../models/bot.models.js";
import { getEmojiEntity, POZDRAVOK_EMOJI_PLACEHOLDERS, PozdravokEmoji } from "../../models/emoji.models.js";

export function registerProfileEvents(bot: Bot, deps: BotDependencies) {
  const { profileChatHandler } = deps;

  bot.chatType(["private"]).command('start', async (context) => {
    const chats = profileChatHandler.list(context.from!.id);

    if (!chats.length) {
      context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.NEUMYOHA_DOBRYACHOK} Пока тебя нигде не поздравляют. Попробуй добавить меня в чат командой /register, а затем добавь себя командой /addme.`, {
        entities: [getEmojiEntity(PozdravokEmoji.NEUMYOHA_DOBRYACHOK)]
      });
    }

    const keyboard = new InlineKeyboard()

    for (let chat of chats) {
      keyboard.text(chat.title, `settings:chat:${chat.id}`).row()
    }

    context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.WAVING_DOBRYACHOK} Выберите чат для настройки:`, {
      reply_markup: keyboard,
      entities: [getEmojiEntity(PozdravokEmoji.WAVING_DOBRYACHOK)]
    });
  });

  bot.callbackQuery(/^settings:chat:(-?\d+)$/, async (context) => {
    await context.answerCallbackQuery();

    const keyboard = new InlineKeyboard()
      .text(`Добавляем праздник!`)
      .row()
      .text(`Меняем праздник`)
      .row()
      .text(`Смотрим список праздников`)
      .row()
      .text(`Меняем имя`)

    await context.answerCallbackQuery();

    await context.editMessageText(`${POZDRAVOK_EMOJI_PLACEHOLDERS.DOBRYACHOK} Что делаем?`, {
      reply_markup: keyboard,
      entities: [getEmojiEntity(PozdravokEmoji.DOBRYACHOK)]
    });

  })
}
