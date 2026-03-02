import { Bot } from "grammy";
import { registerChatCommands } from "../handlers/commands/chat.js";
import { registerMemberEvents } from "../handlers/commands/members.js";
import { registerUserCommands } from "../handlers/commands/user.js";
import type { BotDependencies } from "../models/bot.models.js";

export function registerHandlers(bot: Bot, dependencies: BotDependencies) {
  registerChatCommands(bot, dependencies);
  registerUserCommands(bot, dependencies);
  registerMemberEvents(bot, dependencies);
}
