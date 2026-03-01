import Database, { type RunResult } from "better-sqlite3";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "./database/chat-database.db");

export class PozdravokChatDBManager {
  private readonly db: Database.Database;

  constructor() {
    this.db = new Database(dbPath);

    this.init();
  }

  register(chatId: number): RunResult {
    const query = this.db.prepare(`
          INSERT OR IGNORE INTO chats (id, created_at)
          VALUES (?, ?)
        `);

    return query.run(chatId, new Date().toISOString());
  }

  unregister(chatId: number): RunResult {
    const query = this.db.prepare(`
        DELETE FROM chats WHERE id = ?
    `);

    return query.run(chatId);
  }

  private init(): void {
    this.db.exec(`
          CREATE TABLE IF NOT EXISTS chats (
            id INTEGER,
            created_at TEXT,
            PRIMARY KEY (id)
          )
        `);
  }
}
