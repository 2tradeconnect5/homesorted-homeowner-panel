import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const { verifyOTP, isLoading } = useAuth();
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      const focusIdx = Math.min(pasted.length, 5);
      otpRefs.current[focusIdx]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }
    const result = await verifyOTP('871234567', code, true);
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
        <h2 className="text-lg font-bold mb-1" style={{ color: '#1F2937' }}>Enter your code</h2>
        <p className="text-sm mb-6" style={{ color: '#566573' }}>
          Enter the 6-digit code to access your dashboard.
        </p>
        <form onSubmit={handleVerify}>
          <div className="flex gap-2.5 justify-center mb-5">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={i === 0 ? handleOtpPaste : undefined}
                className="w-12 h-14 rounded-[10px] text-center text-xl font-bold outline-none transition-colors"
                style={{ border: '2px solid #E5E8E8', color: '#1F2937' }}
                onFocus={(e) => (e.target.style.borderColor = '#8CC63F')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E8E8')}
                autoFocus={i === 0}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {error && <p className="text-sm mb-3 text-center" style={{ color: '#DC2626' }}>{error}</p>}
          <button
            type="submit"
            disabled={isLoading || otp.join('').length < 6}
            className="w-full py-3.5 rounded-[10px] text-white font-semibold text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform cursor-pointer"
            style={{ background: '#8CC63F' }}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Log In'}
          </button>
        </form>
      </div>

      <p className="text-xs mt-6 text-center" style={{ color: '#9CA3AF' }}>
        Demo code: 332244
      </p>
    </div>
  );
}
