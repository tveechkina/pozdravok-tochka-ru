import Database from "better-sqlite3";
import path from "node:path";
import fs from 'fs';

export class PozdravokDatabaseManager {
  private readonly database: Database.Database;

  constructor() {
    this.database = this.init();
  }

  getDatabase(): Database.Database {
    return this.database;
  }

  private init(): Database.Database {
    const databaseDir = path.resolve(process.cwd(), "database");
    const databasePath = path.join(databaseDir, "pozdravok.db");

    fs.mkdirSync(databaseDir, { recursive: true });

    const database = new Database(databasePath);

    database.pragma("foreign_keys = ON");
    database.pragma("journal_mode = WAL");

    return database;
  }
}
