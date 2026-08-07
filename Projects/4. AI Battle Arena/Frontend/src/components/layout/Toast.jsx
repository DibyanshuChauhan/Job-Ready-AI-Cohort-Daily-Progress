import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed bottom-28 right-6 z-[9999] animate-fade-in-up bg-card/95 backdrop-blur-md border border-rose-500/30 rounded-xl px-4 py-3 text-[13.5px] text-foreground flex items-center gap-2.5 shadow-2xl shadow-rose-950/20"
      role="status"
      aria-live="polite"
    >
      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
