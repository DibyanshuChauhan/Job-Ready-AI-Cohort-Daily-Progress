/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  FiZap,
  FiX,
  FiPlus,
  FiSearch,
  FiMessageSquare,
  FiUser,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";

const Dashboard = () => {
  const chat = useChat();

const [sidebarOpen, setSidebarOpen] = useState(false);
const [message, setMessage] = useState("");

const chats = useSelector((state) => state.chat.chats);
const currentChatId = useSelector((state) => state.chat.currentChatId)

const handleSend = (e) => {
  e.preventDefault();

  chat.handleSendMessage({message, chatId:currentChatId})
};

const openChat = (chatId) => {
  chat.handleOpenChat(chatId)
}

    const { user } = useSelector(state => state.auth)
    console.log(user)

    useEffect(() => {
      chat.handleGetChats()
      chat.initializeSocketConnection()
    }, [])

  return (
   <main className="h-screen w-full flex bg-neutral-800 text-neutral-100 overflow-hidden relative">
  {/* Mobile backdrop overlay — shown only when sidebar is open on small screens */}
  {sidebarOpen && (
    <div
      onClick={() => setSidebarOpen(false)}
      className="fixed inset-0 bg-black/60 z-30 lg:hidden"
    />
  )}

  {/* ============ LEFT SECTION: Sidebar ============ */}
  <aside
    className={`
      fixed lg:static inset-y-0 left-0 z-40
      w-72 max-w-[80%] flex flex-col
      bg-neutral-900 border-r border-neutral-700
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
    `}
  >
    {/* Sidebar header: logo + close btn (mobile only) */}
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
          <FiZap className="text-neutral-900" size={16} />
        </div>
        <span className="font-semibold text-lg tracking-tight">Perplexity</span>
      </div>
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden p-1.5 rounded-md hover:bg-neutral-800 transition-colors"
      >
        <FiX size={20} />
      </button>
    </div>

    {/* New Thread button */}
    <div className="px-4 mb-3">
      <button className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 transition-colors text-white text-sm font-medium py-2.5 rounded-lg">
        <FiPlus size={16} />
        New Thread
      </button>
    </div>

    {/* Search bar */}
    <div className="px-4 mb-4">
      <div className="flex items-center gap-2 bg-neutral-800 rounded-lg px-3 py-2 border border-neutral-700 focus-within:border-teal-500 transition-colors">
        <FiSearch className="text-neutral-400 shrink-0" size={16} />
        <input
          type="text"
          placeholder="Search your threads..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-neutral-500"
        />
      </div>
    </div>

    {/* Chat history — scrollable list */}
    <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-2">
      <p className="px-3 py-1 text-xs uppercase tracking-wide text-neutral-500 font-medium">
        Recent
      </p>
      {Object.values(chats).map((item) => (
        <button
          onClick={() => openChat(item.id)} 
          key={item.id}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:bg-neutral-800 transition-colors text-left cursor-pointer"
        >
          <FiMessageSquare className="text-neutral-500 shrink-0" size={15} />
          <span className="truncate">{item.title}</span>
        </button>
      ))}
    </div>

    {/* Sidebar footer: username + plan */}
    <div className="border-t border-neutral-700 px-4 py-3">
      <button className="w-full flex items-center gap-3 hover:bg-neutral-800 rounded-lg px-2 py-2 transition-colors">
        <div className="h-9 w-9 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
          <FiUser size={16} className="text-neutral-300" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium truncate">
            {user?.name || "Guest User"}
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-teal-400">
            <FiZap size={10} />
            Pro Plan
          </span>
        </div>
        <FiSettings size={16} className="text-neutral-500 shrink-0" />
      </button>
    </div>
  </aside>

  {/* ============ RIGHT SECTION: Chat area ============ */}
  <section className="flex-1 flex flex-col min-w-0">
    {/* Top bar */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
      <div className="flex items-center gap-3">
        {/* Mobile-only menu toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 rounded-md hover:bg-neutral-700 transition-colors"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="text-sm sm:text-base font-medium text-neutral-200 truncate">
          What's the difference between SSR and CSR?
        </h1>
      </div>
      <button className="hidden sm:flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 transition-colors">
        Focus: Web
        <FiChevronDown size={14} />
      </button>
    </div>

    {/* Messages — scrollable */}
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-16 py-6 space-y-6">
      {chats[currentChatId]?.messages.map((msg) =>
        msg.role === "user" ? (
          // User message bubble
          <div key={msg.id} className="flex justify-end">
            <div className="max-w-[85%] sm:max-w-[70%] bg-neutral-700 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-neutral-100">
              {msg.content}
            </div>
          </div>
        ) : (
          // AI message block
          <div key={msg.id} className="flex gap-3 max-w-3xl">
            <div className="h-7 w-7 rounded-full bg-teal-500 flex items-center justify-center shrink-0 mt-0.5">
              <FiZap className="text-neutral-900" size={13} />
            </div>
            <div className="text-sm sm:text-[15px] leading-relaxed text-neutral-200 space-y-2">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="m-0 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="ml-5 list-disc space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="ml-5 list-decimal space-y-1">{children}</ol>,
                  code: ({ children, className }) => (
                    <code className={`rounded bg-neutral-800 px-1.5 py-0.5 text-[13px] ${className || ""}`}>
                      {children}
                    </code>
                  ),
                }}
              >
                {String(msg.content || "")}
              </ReactMarkdown>
            </div>
          </div>
        )
      )}
    </div>

    {/* Input box */}
    <div className="px-4 sm:px-8 lg:px-16 pb-4 sm:pb-6">
      <form
        onSubmit={handleSend}
        className="flex items-end gap-2 bg-neutral-900 border border-neutral-700 focus-within:border-teal-500 rounded-2xl px-3 py-2.5 transition-colors"
      >
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-neutral-800 transition-colors shrink-0"
        >
          <FiPaperclip size={17} className="text-neutral-400" />
        </button>
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent outline-none resize-none text-sm placeholder:text-neutral-500 max-h-32 py-1.5"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:bg-neutral-700 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          <FiSend size={15} className="text-white" />
        </button>
      </form>
    </div>
  </section>
</main>
  )
}

export default Dashboard