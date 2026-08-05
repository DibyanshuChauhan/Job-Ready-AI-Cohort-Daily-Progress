import { useState, useRef, useCallback, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import InputBar from '../components/InputBar';
import UserPromptCard from '../components/UserPromptCard';
import SolutionCard from '../components/SolutionCard';
import JudgePanel from '../components/JudgePanel';

/* ─── Mock AI response data ─── */
const MOCK_DATA = {
  problem: 'Explain the concept of Recursion in detail',
  solution_1: `## What is Recursion?€

**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it into smaller, simpler sub-problems.

### The Two Essential Components

Every recursive function must have:

1. **Base Case** — the condition that stops the recursion
2. **Recursive Case** — where the function calls itself with a smaller input

### Classic Example: Factorial

\`\`\`python
def factorial(n):
    # Base case: stop when n reaches 0
    if n == 0:
        return 1
    # Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
\`\`\`

### Stack Visualization

When \`factorial(3)\` is called:

\`\`\`
factorial(3)
  → 3 × factorial(2)
        → 2 × factorial(1)
              → 1 × factorial(0)
                    → 1  ← base case
\`\`\`

### Memoization (Optimization)

For expensive recursive computations, use **memoization** to cache results:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
\`\`\`

### Best Practices

- Always define a clear **base case** to prevent infinite recursion
- Ensure each recursive call **makes progress** toward the base case
- Prefer **iteration** when the call stack depth is a concern
- Use **tail recursion** where possible for efficiency
- Consider memoization for **overlapping subproblems**`,

  solution_2: `# Understanding Recursion

Recursion is a problem-solving approach where a function solves a problem by *solving smaller instances of the same problem* until it reaches a trivially simple case.

## Core Concept

Think of recursion like Russian nesting dolls (Matryoshka): each doll contains a smaller identical doll inside, until you reach the smallest one that contains nothing.

## The Three Laws of Recursion

1. **Must have a base case** — the simplest possible version of the problem
2. **Must change its state** — move closer to the base case with each call
3. **Must call itself** — the function must call itself recursively

## Simple Example

\`\`\`javascript
function countdown(n) {
  if (n <= 0) {
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);
}

countdown(3);
// Output: 3, 2, 1, Done!
\`\`\`

## Call Stack Memory

Each recursive call adds a **stack frame** to the call stack. Too many nested calls can cause a **stack overflow**:

\`\`\`
Call Stack:
┌─────────────────┐
│  countdown(1)   │
├─────────────────┤
│  countdown(2)   │
├─────────────────┤
│  countdown(3)   │
└─────────────────┘
\`\`\`

## When to Use Recursion

> Use recursion when the problem can be *naturally* broken into identical sub-problems.

- **Tree traversal** (file systems, DOM)
- **Sorting algorithms** (merge sort, quick sort)
- **Mathematical sequences** (Fibonacci, factorial)
- **Backtracking problems** (mazes, N-Queens)`,

  judge: {
    solution_1_score: 10,
    solution_2_score: 8,
    solution_1_reasoning: `Solution 1 is significantly more comprehensive and production-ready. It covers:
• Base Case identification
• Recursive Case mechanics
• Stack frame visualization
• Memoization with lru_cache
• Tail recursion optimization
• Best practices checklist
• Real-world Python examples

The explanation progresses logically from concept → implementation → optimization → best practices, making it ideal for both beginners and intermediate developers.`,
    solution_2_reasoning: `Solution 2 uses a helpful analogy (Russian dolls) and clearly states the Three Laws of Recursion, which is excellent for conceptual understanding. However, it lacks depth in:
• Missing memoization coverage
• No mention of tail recursion
• JavaScript example limits applicability
• Fewer real-world use-cases covered

While Solution 2 excels at conceptual clarity, Solution 1 provides a more complete technical reference.`,
  },
};

/* ─── Simulate async AI response (2.8s) ─── */
function simulateFetch(query) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...MOCK_DATA, problem: query }), 2800);
  });
}

/* ─── Toast ─── */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed bottom-32 right-6 z-[9999] animate-fade-in-up bg-card border border-line rounded-xl px-5 py-3 text-[14px] text-foreground"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
      role="status"
      aria-live="polite"
    >
      {message}
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
        <span className="text-[13px] text-subtle font-medium whitespace-nowrap">AI Responses</span>
        <div className="flex-1 h-px bg-line" />
        {isLoading && (
          <span className="flex items-center gap-1.5 text-[12px] text-primary-light">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                border: '1.5px solid rgba(99,102,241,0.3)',
                borderTop: '1.5px solid #818CF8',
                animation: 'spin-fast 0.8s linear infinite',
              }}
            />
            AI models responding…
          </span>
        )}
      </div>

      {/* Solutions side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SolutionCard
          solutionNum={1}
          modelName="GPT-4o"
          content={data?.solution_1}
          isLoading={isLoading}
          skeletonDelay={0}
          isWinner={!isLoading && !!data && isWinner1}
        />
        <SolutionCard
          solutionNum={2}
          modelName="Claude 3.5"
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
  const [activeNav,    setActiveNav]    = useState('new');
  const [entries,      setEntries]      = useState([]);
  const [isLoading,    setIsLoading]    = useState(false);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [inputDefault, setInputDefault] = useState('');
  const [toast,        setToast]        = useState(null);
  const bottomRef = useRef(null);

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
      const result = await simulateFetch(query);
      setEntries(prev => prev.map(e => e.id === newEntry.id ? { ...e, data: result, isLoading: false } : e));
    } catch {
      setEntries(prev => prev.map(e => e.id === newEntry.id ? { ...e, isLoading: false, error: true } : e));
      setToast('⚠️ Something went wrong. Please try again.');
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
      {/* Sidebar (fixed, hidden on mobile) */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onNewChat={handleNewChat}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[25] lg:hidden"
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