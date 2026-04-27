import { chatApi } from "@/api/chatApi";
import type { sendMessageRequest } from "@/api/chatApi";

export const AIChatService = {
  sendMessage: async (conversationId: string, body: sendMessageRequest) => {
    const response = await chatApi.sendMessage(conversationId, body);
    return response.results;
  },

  createConversation: async () => {
    const response = await chatApi.createConversation();
    return response.results.conversationId;
  },

  getMessages: async (conversationId: string) => {
    const response = await chatApi.getMessages(conversationId);
    return response.results.messages;
  },

  getConversations: async () => {
    const response = await chatApi.getConversations();
    return response.results;
  },

  uploadFile: async (file: File) => {
    const response = await chatApi.uploadFile(file);
    return response.results;
  },
};
