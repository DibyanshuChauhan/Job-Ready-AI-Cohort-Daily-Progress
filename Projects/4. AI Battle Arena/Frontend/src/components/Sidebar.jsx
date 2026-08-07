import { SquarePlus, MessageSquare, Star, Zap, X, MoreHorizontal } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'new',       icon: SquarePlus,    label: 'New Arena Chat' },
  { id: 'history',   icon: MessageSquare, label: 'Chat History'   },
  { id: 'favorites', icon: Star,          label: 'Favorites'      },
];

export default function Sidebar({ isOpen, onClose, activeNav, onNavChange, onNewChat }) {
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

        {/* Navigation */}
        <nav>
          <ul className="flex flex-col gap-1 list-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onNavChange(item.id);
                      if (item.id === 'new') onNewChat();
                      if (onClose) onClose();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
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
      <div
        className="flex items-center gap-3 mx-3 my-3 p-2.5 rounded-xl transition-colors duration-150 hover:bg-white/5 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="User profile menu"
      >
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
        <MoreHorizontal className="w-4 h-4 text-subtle" />
      </div>
    </aside>
  );
}

