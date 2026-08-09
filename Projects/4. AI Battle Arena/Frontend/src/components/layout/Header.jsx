import { Menu, Moon, Sun, LogOut } from 'lucide-react';
import { useAuthContext } from '../../features/auth/context/AuthContext.jsx';

function getInitials(name, email) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'U';
}

export default function Header({ onToggleTheme, isDark, onToggleSidebar }) {
  const { user, logout } = useAuthContext();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const initials = getInitials(user?.displayName, user?.email);

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
        {/* Theme switch */}
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User avatar badge */}
        <div className="flex items-center gap-2 pl-1">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover border border-indigo-500/30 shadow-sm"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white shadow-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
            >
              {initials}
            </div>
          )}
          <span className="text-[12.5px] font-medium text-foreground hidden md:inline-block max-w-[120px] truncate">
            {displayName}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-medium text-subtle hover:text-rose-400 hover:bg-rose-500/10 border border-line/60 hover:border-rose-500/30 transition-all duration-150"
          title="Log out"
          aria-label="Log out of account"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

