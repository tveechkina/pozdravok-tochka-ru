import type { ChatTypeContext, Context } from "grammy";

export type PozdravokChatContext = ChatTypeContext<
  Context,
  "group" | "supergroup"
>;

export interface PozdravokUserChatBase {
  id: string;
  title: string;
  createdAt: number;
  username: string;
  firstName: string;
}