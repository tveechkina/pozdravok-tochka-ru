import type { PozdravokUserDBManager } from "../db/pozdravok-user-db-manager.js";
import type { PozdravokUserBase } from "../models/user.models.js";
import type { PozdravokChatContext } from "../models/chat.models.js";

export class PozdravokUserCommandHandler {
  constructor(private readonly userDBManager: PozdravokUserDBManager) {}

  addUser(context: PozdravokChatContext): {
    user: PozdravokUserBase | null;
    success: boolean;
  } {
    const user = this.getUserBase(context);
    return { user, success: this.add(context, user) };
  }

  addMe(context: PozdravokChatContext): boolean {
    const username = context.from?.username;
    const id = context.from?.id;
    const firstName = context.from?.first_name;

    if (!username || !firstName || !id) {
      return false;
    }

    return this.add(context, { username, id, firstName });
  }

  private add(
    context: PozdravokChatContext,
    user?: PozdravokUserBase | null,
  ): boolean {
    const chatId = context.chat.id;

    if (!user) {
      throw new Error(
        "Необходимо указать пользователя или воспользоваться командой /addme.",
      );
    }

    return !!this.userDBManager.add(user, chatId).changes;
  }

  deleteUser(context: PozdravokChatContext): {
    username: string | null;
    success: boolean;
  } {
    const { username, id } = this.getUserBase(context)!;

    return { username, success: this.delete(context, id) };
  }

  deleteMe(context: PozdravokChatContext): boolean {
    const id = context.from?.id || null;
    return this.delete(context, id);
  }

  private delete(context: PozdravokChatContext, id: number | null): boolean {
    const chatId = context.chat.id;

    if (!id) {
      throw new Error("Необходимо указать пользователя.");
    }

    return !!this.userDBManager.delete(id, chatId).changes;
  }

  private getUserBase(context: PozdravokChatContext): PozdravokUserBase | null {
    const message = context.message;

    if (!message) {
      return null;
    }

    const userMention = message?.entities?.find(
      (entity) => entity.type === "mention",
    );

    const user = message?.entities?.find(
      (entity) => entity.type === "text_mention",
    )?.user;

    if (!userMention || !user) {
      return null;
    }

    const username = message.text?.slice(
      userMention.offset + 1,
      userMention.offset + userMention.length,
    );

    if (!username) {
      return null;
    }

    return { id: user?.id, username, firstName: user.first_name };
  }
}
