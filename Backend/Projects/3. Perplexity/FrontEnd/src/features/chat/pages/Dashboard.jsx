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

const Dashboard = () => {
  const chat = useChat();
  const { showToast } = useToast(); // Initialize Toast
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const { user } = useSelector((state) => state.auth);

  const activeChat = chats[currentChatId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  useEffect(() => {
    chat.handleGetChats();
  }, []);

  const handleSendMessagePayload = async (compiledMessage) => {
    try {
      // Notify user visually if an email operation starts processing
      if (compiledMessage.startsWith("Send an email")) {
        showToast("Compiling intelligence and preparing email brief...", "info");
      }

      await chat.handleSendMessage({
        message: compiledMessage,
        chatId: currentChatId,
      });

      // Show delivery success status notification
      if (compiledMessage.startsWith("Send an email")) {
        showToast("Email dispatched successfully!", "success");
      }
    } catch (error) {
      showToast(error?.message || "An error occurred while sending message.", "error");
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
    <main className="h-screen w-full flex bg-[#0d0d0d] text-neutral-200 overflow-hidden relative font-sans antialiased">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/75 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 flex flex-col bg-[#0b0b0b]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          user={user}
          openChat={openChat}
          handleDelete={handleDelete}
          handleNewThread={handleNewThread}
        />
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-5 right-4 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <FiX size={16} />
        </button>
      </aside>

      <section className="flex-1 flex flex-col min-w-0 bg-[#0f0f0f]">

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-24 py-8 space-y-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {activeChat?.messages && activeChat.messages.length > 0 ? (
            activeChat.messages.map((msg) => {
              if (msg.role === "user") {
                return (
                  <div key={msg.id || msg._id} className="flex justify-end">
                    <div className="max-w-[80%] sm:max-w-[65%] bg-neutral-800 border border-neutral-700/40 rounded-2xl rounded-tr-sm px-4.5 py-3 text-sm text-neutral-100 shadow-lg shadow-black/10 leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                );
              }

              if (msg.role === "email") {
                return (
                  <div key={msg.id || msg._id} className="flex gap-4 max-w-3xl">
                    <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400">
                      <FiZap size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <EmailMessageCard
                        details={msg.emailDetails}
                        content={msg.content}
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id || msg._id} className="flex gap-4 max-w-3xl">
                  <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400">
                    <FiZap size={15} />
                  </div>
                  <div className="flex-1 text-sm leading-relaxed text-neutral-300 space-y-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className="m-0 leading-relaxed text-neutral-300">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="ml-5 list-disc space-y-1.5 text-neutral-300">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="ml-5 list-decimal space-y-1.5 text-neutral-300">
                            {children}
                          </ol>
                        ),
                        table: ({ children }) => (
                          <div className="my-4 overflow-x-auto rounded-xl border border-neutral-800 bg-[#121212] shadow-md">
                            <table className="min-w-full border-collapse text-xs text-left">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead className="bg-neutral-900/50 border-b border-neutral-800 text-neutral-200">
                            {children}
                          </thead>
                        ),
                        tbody: ({ children }) => (
                          <tbody className="divide-y divide-neutral-900">
                            {children}
                          </tbody>
                        ),
                        tr: ({ children }) => (
                          <tr className="hover:bg-neutral-900/20 transition-colors">
                            {children}
                          </tr>
                        ),
                        th: ({ children }) => (
                          <th className="px-4 py-3 font-semibold text-neutral-300 border-r border-neutral-900 last:border-r-0">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="px-4 py-3 text-neutral-400 border-r border-neutral-900 last:border-r-0">
                            {children}
                          </td>
                        ),
                        code: ({ children, className }) => (
                          <code
                            className={`rounded-md bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[13px] font-mono text-neutral-300 ${className || ""}`}
                          >
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {String(msg.content || "")}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto pt-24 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-2 shadow-lg shadow-teal-500/5 animate-pulse">
                <FiZap size={22} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-200">
                Where will your curiosity lead?
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Search real-time internet indices or compile sophisticated email
                briefs dynamically in a unified command environment.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 sm:px-8 lg:px-24 pb-6 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent pt-4">
          <EmailIntegration
            onSubmitMessage={handleSendMessagePayload}
            currentPlaceholder="Ask anything or request an automated email..."
          />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;