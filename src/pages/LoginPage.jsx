import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    const result = await login(email.trim().toLowerCase(), password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center max-w-[430px] mx-auto w-full px-6" style={{ background: '#F3F4F6' }}>
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/homesorted-logo.png" alt="HomeSorted" className="w-28 h-28 object-contain mb-2" />
        <h1 className="text-2xl font-bold" style={{ color: '#2C4459' }}>HomeSorted</h1>
        <p className="text-sm mt-1" style={{ color: '#566573' }}>Your home, always managed</p>
      </div>

      {/* Card */}
      <div className="w-full bg-white rounded-[12px] p-6" style={{ border: '1px solid #E5E8E8', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 className="text-lg font-bold mb-1" style={{ color: '#1F2937' }}>Welcome back</h2>
        <p className="text-sm mb-6" style={{ color: '#566573' }}>
          Sign in to access your home dashboard.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-[10px] px-4 py-3.5 text-sm outline-none transition-colors mb-4"
            style={{ border: '2px solid #E5E8E8', color: '#1F2937' }}
            onFocus={(e) => (e.target.style.borderColor = '#8CC63F')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E8E8')}
            autoFocus
            autoComplete="email"
          />
          <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-[10px] px-4 py-3.5 text-sm outline-none transition-colors mb-4"
            style={{ border: '2px solid #E5E8E8', color: '#1F2937' }}
            onFocus={(e) => (e.target.style.borderColor = '#8CC63F')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E8E8')}
            autoComplete="current-password"
          />
          {error && <p className="text-sm mb-3" style={{ color: '#DC2626' }}>{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-[10px] text-white font-semibold text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform cursor-pointer"
            style={{ background: '#8CC63F' }}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
