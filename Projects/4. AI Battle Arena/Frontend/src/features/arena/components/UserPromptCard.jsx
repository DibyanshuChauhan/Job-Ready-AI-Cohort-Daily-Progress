import { User } from 'lucide-react';

export default function UserPromptCard({ prompt }) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="flex gap-3 animate-fade-in-up"
      role="article"
      aria-label="Your message"
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm"
        style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
      >
        <User className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[13.5px] font-bold text-foreground font-display">
            You
          </span>
          <span className="text-[11px] text-subtle">{timeStr}</span>
        </div>

        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 text-foreground"
          style={{ borderLeft: '3px solid #6366F1' }}
        >
          <p className="text-[14.5px] leading-relaxed m-0 break-words font-sans">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
