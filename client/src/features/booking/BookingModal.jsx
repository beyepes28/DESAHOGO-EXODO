import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Sparkles,
  Lock,
  ShieldCheck,
  User,
  ArrowRight,
  Receipt
} from 'lucide-react';

export default function BookingModal({
  workshop,
  sessions,
  currentUser,
  onOpenAuth,
  onClose,
  onBookingSuccess
}) {
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [step, setStep] = useState(1); // 1: Seleccionar sesión, 2: Pago con tarjeta, 3: Confirmación
  const [cardNumber, setCardNumber] = useState('4532 8910 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(currentUser?.full_name || 'Sofía Valenzuela');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const workshopSessions = sessions.filter(s => s.workshop_id === workshop?.id);

  useEffect(() => {
    if (workshopSessions.length > 0) {
      setSelectedSessionId(workshopSessions[0].id);
    }
  }, [workshop]);

  useEffect(() => {
    if (currentUser) {
      setCardHolder(currentUser.full_name);
      setGuestEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleProcessPayment = async () => {
    if (!selectedSessionId) return;
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('desahogo_token');

    try {
      const endpoint = token ? '/api/payments/checkout' : '/api/bookings';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          sessionId: selectedSessionId,
          amount: workshop.base_price,
          paidAmount: workshop.base_price,
          paymentMethod: {
            cardNumber,
            cardExpiry,
            cardCvc,
            cardHolder
          }
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No se pudo procesar el pago.');
      }

      setReceipt(data.receipt || {
        transactionId: data.booking?.payment_reference || `PAY-${Date.now().toString().slice(-6)}`,
        workshopTitle: workshop.title,
        amount: workshop.base_price,
        date: new Date().toISOString()
      });

      setStep(3);
      if (onBookingSuccess) {
        onBookingSuccess(data.booking);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#16161A] border border-[#27272E] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#202028] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 3: Confirmación y Recibo Digital */}
        {step === 3 ? (
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                Pago Procesado Exitosamente
              </span>
              <h3 className="text-2xl font-display font-medium text-white">¡Plaza Confirmada!</h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                Tu cupo para <strong className="text-white">{workshop.title}</strong> ha sido reservado.
              </p>
            </div>

            {/* Recibo Digital */}
            <div className="p-4 rounded-2xl bg-[#1C1C24] border border-[#2B2B36] text-xs space-y-2 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272E]">
                <span className="text-neutral-400">Transacción / Referencia:</span>
                <span className="font-mono text-[#D4A373] font-semibold">{receipt?.transactionId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Titular de Reserva:</span>
                <span className="text-white font-medium">{cardHolder}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Total Cobrado:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">${workshop.base_price} USD</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>Estado: Confirmado</span>
                <span>Materiales y espacio incluidos</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#E06D53] text-white text-xs font-semibold hover:bg-[#E97F67] transition-all shadow-md shadow-[#E06D53]/20"
            >
              Listo, Ir a Mi Espacio
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#D4A373] font-mono">
                  {step === 1 ? 'Paso 1 de 2: Selección de Horario' : 'Paso 2 de 2: Pago Seguro'}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  ${workshop.base_price} USD
                </span>
              </div>
              <h2 className="text-2xl font-display font-medium text-white mt-1">
                {workshop.title}
              </h2>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Selección de Fecha y Cupo */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="text-xs font-medium text-neutral-300 block">
                  Fechas y ediciones programadas:
                </label>

                {workshopSessions.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#1A1A22] text-xs text-neutral-400 text-center">
                    Pronto se publicarán nuevas fechas para este taller.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {workshopSessions.map((session) => {
                      const availableSpots = session.capacity - session.booked_count;
                      const isSelected = selectedSessionId === session.id;
                      const dateFormatted = new Date(session.scheduled_at).toLocaleDateString('es-ES', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      });

                      return (
                        <div
                          key={session.id}
                          onClick={() => setSelectedSessionId(session.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#E06D53]/15 border-[#E06D53] text-white shadow-sm'
                              : 'bg-[#1C1C24] border-[#27272E] text-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium">
                              <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                              <span className="capitalize">{dateFormatted}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                              <MapPin className="w-3 h-3 text-neutral-500" />
                              <span>{session.location_name}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                              availableSpots <= 2
                                ? 'bg-amber-950/40 text-amber-300 border-amber-800/50'
                                : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                            }`}>
                              {availableSpots} cupos libres
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-[#131317] border border-[#27272E] flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Monto total a pagar:</span>
                  <span className="text-lg font-mono font-bold text-white">${workshop.base_price} USD</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedSessionId}
                  className="w-full py-3.5 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E06D53]/25 disabled:opacity-50"
                >
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Pasarela de Pago */}
            {step === 2 && (
              <div className="space-y-4 text-xs animate-fadeIn">
                {!currentUser && (
                  <div className="p-3 rounded-xl bg-[#202028] border border-[#2B2B36] flex items-center justify-between">
                    <div>
                      <span className="text-neutral-300 font-medium block">¿Tienes una cuenta?</span>
                      <span className="text-[11px] text-neutral-500">Inicia sesión para vincular la reserva</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenAuth && onOpenAuth('login')}
                      className="px-3 py-1.5 rounded-lg bg-[#E06D53]/20 text-[#E06D53] hover:bg-[#E06D53]/30 font-medium text-xs transition-colors"
                    >
                      Ingresar
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-neutral-300 font-medium block mb-1">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nombre Completo"
                      className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white focus:outline-none focus:border-[#E06D53]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-300 font-medium block mb-1">Número de Tarjeta (Crédito / Débito)</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white font-mono focus:outline-none focus:border-[#E06D53]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-300 font-medium block mb-1">Expiración (MM/AA)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white font-mono text-center focus:outline-none focus:border-[#E06D53]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-300 font-medium block mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        maxLength="4"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full p-2.5 rounded-xl bg-[#1C1C24] border border-[#27272E] text-white font-mono text-center focus:outline-none focus:border-[#E06D53]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-neutral-400 pt-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Transacción cifrada con protocolo de alta seguridad. Cero comisión extra.</span>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-[#202028] text-neutral-300 hover:text-white font-medium transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={loading}
                    className="w-2/3 py-3 rounded-xl bg-[#E06D53] hover:bg-[#E97F67] text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E06D53]/25 disabled:opacity-50"
                  >
                    <span>{loading ? 'Procesando pago...' : `Pagar $${workshop.base_price} USD`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
