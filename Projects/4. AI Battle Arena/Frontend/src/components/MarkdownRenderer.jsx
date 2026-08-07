import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Check, Copy } from 'lucide-react';

/* Preprocess raw AI text to handle LaTeX delimiters and malformed backticks */
function preprocessMarkdown(text) {
  if (!text) return '';
  let result = text;

  // 1. Convert LaTeX block math: \[ ... \] -> \n$$\n...\n$$\n
  result = result.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `\n$$\n${math.trim()}\n$$\n`);

  // 2. Convert LaTeX inline math: \( ... \) -> $...$
  result = result.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math.trim()}$`);

  // 3. Fix malformed lone-backtick lines that AI models sometimes output instead of ```
  // Convert lines that contain only a single backticks ` to triple backticks ```
  result = result.replace(/(^|\n)[ \t]*`[ \t]*(\n|$)/g, '$1```\n$2');

  return result;
}

function CodeBlock({ lang, content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block my-3.5 relative overflow-hidden rounded-xl border border-line bg-[#0B0D14] shadow-md">
      {/* Header toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-line bg-black/40 text-[11px] font-code text-subtle">
        <span className="lowercase font-medium">{lang || 'code'}</span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border cursor-pointer"
          style={{
            background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.1)',
            borderColor: copied ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)',
            color: copied ? '#34D399' : '#A5B4FC',
          }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 m-0 overflow-x-auto font-code text-[13px] leading-relaxed text-slate-200">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  const processed = useMemo(() => preprocessMarkdown(content), [content]);

  return (
    <div className="md-content text-[14.5px] leading-relaxed font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && (match || codeString.includes('\n') || className)) {
              return <CodeBlock lang={lang} content={codeString} />;
            }
            return (
              <code
                className="font-code text-[12.5px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20"
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="my-4 overflow-x-auto rounded-xl border border-line shadow-sm">
                <table className="w-full border-collapse text-left text-sm">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-white/5 border-b border-line font-semibold text-foreground">{children}</thead>;
          },
          th({ children }) {
            return <th className="px-3.5 py-2.5 border-r border-line last:border-r-0 font-display">{children}</th>;
          },
          td({ children }) {
            return <td className="px-3.5 py-2.5 border-b border-line/50 border-r last:border-r-0 text-muted">{children}</td>;
          },
          h1({ children }) {
            return <h1 className="text-[18px] font-bold text-foreground font-display mt-4 mb-2">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-[16px] font-bold text-foreground font-display mt-4 mb-2">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-[14.5px] font-semibold text-foreground font-display mt-3 mb-1.5">{children}</h3>;
          },
          p({ children }) {
            return <p className="mb-2.5 text-foreground leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-5 mb-3 space-y-1 text-foreground">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-5 mb-3 space-y-1 text-foreground">{children}</ol>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-3 border-primary pl-3.5 my-3 italic text-muted bg-primary/5 py-1 rounded-r-lg">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}

