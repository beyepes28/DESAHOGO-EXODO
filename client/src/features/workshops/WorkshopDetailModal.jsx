import React from 'react';
import { X, Clock, Users, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WorkshopDetailModal({ workshop, onClose, onBook }) {
  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#16161A] border border-[#27272E] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Encabezado con imagen */}
        <div className="relative h-64 shrink-0">
          <img
            src={workshop.hero_image_url}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold text-white inline-block mb-2 shadow-sm"
              style={{ backgroundColor: workshop.color_accent || '#E06D53' }}
            >
              {workshop.target_need}
            </span>
            <h2 className="text-2xl font-display font-medium text-white">{workshop.title}</h2>
          </div>
        </div>

        {/* Contenido desplazable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">Descripción Vivencial</h4>
            <p className="leading-relaxed text-neutral-200">{workshop.description}</p>
          </div>

          {/* Mecanismo de Catarsis */}
          <div className="p-4 rounded-2xl bg-[#1F1F27] border border-[#2B2B36] space-y-1.5">
            <div className="flex items-center gap-2 text-[#D4A373] font-medium text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              Mecanismo Catártico & Psicológico
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              {workshop.catharsis_mechanism}
            </p>
          </div>

          {/* Materiales y Logística */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#1A1A22] border border-[#27272E]">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block mb-1">
                Materiales Incluidos
              </span>
              <p className="text-xs text-neutral-300">{workshop.materials_summary}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1A1A22] border border-[#27272E]">
              <div className="flex items-center gap-1.5 text-amber-400/90 text-xs uppercase tracking-wider font-mono mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Seguridad & Cuidados
              </div>
              <p className="text-xs text-neutral-300">{workshop.safety_guidelines}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#27272E] text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4A373]" /> {workshop.duration_minutes} minutos
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4A373]" /> Máx. {workshop.max_capacity} asistentes íntimos
            </span>
            <span className="text-base font-bold font-mono text-white">
              ${workshop.base_price} USD
            </span>
          </div>
        </div>

        {/* Footer fijo con CTA */}
        <div className="p-4 border-t border-[#27272E] bg-[#121216] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs font-medium"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onClose();
              onBook(workshop);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#E06D53]/25"
          >
            Reservar este Taller
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
