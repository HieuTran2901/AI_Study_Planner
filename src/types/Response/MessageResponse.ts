import { type Role } from "../Chat.type";

export interface MessageResponse {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  fileUrls?: string[];
}
