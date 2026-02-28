import type { CommandContext, Context } from "grammy";
import type { PozdravokDBManager, User } from "./pozdravok-db-manager.js";

type AddUserArguments = {
  date: string;
  tag: string;
};

export class PozdravokCommandHandler {
  constructor(private readonly dbManager: PozdravokDBManager) {}

  addUser(context: CommandContext<Context>): void {
    const username = this.getUsername(context);
    this.add(context, username);
  }

  addAuthor(context: CommandContext<Context>): void {
    const username = context.from?.username;
    this.add(context, username);
  }

  private add(
    context: CommandContext<Context>,
    username?: string | null,
  ): void {
    try {
      const chatId = context.chat.id;

      if (!username) {
        return;
      }

      const args = context.match.replace(username, "").trim();

      if (!args) {
        throw Error("No arguments provided!");
      }

      const record: AddUserArguments = Object.fromEntries(
        args.split(" ").map((arg) => arg.split("=")),
      );

      if (!record.date) {
        throw Error("No holiday date provided!");
      }

      const user: User = {
        id: username,
        date: record.date,
        tag: record.tag,
      };

      this.dbManager.add(user, chatId);
    } catch (error) {
      console.error("Cannot handle /add command", { error });
    }
  }

  deleteUser(context: CommandContext<Context>): void {
    const username = this.getUsername(context);
    this.delete(context, username);
  }

  deleteAuthor(context: CommandContext<Context>): void {
    const username = context.from?.username;
    this.delete(context, username);
  }

  private delete(
    context: CommandContext<Context>,
    username?: string | null,
  ): void {
    try {
      const chatId = context.chat.id;

      if (!username) {
        return;
      }

      this.dbManager.delete(username, chatId);
    } catch (error) {
      console.error("Cannot handle /delete command", { error });
    }
  }

  private getUsername(context: CommandContext<Context>): string | null {
    try {
      const message = context.message;

      if (!message) {
        throw Error("The message is empty!");
      }

      const userMention = message?.entities.find(
        (entity) => entity.type === "mention",
      );

      if (!userMention) {
        throw Error("No username passed!");
      }

      const username = message.text.slice(
        userMention.offset + 1,
        userMention.offset + userMention.length,
      );

      return username;
    } catch (error) {
      console.error("Cannot find the username", { error });

      return null;
    }
  }
}
