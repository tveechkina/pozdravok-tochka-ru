import type { PozdravokChatDBManager } from "../../../api/db/pozdravok-chat-db-manager.js";
import type { PozdravokUserChatBase } from "../../../models/chat.models.js";

export class PozdravokProfileChatHandler {
    constructor(private readonly dbManager: PozdravokChatDBManager) { }

    list(userId: number): PozdravokUserChatBase[] {
        return this.dbManager.list(userId);
    }
}