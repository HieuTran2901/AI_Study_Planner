import { Sparkles, MessageSquare, Plus, X, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";

function AIChatPanel({
  showAIChat,
  setShowAIChat,
}: {
  showAIChat: boolean;
  setShowAIChat: (show: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [showConversationModal, setShowConversationModal] = useState(false);

  const {
    messages,
    isLoading,
    sendMessage,
    initConversation,
    conversations,
    loadMessages,
    getConversations,
    createConversation,
    currentConversationId,
    resetChat,
  } = useChat();

  // ================= SEND MESSAGE =================
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");

    await sendMessage(message);
    await getConversations();
  };

  // ================= INIT =================
  useEffect(() => {
    if (showAIChat) {
      initConversation();
    }
  }, [showAIChat, initConversation]);

  // ================= SELECT CONVERSATION =================
  const handleSelectConversation = async (conversationId: string) => {
    await loadMessages(conversationId);
    localStorage.setItem("conversationId", conversationId);
    setShowConversationModal(false);
  };

  // ================= NEW CHAT =================
  const handleNewChat = async () => {
    setShowConversationModal(false);
    resetChat();
    await createConversation();
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Overlay Mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          showAIChat ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowAIChat(false)}
      />

      {/* ====================== CHAT PANEL ====================== */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: showAIChat ? 0 : 300 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed lg:relative inset-y-0 right-0 z-50 w-full sm:w-96 border-l border-white/[0.08]
        bg-gradient-to-b from-[#0a0a0f] to-[#11111b] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-md">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowConversationModal(true)}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg tracking-tight group-hover:text-indigo-400">
                AI Assistant
              </h3>
              <p className="text-xs text-gray-400">Powered by advanced AI</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowConversationModal(true)}
            >
              <MessageSquare size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAIChat(false)}
            >
              <X size={22} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 bg-[#0a0a0f]/30">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <Sparkles size={40} className="text-white mb-4" />
              <p className="text-2xl text-white">Hi there!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mt-1">
                    <Sparkles size={15} className="text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white/[0.07] text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center mt-1">
                <Sparkles size={15} className="text-white" />
              </div>

              {/* Bubble */}
              <div className="bg-white/[0.06] px-5 py-3.5 rounded-3xl flex items-center gap-3 border border-white/[0.08]">
                {/* 3 dots animation */}
                <div className="flex gap-1.5">
                  <motion.div
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>

                <span className="text-xs text-slate-400 font-medium">
                  AI is thinking...
                </span>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-5 border-t border-white/[0.08]">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </motion.div>

      {/* ====================== MODAL ====================== */}
      <AnimatePresence>
        {showConversationModal && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowConversationModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111118] border border-white/[0.08] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
                <h3 className="text-xl font-semibold text-white">
                  Conversations
                </h3>
                <Button onClick={handleNewChat} size="sm">
                  <Plus size={18} className="mr-2" />
                  New Chat
                </Button>
              </div>

              {/* List */}
              <div className="max-h-[480px] overflow-y-auto p-3">
                {conversations?.map((conv) => {
                  const isActive =
                    conv.conversationId === currentConversationId;

                  return (
                    <motion.div
                      key={conv.conversationId}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleSelectConversation(conv.conversationId)
                      }
                      className={`group px-5 py-4 mb-2 rounded-2xl cursor-pointer transition-all duration-200 flex gap-4 items-start border
    ${
      isActive
        ? "bg-indigo-500/10 border-indigo-500/40 shadow-sm"
        : "hover:bg-white/[0.06] border-transparent hover:border-white/[0.08]"
    }`}
                    >
                      {/* ICON (giữ nguyên) */}
                      <div
                        className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center mt-0.5 transition-all
      ${
        isActive
          ? "bg-indigo-500 text-white shadow-md"
          : "bg-white/[0.08] text-gray-400 group-hover:bg-white/[0.12] group-hover:text-white"
      }`}
                      >
                        <Sparkles size={20} />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-medium line-clamp-1 transition-colors ${
                              isActive
                                ? "text-indigo-300"
                                : "text-white group-hover:text-indigo-400"
                            }`}
                          >
                            {conv.tittle || "New Conversation"}
                          </p>

                          {isActive && (
                            <Check size={18} className="text-indigo-400" />
                          )}
                        </div>

                        {/* CLOCK (đã thêm lại) */}
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-500">
                          <Clock size={12} />
                          <span>
                            {conv.updatedAt
                              ? new Date(conv.updatedAt).toLocaleString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )
                              : "Just now"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatPanel;
