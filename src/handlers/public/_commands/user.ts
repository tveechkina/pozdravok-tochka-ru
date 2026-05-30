import type { Bot } from "grammy";
import type { BotDependencies } from "../../../models/bot.models.js";
import { getEmojiEntity, POZDRAVOK_EMOJI_PLACEHOLDERS, PozdravokEmoji } from "../../../models/emoji.models.js";

export function registerUserCommands(bot: Bot, deps: BotDependencies) {
  const { userCommandHandler } = deps;

  bot.chatType(["group", "supergroup"]).command("addme", (context) => {
    try {
      const success = userCommandHandler.addMe(context);

      if (success)
        context.reply(
          `${POZDRAVOK_EMOJI_PLACEHOLDERS.DOBRYACHOK} Скоро-скоро тебя поздравим! Только расскажи мне на ушко о твоих праздниках.`,
          {
            entities: [getEmojiEntity(PozdravokEmoji.DOBRYACHOK)],
          }
        );
    } catch (error) {
      console.error(error);
      context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.NEUMYOHA_DOBRYACHOK} Ошибочка: ${error instanceof Error ? error.message : error}`,
        {
          entities: [getEmojiEntity(PozdravokEmoji.NEUMYOHA_DOBRYACHOK)]
        }
      );
    }
  });

  bot.chatType(["group", "supergroup"]).command("deleteme", (context) => {
    try {
      const success = userCommandHandler.deleteMe(context);

      if (success) {
        context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.NEUMYOHA_DOBRYACHOK} Удалили тебя! Ждём обратно!`,
          {
            entities: [getEmojiEntity(PozdravokEmoji.STERN_DOBRYACHOK)]
          }
        );
      }
    } catch (error) {
      console.error(error);
      context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.NEUMYOHA_DOBRYACHOK} Ошибочка: ${error instanceof Error ? error.message : error}`,
        {
          entities: [getEmojiEntity(PozdravokEmoji.NEUMYOHA_DOBRYACHOK)]
        }
      );
    }

  });

  bot.chatType(["group", "supergroup"]).command("aboutme", (context) => {
    try {
      const about = userCommandHandler.aboutMe(context);

      if (about) {
        context.reply(
          [
            `${POZDRAVOK_EMOJI_PLACEHOLDERS.SHY_DOBRYACHOK} На тебе:`,
            `Твой id: ${about.id}`,
            `Никнейм: ${about.username}`,
            `Имя: ${about.firstName}`
          ].join('\n'),
          {
            entities: [getEmojiEntity(PozdravokEmoji.SHY_DOBRYACHOK)]
          }
        );
      }
    } catch (error) {
      console.error(error);
      context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.NEUMYOHA_DOBRYACHOK} Ошибочка: ${error instanceof Error ? error.message : error}`,
        {
          entities: [getEmojiEntity(PozdravokEmoji.NEUMYOHA_DOBRYACHOK)]
        }
      );
    }

  });
}
