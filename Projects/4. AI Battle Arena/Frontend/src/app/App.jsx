import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import InputBar from '../components/InputBar';
import UserPromptCard from '../components/UserPromptCard';
import SolutionCard from '../components/SolutionCard';
import JudgePanel from '../components/JudgePanel';

/* ─── Toast ─── */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed bottom-28 right-6 z-[9999] animate-fade-in-up bg-card/95 backdrop-blur-md border border-rose-500/30 rounded-xl px-4 py-3 text-[13.5px] text-foreground flex items-center gap-2.5 shadow-2xl shadow-rose-950/20"
      role="status"
      aria-live="polite"
    >
      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/* ─── Single chat turn ─── */
function ChatEntry({ entry }) {
  const { prompt, data, isLoading } = entry;
  const isWinner1 = data && data.judge?.solution_1_score >= data.judge?.solution_2_score;

  return (
    <div className="flex flex-col gap-6">
      <UserPromptCard prompt={prompt} />

      {/* AI Responses label */}
      <div className="flex items-center gap-3">
        <span className="text-[12.5px] text-subtle font-semibold uppercase tracking-wider font-display">
          AI Model Responses
        </span>
        <div className="flex-1 h-px bg-line" />
        {isLoading && (
          <span className="flex items-center gap-1.5 text-[12px] text-indigo-400 font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            Dual models processing in parallel…
          </span>
        )}
      </div>


      {/* Solutions side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SolutionCard
          solutionNum={1}
          modelName="Mistral"
          content={data?.solution_1}
          isLoading={isLoading}
          skeletonDelay={0}
          isWinner={!isLoading && !!data && isWinner1}
        />
        <SolutionCard
          solutionNum={2}
          modelName="Cohere"
          content={data?.solution_2}
          isLoading={isLoading}
          skeletonDelay={120}
          isWinner={!isLoading && !!data && !isWinner1}
        />
      </div>

      {/* Judge */}
      {(isLoading || data?.judge) && (
        <JudgePanel judge={data?.judge} isLoading={isLoading} />
      )}
    </div>
  );
}

/* ─── Root App ─── */
export default function App() {
  const [isDark,       setIsDark]       = useState(true);
  const [entries,      setEntries]      = useState([]);
  const [isLoading,    setIsLoading]    = useState(false);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [inputDefault, setInputDefault] = useState('');
  const [toast,        setToast]        = useState(null);
  const bottomRef = useRef(null);

  /* ── Sync Theme (Light / Dark) ── */
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  /* ── Auto-scroll to bottom on new entry/load ── */
  useEffect(() => {
    if (entries.length > 0) {
      const t = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [entries, isLoading]);

  /* ── Submit handler ── */
  const handleSubmit = useCallback(async (query) => {
    if (isLoading) return;
    const newEntry = { id: Date.now(), prompt: query, data: null, isLoading: true };
    setEntries(prev => [...prev, newEntry]);
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/invoke', { input: query });
      const result = response.data.result;
      setEntries(prev => prev.map(e => e.id === newEntry.id ? { ...e, data: result, isLoading: false } : e));
    } catch (err) {
      console.error('Error invoking backend graph:', err);
      setEntries(prev => prev.map(e => e.id === newEntry.id ? { ...e, isLoading: false } : e));
      setToast('Something went wrong connecting to the backend. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSuggestion = (text) => {
    setInputDefault(text);
    setTimeout(() => setInputDefault(''), 50);
    handleSubmit(text);
  };

  const handleNewChat = () => {
    setEntries([]);
    setInputDefault('');
  };

  /* ── Mobile sidebar overlay ── */
  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-base relative">
      {/* Sidebar drawer (fixed on desktop, slide-over on mobile) */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />


      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* ── Content column: offset from fixed sidebar ── */}
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        {/* Sticky header */}
        <Header
          isDark={isDark}
          onToggleTheme={() => setIsDark(p => !p)}
          onToggleSidebar={() => setSidebarOpen(p => !p)}
        />

        {/* Main scroll area: padded for header + input bar */}
        <main
          className="flex flex-col flex-1 pt-16 pb-[100px]"
          aria-label="Chat conversation"
          id="main-content"
        >
          {entries.length === 0 ? (
            /* ── Empty state fills remaining height ── */
            <div className="flex flex-col flex-1">
              <EmptyState onSuggestion={handleSuggestion} />
            </div>
          ) : (
            /* ── Conversation feed ── */
            <div className="max-w-[960px] w-full mx-auto px-5 py-7 flex flex-col gap-12">
              {entries.map((entry) => (
                <ChatEntry key={entry.id} entry={entry} />
              ))}
              <div ref={bottomRef} className="h-1" />
            </div>
          )}
        </main>

        {/* Fixed input bar */}
        <InputBar
          onSubmit={handleSubmit}
          isLoading={isLoading}
          defaultValue={inputDefault}
        />
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}