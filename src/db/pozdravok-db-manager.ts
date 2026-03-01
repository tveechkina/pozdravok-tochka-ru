import Database, { type RunResult } from "better-sqlite3";

export type User = {
  id: string;
  date: string;
  tag?: string;
};

export class PozdravokDBManager {
  private readonly db: Database.Database;

  constructor() {
    this.db = new Database("database.db");

    this.init();
  }

  add(user: User, chatId: number): RunResult {
    const query = this.db.prepare(`
      INSERT OR IGNORE INTO users (chat_id, user_id, holiday_date, tag, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    return query.run(
      chatId,
      user.id,
      user.date,
      user.tag || "день_рождения",
      new Date().toISOString(),
    );
  }

  delete(userId: string, chatId: number): RunResult {
    const query = this.db.prepare(`
      DELETE FROM users WHERE chat_id = ? AND user_id = ?
    `);

    return query.run(chatId, userId);
  }

  private init(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        chat_id INTEGER,
        user_id TEXT,
        holiday_date TEXT,
        tag TEXT,
        created_at TEXT,
        PRIMARY KEY (chat_id, user_id)
      )
    `);
  }
}
