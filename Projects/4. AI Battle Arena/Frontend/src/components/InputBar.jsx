import { useRef, useEffect, useState } from 'react';

export default function InputBar({ onSubmit, isLoading, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
    if (defaultValue && textareaRef.current) {
      textareaRef.current.focus();
      autoResize({ target: textareaRef.current });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const autoResize = (e) => {
    const el = e.target ?? e;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
    if (e.target) setValue(el.value);
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    /* Fixed bottom bar — offset left of sidebar on desktop */
    <div
      className="glass fixed bottom-0 left-[260px] right-0 z-20 px-6 pt-4 pb-5 max-lg:left-0"
    >
      <div className="max-w-[900px] mx-auto flex flex-col gap-2">

        {/* ── Input container ── */}
        <div
          className="flex items-end gap-2.5 rounded-2xl px-4 py-3 transition-all duration-200"
          style={{
            background: '#18181B',
            border: `1px solid ${canSend ? 'rgba(99,102,241,0.4)' : '#27272A'}`,
            boxShadow: canSend ? '0 0 0 2px rgba(99,102,241,0.08)' : 'none',
          }}
        >
          {/* Attach + Voice */}
          <div className="flex gap-1.5 pb-0.5">
            <button className="icon-btn w-[34px] h-[34px] text-sm" aria-label="Attach file" title="Attach file" disabled={isLoading}>
              📎
            </button>
            <button className="icon-btn w-[34px] h-[34px] text-sm" aria-label="Voice input" title="Voice input" disabled={isLoading}>
              🎤
            </button>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            id="chat-input"
            value={value}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything… e.g. Explain recursion, Write a cover letter, Optimize my SQL query"
            rows={1}
            disabled={isLoading}
            aria-label="Chat input"
            className="flex-1 bg-transparent border-none outline-none resize-none text-foreground text-[15px] leading-relaxed overflow-y-auto pt-0.5"
            style={{
              fontFamily: 'var(--font-sans)',
              maxHeight: 160,
              scrollbarWidth: 'none',
            }}
          />

          {/* Send button */}
          <button
            className="btn-gradient w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
            onClick={handleSubmit}
            disabled={!canSend}
            aria-label="Send message"
          >
            {isLoading ? (
              <span
                className="block w-[18px] h-[18px] rounded-full"
                style={{
                  border: '2px solid rgba(255,255,255,0.25)',
                  borderTop: '2px solid white',
                  animation: 'spin-fast 0.8s linear infinite',
                }}
              />
            ) : (
              '↑'
            )}
          </button>
        </div>

        {/* ── Footer hint ── */}
        <p className="text-center text-[11px] text-subtle">
          DualMind AI compares two independent AI models ·{' '}
          <kbd
            className="px-1.5 py-0.5 rounded text-[10px] bg-line"
            style={{ fontFamily: 'var(--font-code)' }}
          >
            Enter
          </kbd>{' '}
          to send &nbsp;·&nbsp;{' '}
          <kbd
            className="px-1.5 py-0.5 rounded text-[10px] bg-line"
            style={{ fontFamily: 'var(--font-code)' }}
          >
            Shift+Enter
          </kbd>{' '}
          for new line
        </p>
      </div>
    </div>
  );
}
