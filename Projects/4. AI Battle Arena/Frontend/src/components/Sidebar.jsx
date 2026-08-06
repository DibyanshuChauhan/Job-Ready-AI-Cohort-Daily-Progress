const NAV_ITEMS = [
  { id: 'new',       icon: '✏️',  label: 'New Chat'     },
  { id: 'history',   icon: '💬',  label: 'Chat History' },
  { id: 'favorites', icon: '⭐',  label: 'Favorites'    },
];

export default function Sidebar({ activeNav, onNavChange, onNewChat }) {
  return (
    <aside
      aria-label="Sidebar navigation"
      className="fixed inset-y-0 left-0 z-30 flex flex-col w-[260px] bg-sidebar border-r border-line"
    >
      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-7">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
          >
            ⚡
          </div>
          <span
            className="gradient-text text-[18px] font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DualMind AI
          </span>
        </div>

        {/* ── Nav ── */}
        <nav>
          <ul className="flex flex-col gap-1 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => {
                    onNavChange(item.id);
                    if (item.id === 'new') onNewChat();
                  }}
                  aria-current={activeNav === item.id ? 'page' : undefined}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Divider */}
      <div className="h-px bg-line mx-5" />

      {/* ── User profile ── */}
      <div
        className="flex items-center gap-3 mx-2 my-2 p-3 rounded-xl transition-colors duration-150 hover:bg-[rgba(99,102,241,0.07)]"
        role="button"
        tabIndex={0}
        aria-label="User profile menu"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
        >
          JD
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-[13px] font-semibold text-foreground leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            John Doe
          </p>
          <span className="badge badge-violet mt-0.5">Pro Plan</span>
        </div>
        <span className="text-subtle text-base">⋯</span>
      </div>
    </aside>
  );
}
