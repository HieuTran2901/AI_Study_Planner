export type Role = "user" | "assistant" | "system";

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: Role;
  content: string;
  createdAt: Date;
}
