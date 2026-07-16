/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion } from "framer-motion";

import { FiZap, FiX, FiMenu, FiChevronDown } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import EmailMessageCard from "../components/EmailMessageCard";
import EmailIntegration from "./EmailIntegration"; 
import { useToast } from "../context/ToastContext";
import Loader from "../components/Loader";
import ThinkingIndicator from "../components/ThinkingIndicator"; // Import Thinking Indicator
import TypingEffect from "../components/TypingEffect"; // Import Typing Effect

const Dashboard = () => {
  const chat = useChat();
  const { showToast } = useToast(); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false); // Local thinking state manager
  const messagesEndRef = useRef(null);

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading); // Keeps tracking initial screen mount loads only
  const { user } = useSelector((state) => state.auth);

  const activeChat = chats[currentChatId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isThinking]); // Auto scroll when thinking states shift

  useEffect(() => {
    chat.handleGetChats();
  }, []);

  const handleSendMessagePayload = async (compiledMessage, currentMode) => {
    try {
      if (compiledMessage.startsWith("Send an email")) {
        showToast("Compiling intelligence and preparing email brief...", "info");
      }

      setIsThinking(true); // Turn on inline bubble typing indicators instantly!

      await chat.handleSendMessage({
        message: compiledMessage,
        chatId: currentChatId,
        chatType: currentMode
      });

      if (compiledMessage.startsWith("Send an email")) {
        showToast("Email dispatched successfully!", "success");
      }
    } catch (error) {
      showToast("An error occurred while sending message.", "error");
    } finally {
      setIsThinking(false); // Turn off typing bubbles smoothly
    }
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
    setSidebarOpen(false);
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    try {
      await chat.handleDeleteChat(chatId);
      showToast("Conversation thread permanently removed.", "success");
    } catch (error) {
      showToast("Failed to delete the selected thread.", "error");
    }
  };

  const handleNewThread = () => {
    chat.handleOpenChat(null, chats);
    setSidebarOpen(false);
    showToast("New operational workspace initialized.", "info");
  };

  return (
    <>
      {/* Full screen loader fires ONLY on hard application refresh mounts */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      <main className="h-screen w-full flex bg-[#0d0d0d] text-neutral-200 overflow-hidden relative font-sans antialiased">
        {/* ... Sidebar code matches perfectly ... */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col bg-[#0b0b0b] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
          <Sidebar chats={chats} currentChatId={currentChatId} user={user} openChat={openChat} handleDelete={handleDelete} handleNewThread={handleNewThread} />
        </aside>

        <section className="flex-1 flex flex-col min-w-0 bg-[#0f0f0f]">
          {/* ... Header markup blocks remain completely unchanged ... */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-[#0e0e0e]/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 cursor-pointer"><FiMenu size={18} /></button>
              <h2 className="text-sm font-semibold text-neutral-200 truncate">{activeChat?.title || "Ask anything..."}</h2>
            </div>
          </header>

          {/* Main Chat Thread Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-24 py-8 space-y-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {activeChat?.messages && activeChat.messages.length > 0 ? (
              activeChat.messages.map((msg, index) => {
                const isLatestMessage = index === activeChat.messages.length - 1;

                if (msg.role === "user") {
                  return (
                    <div key={msg.id || msg._id || index} className="flex justify-end">
                      <div className="max-w-[80%] sm:max-w-[65%] bg-neutral-800 border border-neutral-700/40 rounded-2xl rounded-tr-sm px-4.5 py-3 text-sm text-neutral-100 shadow-md">
                        {msg.content}
                      </div>
                    </div>
                  );
                }

                if (msg.role === "email") {
                  return (
                    <div key={msg.id || msg._id || index} className="flex gap-4 max-w-3xl">
                      <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400"><FiZap size={15} /></div>
                      <div className="flex-1 min-w-0">
                        <EmailMessageCard details={msg.emailDetails} content={msg.content} />
                      </div>
                    </div>
                  );
                }

                // AI Response block
                return (
                  <div key={msg.id || msg._id || index} className="flex gap-4 max-w-3xl">
                    <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400"><FiZap size={15} /></div>
                    <div className="flex-1 text-sm leading-relaxed text-neutral-300 space-y-4">
                      {/* Apply Typing Effect to the most recent AI message to keep it feeling premium, fallback to static Markdown for older entries */}
                      {isLatestMessage ? (
                        <TypingEffect text={String(msg.content || "")} speed={12} />
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {String(msg.content || "")}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // Empty Thread Welcome Landing block
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto pt-24 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-2"><FiZap size={22} /></div>
                <h3 className="text-lg font-semibold text-neutral-200">Where will your curiosity lead?</h3>
              </div>
            )}

            {/* Inline Premium Thinking indicators wrapper renders smoothly right beneath the content tree */}
            {isThinking && <ThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* User Input Component Systems */}
          <div className="px-4 sm:px-8 lg:px-24 pb-6 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent pt-4">
            <EmailIntegration onSubmitMessage={handleSendMessagePayload} currentPlaceholder="Ask anything using Web Search or request an automated email..." />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;