import Database, { type RunResult } from "better-sqlite3";
import type { PozdravokDatabaseManager } from "./pozdravok-db-manager.ts";
import type { PozdravokUserBase } from "../models/user.models.js";

export type User = {
  id: string;
  date: string;
  tag?: string;
};

export class PozdravokUserDBManager {
  private readonly db: Database.Database;

  constructor(private readonly databaseManager: PozdravokDatabaseManager) {
    this.db = this.databaseManager.getDatabase();

    this.init();
  }

  add(user: PozdravokUserBase, chatId: number): RunResult {
    const chatExist = this.db
      .prepare(`SELECT 1 FROM chats WHERE id = ?`)
      .get(chatId);

    if (!chatExist) {
      throw new Error(
        "Бот пока не умеет поздравлять в этом чате. Научите командой /register",
      );
    }

    return this.db
      .prepare(
        `
        INSERT INTO users (id, chatId, username, firstName, createdAt)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(chatId, id) DO UPDATE SET
            username = excluded.username,
            firstName = excluded.firstName
        `,
      )
      .run(
        user.id,
        chatId,
        user.username,
        user.firstName,
        new Date().toISOString(),
      );
  }

  delete(userId: number, chatId: number): RunResult {
    const query = this.db.prepare(`
      DELETE FROM users WHERE chatId = ? AND id = ?
    `);

    return query.run(chatId, userId);
  }

  private init(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER,
        chatId INTEGER,
        username TEXT,
        firstName TEXT,
        createdAt TEXT,
        PRIMARY KEY (chatId, id)
      )
    `);
  }
}
