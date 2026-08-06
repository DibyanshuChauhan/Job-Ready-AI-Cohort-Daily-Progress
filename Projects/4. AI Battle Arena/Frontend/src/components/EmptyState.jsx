const SUGGESTIONS = [
  { icon: '🔄', text: 'Explain recursion' },
  { icon: '🔍', text: 'What is RAG?' },
  { icon: '🌐', text: 'Design a REST API' },
  { icon: '⚛️', text: 'Create a React auth flow' },
];

export default function EmptyState({ onSuggestion }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center animate-fade-in">

      {/* ── Robot with glow ── */}
      <div
        className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-5xl mb-7"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          border: '1px solid rgba(99,102,241,0.14)',
        }}
      >
        🤖
      </div>

      {/* ── Headline ── */}
      <h2
        className="gradient-text font-bold leading-tight tracking-tight mb-3 max-w-[500px]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 4vw, 32px)',
        }}
      >
        Compare Two AI Solutions Instantly
      </h2>

      {/* ── Subtitle ── */}
      <p className="text-muted text-[15px] leading-relaxed max-w-[460px] mb-9">
        Ask a question and receive two independent AI‑generated answers, followed
        by an AI Judge that evaluates both and recommends the best response.
      </p>

      {/* ── Suggestion chips ── */}
      <div
        className="grid grid-cols-2 gap-2.5 w-full max-w-[480px]"
        role="group"
        aria-label="Suggested prompts"
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            className="chip text-left"
            onClick={() => onSuggestion(s.text)}
            aria-label={`Try: ${s.text}`}
          >
            <span className="text-base">{s.icon}</span>
            <span className="flex-1">{s.text}</span>
            <span className="text-subtle text-xs">→</span>
          </button>
        ))}
      </div>

      {/* ── Model badges ── */}
      <div className="flex gap-2 mt-8 flex-wrap justify-center">
        {['Mistral', 'Cohere', 'AI Judge'].map((m) => (
          <span key={m} className="badge badge-primary">{m}</span>
        ))}
      </div>
    </div>
  );
}
