import type { Bot } from "grammy";
import type { BotDependencies } from "../../models/bot.models.js";

export function registerMemberEvents(
  bot: Bot,
  dependencies: BotDependencies,
): void {
  const { userDBManager } = dependencies;

  bot.on("message:new_chat_members", async (context) => {
    const chatId = context.chat.id;
    const newMembers = context.message.new_chat_members;
    let changes = 0;

    newMembers.forEach((member) => {
      if (!member.username) {
        return;
      }

      changes += userDBManager.add(
        {
          id: member.id,
          username: member.username!,
          firstName: member.first_name,
        },
        chatId,
      ).changes;
    });

    if (changes > 0) {
      (await context.reply(
        "Скоро-скоро поздравим " +
          newMembers.map((member) => "@" + member.username),
      )) + "!";
    }
  });

  bot.on("message:left_chat_member", async (context) => {
    const user = context.message?.left_chat_member!;

    console.log(
      "LEFT:",
      user.id,
      user.username,
      user.first_name,
      context.chat.id,
    );

    const success = userDBManager.delete(user.id, context.chat.id).changes > 0;

    console.log(success);
    if (success) {
      await context.reply("Ну и пожалуйста! Ну и не нужно!");
    }
  });
}
