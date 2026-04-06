import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const { requestOTP, verifyOTP, isLoading } = useAuth();
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (phone.length < 7 || phone.length > 10) {
      setError('Please enter a valid Irish phone number');
      return;
    }
    const result = await requestOTP(phone);
    if (result.success) {
      setStep('otp');
    } else {
      setError(result.message);
    }
  };

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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }
    const result = await verifyOTP(phone, code, rememberMe);
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
        {step === 'phone' ? (
          <>
            <h2 className="text-lg font-bold mb-1" style={{ color: '#1F2937' }}>Welcome back</h2>
            <p className="text-sm mb-6" style={{ color: '#566573' }}>
              Enter your phone number and we'll send a code to your WhatsApp.
            </p>
            <form onSubmit={handleRequestOTP}>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Phone number
              </label>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-[10px] px-4 py-3.5 text-sm font-semibold" style={{ background: '#F4FBE7', color: '#5A8A2A' }}>
                  +353
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="87 123 4567"
                  className="flex-1 rounded-[10px] px-4 py-3.5 text-sm outline-none transition-colors"
                  style={{ border: '2px solid #E5E8E8', color: '#1F2937' }}
                  onFocus={(e) => (e.target.style.borderColor = '#8CC63F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E8E8')}
                  autoFocus
                />
              </div>
              {error && <p className="text-sm mb-3" style={{ color: '#DC2626' }}>{error}</p>}
              <button
                type="submit"
                disabled={isLoading || phone.length < 7}
                className="w-full py-3.5 rounded-[10px] text-white font-semibold text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform cursor-pointer"
                style={{ background: '#8CC63F' }}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send Code via WhatsApp'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-1" style={{ color: '#1F2937' }}>Enter your code</h2>
            <p className="text-sm mb-6" style={{ color: '#566573' }}>
              We sent a 6-digit code to your WhatsApp at +353 {phone}
            </p>
            <form onSubmit={handleVerifyOTP}>
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
              <label className="flex items-center gap-2.5 mb-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4.5 h-4.5 rounded cursor-pointer accent-[#8CC63F]"
                />
                <span className="text-sm" style={{ color: '#566573' }}>Remember me on this device</span>
              </label>
              <button
                type="submit"
                disabled={isLoading || otp.join('').length < 6}
                className="w-full py-3.5 rounded-[10px] text-white font-semibold text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform cursor-pointer"
                style={{ background: '#8CC63F' }}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify Code'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); setError(''); }}
                className="w-full mt-3 py-3 rounded-[10px] text-sm font-medium active:scale-[0.98] transition-transform cursor-pointer"
                style={{ border: '2px solid #E5E8E8', color: '#566573' }}
              >
                Change Number
              </button>
            </form>
          </>
        )}
      </div>

      <p className="text-xs mt-6 text-center" style={{ color: '#9CA3AF' }}>
        We'll send a one-time code to your WhatsApp
      </p>
      <p className="text-xs mt-2 text-center" style={{ color: '#9CA3AF' }}>
        Demo: Use any phone number, OTP is 123456
      </p>
    </div>
  );
}
