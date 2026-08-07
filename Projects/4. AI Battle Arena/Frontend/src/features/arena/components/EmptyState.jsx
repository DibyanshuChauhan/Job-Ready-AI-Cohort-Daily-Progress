import { Sparkles, ArrowRight, Code2, Search, Globe, Atom } from 'lucide-react';

const SUGGESTIONS = [
  { icon: Code2,  text: 'Explain recursion with visual steps' },
  { icon: Search, text: 'What is Retrieval-Augmented Generation (RAG)?' },
  { icon: Globe,  text: 'Design a scalable REST API architecture' },
  { icon: Atom,   text: 'Create a React authorization hook' },
];

export default function EmptyState({ onSuggestion }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center animate-fade-in relative z-10">
      {/* SaaS Feature Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Dual Model Arena v2.4</span>
      </div>

      {/* Hero Headline */}
      <h2
        className="gradient-text font-extrabold leading-tight tracking-tight mb-3 max-w-[560px] font-display"
        style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}
      >
        Compare Two AI Models Side-by-Side
      </h2>

      {/* Subtitle */}
      <p className="text-muted text-[14.5px] leading-relaxed max-w-[480px] mb-10">
        Prompt once and evaluate answers from Mistral and Cohere in real-time. An autonomous AI Judge scores and recommends the superior solution.
      </p>

      {/* Suggestion Chips */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[520px]"
        role="group"
        aria-label="Suggested prompts"
      >
        {SUGGESTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.text}
              className="chip text-left group"
              onClick={() => onSuggestion(s.text)}
              aria-label={`Try: ${s.text}`}
            >
              <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0 group-hover:text-indigo-300 transition-colors" />
              <span className="flex-1 text-[13.5px] line-clamp-1">{s.text}</span>
              <ArrowRight className="w-3.5 h-3.5 text-subtle group-hover:translate-x-0.5 group-hover:text-foreground transition-all" />
            </button>
          );
        })}
      </div>

      {/* Model Tech Badges */}
      <div className="flex items-center gap-2.5 mt-10 flex-wrap justify-center">
        <span className="text-xs text-subtle font-medium">Evaluated Models:</span>
        <span className="badge badge-primary">Mistral Medium</span>
        <span className="badge badge-violet">Cohere Command</span>
        <span className="badge badge-emerald">Autonomous Judge</span>
      </div>
    </div>
  );
}
