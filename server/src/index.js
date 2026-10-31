import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { initialWorkshops, initialSessions, initialVault } from './mockData.js';
import { pool, hasDbConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'desahogo_exodo_secret_key_2026';

// -----------------------------------------------------------------------------
// Base de Datos en Memoria (Sincronizada con PostgreSQL si hay conexión activa)
// -----------------------------------------------------------------------------
let users = [
  {
    id: 'admin-uuid-1',
    email: 'admin@desahogo.com',
    password_hash: bcrypt.hashSync('admin123', 10),
    plain_password: 'admin123',
    full_name: 'Elena Santillán',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Psicoterapeuta Gestalt y Directora Administradora de Desahogo & Éxodo',
    phone: '+57 300 123 4567',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'sofia@desahogo.com',
    password_hash: bcrypt.hashSync('sofia123', 10),
    plain_password: 'sofia123',
    full_name: 'Sofía Valenzuela',
    role: 'attendee',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Asistente y participante frecuente',
    phone: '+57 311 987 6543',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString()
  }
];

let workshops = [...initialWorkshops];
let sessions = [...initialSessions];
let vaultItems = [...initialVault];
let bookings = [
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    session_id: 's1111111-1111-1111-1111-111111111111',
    workshop_title: 'Caos Creativo: Catarsis en Lienzo',
    user_id: '33333333-3333-3333-3333-333333333333',
    user_name: 'Sofía Valenzuela',
    user_email: 'sofia@desahogo.com',
    status: 'attended',
    payment_reference: 'STRIPE_TX_9872134',
    paid_amount: 65.0,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    session_id: 's2222222-2222-2222-2222-222222222222',
    workshop_title: 'Kintsugi: La Belleza de las Fracturas',
    user_id: '33333333-3333-3333-3333-333333333333',
    user_name: 'Sofía Valenzuela',
    user_email: 'sofia@desahogo.com',
    status: 'confirmed',
    payment_reference: 'PAY_SIM_5548912',
    paid_amount: 75.0,
    created_at: new Date(Date.now() - 43200000).toISOString()
  }
];

let moodLogs = [
  {
    id: 'm1111111-1111-1111-1111-111111111111',
    booking_id: 'b1111111-1111-1111-1111-111111111111',
    user_id: '33333333-3333-3333-3333-333333333333',
    phase: 'pre_session',
    stress_level: 9,
    mental_clarity: 3,
    dominant_emotion: 'Sobrecargada y dispersa',
    short_note: 'Semana de trabajo agotadora, siento la mandíbula tensa y necesito soltar.',
    logged_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'm2222222-2222-2222-2222-222222222222',
    booking_id: 'b1111111-1111-1111-1111-111111111111',
    user_id: '33333333-3333-3333-3333-333333333333',
    phase: 'post_session',
    stress_level: 2,
    mental_clarity: 9,
    dominant_emotion: 'En paz y ligera',
    short_note: 'Manchar el lienzo sin reglas me devolvió el aire. Siento que me quité una coraza.',
    logged_at: new Date(Date.now() - 86400000 + 7200000).toISOString()
  }
];

app.use(cors());
app.use(express.json());

// -----------------------------------------------------------------------------
// Middlewares de Autenticación y Autorización
// -----------------------------------------------------------------------------
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token requerido.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: se requieren permisos de Administrador.' });
  }
  next();
};

// -----------------------------------------------------------------------------
// 1. MÓDULO DE AUTENTICACIÓN & ROLES
// -----------------------------------------------------------------------------

