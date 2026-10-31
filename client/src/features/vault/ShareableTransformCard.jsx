import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Sparkles, Share2, Check, ArrowRight } from 'lucide-react';

export default function ShareableTransformCard({ item, onClose }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const preStress = item.pre_pulse?.stress_level || 9;
  const postStress = item.post_pulse?.stress_level || 2;
  const deltaStress = preStress - postStress;
  const stressDropPercentage = Math.round((deltaStress / preStress) * 100);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Calidad retina HD
        useCORS: true,
        backgroundColor: '#111114',
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `desahogo-catarsis-${(item.user_name || 'recuerdo').toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Error al exportar recuerdo:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="flex flex-col items-center max-h-[95vh] overflow-y-auto p-2">
        {/* Tarjeta Artística Formato 9:16 (Instagram Stories & LinkedIn) */}
        <div
          ref={cardRef}
          className="w-[340px] sm:w-[360px] h-[600px] sm:h-[640px] bg-gradient-to-b from-[#16161C] via-[#121216] to-[#0D0D10] text-[#EDEDED] rounded-[32px] p-6 flex flex-col justify-between shadow-2xl border border-neutral-800 relative overflow-hidden shrink-0"
        >
          {/* Luz de fondo sutil */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E06D53]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-60 h-60 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Encabezado */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4A373] font-mono">
                DESAHOGO &bull; ÉXODO
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {new Date(item.created_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
              </span>
            </div>
            <h2 className="text-xl font-display font-medium text-white mt-1 leading-snug">
              {item.workshop_title}
            </h2>
          </div>

          {/* Imagen de la Obra Creada / Lienzo / Cerámica */}
          <div className="relative z-10 w-full h-56 rounded-2xl overflow-hidden border border-neutral-700/60 my-2 shadow-inner group">
            <img
              src={item.media_url}
              alt={item.title}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-[11px] text-neutral-300 font-mono flex items-center justify-between">
              <span className="truncate">{item.title}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
            </div>
          </div>

          {/* Métrica de Impacto Emocional */}
          <div className="relative z-10 bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 backdrop-blur-sm space-y-3">
            <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono block">
              Transformación del Pulso
            </span>
            
            <div className="grid grid-cols-2 gap-2 text-center divide-x divide-neutral-800">
              <div>
                <span className="text-[11px] text-neutral-400 block">Al Llegar</span>
                <span className="text-lg font-mono font-bold text-red-300">
                  {preStress} <span className="text-xs text-neutral-400">/10</span>
                </span>
                <span className="text-[11px] block text-neutral-400 truncate mt-0.5 px-1">
                  {item.pre_pulse?.dominant_emotion || 'Sobrecarga'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block">Al Salir</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  {postStress} <span className="text-xs text-neutral-400">/10</span>
                </span>
                <span className="text-[11px] block text-neutral-400 truncate mt-0.5 px-1">
                  {item.post_pulse?.dominant_emotion || 'Paz profunda'}
                </span>
              </div>
            </div>

            {deltaStress > 0 && (
              <div className="pt-2 border-t border-neutral-800 text-center">
                <span className="text-xs text-amber-300 font-medium">
                  ↓ {stressDropPercentage}% reducción de sobrecarga mental
                </span>
              </div>
            )}
          </div>

          {/* Pie de Tarjeta */}
          <div className="relative z-10 flex justify-between items-end text-neutral-400 text-xs border-t border-neutral-900 pt-3 font-mono">
            <span>{item.user_name || 'Asistente'}</span>
            <span className="tracking-widest text-[#D4A373]">#ÉXODOMOVERSE</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700"
          >
            Cerrar
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-6 py-2.5 rounded-full bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#E06D53]/25 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generando Historia...' : 'Descargar Tarjeta (Instagram Story)'}
          </button>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Enlace copiado' : 'Compartir'}
          </button>
        </div>
      </div>
    </div>
  );
}
