import { SquarePlus, Zap, X, MessageSquare, Trash2, Clock } from 'lucide-react';

function formatTimestamp(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  history = [],
  activeHistoryId = null,
  onSelectHistory,
  onDeleteHistory,
  isLoadingHistory = false,
}) {
  return (
    <aside
      aria-label="Sidebar navigation"
      className={`fixed inset-y-0 left-0 z-40 flex flex-col w-[260px] bg-sidebar border-r border-line transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20"
              style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
            >
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="gradient-text text-[16.5px] font-bold tracking-tight font-display">
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

        {/* Primary Action: New Arena Chat */}
        <button
          className="btn-gradient flex items-center justify-center gap-2 w-full py-2.5 px-3.5 rounded-xl text-[13px] font-semibold shadow-md shadow-indigo-500/10"
          onClick={() => {
            onNewChat();
            if (onClose) onClose();
          }}
        >
          <SquarePlus className="w-4 h-4" />
          <span>New Arena Chat</span>
        </button>
      </div>

      {/* Model Spec Box */}
      <div className="mx-3.5 my-1.5 p-3 rounded-xl bg-card/60 border border-line/60">
        <div className="flex items-center justify-between text-[10.5px] text-subtle mb-1">
          <span>Active Engine</span>
          <span className="text-indigo-400 font-medium">v2.4 Parallel</span>
        </div>
        <div className="flex items-center justify-between text-[11.5px] font-medium text-foreground">
          <span>Mistral vs Cohere</span>
          <span className="badge badge-primary text-[9.5px] py-0">Judge Active</span>
        </div>
      </div>

      {/* Chat History Section */}
      <div className="flex-1 flex flex-col min-h-0 px-3 pt-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle font-display flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-subtle" />
            Chat History
          </span>
          {history.length > 0 && (
            <span className="badge badge-primary text-[9.5px] py-0 px-1.5">
              {history.length}
            </span>
          )}
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {history.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <MessageSquare className="w-5 h-5 mx-auto mb-2 text-subtle/50" />
              <p className="text-[12px] text-subtle">
                {isLoadingHistory ? 'Loading history…' : 'No past comparisons yet'}
              </p>
              <p className="text-[10.5px] text-subtle/70 mt-0.5">
                Past battles will be saved to MongoDB
              </p>
            </div>
          ) : (
            history.map((item) => {
              const isActive = activeHistoryId === item._id;
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    onSelectHistory(item);
                    if (onClose) onClose();
                  }}
                  className={`group relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-500/15 border border-indigo-500/30 text-foreground shadow-sm'
                      : 'hover:bg-white/5 border border-transparent text-muted hover:text-foreground'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <MessageSquare
                      className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                        isActive ? 'text-indigo-400' : 'text-subtle group-hover:text-muted'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-medium leading-snug truncate">
                        {item.prompt}
                      </p>
                      <p className="text-[10px] text-subtle mt-0.5 flex items-center gap-1">
                        <span>{formatTimestamp(item.createdAt)}</span>
                        {item.judge && (
                          <>
                            <span>·</span>
                            <span className="text-amber-400/80">
                              🏆 Sol {item.judge.solution_1_score >= item.judge.solution_2_score ? 1 : 2}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Delete Item Button */}
                  <button
                    onClick={(e) => onDeleteHistory(item._id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-subtle hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    title="Delete chat"
                    aria-label="Delete history entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="h-px bg-line mx-4 my-2" />

      {/* User Profile */}
      <div className="flex items-center gap-3 mx-3 my-2.5 p-2 rounded-xl">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
        >
          DC
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-semibold text-foreground leading-tight truncate font-display">
            Divyanshu Chauhan
          </p>
          <span className="badge badge-violet mt-0.5 text-[9.5px]">MongoDB Synced</span>
        </div>
      </div>
    </aside>
  );
}
