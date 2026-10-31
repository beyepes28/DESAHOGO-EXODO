import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function WorkshopFormModal({ isOpen, onClose, workshopToEdit, onSaved }) {
  const isEditing = Boolean(workshopToEdit);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    target_need: 'Burnout laboral & Sobrecarga',
    description: '',
    catharsis_mechanism: '',
    base_price: 65,
    duration_minutes: 120,
    max_capacity: 10,
    hero_image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    materials_summary: 'Materiales incluidos para catarsis vivencial.',
    safety_guidelines: 'Uso de ropa cómoda y espacios de contención emocional.',
    color_accent: '#E06D53'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (workshopToEdit) {
      setFormData({
        title: workshopToEdit.title || '',
        subtitle: workshopToEdit.subtitle || '',
        target_need: workshopToEdit.target_need || 'Burnout laboral & Sobrecarga',
        description: workshopToEdit.description || '',
        catharsis_mechanism: workshopToEdit.catharsis_mechanism || '',
        base_price: workshopToEdit.base_price || 65,
        duration_minutes: workshopToEdit.duration_minutes || 120,
        max_capacity: workshopToEdit.max_capacity || 10,
        hero_image_url: workshopToEdit.hero_image_url || '',
        materials_summary: workshopToEdit.materials_summary || '',
        safety_guidelines: workshopToEdit.safety_guidelines || '',
        color_accent: workshopToEdit.color_accent || '#E06D53'
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        target_need: 'Burnout laboral & Sobrecarga',
        description: '',
        catharsis_mechanism: '',
        base_price: 65,
        duration_minutes: 120,
        max_capacity: 10,
        hero_image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        materials_summary: 'Materiales incluidos para catarsis vivencial.',
        safety_guidelines: 'Uso de ropa cómoda y espacios de contención emocional.',
        color_accent: '#E06D53'
      });
    }
  }, [workshopToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('desahogo_token');
    const endpoint = isEditing ? `/api/workshops/${workshopToEdit.id}` : '/api/workshops';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar el taller.');
      }

      if (onSaved) onSaved(data.workshop);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#16161A] border border-[#27272E] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#27272E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#E06D53]/20 text-[#E06D53] flex items-center justify-center font-bold">
              ✦
            </span>
            <div>
              <h3 className="text-xl font-display font-medium text-white">
                {isEditing ? 'Modificar Taller Vivencial' : 'Crear Nuevo Taller Vivencial'}
              </h3>
              <p className="text-xs text-neutral-400">
                Administración de catálogo visible en la página principal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#202028] text-neutral-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="m-6 mb-0 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-neutral-300 font-medium block mb-1">Título del Taller *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej. Respiro y Barro: Tierra Calma"
                className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-medium block mb-1">Necesidad Objetivo / Enfoque *</label>
              <input
                type="text"
                name="target_need"
                required
                value={formData.target_need}
                onChange={handleChange}
                placeholder="Ej. Duelo & Pérdida, Burnout, Ansiedad"
                className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-300 font-medium block mb-1">Subtítulo / Lema Corto</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Ej. Moldea tu silencio y transforma el dolor en una vasija de paz."
              className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
            />
          </div>

          <div>
            <label className="text-neutral-300 font-medium block mb-1">Descripción Vivencial Completa *</label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Explica la inmersión del taller y qué experimentarán los asistentes..."
              className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
            />
          </div>

          <div>
            <label className="text-neutral-300 font-medium block mb-1">Mecanismo Catártico & Psicológico</label>
            <textarea
              name="catharsis_mechanism"
              rows={2}
              value={formData.catharsis_mechanism}
              onChange={handleChange}
              placeholder="Ej. Modelado táctil a ciegas, descarga psicomotriz y silencio guiado."
              className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-neutral-300 font-medium block mb-1">Precio (USD) *</label>
              <input
                type="number"
                name="base_price"
                required
                min="0"
                step="0.01"
                value={formData.base_price}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-medium block mb-1">Duración (Minutos) *</label>
              <input
                type="number"
                name="duration_minutes"
                required
                min="30"
                value={formData.duration_minutes}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-medium block mb-1">Capacidad Máxima *</label>
              <input
                type="number"
                name="max_capacity"
                required
                min="1"
                max="50"
                value={formData.max_capacity}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-300 font-medium block mb-1">URL de Imagen Principal (Hero)</label>
            <input
              type="url"
              name="hero_image_url"
              value={formData.hero_image_url}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-neutral-300 font-medium block mb-1">Materiales Incluidos</label>
              <input
                type="text"
                name="materials_summary"
                value={formData.materials_summary}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-medium block mb-1">Color de Acento (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="color_accent"
                  value={formData.color_accent}
                  onChange={handleChange}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  name="color_accent"
                  value={formData.color_accent}
                  onChange={handleChange}
                  className="flex-1 p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
                />
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-[#27272E] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#202028] text-neutral-300 hover:text-white font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white font-semibold transition-all shadow-lg shadow-[#E06D53]/25 disabled:opacity-50 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{loading ? 'Guardando...' : isEditing ? 'Actualizar Servicio' : 'Publicar Servicio en Portada'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
