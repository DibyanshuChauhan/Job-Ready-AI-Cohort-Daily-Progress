import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Toast from '../components/layout/Toast';
import EmptyState from '../features/arena/components/EmptyState';
import InputBar from '../features/arena/components/InputBar';
import UserPromptCard from '../features/arena/components/UserPromptCard';
import SolutionCard from '../features/arena/components/SolutionCard';
import JudgePanel from '../features/arena/components/JudgePanel';
import { useArena } from '../features/arena/hooks/useArena';

/* Single chat turn */
function ChatTurn({ entry }) {
  const { prompt, data, isLoading } = entry;
  const isWinner1 = data && data.judge?.solution_1_score >= data.judge?.solution_2_score;

  return (
    <div className="flex flex-col gap-6">
      <UserPromptCard prompt={prompt} />

      {/* AI Responses Status Label */}
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

      {/* Solutions side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SolutionCard
          solutionNum={1}
          modelName="Mistral Medium"
          content={data?.solution_1}
          isLoading={isLoading}
          skeletonDelay={0}
          isWinner={!isLoading && !!data && isWinner1}
        />
        <SolutionCard
          solutionNum={2}
          modelName="Cohere Command"
          content={data?.solution_2}
          isLoading={isLoading}
          skeletonDelay={120}
          isWinner={!isLoading && !!data && !isWinner1}
        />
      </div>

      {/* Autonomous Judge Recommendation */}
      {(isLoading || data?.judge) && (
        <JudgePanel judge={data?.judge} isLoading={isLoading} />
      )}
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputDefault, setInputDefault] = useState('');
  const bottomRef = useRef(null);

  const { entries, isLoading, toast, submitPrompt, clearChat, dismissToast } = useArena();

  /* Sync Theme (Light / Dark) */
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  /* Auto-scroll to bottom on new entry or status update */
  useEffect(() => {
    if (entries.length > 0) {
      const t = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [entries, isLoading]);

  const handleSuggestion = (text) => {
    setInputDefault(text);
    setTimeout(() => setInputDefault(''), 50);
    submitPrompt(text);
  };

  const handleNewChat = () => {
    clearChat();
    setInputDefault('');
  };

  return (
    <div className="min-h-screen bg-base relative">
      {/* Sidebar drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        <Header
          isDark={isDark}
          onToggleTheme={() => setIsDark((p) => !p)}
          onToggleSidebar={() => setSidebarOpen((p) => !p)}
        />

        <main
          className="flex flex-col flex-1 pt-16 pb-[100px]"
          aria-label="Chat conversation"
          id="main-content"
        >
          {entries.length === 0 ? (
            <div className="flex flex-col flex-1">
              <EmptyState onSuggestion={handleSuggestion} />
            </div>
          ) : (
            <div className="max-w-[960px] w-full mx-auto px-5 py-7 flex flex-col gap-12">
              {entries.map((entry) => (
                <ChatTurn key={entry.id} entry={entry} />
              ))}
              <div ref={bottomRef} className="h-1" />
            </div>
          )}
        </main>

        <InputBar
          onSubmit={submitPrompt}
          isLoading={isLoading}
          defaultValue={inputDefault}
        />
      </div>

      {/* Error Toast */}
      {toast && <Toast message={toast} onDone={dismissToast} />}
    </div>
  );
}