import React from 'react';
import {
  Sparkles,
  HeartPulse,
  BarChart3,
  Image as ImageIcon,
  Flame,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const isAdmin = currentUser?.role === 'admin';

  const tabs = [
    { id: 'workshops', label: 'Talleres Vivenciales', icon: Sparkles },
    { id: 'pulse', label: 'Pulso Emocional', icon: HeartPulse },
    { id: 'vault', label: 'Bóveda de Recuerdos', icon: ImageIcon },
    { id: 'analytics', label: 'Métricas de Impacto', icon: BarChart3 },
  ];

  if (isAdmin) {
    tabs.push({ id: 'admin', label: 'Administración', icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F11]/90 backdrop-blur-md border-b border-[#27272E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo de Marca */}
        <div
          onClick={() => setActiveTab('workshops')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E06D53] to-[#9B2226] flex items-center justify-center text-white shadow-lg shadow-[#E06D53]/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-medium tracking-tight text-white block">
              DESAHOGO <span className="text-[#D4A373] italic font-normal">&amp; ÉXODO</span>
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-mono block -mt-1">
              Catarsis &bull; Bienestar &bull; Resiliencia
            </span>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#E06D53] text-white shadow-md shadow-[#E06D53]/25'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1A1A22]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'admin' && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-md bg-amber-400/20 text-[#D4A373] text-[10px] font-mono">
                    Admin
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Área de Usuario / Autenticación */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2.5 bg-[#16161A] border border-[#27272E] px-3 py-1.5 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-[#E06D53]/20 text-[#E06D53] flex items-center justify-center font-bold text-xs">
                {currentUser.full_name ? currentUser.full_name[0] : 'U'}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-semibold text-white block truncate max-w-[120px]">
                  {currentUser.full_name}
                </span>
                <span className="text-[10px] text-[#D4A373] font-mono">
                  {currentUser.role === 'admin' ? 'Administradora' : 'Asistente'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl hover:bg-[#202028] text-neutral-400 hover:text-red-400 transition-colors ml-1"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-[#1A1A22] transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Iniciar Sesión</span>
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold transition-all shadow-md shadow-[#E06D53]/20 flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Registrarme</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Barra móvil para cambiar de pestaña en pantallas pequeñas */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#27272E] px-2 py-2 bg-[#0F0F11]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 ${
                isActive ? 'text-[#E06D53]' : 'text-neutral-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px]">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
