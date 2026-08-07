import { useRef, useEffect, useState } from 'react';
import { Paperclip, Mic, ArrowUp, Loader2 } from 'lucide-react';

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
    <div className="glass fixed bottom-0 left-[260px] right-0 z-20 px-6 pt-3.5 pb-4 max-lg:left-0">
      <div className="max-w-[900px] mx-auto flex flex-col gap-2">
        {/* Input box */}
        <div
          className="flex items-end gap-2 rounded-2xl px-3.5 py-2.5 transition-all duration-200"
          style={{
            background: 'var(--color-card)',
            border: `1px solid ${canSend ? 'rgba(99,102,241,0.5)' : 'var(--color-line)'}`,
            boxShadow: canSend ? '0 0 20px rgba(99,102,241,0.12)' : '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          {/* Action Tools */}
          <div className="flex items-center gap-1 pb-0.5">
            <button
              className="icon-btn w-8 h-8 text-subtle hover:text-foreground"
              aria-label="Attach file"
              title="Attach file"
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              className="icon-btn w-8 h-8 text-subtle hover:text-foreground"
              aria-label="Voice input"
              title="Voice input"
              disabled={isLoading}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            id="chat-input"
            value={value}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            placeholder="Ask DualMind Arena… e.g. Compare REST vs GraphQL, Explain recursion, Optimize SQL"
            rows={1}
            disabled={isLoading}
            aria-label="Chat input"
            className="flex-1 bg-transparent border-none outline-none resize-none text-foreground text-[14.5px] leading-relaxed overflow-y-auto pt-1 font-sans placeholder:text-subtle"
            style={{ maxHeight: 160, scrollbarWidth: 'none' }}
          />

          {/* Send Button */}
          <button
            className="btn-gradient w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            onClick={handleSubmit}
            disabled={!canSend}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Footer Shortcut Hints */}
        <p className="text-center text-[11px] text-subtle flex items-center justify-center gap-1.5">
          <span>DualMind AI synthesizes responses in parallel</span>
          <span>·</span>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 border border-line font-code">
            Enter ↵
          </kbd>
          <span>to send</span>
          <span>·</span>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 border border-line font-code">
            Shift+Enter
          </kbd>
          <span>new line</span>
        </p>
      </div>
    </div>
  );
}

