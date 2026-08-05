import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

function countWords(text)  { return text?.trim().split(/\s+/).filter(Boolean).length || 0; }
function readTime(words)   { return `${Math.ceil(words / 200)} min read`; }

/* ── Skeleton card shown while loading ── */
function SkeletonCard({ delay = 0 }) {
  return (
    <div
      className="bg-card border border-line rounded-[20px] p-5 card-hover"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
        <div className="flex-1 flex gap-2 items-center">
          <div className="skeleton w-24 h-4" />
          <div className="skeleton w-14 h-[18px] rounded-full" />
        </div>
        <div className="flex gap-1.5">
          {[0,1,2,3].map(i => <div key={i} className="skeleton w-7 h-7 rounded-md" />)}
        </div>
      </div>
      {/* Lines */}
      {[100, 88, 95, 72, 84].map((w, i) => (
        <div key={i} className="skeleton h-3.5 mb-2.5" style={{ width: `${w}%`, animationDelay: `${delay + i*60}ms` }} />
      ))}
      {/* Code block */}
      <div className="skeleton w-full h-[88px] rounded-[10px] my-3.5" style={{ animationDelay: `${delay+200}ms` }} />
      {[90, 78].map((w, i) => (
        <div key={i} className="skeleton h-3.5 mb-2.5" style={{ width: `${w}%`, animationDelay: `${delay+300+i*60}ms` }} />
      ))}
      {/* Footer */}
      <div className="flex gap-2 mt-4 pt-3.5 border-t border-line">
        <div className="skeleton w-16 h-3.5 rounded-full" />
        <div className="skeleton w-16 h-3.5 rounded-full" />
      </div>
    </div>
  );
}

export default function SolutionCard({ solutionNum, modelName, content, isLoading, skeletonDelay, isWinner }) {
  const [liked,    setLiked]    = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied,   setCopied]   = useState(false);
  const [expanded, setExpanded] = useState(false);

  const words    = countWords(content);
  const isPrimary = solutionNum === 1;
  const badgeClass = isPrimary ? 'badge-primary' : 'badge-violet';
  const avatarGrad = isPrimary
    ? 'linear-gradient(135deg,#6366F1,#818CF8)'
    : 'linear-gradient(135deg,#7C3AED,#A78BFA)';

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const handleLike    = () => { setLiked(p => !p); if (!liked) setDisliked(false); };
  const handleDislike = () => { setDisliked(p => !p); if (!disliked) setLiked(false); };

  if (isLoading) return <SkeletonCard delay={skeletonDelay || 0} />;

  return (
    <div
      className="bg-card rounded-[20px] flex flex-col card-hover animate-fade-in-up relative overflow-hidden"
      style={{
        border: isWinner ? '1px solid rgba(16,185,129,0.35)' : '1px solid #27272A',
        boxShadow: isWinner ? '0 0 30px rgba(16,185,129,0.07), 0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Winner ribbon */}
      {isWinner && (
        <div
          className="absolute top-3.5 -right-7 bg-emerald text-white text-[10px] font-bold px-9 py-0.5 tracking-widest"
          style={{ transform: 'rotate(45deg)' }}
        >
          WINNER
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center gap-2.5 px-[18px] pt-[18px]">
        <div
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: avatarGrad }}
          aria-hidden="true"
        >
          🤖
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="text-[16px] font-bold text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Solution {solutionNum}
            </h3>
            <span className={`badge ${badgeClass}`}>{modelName}</span>
            {isWinner && <span className="badge badge-emerald text-[10px]">🏆 Winner</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 flex-shrink-0">
          <button className={`icon-btn text-[13px] ${copied ? 'active' : ''}`} onClick={handleCopy} aria-label="Copy" title="Copy">
            {copied ? '✓' : '📋'}
          </button>
          <button className={`icon-btn text-[13px] ${liked ? 'active' : ''}`} onClick={handleLike} aria-label="Like">👍</button>
          <button
            className={`icon-btn text-[13px] ${disliked ? 'active' : ''}`}
            onClick={handleDislike}
            aria-label="Dislike"
            style={{ color: disliked ? '#EF4444' : undefined }}
          >
            👎
          </button>
          <button
            className="icon-btn text-[12px] transition-transform duration-200"
            onClick={() => setExpanded(p => !p)}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
          >
            ⬇
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-line mx-[18px] mt-3.5" />

      {/* ── Content ── */}
      <div
        className="px-[18px] py-3.5 flex-1 relative overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? 2000 : 420 }}
      >
        <MarkdownRenderer content={content} />
        {!expanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #18181B)' }}
          />
        )}
      </div>

      {/* Show more / less */}
      <button
        onClick={() => setExpanded(p => !p)}
        className="px-[18px] pb-1 text-[13px] font-semibold text-left bg-transparent border-none"
        style={{ color: expanded ? '#71717A' : '#818CF8' }}
      >
        {expanded ? 'Show less ↑' : 'Show more ↓'}
      </button>

      {/* ── Footer ── */}
      <div className="flex items-center gap-4 px-[18px] py-3 border-t border-line mt-2">
        <span className="text-[12px] text-subtle">{words} words</span>
        <span className="text-[12px] text-subtle">·</span>
        <span className="text-[12px] text-subtle">{readTime(words)}</span>
      </div>
    </div>
  );
}
