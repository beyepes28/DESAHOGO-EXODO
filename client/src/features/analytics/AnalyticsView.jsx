import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingDown, Users, Sparkles, Award, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AnalyticsView() {
  const [data, setData] = useState({
    totalWorkshopsDelivered: 48,
    totalAttendees: 384,
    avgStressReductionPercent: 68.4,
    avgClarityIncreasePercent: 74.2,
    workshopsImpact: [
      { name: 'Caos Creativo', drop: 72, participants: 110, satisfaction: 9.8 },
      { name: 'Kintsugi', drop: 65, participants: 84, satisfaction: 9.9 },
      { name: 'Cámara de la Rendición', drop: 78, participants: 62, satisfaction: 9.7 },
      { name: 'Anclaje Sensorial', drop: 59, participants: 76, satisfaction: 9.5 },
      { name: 'Grito & Descompresión', drop: 81, participants: 52, satisfaction: 9.9 },
    ],
  });

  useEffect(() => {
    fetch('/api/analytics/impact')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error('Error cargando analítica:', err));
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="p-8 rounded-3xl bg-[#16161A] border border-[#27272E] shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E06D53]/15 text-[#E06D53] border border-[#E06D53]/30 text-xs font-medium">
          <BarChart3 className="w-3 h-3" />
          Medición Cuantitativa de la Catarsis
        </div>
        <h2 className="text-3xl font-display font-medium text-white">Analítica de Bienestar & Impacto</h2>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Datos agregados y anónimos que demuestran la efectividad de las experiencias vivenciales en la reducción del estrés laboral y el restablecimiento del equilibrio emocional.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Reducción de Estrés Promedio</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-emerald-400">
            -{data.avgStressReductionPercent}%
          </div>
          <p className="text-[11px] text-neutral-500">Medido entre pre y post catarsis</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Aumento en Claridad Mental</span>
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#D4A373]">
            +{data.avgClarityIncreasePercent}%
          </div>
          <p className="text-[11px] text-neutral-500">Mayor espacio cognitivo y calma</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Asistentes Acompañados</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {data.totalAttendees}
          </div>
          <p className="text-[11px] text-neutral-500">En {data.totalWorkshopsDelivered} ediciones realizadas</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Índice de Satisfacción</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            9.8 <span className="text-sm text-neutral-500 font-normal">/ 10</span>
          </div>
          <p className="text-[11px] text-neutral-500">Recomendación boca a boca 94%</p>
        </div>
      </div>

      {/* Desglose por Taller Vivencial */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-6">
        <h3 className="text-xl font-display font-medium text-white">
          Efectividad Catártica por Taller
        </h3>

        <div className="space-y-4">
          {data.workshopsImpact.map((workshop) => (
            <div key={workshop.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-white">{workshop.name}</span>
                <span className="text-neutral-400">
                  <strong className="text-emerald-400 font-mono">-{workshop.drop}%</strong> estrés &bull; {workshop.participants} participantes
                </span>
              </div>
              <div className="w-full bg-[#202028] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#E06D53] to-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${workshop.drop}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
