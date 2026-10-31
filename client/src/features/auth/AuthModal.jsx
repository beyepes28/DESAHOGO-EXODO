import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister
      ? { email, password, full_name: fullName, phone }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al procesar la solicitud.');
      }

      // Guardar sesión
      localStorage.setItem('desahogo_token', data.token);
      localStorage.setItem('desahogo_user', JSON.stringify(data.user));

      if (onAuthSuccess) {
        onAuthSuccess(data.user, data.token);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@desahogo.com');
      setPassword('admin123');
      setIsRegister(false);
    } else {
      setEmail('sofia@desahogo.com');
      setPassword('sofia123');
      setIsRegister(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#16161A] border border-[#27272E] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#202028] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Encabezado */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E06D53]/15 text-[#E06D53] border border-[#E06D53]/30 text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {isRegister ? 'Nueva Comunidad' : 'Bienvenida de Regreso'}
          </div>
          <h3 className="text-2xl font-display font-medium text-white">
            {isRegister ? 'Crea tu Cuenta' : 'Iniciar Sesión'}
          </h3>
          <p className="text-xs text-neutral-400">
            {isRegister
              ? 'Regístrate para reservar talleres, pagar en línea y guardar tus recuerdos'
              : 'Accede a tus reservas, pulso emocional o panel de control'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Sofía Valenzuela"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E06D53]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Teléfono / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +57 300 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E06D53]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E06D53]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E06D53]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E06D53]/25 disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Procesando...' : isRegister ? 'Registrarme y Continuar' : 'Entrar a mi Cuenta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Acceso Rápido para Pruebas */}
        <div className="mt-5 pt-4 border-t border-[#27272E]">
          <span className="text-[11px] text-neutral-400 block mb-2 text-center">Acceso Rápido para Evaluación:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-1.5 px-2 rounded-lg bg-[#202028] hover:bg-[#2A2A36] text-[11px] text-[#D4A373] border border-[#D4A373]/30 font-medium transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
              Administradora
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('attendee')}
              className="py-1.5 px-2 rounded-lg bg-[#202028] hover:bg-[#2A2A36] text-[11px] text-neutral-300 border border-neutral-700 font-medium transition-colors"
            >
              Asistente Demo
            </button>
          </div>
        </div>

        {/* Alternar Registro / Login */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            {isRegister
              ? '¿Ya tienes una cuenta? Inicia sesión aquí'
              : '¿Aún no tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
}
