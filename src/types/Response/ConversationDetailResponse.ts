import { type MessageResponse } from "./MessageResponse";

export interface ConversationDetailResponse {
  id: string;
  messages: MessageResponse[];
}
