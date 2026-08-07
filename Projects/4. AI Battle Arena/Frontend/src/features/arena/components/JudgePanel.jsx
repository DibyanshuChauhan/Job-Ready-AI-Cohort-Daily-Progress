import { useState, useEffect } from 'react';
import { Trophy, Sparkles, ChevronDown, CheckCircle2, Award } from 'lucide-react';

function ProgressBar({ value, isPrimary, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay + 100);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="h-2 rounded-full bg-white/5 border border-line/60 overflow-hidden mt-2">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          background: isPrimary
            ? 'linear-gradient(90deg,#6366F1,#8B5CF6)'
            : 'rgba(148,163,184,0.3)',
          width: `${width}%`,
        }}
      />
    </div>
  );
}

function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-line/70 rounded-xl overflow-hidden mt-2 bg-card/40">
      <button
        onClick={() => setOpen(p => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-[13.5px] font-medium text-foreground text-left border-none bg-transparent hover:bg-white/5 cursor-pointer transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-subtle transition-transform duration-200 ${open ? 'rotate-180 text-amber-400' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 py-3 text-[13.5px] text-muted leading-relaxed border-t border-line/50 bg-base/30">
          {content}
        </div>
      )}
    </div>
  );
}

function JudgeSkeleton() {
  return (
    <div className="judge-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="skeleton w-44 h-4 mb-1.5" />
          <div className="skeleton w-28 h-3" />
        </div>
      </div>
      <div className="skeleton w-36 h-8 rounded-full mx-auto mb-5" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="skeleton h-16 rounded-xl" />
        <div className="skeleton h-16 rounded-xl" />
      </div>
      <p className="text-center text-xs text-amber-400/70 flex items-center justify-center gap-1.5 mt-4">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        Evaluating dual model outputs…
      </p>
    </div>
  );
}

export default function JudgePanel({ judge, isLoading }) {
  if (isLoading) return <JudgeSkeleton />;
  if (!judge) return null;

  const { solution_1_score: s1, solution_2_score: s2, solution_1_reasoning: r1, solution_2_reasoning: r2 } = judge;
  const winner = s1 >= s2 ? 1 : 2;
  const winReason = winner === 1 ? r1 : r2;
  const loseReason = winner === 1 ? r2 : r1;

  const highlights = winReason
    ?.split(/[•·\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 4)
    .slice(0, 5) || [];

  return (
    <div className="judge-card animate-fade-in-up delay-200">
      {/* Header */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-foreground font-display">
                Autonomous Judge Decision
              </h2>
              <p className="text-[11.5px] text-amber-400/80">AI Evaluation Protocol v2.4</p>
            </div>
          </div>
          <span className="badge badge-winner">
            <Award className="w-3.5 h-3.5" />
            Winner: Solution {winner}
          </span>
        </div>
      </div>

      <div className="h-px bg-amber-500/15 mx-6" />

      {/* Scores comparison */}
      <div className="grid grid-cols-2 gap-4 px-6 py-5">
        {[
          { num: 1, score: s1, isPrimary: winner === 1, delay: 0 },
          { num: 2, score: s2, isPrimary: winner === 2, delay: 150 },
        ].map(({ num, score, isPrimary, delay }) => (
          <div key={num} className="p-3.5 rounded-xl bg-card/40 border border-line/40">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted">Solution {num} Score</span>
              {isPrimary && <span className="badge badge-emerald text-[9.5px] py-0">Highest</span>}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-extrabold font-display ${isPrimary ? 'text-indigo-400' : 'text-slate-400'}`}>
                {score}
              </span>
              <span className="text-xs text-subtle">/ 10</span>
            </div>
            <ProgressBar value={(score / 10) * 100} isPrimary={isPrimary} delay={delay} />
          </div>
        ))}
      </div>

      {/* Rationale Key Highlights */}
      <div className="px-6 pb-4">
        <h3 className="text-[14px] font-bold text-foreground mb-2.5 font-display">
          Key Evaluation Summary
        </h3>
        {highlights.length > 0 ? (
          <ul className="flex flex-col gap-1.5 list-none">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13.5px] text-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13.5px] text-muted leading-relaxed">{winReason}</p>
        )}
      </div>

      {/* Accordions */}
      <div className="px-6 pb-5">
        <Accordion title={`Why Solution ${winner} won?`} content={winReason || 'No detailed reasoning provided.'} />
        <Accordion title={`Why Solution ${winner === 1 ? 2 : 1} scored lower?`} content={loseReason || 'No detailed reasoning provided.'} />
      </div>
    </div>
  );
}
