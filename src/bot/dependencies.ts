import { PozdravokChatDBManager } from "../api/db/pozdravok-chat-db-manager.js";
import { PozdravokDatabaseManager } from "../api/db/pozdravok-db-manager.js";
import { PozdravokHolidaysDbManager } from "../api/db/pozdravok-holidays-db-manager.js";
import { PozdravokUserDBManager } from "../api/db/pozdravok-user-db-manager.js";
import { PozdravokProfileChatHandler } from "../handlers/private/chat/pozdravok-profile-chat-handler.js";
import { PozdravokChatCommandHandler } from "../handlers/public/chat/pozdravok-chat-command-handler.js";
import { PozdravokUserCommandHandler } from "../handlers/public/user/pozdravok-user-command-handler.js";

export function createDeps() {
  const database = new PozdravokDatabaseManager();

  const userDBManager = new PozdravokUserDBManager(database);
  const chatDBManager = new PozdravokChatDBManager(database);
  const holidaysDbManager = new PozdravokHolidaysDbManager(database);

  const userCommandHandler = new PozdravokUserCommandHandler(userDBManager);
  const chatCommandHandler = new PozdravokChatCommandHandler(chatDBManager);

  const profileChatHandler = new PozdravokProfileChatHandler(chatDBManager);

  return {
    database,
    userDBManager,
    chatDBManager,
    userCommandHandler,
    chatCommandHandler,
    profileChatHandler,
    holidaysDbManager
  };
}
