import Database from "better-sqlite3";
import path from "node:path";

export class PozdravokDatabaseManager {
  private readonly database: Database.Database;

  constructor() {
    this.database = this.init();
  }

  getDatabase(): Database.Database {
    return this.database;
  }

  private init(): Database.Database {
    const database = new Database(
      path.resolve(process.cwd(), "database/pozdravok.db"),
    );

    database.pragma("foreign_keys = ON");
    database.pragma("journal_mode = WAL");

    return database;
  }
}
