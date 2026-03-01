import type { PozdravokChatDBManager } from "../db/pozdravok-chat-db-manager.js";
import type { PozdravokChatContext } from "../models/chat.models.js";

export class PozdravokChatCommandHandler {
  constructor(private readonly dbManager: PozdravokChatDBManager) {}

  register(context: PozdravokChatContext): boolean {
    const success = !!this.dbManager.register(context.chat.id).changes;

    if (!success) {
      throw new Error("Бот уже готов поздравлять.");
    }

    return success;
  }

  unregister(context: PozdravokChatContext): boolean {
    const success = !!this.dbManager.unregister(context.chat.id).changes;

    if (!success) {
      throw new Error("Бот ещё не умеет поздравлять в этом чате.");
    }

    return success;
  }
}
