import React, { useState } from 'react';
import { HeartPulse, Check, Sparkles, TrendingDown, Brain, Zap, MessageSquare } from 'lucide-react';

export default function MoodPulseModal({ onPulseSaved }) {
  const [phase, setPhase] = useState('pre_session'); // 'pre_session' o 'post_session'
  const [stressLevel, setStressLevel] = useState(8);
  const [mentalClarity, setMentalClarity] = useState(3);
  const [emotionalEnergy, setEmotionalEnergy] = useState(4);
  const [dominantEmotion, setDominantEmotion] = useState('Abrumada / Sobrecargada');
  const [shortNote, setShortNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const preEmotions = [
    'Abrumada / Sobrecargada',
    'Ira contenida',
    'Ansiedad de control',
    'Duelo / Tristeza muda',
    'Agotamiento crónico',
    'Desconexión',
  ];

  const postEmotions = [
    'En paz profunda',
    'Ligera / Sin coraza',
    'Claridad renovada',
    'Aceptación y perdón',
    'Fuerza reconectada',
    'Silencio interior',
  ];

  const activeEmotions = phase === 'pre_session' ? preEmotions : postEmotions;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/mood-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: 'b1111111-1111-1111-1111-111111111111',
          phase,
          stressLevel,
          mentalClarity,
          emotionalEnergy,
          dominantEmotion,
          shortNote,
        }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        if (onPulseSaved) onPulseSaved();
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error registrando pulso:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E06D53]/15 text-[#E06D53] border border-[#E06D53]/30 text-xs font-medium">
          <HeartPulse className="w-3.5 h-3.5" />
          Monitoreo Emocional Vivencial
        </div>
        <h2 className="text-3xl font-display font-medium text-white">Pulso de Bienestar</h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Mide el antes y después de tu experiencia para visualizar el impacto real de la catarsis en tu sistema nervioso.
        </p>
      </div>

      {/* Selector de Fase (Pre vs Post) */}
      <div className="flex p-1.5 rounded-2xl bg-[#16161A] border border-[#27272E] max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            setPhase('pre_session');
            setDominantEmotion(preEmotions[0]);
            setStressLevel(8);
            setMentalClarity(3);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            phase === 'pre_session'
              ? 'bg-[#E06D53] text-white shadow-md shadow-[#E06D53]/25'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          1. Al Llegar (Pre-Catarsis)
        </button>
        <button
          type="button"
          onClick={() => {
            setPhase('post_session');
            setDominantEmotion(postEmotions[0]);
            setStressLevel(2);
            setMentalClarity(9);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            phase === 'post_session'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          2. Al Salir (Post-Catarsis)
        </button>
      </div>

      {/* Formulario de Registro */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#16161A] border border-[#27272E] space-y-6 shadow-xl">
        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>¡Pulso guardado exitosamente! Tu registro ha sido sincronizado con tu bóveda de recuerdos.</span>
          </div>
        )}

        {/* Slider 1: Nivel de Estrés / Tensión */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-neutral-300 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
              Nivel de Estrés / Tensión Acumulada
            </span>
            <span className="font-mono text-base font-bold text-white px-2.5 py-0.5 rounded-lg bg-[#202028]">
              {stressLevel} <span className="text-xs text-neutral-500 font-normal">/ 10</span>
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(Number(e.target.value))}
            className="w-full accent-[#E06D53] bg-neutral-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[11px] text-neutral-500">
            <span>1 - Serenidad total</span>
            <span>10 - Colapso / Máxima sobrecarga</span>
          </div>
        </div>

        {/* Slider 2: Claridad Mental */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-neutral-300 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-[#D4A373]" />
              Claridad Mental y Espacio Interior
            </span>
            <span className="font-mono text-base font-bold text-white px-2.5 py-0.5 rounded-lg bg-[#202028]">
              {mentalClarity} <span className="text-xs text-neutral-500 font-normal">/ 10</span>
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={mentalClarity}
            onChange={(e) => setMentalClarity(Number(e.target.value))}
            className="w-full accent-[#D4A373] bg-neutral-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[11px] text-neutral-500">
            <span>1 - Niebla mental densa</span>
            <span>10 - Lucidez y perspectiva plena</span>
          </div>
        </div>

        {/* Slider 3: Energía Vital */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-neutral-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Vitalidad y Disponibilidad Emocional
            </span>
            <span className="font-mono text-base font-bold text-white px-2.5 py-0.5 rounded-lg bg-[#202028]">
              {emotionalEnergy} <span className="text-xs text-neutral-500 font-normal">/ 10</span>
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={emotionalEnergy}
            onChange={(e) => setEmotionalEnergy(Number(e.target.value))}
            className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Emoción Predominante */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-300 block">
            ¿Cuál es la emoción o estado predominante en este momento?
          </label>
          <div className="flex flex-wrap gap-2">
            {activeEmotions.map((emotion) => (
              <button
                type="button"
                key={emotion}
                onClick={() => setDominantEmotion(emotion)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  dominantEmotion === emotion
                    ? phase === 'pre_session'
                      ? 'bg-[#E06D53]/20 border-[#E06D53] text-[#E06D53]'
                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-[#1C1C24] border-[#27272E] text-neutral-400 hover:text-white'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>

        {/* Nota o Intención */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
            {phase === 'pre_session'
              ? 'Nota corta: ¿Qué peso o expectativa traes hoy?'
              : 'Nota corta: ¿Qué sientes que se quedó en el taller?'}
          </label>
          <textarea
            value={shortNote}
            onChange={(e) => setShortNote(e.target.value)}
            rows={2}
            placeholder={
              phase === 'pre_session'
                ? 'Ej. Vengo cargando una semana de presión insoportable y tensión en la espalda...'
                : 'Ej. Siento como si hubiera respirado por primera vez en meses...'
            }
            className="w-full p-3.5 rounded-2xl bg-[#1C1C24] border border-[#27272E] text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#E06D53]"
          />
        </div>

        {/* Botón de Guardado */}
        <button
          type="submit"
          disabled={saving}
          className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
            phase === 'pre_session'
              ? 'bg-[#E06D53] hover:bg-[#E97F67] text-white shadow-[#E06D53]/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {saving ? 'Guardando pulso...' : `Guardar Pulso ${phase === 'pre_session' ? 'Pre-Catarsis' : 'Post-Catarsis'}`}
        </button>
      </form>
    </div>
  );
}
