import type { CommandContext, Context } from "grammy";
import type {
  PozdravokUserDBManager,
  User,
} from "../db/pozdravok-user-db-manager.js";

type AddUserArguments = {
  date: string;
  tag: string;
};

export class PozdravokUserCommandHandler {
  constructor(private readonly userDBManager: PozdravokUserDBManager) {}

  addUser(context: CommandContext<Context>): {
    username: string | null;
    success: boolean;
  } {
    const username = this.getUsername(context);
    return { username, success: this.add(context, username) };
  }

  addAuthor(context: CommandContext<Context>): boolean {
    const username = context.from?.username;
    return this.add(context, username);
  }

  private add(
    context: CommandContext<Context>,
    username?: string | null,
  ): boolean {
    const chatId = context.chat.id;

    if (!username) {
      throw new Error(
        "Необходимо указать пользователя или воспользоваться командой /addme.",
      );
    }

    const args = context.match.replace(username, "").trim();

    if (!args) {
      throw new Error(
        "Необходимо добавить информацию о празднике: дату и тег.",
      );
    }

    const record: AddUserArguments = Object.fromEntries(
      args.split(" ").map((arg) => arg.split("=")),
    );

    if (!record.date) {
      throw new Error(
        "Необходимо добавить дату праздника в формате `date=YYYY-MM-DD`",
      );
    }

    const user: User = {
      id: username,
      date: record.date,
      tag: record.tag,
    };

    return !!this.userDBManager.add(user, chatId).changes;
  }

  deleteUser(context: CommandContext<Context>): {
    username: string | null;
    success: boolean;
  } {
    const username = this.getUsername(context);
    return { username, success: this.delete(context, username) };
  }

  deleteAuthor(context: CommandContext<Context>): boolean {
    const username = context.from?.username;
    return this.delete(context, username);
  }

  private delete(
    context: CommandContext<Context>,
    username?: string | null,
  ): boolean {
    const chatId = context.chat.id;

    if (!username) {
      throw new Error("Необходимо указать пользователя.");
    }

    return !!this.userDBManager.delete(username, chatId).changes;
  }

  private getUsername(context: CommandContext<Context>): string | null {
    const message = context.message;

    if (!message) {
      return null;
    }

    const userMention = message?.entities.find(
      (entity) => entity.type === "mention",
    );

    if (!userMention) {
      return null;
    }

    const username = message.text.slice(
      userMention.offset + 1,
      userMention.offset + userMention.length,
    );

    return username;
  }
}
