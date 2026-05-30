import type { Bot } from "grammy";
import type { BotDependencies } from "../../../models/bot.models.js";
import { getEmojiEntity, POZDRAVOK_EMOJI_PLACEHOLDERS, PozdravokEmoji } from "../../../models/emoji.models.js";

export function registerChatCommands(bot: Bot, deps: BotDependencies) {
  const { chatCommandHandler } = deps;

  bot.chatType(["group", "supergroup"]).command("register", (context) => {
    try {
      const success = chatCommandHandler.register(context);

      if (success) {
        context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.VICTORY_DOBRYACHOK} Бот готов вас всех поздравлять!`,
          {
            entities: [getEmojiEntity(PozdravokEmoji.VICTORY_DOBRYACHOK)]
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

  bot.chatType(["group", "supergroup"]).command("unregister", (context) => {


    try {
      const success = chatCommandHandler.unregister(context);

      if (success) {
        context.reply(`${POZDRAVOK_EMOJI_PLACEHOLDERS.VICTORY_DOBRYACHOK} Вас всех больше не поздравят`,
          {
            entities: [getEmojiEntity(PozdravokEmoji.CRY_DOBRYACHOK)]
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
