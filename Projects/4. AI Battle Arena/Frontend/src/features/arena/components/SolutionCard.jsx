import { useState } from 'react';
import { Bot, Copy, Check, ChevronDown, Trophy } from 'lucide-react';
import MarkdownRenderer from '../../../components/ui/MarkdownRenderer';

function countWords(text) { return text?.trim().split(/\s+/).filter(Boolean).length || 0; }
function readTime(words) { return `${Math.max(1, Math.ceil(words / 200))} min read`; }

function SkeletonCard({ delay = 0 }) {
  return (
    <div
      className="bg-card border border-line rounded-2xl p-5 card-hover"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 flex gap-2 items-center">
          <div className="skeleton w-24 h-4" />
          <div className="skeleton w-16 h-5 rounded-full" />
        </div>
        <div className="skeleton w-7 h-7 rounded-lg" />
      </div>
      {[100, 88, 95, 72, 84].map((w, i) => (
        <div key={i} className="skeleton h-3.5 mb-2.5" style={{ width: `${w}%`, animationDelay: `${delay + i * 60}ms` }} />
      ))}
      <div className="skeleton w-full h-20 rounded-xl my-3" style={{ animationDelay: `${delay + 200}ms` }} />
    </div>
  );
}

export default function SolutionCard({ solutionNum, modelName, content, isLoading, skeletonDelay, isWinner }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const words = countWords(content);
  const isPrimary = solutionNum === 1;
  const badgeClass = isPrimary ? 'badge-primary' : 'badge-violet';

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading) return <SkeletonCard delay={skeletonDelay || 0} />;

  return (
    <div
      className="bg-card rounded-2xl flex flex-col card-hover animate-fade-in-up relative overflow-hidden transition-all duration-200"
      style={{
        border: isWinner ? '1px solid rgba(16,185,129,0.4)' : '1px solid var(--color-line)',
        boxShadow: isWinner ? '0 0 25px rgba(16,185,129,0.08), 0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
            style={{ background: isPrimary ? 'linear-gradient(135deg,#6366F1,#818CF8)' : 'linear-gradient(135deg,#7C3AED,#A78BFA)' }}
          >
            <Bot className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h3 className="text-[15px] font-bold text-foreground font-display">
              Solution {solutionNum}
            </h3>
            <span className={`badge ${badgeClass}`}>{modelName}</span>
            {isWinner && (
              <span className="badge badge-emerald text-[10.5px]">
                <Trophy className="w-3 h-3 text-emerald-400" />
                Winner
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button className={`icon-btn w-7 h-7 ${copied ? 'active' : ''}`} onClick={handleCopy} aria-label="Copy" title="Copy">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="h-px bg-line mx-4" />

      <div
        className="px-4 py-3 flex-1 relative overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? 2000 : 400 }}
      >
        <MarkdownRenderer content={content} />
        {!expanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-card))' }}
          />
        )}
      </div>

      <button
        onClick={() => setExpanded(p => !p)}
        className="px-4 pb-2 text-[12.5px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-transparent border-none cursor-pointer transition-colors"
      >
        <span>{expanded ? 'Show less' : 'Show full response'}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <div className="flex items-center gap-3 px-4 py-2.5 border-t border-line text-[11.5px] text-subtle">
        <span>{words} words</span>
        <span>·</span>
        <span>{readTime(words)}</span>
      </div>
    </div>
  );
}
