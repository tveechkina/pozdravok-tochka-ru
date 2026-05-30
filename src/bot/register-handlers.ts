import { Bot } from "grammy";
import { registerChatCommands } from "../handlers/public/_commands/chat.js";
import { registerMemberEvents } from "../handlers/public/_commands/members.js";
import { registerUserCommands } from "../handlers/public/_commands/user.js";
import type { BotDependencies } from "../models/bot.models.js";
import { registerProfileEvents } from "../handlers/private/start.js";

export function registerHandlers(bot: Bot, dependencies: BotDependencies) {
  registerChatCommands(bot, dependencies);
  registerUserCommands(bot, dependencies);
  registerMemberEvents(bot, dependencies);
  registerProfileEvents(bot, dependencies);
}