// Registro de nuevos usuarios
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, full_name, phone } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Email, nombre y contraseña son obligatorios.' });
    }

    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe una cuenta registrada con este correo electrónico.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `u-${Date.now()}`,
      email: email.toLowerCase(),
      password_hash,
      plain_password: password,
      full_name,
      phone: phone || '',
      role: 'attendee', // Los nuevos usuarios son asistentes por defecto
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(full_name)}&backgroundColor=e06d53`,
      created_at: new Date().toISOString()
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, full_name: newUser.full_name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role,
        avatar_url: newUser.avatar_url,
        phone: newUser.phone
      },
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
});

// Inicio de sesión
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos.' });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas. Usuario no encontrado.' });
    }

    const isMatch = (user.plain_password && user.plain_password === password) ||
                    (await bcrypt.compare(password, user.password_hash));

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url,
        phone: user.phone
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
});

// Perfil de usuario autenticado
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

  res.json({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    avatar_url: user.avatar_url,
    phone: user.phone
  });
});

// -----------------------------------------------------------------------------
// 2. CATÁLOGO DE TALLERES & GESTIÓN ADMINISTRATIVA (CRUD)
// -----------------------------------------------------------------------------

// Listar todos los talleres (público)
app.get('/api/workshops', (req, res) => {
  res.json(workshops);
});

// Obtener taller por slug o ID
app.get('/api/workshops/:slug', (req, res) => {
  const { slug } = req.params;
  const workshop = workshops.find(w => w.slug === slug || w.id === slug);
  if (!workshop) return res.status(404).json({ error: 'Taller no encontrado.' });
  res.json(workshop);
});

// CREAR NUEVO TALLER (Solo Administradora)
app.post('/api/workshops', authMiddleware, requireAdmin, (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      catharsis_mechanism,
      target_need,
      duration_minutes = 120,
      max_capacity = 10,
      base_price = 50.0,
      color_accent = '#E06D53',
      hero_image_url,
      materials_summary = 'Materiales incluidos para catarsis vivencial.',
      safety_guidelines = 'Ropa cómoda y mente abierta.'
    } = req.body;

    if (!title || !description || !target_need) {
      return res.status(400).json({ error: 'Título, descripción y necesidad objetivo son obligatorios.' });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4);

    const newWorkshop = {
      id: `w-${Date.now()}`,
      slug,
      title,
      subtitle: subtitle || description.slice(0, 80) + '...',
      description,
      catharsis_mechanism: catharsis_mechanism || 'Catarsis vivencial no verbal guiada.',
      target_need,
      duration_minutes: Number(duration_minutes),
      max_capacity: Number(max_capacity),
      base_price: Number(base_price),
      color_accent,
      hero_image_url: hero_image_url || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
      materials_summary,
      safety_guidelines,
      created_at: new Date().toISOString()
    };

    workshops.unshift(newWorkshop);

    // Crear automáticamente una sesión programada para que esté disponible para reservas
    const newSession = {
      id: `s-${Date.now()}`,
      workshop_id: newWorkshop.id,
      workshop_title: newWorkshop.title,
      facilitator_name: req.user.full_name || 'Elena Santillán',
      scheduled_at: new Date(Date.now() + 3 * 86400000 + 17 * 3600000).toISOString(),
      end_at: new Date(Date.now() + 3 * 86400000 + 19.5 * 3600000).toISOString(),
      location_name: 'Espacio Desahogo - Sala Principal',
      capacity: newWorkshop.max_capacity,
      booked_count: 0,
      status: 'published'
    };
    sessions.push(newSession);

    res.status(201).json({ success: true, workshop: newWorkshop, session: newSession });
  } catch (error) {
    console.error('Error creando taller:', error);
    res.status(500).json({ error: 'Error al registrar el nuevo taller vivencial.' });
  }
});

// MODIFICAR TALLER EXISTENTE (Solo Administradora)
app.put('/api/workshops/:id', authMiddleware, requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const index = workshops.findIndex(w => w.id === id || w.slug === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Taller vivencial no encontrado.' });
    }

    const existing = workshops[index];
    const updated = {
      ...existing,
      ...req.body,
      duration_minutes: req.body.duration_minutes ? Number(req.body.duration_minutes) : existing.duration_minutes,
      max_capacity: req.body.max_capacity ? Number(req.body.max_capacity) : existing.max_capacity,
      base_price: req.body.base_price ? Number(req.body.base_price) : existing.base_price,
      updated_at: new Date().toISOString()
    };

    workshops[index] = updated;

    // Actualizar también títulos en las sesiones asociadas
    sessions.forEach(s => {
      if (s.workshop_id === existing.id) {
        s.workshop_title = updated.title;
        s.capacity = updated.max_capacity;
      }
    });

    res.json({ success: true, workshop: updated });
  } catch (error) {
    console.error('Error modificando taller:', error);
    res.status(500).json({ error: 'Error al actualizar el taller vivencial.' });
  }
});

// ELIMINAR TALLER (Solo Administradora)
app.delete('/api/workshops/:id', authMiddleware, requireAdmin, (req, res) => {
  const { id } = req.params;
  const initialLength = workshops.length;
  workshops = workshops.filter(w => w.id !== id && w.slug !== id);

  if (workshops.length === initialLength) {
    return res.status(404).json({ error: 'Taller no encontrado.' });
  }

  // Eliminar sesiones correspondientes
  sessions = sessions.filter(s => s.workshop_id !== id);

  res.json({ success: true, message: 'Taller eliminado exitosamente.' });
});

// -----------------------------------------------------------------------------
// 3. SESIONES Y CUPOS EN TIEMPO REAL
// -----------------------------------------------------------------------------
app.get('/api/sessions', (req, res) => {
  const { workshopId } = req.query;
  let filtered = sessions;
  if (workshopId) {
    filtered = sessions.filter(s => s.workshop_id === workshopId);
  }
  res.json(filtered);
});

// -----------------------------------------------------------------------------
// 4. PASARELA DE PAGO & RESERVA DE SERVICIOS
// -----------------------------------------------------------------------------
app.post('/api/payments/checkout', authMiddleware, async (req, res) => {
  try {
    const { sessionId, paymentMethod, amount } = req.body;
    const userId = req.user.id;

    if (!sessionId) {
      return res.status(400).json({ error: 'Identificador de sesión requerido.' });
    }

    const targetSession = sessions.find(s => s.id === sessionId);
    if (!targetSession) {
      return res.status(404).json({ error: 'Sesión no encontrada.' });
    }

    if (targetSession.booked_count >= targetSession.capacity) {
      return res.status(409).json({ error: 'Aforo completo. No quedan plazas disponibles para esta edición.' });
    }

    // Validación simulada de tarjeta / pasarela de pago
    if (paymentMethod && paymentMethod.cardNumber) {
      const cleanNumber = paymentMethod.cardNumber.replace(/\s+/g, '');
      if (cleanNumber.length < 13) {
        return res.status(400).json({ error: 'Número de tarjeta inválido. Comprueba los dígitos.' });
      }
    }

    // Registrar pago y reservar cupo
    targetSession.booked_count += 1;

    const paymentReference = `PAY_DESAHOGO_${Date.now().toString().slice(-6)}`;
    const newBooking = {
      id: `b-${Date.now()}`,
      session_id: sessionId,
      workshop_title: targetSession.workshop_title,
      session_date: targetSession.scheduled_at,
      user_id: userId,
      user_name: req.user.full_name,
      user_email: req.user.email,
      status: 'confirmed',
      payment_reference: paymentReference,
      paid_amount: Number(amount) || 65.0,
      payment_method_last4: paymentMethod?.cardNumber ? paymentMethod.cardNumber.slice(-4) : '4242',
      created_at: new Date().toISOString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      booking: newBooking,
      receipt: {
        transactionId: paymentReference,
        workshopTitle: targetSession.workshop_title,
        amount: newBooking.paid_amount,
        date: new Date().toISOString(),
        location: targetSession.location_name
      }
    });
  } catch (error) {
    console.error('Error procesando pago:', error);
    res.status(500).json({ error: 'Error procesando el pago y reserva.' });
  }
});

// -----------------------------------------------------------------------------
// 5. PULSO EMOCIONAL (Check-in Pre / Post Catarsis)
// -----------------------------------------------------------------------------
app.post('/api/mood-logs', (req, res) => {
  const { bookingId, phase, stressLevel, mentalClarity, emotionalEnergy, dominantEmotion, shortNote, userId } = req.body;

  const newLog = {
    id: `m-${Date.now()}`,
    booking_id: bookingId || 'b1111111-1111-1111-1111-111111111111',
    user_id: userId || '33333333-3333-3333-3333-333333333333',
    phase,
    stress_level: Number(stressLevel),
    mental_clarity: Number(mentalClarity),
    emotional_energy: Number(emotionalEnergy || 5),
    dominant_emotion: dominantEmotion,
    short_note: shortNote,
    logged_at: new Date().toISOString()
  };

  moodLogs = moodLogs.filter(m => !(m.booking_id === newLog.booking_id && m.phase === newLog.phase));
  moodLogs.push(newLog);

  res.status(201).json({ success: true, log: newLog });
});

app.get('/api/mood-logs/compare/:bookingId', (req, res) => {
  const { bookingId } = req.params;
  const pre = moodLogs.find(m => m.booking_id === bookingId && m.phase === 'pre_session');
  const post = moodLogs.find(m => m.booking_id === bookingId && m.phase === 'post_session');

  const deltaStress = pre && post ? pre.stress_level - post.stress_level : null;
  const stressDropPercentage = pre && post ? Math.round((deltaStress / pre.stress_level) * 100) : null;

  res.json({
    pre: pre || null,
    post: post || null,
    metrics: {
      deltaStress,
      stressDropPercentage,
      clarityGain: pre && post ? post.mental_clarity - pre.mental_clarity : null
    }
  });
});

// -----------------------------------------------------------------------------
// 6. BÓVEDA DIGITAL DE RECUERDOS (Digital Vault)
// -----------------------------------------------------------------------------
app.get('/api/vault', (req, res) => {
  res.json(vaultItems);
});

app.post('/api/vault', (req, res) => {
  const newItem = {
    id: `v-${Date.now()}`,
    user_id: req.body.userId || '33333333-3333-3333-3333-333333333333',
    user_name: req.body.userName || 'Sofía Valenzuela',
    workshop_title: req.body.workshopTitle || 'Caos Creativo: Catarsis en Lienzo',
    item_type: req.body.itemType || 'canvas_photo',
    title: req.body.title || 'Recuerdo de Redención',
    media_url: req.body.mediaUrl,
    caption: req.body.caption,
    metadata: req.body.metadata || {},
    pre_pulse: req.body.prePulse,
    post_pulse: req.body.postPulse,
    created_at: new Date().toISOString()
  };
  vaultItems.unshift(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// -----------------------------------------------------------------------------
// 7. PANEL DE ESTADÍSTICAS & ANALÍTICA DE ADMINISTRACIÓN
// -----------------------------------------------------------------------------
app.get('/api/admin/stats', authMiddleware, requireAdmin, (req, res) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.paid_amount) || 0), 0);
  const totalBookingsCount = bookings.length;
  const totalAttendeesCount = users.filter(u => u.role === 'attendee').length;

  // Rendimiento por Taller
  const workshopStats = workshops.map(w => {
    const workshopBookings = bookings.filter(b => b.workshop_title?.toLowerCase().includes(w.title.slice(0, 10).toLowerCase()));
    const revenue = workshopBookings.reduce((sum, b) => sum + (Number(b.paid_amount) || 0), 0);
    const relatedSessions = sessions.filter(s => s.workshop_id === w.id);
    const totalCapacity = relatedSessions.reduce((sum, s) => sum + s.capacity, 0) || w.max_capacity;
    const bookedSpots = relatedSessions.reduce((sum, s) => sum + s.booked_count, 0) || workshopBookings.length;
    const occupancyRate = totalCapacity > 0 ? Math.round((bookedSpots / totalCapacity) * 100) : 0;

    return {
      id: w.id,
      title: w.title,
      price: w.base_price,
      bookingsCount: workshopBookings.length,
      revenue,
      occupancyRate
    };
  });

  res.json({
    kpis: {
      totalRevenue,
      totalBookingsCount,
      totalAttendeesCount,
      activeWorkshopsCount: workshops.length,
      avgTicket: totalBookingsCount > 0 ? Math.round(totalRevenue / totalBookingsCount) : 0
    },
    workshopStats,
    recentBookings: [...bookings].reverse().slice(0, 10),
    registeredUsers: users.map(u => ({
      id: u.id,
      full_name: u.full_name,
      email: u.email,
      role: u.role,
      phone: u.phone,
      created_at: u.created_at
    }))
  });
});

// Métricas públicas de bienestar
app.get('/api/analytics/impact', (req, res) => {
  res.json({
    totalWorkshopsDelivered: 48,
    totalAttendees: 384,
    avgStressReductionPercent: 68.4,
    avgClarityIncreasePercent: 74.2,
    workshopsImpact: [
      { name: 'Caos Creativo', drop: 72, participants: 110, satisfaction: 9.8 },
      { name: 'Kintsugi', drop: 65, participants: 84, satisfaction: 9.9 },
      { name: 'Cámara de la Rendición', drop: 78, participants: 62, satisfaction: 9.7 },
      { name: 'Anclaje Sensorial', drop: 59, participants: 76, satisfaction: 9.5 },
      { name: 'Grito & Descompresión', drop: 81, participants: 52, satisfaction: 9.9 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✨ Servidor Desahogo & Éxodo activo en http://localhost:${PORT}`);
  console.log(`📊 Roles y permisos listos: Admin & Attendees`);
});
