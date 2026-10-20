import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound, Eye, EyeOff, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BsmLogo } from './BsmLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsVerifying(true);

    setTimeout(() => {
      // Get saved custom PIN or fallback to default 'bsm1234'
      const savedPin = localStorage.getItem('bsm_admin_pin') || 'bsm1234';

      if (passwordInput.trim() === savedPin) {
        // Successful login
        sessionStorage.setItem('bsm_admin_auth', 'true');
        setIsVerifying(false);
        setPasswordInput('');
        onSuccess();
      } else {
        setIsVerifying(false);
        setErrorMessage('Kata sandi / PIN yang Anda masukkan salah. Akses ditolak.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <BsmLogo size="sm" className="bg-white p-1 rounded-md" />
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
              <Lock className="w-3 h-3" />
              <span>Area Khusus Admin</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-white mt-1">Verifikasi Akses CMS PT BSM</h2>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Masukkan Kata Sandi / PIN Rahasia Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Masukkan kata sandi admin..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isVerifying || !passwordInput.trim()}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              {isVerifying ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Buka Akses Admin</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Security Notice Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Keamanan Sesi Terenkripsi</span>
          <span className="font-semibold text-slate-700">PT Bintang Semesta Motor</span>
        </div>

      </div>
    </div>
  );
};
