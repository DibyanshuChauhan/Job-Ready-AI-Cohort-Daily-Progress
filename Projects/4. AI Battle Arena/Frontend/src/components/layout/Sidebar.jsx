import { SquarePlus, Zap, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, onNewChat }) {
  return (
    <aside
      aria-label="Sidebar navigation"
      className={`fixed inset-y-0 left-0 z-40 flex flex-col w-[260px] bg-sidebar border-r border-line transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20"
              style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
            >
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="gradient-text text-[17px] font-bold tracking-tight font-display">
              DualMind AI
            </span>
          </div>

          <button
            onClick={onClose}
            className="icon-btn lg:hidden text-lg w-8 h-8 flex items-center justify-center rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          className="nav-item active flex items-center gap-2.5 w-full py-2.5 px-3 rounded-xl text-[13.5px] font-medium"
          onClick={() => {
            onNewChat();
            if (onClose) onClose();
          }}
        >
          <SquarePlus className="w-4 h-4 text-indigo-400" />
          <span>New Arena Chat</span>
        </button>
      </div>

      {/* Model Spec Box */}
      <div className="mx-4 my-2 p-3.5 rounded-xl bg-card/60 border border-line/60">
        <div className="flex items-center justify-between text-[11px] text-subtle mb-1.5">
          <span>Active Pair</span>
          <span className="text-indigo-400 font-medium">v2.4 Engine</span>
        </div>
        <div className="flex items-center justify-between text-[12px] font-medium text-foreground">
          <span>Mistral vs Cohere</span>
          <span className="badge badge-primary text-[10px] py-0">Parallel</span>
        </div>
      </div>

      <div className="flex-1" />
      <div className="h-px bg-line mx-5" />

      {/* User Profile */}
      <div className="flex items-center gap-3 mx-3 my-3 p-2.5 rounded-xl">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
        >
          DC
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground leading-tight truncate font-display">
            Divyanshu Chauhan
          </p>
          <span className="badge badge-violet mt-0.5 text-[10px]">Pro Plan</span>
        </div>
      </div>
    </aside>
  );
}
