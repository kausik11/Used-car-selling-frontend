import { useMemo, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const USERS_STORAGE_KEY = 'demoUsers';

const getUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const normalizeEmail = (value) => value.trim().toLowerCase();

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [mode, setMode] = useState(() => (location.pathname === '/signup' ? 'register' : 'login'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isLogin = mode === 'login';
  const title = useMemo(() => (isLogin ? 'Login to your account' : 'Create a new account'), [isLogin]);
  const redirectTo = location.state?.from || '/';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const safeEmail = normalizeEmail(email);
    const users = getUsers();
    const existingUser = users.find((user) => normalizeEmail(user.email) === safeEmail);

    if (!safeEmail || !password.trim() || (!isLogin && !name.trim())) {
      setError('Please fill all required fields.');
      return;
    }

    if (isLogin) {
      if (!existingUser || existingUser.password !== password) {
        setError('Invalid email or password.');
        return;
      }

      login(`demo-token-${Date.now()}`, {
        name: existingUser.name,
        email: existingUser.email,
        provider: 'email',
      });
      navigate(redirectTo, { replace: true });
      return;
    }

    if (existingUser) {
      setError('This email is already registered. Please login.');
      return;
    }

    const nextUser = {
      id: Date.now(),
      name: name.trim(),
      email: safeEmail,
      password,
      provider: 'email',
    };
    saveUsers([nextUser, ...users]);
    login(`demo-token-${Date.now()}`, { name: nextUser.name, email: nextUser.email, provider: 'email' });
    navigate(redirectTo, { replace: true });
  };

  const handleGoogleLogin = () => {
    const users = getUsers();
    const googleEmail = 'demo.google@example.com';
    const existing = users.find((user) => normalizeEmail(user.email) === googleEmail);

    if (!existing) {
      saveUsers([
        {
          id: Date.now(),
          name: 'Demo Google User',
          email: googleEmail,
          password: '',
          provider: 'google',
        },
        ...users,
      ]);
    }

    login(`google-demo-token-${Date.now()}`, {
      name: 'Demo Google User',
      email: googleEmail,
      provider: 'google',
    });
    navigate(redirectTo, { replace: true });
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-13rem)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-[#0f102e] p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Welcome to Demo</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">Buy, compare, and save your next car with confidence.</h1>
          <p className="mt-4 max-w-lg text-white/80">
            Use your email and password or continue with Google. Your account helps you save cars and manage your preferences.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {isLogin ? 'No account yet?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => {
                setMode(isLogin ? 'register' : 'login');
                setError('');
              }}
              className="font-bold text-violet-700 hover:text-violet-800"
            >
              {isLogin ? 'Register now' : 'Login instead'}
            </button>
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isLogin ? (
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-violet-500"
                  placeholder="Enter your full name"
                />
              </div>
            ) : null}

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
                Email ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-violet-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-violet-500"
                placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
              />
            </div>

            {error ? <p className="rounded-lg bg-rose-50 p-2 text-xs font-semibold text-rose-700">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-800"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <FaGoogle className="text-rose-500" /> Continue with Google
          </button>

          <p className="mt-5 text-center text-xs text-slate-500">
            By continuing, you agree to our <Link to="/" className="font-semibold text-violet-700">Terms</Link> and{' '}
            <Link to="/" className="font-semibold text-violet-700">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
