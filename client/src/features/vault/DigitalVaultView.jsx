import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Share2, Calendar, Lock, Plus } from 'lucide-react';
import ShareableTransformCard from './ShareableTransformCard';

export default function DigitalVaultView({ vaultItems, onOpenAddMemory }) {
  const [selectedItemForShare, setSelectedItemForShare] = useState(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-[#16161A] border border-[#27272E] shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A373]/15 text-[#D4A373] border border-[#D4A373]/30 text-xs font-medium">
            <Lock className="w-3 h-3" />
            Espacio Privado & Resguardado
          </div>
          <h2 className="text-3xl font-display font-medium text-white">Bóveda Digital de Recuerdos</h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Tus obras de catarsis, piezas Kintsugi restauradas y pulsos de transformación emocional archivados para que recuerdes tu capacidad de sanar.
          </p>
        </div>

        {onOpenAddMemory && (
          <button
            onClick={onOpenAddMemory}
            className="px-5 py-3 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-[#E06D53]/20 shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            Añadir Obra o Recuerdo
          </button>
        )}
      </div>

      {/* Grid de Recuerdos en la Bóveda */}
      {vaultItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#16161A] border border-[#27272E] text-neutral-400 space-y-3">
          <ImageIcon className="w-12 h-12 mx-auto text-neutral-600" />
          <h3 className="text-lg font-medium text-white">Tu bóveda está esperando tu primera catarsis</h3>
          <p className="text-xs max-w-sm mx-auto">
            Al asistir a un taller vivencial, podrás subir la fotografía de tu lienzo o pieza y vincular tu pulso emocional.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaultItems.map((item) => {
            const preStress = item.pre_pulse?.stress_level || 8;
            const postStress = item.post_pulse?.stress_level || 2;
            const drop = Math.round(((preStress - postStress) / preStress) * 100);

            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#16161A] border border-[#27272E] overflow-hidden flex flex-col justify-between hover:border-neutral-500 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Imagen del Recuerdo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-black/30" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-[#D4A373] border border-white/10">
                      {item.workshop_title.split(':')[0]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-display font-medium text-base truncate">{item.title}</span>
                  </div>
                </div>

                {/* Detalles y Pulso */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                      "{item.caption}"
                    </p>
                    
                    {item.metadata && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {Object.entries(item.metadata).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-[#202028] text-neutral-400 border border-[#2B2B36]"
                          >
                            {Array.isArray(value) ? value.join(', ') : `${key}: ${value}`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Comparativa emocional */}
                  <div className="pt-3 border-t border-[#27272E] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">Estrés:</span>
                      <span className="font-mono text-red-400 font-semibold">{preStress}</span>
                      <span className="text-neutral-500">→</span>
                      <span className="font-mono text-emerald-400 font-semibold">{postStress}</span>
                    </div>

                    {drop > 0 && (
                      <span className="text-[11px] font-medium text-amber-300 bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-800/40">
                        ↓ {drop}% estrés
                      </span>
                    )}
                  </div>

                  {/* Botón de Exportar Tarjeta */}
                  <button
                    onClick={() => setSelectedItemForShare(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#22222C] hover:bg-[#E06D53] hover:text-white text-neutral-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-[#2D2D3A] group-hover:border-[#E06D53]/50 shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Generar Historia Compartible
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Tarjeta Compartible */}
      {selectedItemForShare && (
        <ShareableTransformCard
          item={selectedItemForShare}
          onClose={() => setSelectedItemForShare(null)}
        />
      )}
    </div>
  );
}
