import type Database from "better-sqlite3";
import type { PozdravokDatabaseManager } from "./pozdravok-db-manager.js";

export class PozdravokHolidaysDbManager {
    private readonly db: Database.Database;

    constructor(private readonly databaseManager: PozdravokDatabaseManager) {
        this.db = this.databaseManager.getDatabase();

        this.init();
    }

    private init(): void {
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS holidays (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        userId INTEGER NOT NULL,
        chatId INTEGER NOT NULL,

        type TEXT NOT NULL,
        title TEXT NOT NULL,
        date TEXT NOT NULL,

        enabled INTEGER NOT NULL DEFAULT 1,

        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,

        FOREIGN KEY (chatId) REFERENCES chats(id) ON DELETE CASCADE,
        FOREIGN KEY (chatId, userId) REFERENCES users(chatId, id) ON DELETE CASCADE
      );

      CREATE UNIQUE INDEX IF NOT EXISTS idx_holidays_unique_birthday
      ON holidays(userId, chatId, type)
      WHERE type = 'birthday';
    `);
    }
}