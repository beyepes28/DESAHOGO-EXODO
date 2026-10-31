import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  RefreshCw,
  CheckCircle,
  CreditCard,
  Layers
} from 'lucide-react';

export default function AdminDashboardView({
  workshops,
  onOpenCreateWorkshop,
  onOpenEditWorkshop,
  onDeleteWorkshop,
  currentUser
}) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview', 'services', 'bookings', 'users'

  const fetchStats = async () => {
    setLoading(true);
    const token = localStorage.getItem('desahogo_token');
    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error cargando estadísticas de administración:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [workshops]);

  const kpis = stats?.kpis || {
    totalRevenue: workshops.reduce((acc, w) => acc + (w.base_price * 4), 0),
    totalBookingsCount: 16,
    totalAttendeesCount: 12,
    activeWorkshopsCount: workshops.length,
    avgTicket: 65
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner Superior de Administradora */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1E1924] via-[#16161D] to-[#1F1714] border border-[#3A2C27] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/40 text-xs font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Panel Ejecutivo &bull; Administradora
          </div>
          <h2 className="text-3xl font-display font-medium text-white">
            Gestión de Talleres & Analítica
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl">
            Bienvenida, <strong className="text-white">{currentUser?.full_name || 'Elena Santillán'}</strong>. Supervisa el flujo de caja, cupos de asistencia, usuarios registrados y catálogo de experiencias vivenciales en portada.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={fetchStats}
            className="p-3 rounded-2xl bg-[#202028] text-neutral-300 hover:text-white border border-[#27272E] text-xs font-medium flex items-center gap-2 transition-colors"
            title="Refrescar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
          <button
            onClick={onOpenCreateWorkshop}
            className="px-5 py-3 rounded-2xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#E06D53]/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Nuevo Taller en Portada
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Ingresos por Reservas</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-emerald-400">
            ${kpis.totalRevenue?.toLocaleString('en-US')} <span className="text-xs text-neutral-400 font-normal">USD</span>
          </div>
          <p className="text-[11px] text-neutral-500">Recaudación por pagos confirmados</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Reservas Totales</span>
            <Calendar className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {kpis.totalBookingsCount}
          </div>
          <p className="text-[11px] text-neutral-500">Cupos reservados en sesiones</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Servicios / Talleres Activos</span>
            <Layers className="w-4 h-4 text-[#E06D53]" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {kpis.activeWorkshopsCount}
          </div>
          <p className="text-[11px] text-neutral-500">Publicados en el catálogo principal</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Asistentes Registrados</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {kpis.totalAttendeesCount}
          </div>
          <p className="text-[11px] text-neutral-500">Usuarios con perfil activo</p>
        </div>
      </div>

      {/* Subnavegación de Pestañas del Panel */}
      <div className="flex items-center gap-2 border-b border-[#27272E] pb-3">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'overview'
              ? 'bg-[#E06D53] text-white shadow-md shadow-[#E06D53]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#1A1A22]'
          }`}
        >
          Gestión de Servicios & Catálogo ({workshops.length})
        </button>
        <button
          onClick={() => setActiveSubTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'bookings'
              ? 'bg-[#E06D53] text-white shadow-md shadow-[#E06D53]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#1A1A22]'
          }`}
        >
          Historial de Pagos & Reservas
        </button>
        <button
          onClick={() => setActiveSubTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'users'
              ? 'bg-[#E06D53] text-white shadow-md shadow-[#E06D53]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#1A1A22]'
          }`}
        >
          Usuarios Registrados
        </button>
      </div>

      {/* Subtab 1: Gestión de Talleres Vivenciales (Crear / Editar / Eliminar) */}
      {activeSubTab === 'overview' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-medium text-white">
                Catálogo de Talleres en la Página Principal
              </h3>
              <p className="text-xs text-neutral-400">
                Cualquier cambio que realices aquí se reflejará instantáneamente en la portada para los asistentes.
              </p>
            </div>
            <button
              onClick={onOpenCreateWorkshop}
              className="px-4 py-2.5 rounded-xl bg-[#E06D53] text-white text-xs font-semibold flex items-center gap-2 self-start sm:self-center shadow-md shadow-[#E06D53]/20"
            >
              <Plus className="w-3.5 h-3.5" />
              Añadir Nuevo Servicio
            </button>
          </div>

          <div className="divide-y divide-[#27272E]">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={workshop.hero_image_url}
                    alt={workshop.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#27272E]"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white"
                        style={{ backgroundColor: `${workshop.color_accent || '#E06D53'}E6` }}
                      >
                        {workshop.target_need}
                      </span>
                      <span className="text-xs text-neutral-400">{workshop.duration_minutes} min</span>
                      <span className="text-xs text-neutral-400">&bull; Máx. {workshop.max_capacity} plazas</span>
                    </div>
                    <h4 className="text-base font-semibold text-white group-hover:text-[#D4A373] transition-colors">
                      {workshop.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-1 max-w-xl">
                      {workshop.subtitle || workshop.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-white block">
                      ${workshop.base_price} <span className="text-xs text-neutral-400 font-normal">USD</span>
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">Activo en portada</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenEditWorkshop(workshop)}
                      className="p-2.5 rounded-xl bg-[#202028] hover:bg-[#2A2A36] text-neutral-300 hover:text-white border border-[#27272E] transition-colors"
                      title="Modificar servicio"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteWorkshop(workshop.id)}
                      className="p-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 border border-red-900/40 transition-colors"
                      title="Eliminar del catálogo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Historial de Reservas y Pagos */}
      {activeSubTab === 'bookings' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-medium text-white">
              Transacciones & Reservas de Asistentes
            </h3>
            <span className="text-xs text-neutral-400 font-mono">
              {stats?.recentBookings?.length || 0} registros recientes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-[#1C1C24] text-neutral-400 uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Referencia / Pago</th>
                  <th className="p-3.5">Asistente</th>
                  <th className="p-3.5">Taller Reservado</th>
                  <th className="p-3.5">Monto Pagado</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 rounded-r-xl">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272E]">
                {(stats?.recentBookings || []).map((b) => (
                  <tr key={b.id} className="hover:bg-[#1A1A22] transition-colors">
                    <td className="p-3.5 font-mono text-[#D4A373]">{b.payment_reference || b.id}</td>
                    <td className="p-3.5">
                      <span className="font-medium text-white block">{b.user_name || 'Asistente'}</span>
                      <span className="text-[11px] text-neutral-500">{b.user_email || 'correo@ejemplo.com'}</span>
                    </td>
                    <td className="p-3.5 font-medium text-white">{b.workshop_title || 'Taller Vivencial'}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">${b.paid_amount} USD</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                        {b.status === 'confirmed' ? 'Confirmado & Pagado' : b.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-neutral-400">
                      {new Date(b.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Usuarios Registrados */}
      {activeSubTab === 'users' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-medium text-white">
              Directorio de Usuarios
            </h3>
            <span className="text-xs text-neutral-400 font-mono">
              {stats?.registeredUsers?.length || 0} usuarios
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(stats?.registeredUsers || []).map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-[#1C1C24] border border-[#2B2B36] flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-full bg-[#E06D53]/20 text-[#E06D53] flex items-center justify-center font-bold text-sm shrink-0">
                  {u.full_name ? u.full_name[0] : 'U'}
                </div>
                <div className="space-y-0.5 truncate flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white truncate">{u.full_name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                      u.role === 'admin'
                        ? 'bg-amber-950/40 text-[#D4A373] border-amber-800/40'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                    }`}>
                      {u.role === 'admin' ? 'Admin' : 'Asistente'}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 block truncate">{u.email}</span>
                  {u.phone && <span className="text-[10px] text-neutral-500 block">{u.phone}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
