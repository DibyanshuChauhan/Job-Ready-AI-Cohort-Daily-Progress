export default function UserPromptCard({ prompt }) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="flex gap-3 animate-fade-in-up"
      role="article"
      aria-label="Your message"
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0 mt-0.5"
        style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
        aria-hidden="true"
      >
        JD
      </div>

      {/* Message */}
      <div className="flex-1">
        {/* Label row */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[14px] font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            You
          </span>
          <span className="text-[12px] text-subtle">{timeStr}</span>
        </div>

        {/* Bubble */}
        <div
          className="rounded-[0_16px_16px_16px] px-[18px] py-3.5"
          style={{
            background: 'rgba(99,102,241,0.07)',
            border: '1px solid rgba(99,102,241,0.18)',
            borderLeft: '3px solid #6366F1',
          }}
        >
          <p className="text-[15px] text-foreground leading-relaxed m-0 break-words">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
