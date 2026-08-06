import { useState, useEffect } from 'react';

/* ── Animated progress bar ── */
function ProgressBar({ value, isPrimary, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay + 120);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="progress-track mt-1.5">
      <div
        style={{
          height: '100%',
          borderRadius: 99,
          background: isPrimary ? 'linear-gradient(90deg,#6366F1,#8B5CF6)' : 'rgba(161,161,170,0.35)',
          width: `${width}%`,
          transition: 'width 0.85s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  );
}

/* ── Expandable accordion ── */
function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-line rounded-[10px] overflow-hidden mt-2.5">
      <button
        onClick={() => setOpen(p => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-medium text-foreground text-left border-none transition-colors duration-150"
        style={{ background: open ? 'rgba(99,102,241,0.06)' : 'transparent', fontFamily: 'var(--font-sans)' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(99,102,241,0.03)'; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
      >
        <span>{title}</span>
        <span
          className="text-subtle text-[13px] transition-transform duration-250"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          ▾
        </span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.28s cubic-bezier(0.4,0,0.2,1)' }}>
        <div className="px-4 py-3 text-[14px] text-muted leading-relaxed border-t border-line">
          {content}
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton ── */
function JudgeSkeleton() {
  return (
    <div className="judge-card p-7 animate-fade-in">
      <div className="flex items-center gap-3.5 mb-5">
        <div className="skeleton w-[52px] h-[52px] rounded-full" />
        <div className="flex-1">
          <div className="skeleton w-[45%] h-5 mb-2" />
          <div className="skeleton w-[30%] h-3.5" />
        </div>
      </div>
      <div className="h-px mb-5" style={{ background: 'rgba(245,158,11,0.15)' }} />
      <div className="skeleton w-1/2 h-10 rounded-full mx-auto mb-6" />
      <div className="grid grid-cols-2 gap-5 mb-5">
        {[0, 1].map(i => (
          <div key={i}>
            <div className="skeleton w-3/5 h-3.5 mb-2" />
            <div className="skeleton w-2/5 h-7 mb-2" />
            <div className="skeleton w-full h-2 rounded-full" />
          </div>
        ))}
      </div>
      {[100, 85, 90, 78].map((w, i) => (
        <div key={i} className="skeleton h-3.5 mb-2" style={{ width: `${w}%` }} />
      ))}
      <p className="text-center text-[13px] mt-5" style={{ color: 'rgba(245,158,11,0.55)' }}>
        ⭐ Analyzing responses…
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
    .slice(0, 7) || [];

  return (
    <div className="judge-card animate-fade-in-up delay-300">
      {/* ── Header ── */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-3.5 mb-2">
          <span
            className="text-[40px] leading-none animate-pulse-glow"
            style={{ filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.5))' }}
            aria-hidden="true"
          >
            🏆
          </span>
          <div>
            <h2
              className="text-[21px] font-extrabold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Judge Recommendation
            </h2>
            <p className="text-[13px] mt-0.5" style={{ color: 'rgba(245,158,11,0.65)' }}>
              Powered by AI Evaluation
            </p>
          </div>
        </div>
        <div className="h-px my-4" style={{ background: 'rgba(245,158,11,0.15)' }} />
      </div>

      {/* ── Winner badge ── */}
      <div className="text-center px-6 pb-5">
        <span className="badge badge-winner">🥇 Winner: Solution {winner}</span>
      </div>

      {/* ── Scores ── */}
      <div className="grid grid-cols-2 gap-5 px-6 pb-5">
        {[
          { num: 1, score: s1, isPrimary: winner === 1, delay: 0 },
          { num: 2, score: s2, isPrimary: winner === 2, delay: 150 },
        ].map(({ num, score, isPrimary, delay }) => (
          <div key={num}>
            <p className="text-[13px] font-medium text-muted mb-1">Solution {num}</p>
            <p
              className="text-[27px] font-extrabold leading-none mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                background: isPrimary ? 'linear-gradient(135deg,#818CF8,#A78BFA)' : 'none',
                WebkitBackgroundClip: isPrimary ? 'text' : 'unset',
                WebkitTextFillColor: isPrimary ? 'transparent' : '#A1A1AA',
                backgroundClip: isPrimary ? 'text' : 'unset',
              }}
            >
              {score}
              <span
                className="text-base font-normal"
                style={{ WebkitTextFillColor: '#71717A', color: '#71717A' }}
              >
                /10
              </span>
            </p>
            <ProgressBar value={(score / 10) * 100} isPrimary={isPrimary} delay={delay} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px mx-6 mb-5" style={{ background: 'rgba(245,158,11,0.10)' }} />

      {/* ── Recommendation ── */}
      <div className="px-6 pb-5">
        <h3
          className="text-[15px] font-bold text-foreground mb-2.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Recommended Answer
        </h3>
        <p className="text-[14px] text-muted leading-relaxed mb-3">
          Solution {winner} provides a significantly more comprehensive explanation.
          {highlights.length > 0 && ' It covers:'}
        </p>
        {highlights.length > 0 ? (
          <ul className="flex flex-col gap-1.5 list-none">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-baseline gap-2 text-[14px] text-muted">
                <span className="text-amber flex-shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[14px] text-muted leading-relaxed">{winReason}</p>
        )}
      </div>

      {/* ── Accordions ── */}
      <div className="px-6 pb-6">
        <Accordion title={`Why Solution ${winner} won?`} content={winReason || 'No detailed reasoning provided.'} />
        <Accordion title={`Why Solution ${winner === 1 ? 2 : 1} scored lower?`} content={loseReason || 'No detailed reasoning provided.'} />
      </div>
    </div>
  );
}
