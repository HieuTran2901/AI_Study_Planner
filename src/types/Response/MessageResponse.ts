import { type Role } from "../Common/Role";

export interface MessageResponse {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  fileUrls?: string[];
}
