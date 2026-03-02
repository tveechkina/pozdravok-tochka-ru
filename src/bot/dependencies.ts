import { PozdravokChatDBManager } from "../api/db/pozdravok-chat-db-manager.js";
import { PozdravokDatabaseManager } from "../api/db/pozdravok-db-manager.js";
import { PozdravokUserDBManager } from "../api/db/pozdravok-user-db-manager.js";
import { PozdravokChatCommandHandler } from "../handlers/chat/pozdravok-chat-command-handler.js";
import { PozdravokUserCommandHandler } from "../handlers/user/pozdravok-user-command-handler.js";

export function createDeps() {
  const database = new PozdravokDatabaseManager();

  const userDBManager = new PozdravokUserDBManager(database);
  const chatDBManager = new PozdravokChatDBManager(database);

  const userCommandHandler = new PozdravokUserCommandHandler(userDBManager);
  const chatCommandHandler = new PozdravokChatCommandHandler(chatDBManager);

  return {
    database,
    userDBManager,
    chatDBManager,
    userCommandHandler,
    chatCommandHandler,
  };
}
