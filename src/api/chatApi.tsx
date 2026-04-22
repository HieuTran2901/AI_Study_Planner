import type { Role } from "@/types/ChatAI.type";
import apiClient from "./axiosClient";
import { type ApiResponse } from "@/types/ApiResponse.type";
import { type PagedResponse } from "@/types/PagedResponse.type";

export interface AIChatResponse {
  conversationId: string;
  reply: string;
}

export interface MessageResponse {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

export interface ConversationResponse {
  conversationId: string;
  tittle: string;
  updatedAt: string;
}

export interface ConversationDetailResponse {
  id: string;
  messages: MessageResponse[];
}

export const chatApi = {
  createConversation: async (): Promise<
    ApiResponse<{ conversationId: string }>
  > => {
    const response = await apiClient.post(`/conversation`);
    return response.data;
  },

  sendMessage: async (
    conversationId: string,
    message: string,
  ): Promise<ApiResponse<AIChatResponse>> => {
    const response = await apiClient.post(
      `/conversation/${conversationId}/message`,
      { message },
    );
    return response.data;
  },

  getMessages: async (
    conversationId: string,
  ): Promise<ApiResponse<ConversationDetailResponse>> => {
    const response = await apiClient.get(
      `/conversation/${conversationId}/message`,
    );
    return response.data;
  },

  getConversations: async (): Promise<
    ApiResponse<PagedResponse<ConversationResponse>>
  > => {
    const response = await apiClient.get(`/conversation`, {
      params: {
        page: 0,
        size: 20,
      },
    });
    return response.data;
  },
};
