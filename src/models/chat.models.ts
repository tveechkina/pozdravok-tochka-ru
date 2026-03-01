import type { ChatTypeContext, Context } from "grammy";

export type PozdravokChatContext = ChatTypeContext<
  Context,
  "group" | "supergroup"
>;
