import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [, setIsAuthenticated] = useLocalStorage('adminAuthenticated', false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo credentials (in production, this would be server-side)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'gang2bang2024';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.username === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Ongeldige gebruikersnaam of wachtwoord');
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="card-dark p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#D61C1C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-[#D61C1C]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-[#A7A7AB] text-sm">
              Alleen voor geautoriseerd personeel
            </p>
          </div>

          {error && (
            <div className="bg-[#D61C1C]/20 border border-[#D61C1C]/30 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle size={18} className="text-[#D61C1C]" />
              <p className="text-[#D61C1C] text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Gebruikersnaam</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Gebruikersnaam"
                required
                className="bg-[#141416]"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Wachtwoord</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Wachtwoord"
                  required
                  className="bg-[#141416] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A7A7AB] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Bezig...
                </>
              ) : (
                'Inloggen'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[#A7A7AB] text-xs">
              Demo credentials: admin / gang2bang2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
