import React, { useState } from 'react';
import { Lock, Mail, Key, AlertCircle, ArrowLeft } from 'lucide-react';
import { ManovaLogo } from '../ManovaLogo';
import { ADMIN_EMAIL } from '../../services/adminAuth';

interface AdminLoginProps {
  onSuccess: (email: string) => void;
  onExit: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onExit }) => {
  // Input fields start empty so user must submit their email & password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড উভয়ই লিখুন।');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const normalizedInputEmail = trimmedEmail.toLowerCase();
      const targetAdminEmail = ADMIN_EMAIL.toLowerCase();

      // Check fixed email
      if (normalizedInputEmail !== targetAdminEmail) {
        setError('ভুল ইমেইল! নির্ধারিত অ্যাডমিন ইমেইল ব্যবহার করুন।');
        setIsLoading(false);
        return;
      }

      // Check password: user requested "Obaidullah1168@gmail.com" as password
      const savedPass = localStorage.getItem('manova_admin_password');
      const validPasswords = [
        ADMIN_EMAIL,
        'Admin@1168',
        'Obaidullah1168',
        '1168',
        ...(savedPass ? [savedPass] : [])
      ];

      if (!validPasswords.includes(trimmedPassword)) {
        setError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।');
        setIsLoading(false);
        return;
      }

      // Login success
      setIsLoading(false);
      onSuccess(ADMIN_EMAIL);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#060C16] text-white flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Horological ambient background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, #2A7B9B 0%, transparent 60%)'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-[#2A7B9B]/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm bg-[#0F172A] border border-[#2A7B9B]/30 rounded-2xl p-6 sm:p-7 shadow-2xl">
        
        {/* Simple Clean Header: Only Logo & Clean Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-3">
            <ManovaLogo variant="iconOnly" isDark={true} size="md" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            মার্চেন্ট অ্যাডমিন লগইন
          </h2>
        </div>

        {/* Error Alert (only shows if wrong credentials submitted) */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Login Form: ONLY Email & Password fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              ইমেইল (Email)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <Mail className="w-4 h-4 text-[#3EB2DB]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="ইমেইল লিখুন..."
                className="w-full pl-9 pr-3 py-2.5 bg-[#060C16] border border-[#2A7B9B]/40 rounded-xl text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-[#3EB2DB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              পাসওয়ার্ড (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <Key className="w-4 h-4 text-[#3EB2DB]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="পাসওয়ার্ড লিখুন..."
                className="w-full pl-9 pr-3 py-2.5 bg-[#060C16] border border-[#2A7B9B]/40 rounded-xl text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-[#3EB2DB]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#2A7B9B] hover:bg-[#20637c] text-white font-semibold rounded-xl text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-60"
          >
            <Lock className="w-4 h-4" />
            <span>{isLoading ? 'যাচাই হচ্ছে...' : 'লগইন করুন'}</span>
          </button>
        </form>

        {/* Return to website */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 text-center">
          <button
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ওয়েবসাইটে ফিরে যান</span>
          </button>
        </div>

      </div>
    </div>
  );
};
