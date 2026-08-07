import { Menu, Moon, Sun } from 'lucide-react';

export default function Header({ onToggleTheme, isDark, onToggleSidebar }) {
  return (
    <header
      className="glass fixed top-0 left-[260px] right-0 z-20 h-16 flex items-center justify-between px-6 max-lg:left-0"
      role="banner"
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          className="icon-btn lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[15px] font-bold text-foreground leading-tight font-display">
              AI Battle Arena
            </h1>
            <span className="badge badge-emerald hidden sm:inline-flex text-[10.5px] py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Models
            </span>
          </div>
          <p className="text-[11px] text-subtle">Side-by-side model comparison & AI evaluation</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2.5">
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white shadow-sm"
          style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
        >
          DC
        </div>
      </div>
    </header>
  );
}
