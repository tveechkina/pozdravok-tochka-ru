import Database, { type RunResult } from "better-sqlite3";
import type { PozdravokDatabaseManager } from "./pozdravok-db-manager.js";
import type { PozdravokUserChatBase, PozdravokChatContext } from "../../models/chat.models.js";


export class PozdravokChatDBManager {
  private readonly db: Database.Database;

  constructor(private readonly databaseManager: PozdravokDatabaseManager) {
    this.db = this.databaseManager.getDatabase();

    this.init();
  }

  register(chat: PozdravokChatContext): RunResult {
    const query = this.db.prepare(`
          INSERT OR IGNORE INTO chats (id, title, createdAt)
          VALUES (?, ?, ?)
        `);

    return query.run(chat.chat.id, chat.chat.title, new Date().toISOString());
  }

  unregister(chatId: number): RunResult {
    const query = this.db.prepare(`
        DELETE FROM chats WHERE id = ?
    `);

    return query.run(chatId);
  }

  list(userId: number): PozdravokUserChatBase[] {
    return this.db
      .prepare(`
      SELECT
        chats.id,
        chats.title,
        users.username,
        users.firstName,
        chats.createdAt
      FROM users
      JOIN chats ON chats.id = users.chatId
      WHERE users.id = ?
      ORDER BY chats.createdAt DESC
    `)
      .all(userId) as PozdravokUserChatBase[];
  }

  private init(): void {
    this.db.exec(`
          CREATE TABLE IF NOT EXISTS chats (
            id INTEGER,
            title TEXT,
            createdAt TEXT,
            PRIMARY KEY (id)
          )
        `);
  }
}
