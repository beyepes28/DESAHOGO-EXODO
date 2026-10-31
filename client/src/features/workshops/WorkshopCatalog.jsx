import React, { useState } from 'react';
import { Clock, Users, ArrowRight, ShieldCheck, HeartPulse, Sparkles, Plus, Edit2 } from 'lucide-react';

export default function WorkshopCatalog({
  workshops,
  onSelectWorkshop,
  onBookWorkshop,
  isAdmin,
  onOpenCreateWorkshop,
  onOpenEditWorkshop
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Todas las Experiencias' },
    { id: 'burnout', label: 'Burnout & Sobrecarga' },
    { id: 'duelo', label: 'Duelo & Pérdida' },
    { id: 'ansiedad', label: 'Ansiedad & Control' },
    { id: 'rabia', label: 'Ira & Descompresión' },
    { id: 'panico', label: 'Hiperactivación' },
  ];

  const filteredWorkshops = workshops.filter((w) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'burnout') return w.target_need.toLowerCase().includes('burnout');
    if (selectedFilter === 'duelo') return w.target_need.toLowerCase().includes('duelo');
    if (selectedFilter === 'ansiedad') return w.target_need.toLowerCase().includes('ansiedad');
    if (selectedFilter === 'rabia') return w.target_need.toLowerCase().includes('ira') || w.target_need.toLowerCase().includes('rabia');
    if (selectedFilter === 'panico') return w.target_need.toLowerCase().includes('pánico') || w.target_need.toLowerCase().includes('hiperactivación');
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#27272E] bg-gradient-to-r from-[#18181F] via-[#14141A] to-[#1F1916] p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E06D53]/15 text-[#E06D53] border border-[#E06D53]/30 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            Catarsis Vivencial Guiada
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-white leading-tight">
            Nombrar, romper, soltar y reparar.
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
            Cinco espacios inmersivos diseñados para liberar la sobrecarga emocional donde las palabras no alcanzan. Mediante arte gestual, bioenergética, ruptura ritualizada y alquimia sensorial.
          </p>

          {/* Banner de Administradora en Portada */}
          {isAdmin && (
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={onOpenCreateWorkshop}
                className="px-5 py-2.5 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#E06D53]/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Crear Nuevo Taller para Portada
              </button>
              <span className="text-xs text-[#D4A373] font-mono">
                Modo Administradora Activo: Puedes editar cualquier servicio directamente.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Filtros & Control Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                selectedFilter === f.id
                  ? 'bg-[#E06D53] text-white border-[#E06D53] shadow-md shadow-[#E06D53]/20'
                  : 'bg-[#16161A] text-neutral-400 border-[#27272E] hover:border-neutral-500 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            onClick={onOpenCreateWorkshop}
            className="sm:hidden px-4 py-2 rounded-xl bg-[#E06D53] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Nuevo Servicio
          </button>
        )}
      </div>

      {/* Grid de Talleres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredWorkshops.map((workshop) => (
          <div
            key={workshop.id}
            className="group rounded-3xl bg-[#16161A] border border-[#27272E] overflow-hidden flex flex-col justify-between hover:border-neutral-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1 relative"
          >
            {/* Imagen del taller con overlay */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={workshop.hero_image_url}
                alt={workshop.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-black/30" />
              
              <div className="absolute top-4 left-4">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md backdrop-blur-md"
                  style={{ backgroundColor: `${workshop.color_accent || '#E06D53'}E6` }}
                >
                  {workshop.target_need}
                </span>
              </div>

              <div className="absolute bottom-3 right-4">
                <span className="text-xl font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                  ${workshop.base_price} <span className="text-xs text-neutral-300 font-normal">USD</span>
                </span>
              </div>

              {/* Botón de Edición Rápida si es Administradora */}
              {isAdmin && (
                <button
                  onClick={() => onOpenEditWorkshop(workshop)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/75 hover:bg-[#E06D53] text-white border border-white/20 shadow-lg transition-colors flex items-center gap-1 text-[11px] font-medium backdrop-blur-md"
                  title="Modificar servicio"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Modificar</span>
                </button>
              )}
            </div>

            {/* Contenido */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-display font-medium text-white group-hover:text-[#D4A373] transition-colors">
                  {workshop.title}
                </h3>
                <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                  {workshop.subtitle || workshop.description}
                </p>
              </div>

              {/* Especificaciones */}
              <div className="pt-4 border-t border-[#27272E] flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4A373]" />
                  <span>{workshop.duration_minutes} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#D4A373]" />
                  <span>Máx. {workshop.max_capacity} plazas</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectWorkshop(workshop)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#202028] hover:bg-[#2A2A36] text-neutral-200 text-xs font-medium transition-colors text-center"
                >
                  Ver Metodología
                </button>
                <button
                  onClick={() => onBookWorkshop(workshop)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-md shadow-[#E06D53]/20"
                >
                  Reservar Cupo
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
