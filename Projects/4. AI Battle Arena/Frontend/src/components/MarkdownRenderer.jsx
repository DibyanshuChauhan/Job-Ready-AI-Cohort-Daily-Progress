import { useState } from 'react';

// Lightweight markdown-to-JSX parser
function parseMarkdown(md) {
  if (!md) return [];
  const lines = md.split('\n');
  const nodes = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') { i++; continue; }

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push({ type: 'code', lang, content: codeLines.join('\n') });
      i++;
      continue;
    }

    // Markdown Table
    if (line.trim().startsWith('|') && lines[i + 1] && lines[i + 1].includes('---')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (rowStr) => {
          const cells = rowStr.split('|');
          if (cells[0].trim() === '') cells.shift();
          if (cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();
          return cells.map(c => c.trim());
        };

        const headers = parseRow(tableLines[0]);
        const rows = tableLines.slice(2).map(parseRow);
        nodes.push({ type: 'table', headers, rows });
        continue;
      }
    }

    // H1
    if (line.startsWith('# ')) {
      nodes.push({ type: 'h1', content: line.slice(2) });
      i++; continue;
    }
    // H2
    if (line.startsWith('## ')) {
      nodes.push({ type: 'h2', content: line.slice(3) });
      i++; continue;
    }
    // H3
    if (line.startsWith('### ')) {
      nodes.push({ type: 'h3', content: line.slice(4) });
      i++; continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      nodes.push({ type: 'blockquote', content: line.slice(2) });
      i++; continue;
    }

    // Unordered list
    if (line.match(/^[-*+] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*+] /)) {
        items.push(lines[i].replace(/^[-*+] /, ''));
        i++;
      }
      nodes.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      nodes.push({ type: 'ol', items });
      continue;
    }

    // Paragraph
    nodes.push({ type: 'p', content: line });
    i++;
  }

  return nodes;
}

// Inline markdown (bold, italic, code, links)
function renderInline(text) {
  if (!text) return null;
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic *text*
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    // Inline code `text`
    const codeMatch = remaining.match(/`(.+?)`/);

    const candidates = [
      boldMatch   && { index: boldMatch.index,   len: boldMatch[0].length,   type: 'bold',   inner: boldMatch[1] },
      italicMatch && { index: italicMatch.index,  len: italicMatch[0].length,  type: 'italic',  inner: italicMatch[1] },
      codeMatch   && { index: codeMatch.index,    len: codeMatch[0].length,    type: 'code',    inner: codeMatch[1] },
    ].filter(Boolean).sort((a, b) => a.index - b.index);

    if (candidates.length === 0) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const first = candidates[0];
    if (first.index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, first.index)}</span>);
    }

    if (first.type === 'bold') {
      parts.push(<strong key={key++}>{first.inner}</strong>);
    } else if (first.type === 'italic') {
      parts.push(<em key={key++}>{first.inner}</em>);
    } else if (first.type === 'code') {
      parts.push(<code key={key++}>{first.inner}</code>);
    }

    remaining = remaining.slice(first.index + first.len);
  }

  return parts;
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
    <div className="code-block" style={{ margin: '14px 0' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            textTransform: 'lowercase',
          }}
        >
          {lang || 'code'}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          style={{
            background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.1)',
            border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)'}`,
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 11,
            fontWeight: 600,
            color: copied ? '#10B981' : 'var(--primary-light)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ padding: '14px', margin: 0, overflowX: 'auto' }}>
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#E4E4E7' }}>
          {content}
        </code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  const nodes = parseMarkdown(content);

  return (
    <div className="md-content" style={{ fontSize: 15, lineHeight: 1.7 }}>
      {nodes.map((node, i) => {
        switch (node.type) {
          case 'h1':
            return <h1 key={i} style={{ marginTop: i === 0 ? 0 : undefined }}>{renderInline(node.content)}</h1>;
          case 'h2':
            return <h2 key={i}>{renderInline(node.content)}</h2>;
          case 'h3':
            return <h3 key={i}>{renderInline(node.content)}</h3>;
          case 'p':
            return <p key={i}>{renderInline(node.content)}</p>;
          case 'ul':
            return (
              <ul key={i}>
                {node.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} style={{ marginLeft: 18 }}>
                {node.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case 'blockquote':
            return <blockquote key={i}>{renderInline(node.content)}</blockquote>;
          case 'code':
            return <CodeBlock key={i} lang={node.lang} content={node.content} />;
          case 'table':
            return (
              <div key={i} style={{ margin: '14px 0', overflowX: 'auto', borderRadius: 10, border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                      {node.headers.map((header, hIdx) => (
                        <th key={hIdx} style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderRight: '1px solid var(--border)' }}>
                          {renderInline(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {node.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: rIdx === node.rows.length - 1 ? 'none' : '1px solid var(--border)' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '10px 14px', color: 'var(--text)', borderRight: cIdx === row.length - 1 ? 'none' : '1px solid var(--border)' }}>
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
