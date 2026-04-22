import { chatApi } from "@/api/chatApi";

export const AIChatService = {
  sendMessage: async (conversationId: string, message: string) => {
    const response = await chatApi.sendMessage(conversationId, message);
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
};
