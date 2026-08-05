export default function Header({ onToggleTheme, isDark, onToggleSidebar }) {
  return (
    <header
      className="glass fixed top-0 left-[260px] right-0 z-20 h-16 flex items-center justify-between px-6 max-lg:left-0"
      role="banner"
    >
      {/* ── Left ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          className="icon-btn lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div>
          <h1
            className="text-[16px] font-bold text-foreground leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AI Comparison Assistant
          </h1>
          <p className="text-[11px] text-subtle">Two models · One judge · Best answer</p>
        </div>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-2.5">
        {/* Theme toggle */}
        <button
          className="icon-btn text-base"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? '🌙' : '☀️'}
        </button>

        {/* Notifications */}
        <button
          className="icon-btn text-base relative"
          aria-label="Notifications"
        >
          🔔
          <span
            className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-primary"
            style={{ border: '2px solid #0F0F11' }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
          style={{
            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
            border: '2px solid rgba(99,102,241,0.4)',
          }}
          role="button"
          tabIndex={0}
          aria-label="Open user menu"
        >
          JD
        </div>
      </div>
    </header>
  );
}
