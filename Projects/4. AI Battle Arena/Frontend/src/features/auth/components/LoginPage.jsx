import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Zap } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext.jsx';

// Google SVG icon
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading, error, clearError } = useAuthContext();

  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors]   = useState({});

  // Client-side field validation
  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch {
      // error is already set in context
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: '-100px', left: '50%',
          transform: 'translateX(-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 75%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div
        className="animate-fade-in-up relative z-10 w-full"
        style={{ maxWidth: '420px' }}
      >
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div
            style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
            }}
          >
            <Zap size={24} color="#fff" fill="#fff" />
          </div>
          <h1
            className="font-display font-bold text-foreground"
            style={{ fontSize: '24px', letterSpacing: '-0.3px' }}
          >
            Welcome back
          </h1>
          <p className="text-muted text-sm text-center">
            Sign in to your AI Battle Arena account
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(18,20,29,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '32px',
          }}
        >
          {/* Global server error */}
          {error && (
            <div
              role="alert"
              style={{
                background: 'rgba(244,63,94,0.1)',
                border: '1px solid rgba(244,63,94,0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '20px',
                color: '#FDA4AF',
                fontSize: '13.5px',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="login-email" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-muted)' }}>
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: '' })); }}
                placeholder="you@example.com"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${fieldErrors.email ? 'rgba(244,63,94,0.5)' : 'rgba(255,255,255,0.10)'}`,
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14.5px',
                  color: 'var(--color-foreground)',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                  width: '100%',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
                onBlur={e => e.target.style.borderColor = fieldErrors.email ? 'rgba(244,63,94,0.5)' : 'rgba(255,255,255,0.10)'}
              />
              {fieldErrors.email && <p style={{ fontSize: '12px', color: '#FDA4AF' }}>{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="login-password" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-muted)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: '' })); }}
                  placeholder="Enter your password"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${fieldErrors.password ? 'rgba(244,63,94,0.5)' : 'rgba(255,255,255,0.10)'}`,
                    borderRadius: '10px',
                    padding: '10px 42px 10px 14px',
                    fontSize: '14.5px',
                    color: 'var(--color-foreground)',
                    outline: 'none',
                    transition: 'border-color 0.15s ease',
                    width: '100%',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
                  onBlur={e => e.target.style.borderColor = fieldErrors.password ? 'rgba(244,63,94,0.5)' : 'rgba(255,255,255,0.10)'}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-subtle)', padding: '2px',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && <p style={{ fontSize: '12px', color: '#FDA4AF' }}>{fieldErrors.password}</p>}
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="btn-gradient"
              style={{
                width: '100%', padding: '11px', borderRadius: '10px',
                fontSize: '14.5px', marginTop: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ fontSize: '12px', color: 'var(--color-subtle)', whiteSpace: 'nowrap' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Google OAuth */}
          <button
            id="login-google"
            type="button"
            onClick={loginWithGoogle}
            disabled={isLoading}
            style={{
              width: '100%', padding: '10px 16px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'var(--color-foreground)', fontSize: '14px', fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Footer link */}
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13.5px', color: 'var(--color-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              style={{ color: '#818CF8', fontWeight: '600', textDecoration: 'none' }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
