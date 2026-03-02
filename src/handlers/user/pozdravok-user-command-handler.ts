import type { PozdravokUserBase } from "../../models/user.models.js";
import type { PozdravokChatContext } from "../../models/chat.models.js";
import type { PozdravokUserDBManager } from "../../api/db/pozdravok-user-db-manager.js";

export class PozdravokUserCommandHandler {
  constructor(private readonly userDBManager: PozdravokUserDBManager) {}

  addMe(context: PozdravokChatContext): boolean {
    const username = context.from?.username;
    const id = context.from?.id;
    const firstName = context.from?.first_name;

    if (!username || !firstName || !id) {
      return false;
    }

    return this.add(context, { username, id, firstName });
  }

  private add(context: PozdravokChatContext, user: PozdravokUserBase): boolean {
    const chatId = context.chat.id;

    return !!this.userDBManager.add(user, chatId).changes;
  }

  deleteMe(context: PozdravokChatContext): boolean {
    const id = context.from?.id || null;
    return this.delete(context, id);
  }

  private delete(context: PozdravokChatContext, id: number | null): boolean {
    const chatId = context.chat.id;

    if (!id) {
      throw new Error(
        "Не могу найти твой айди, прости :( Кажется, придётся терпеть поздравления!",
      );
    }

    return !!this.userDBManager.delete(id, chatId).changes;
  }
}
