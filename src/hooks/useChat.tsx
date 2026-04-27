import { useState, useCallback, useRef } from "react";
import { AIChatService } from "@/services/AIChatService";
import type { ConversationResponse, MessageResponse } from "@/api/chatApi";

export function useChat() {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const hasInitialized = useRef(false);

  // Load history
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const response = await AIChatService.getMessages(conversationId);
      setMessages(response);
      setConversationId(conversationId);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }, []);

  // ====================== PRIVATE ACTIONS ======================
  const restoreLastConversation = useCallback(async (): Promise<void> => {
    const savedId = localStorage.getItem("conversationId");
    if (!savedId) return;

    try {
      await loadMessages(savedId);
    } catch (error) {
      console.error("Error restoring conversation:", error);

      // remove invalid conversationId
      localStorage.removeItem("conversationId");
      setConversationId(null);
    }
  }, [loadMessages]);

  // ====================== PUBLIC ACTIONS ======================
  const createConversation = useCallback(async (): Promise<string> => {
    try {
      const newId = await AIChatService.createConversation();
      setConversationId(newId);
      localStorage.setItem("conversationId", newId);
      return newId;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    try {
      const response = await AIChatService.uploadFile(file);
      return response.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }, []);
  const sendMessage = useCallback(
    async (content: string, file: File[] = []) => {
      if (!content.trim()) return;

      const tempId = crypto.randomUUID();
      const objectURLs = file.map((f) => URL.createObjectURL(f));
      //optimistic UI
      const tempUserMessage: MessageResponse = {
        id: tempId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        fileUrls: objectURLs, // show local file preview
      };

      setMessages((prev) => [...prev, tempUserMessage]);
      setIsLoading(true);

      try {
        let currentId = conversationId;

        // create conversation if first time
        if (!currentId) {
          currentId = await createConversation();
        }

        let fileUrls: string[] = [];

        if (file.length > 0) {
          fileUrls = await Promise.all(file.map((file) => uploadFile(file)));
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, fileUrls: fileUrls } : msg,
          ),
        );

        // Clean up object URLs after use
        objectURLs.forEach((url) => URL.revokeObjectURL(url));

        // send message to backend
        const response = await AIChatService.sendMessage(currentId, {
          message: content,
          fileUrls,
        });

        const aiMessage: MessageResponse = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.reply,
          createdAt: new Date().toISOString(),
          fileUrls: [],
        };

        // add assistant response to messages
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error(
          "Error sending message:",
          error.response.data || error.message,
        );
        // Handle UI
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
            createdAt: new Date().toISOString(),
            fileUrls: [],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, createConversation, uploadFile],
  );

  const getConversations = useCallback(async () => {
    try {
      const response = await AIChatService.getConversations();
      setConversations(response.items);
    } catch (error) {
      console.error("Error loading conversations:", error);
      return [];
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    localStorage.removeItem("conversationId");
  }, []);

  const initConversation = useCallback(async () => {
    if (hasInitialized.current) return;

    try {
      await getConversations(); // load list first to check if saved conversationId is valid
      await restoreLastConversation(); // then restore last conversation if exist
      hasInitialized.current = true;
    } catch (error) {
      console.error("Error initializing conversation:", error);
    }
  }, [restoreLastConversation, getConversations]);

  return {
    // data
    messages,
    currentConversationId: conversationId,
    conversations,
    // state
    isLoading,

    // actions
    createConversation,
    sendMessage,
    loadMessages,
    getConversations,
    uploadFile,
    initConversation,
    resetChat,
  };
}
