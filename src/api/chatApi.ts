import apiClient from "./axiosClient";
import { type ApiResponse } from "@/types/Common/ApiResponse";
import type { SendMessageRequest } from "@/types/Request";
import type {
  AIChatResponse,
  ConversationDetailResponse,
  ConversationResponse,
  UploadFileResponse,
  PagedResponse,
} from "@/types/Response";

export const chatApi = {
  createConversation: async (): Promise<
    ApiResponse<{ conversationId: string }>
  > => {
    const response = await apiClient.post(`/conversation`);
    return response.data;
  },

  sendMessage: async (
    conversationId: string,
    body: SendMessageRequest,
  ): Promise<ApiResponse<AIChatResponse>> => {
    const response = await apiClient.post(
      `/conversation/${conversationId}/message`,
      body,
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

  uploadFile: async (file: File): Promise<ApiResponse<UploadFileResponse>> => {
    // FormData is used to send files in multipart/form-data format
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
