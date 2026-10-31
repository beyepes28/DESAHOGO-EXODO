-- =============================================================================
-- DESAHOGO & ÉXODO - DATOS INICIALES (SEEDS)
-- Catálogo de los 5 Talleres Vivenciales y Datos de Prueba
-- =============================================================================

-- 1. Facilitadores y Usuarios Base
INSERT INTO users (id, email, password_hash, full_name, role, bio, avatar_url)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'facilitador@desahogo.com', '$2b$10$wK1F5N17uG5M4t1Z5C5nTu7t77fV3L8W7eP7mB3h5j6k7l8m9n0o1', 'Dra. Elena Santillán', 'facilitator', 'Psicoterapeuta Gestalt y facilitadora de catarsis guiada.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'),
    ('22222222-2222-2222-2222-222222222222', 'carlos@desahogo.com', '$2b$10$wK1F5N17uG5M4t1Z5C5nTu7t77fV3L8W7eP7mB3h5j6k7l8m9n0o1', 'Carlos Mendoza', 'facilitator', 'Artista plástico y maestro de Kintsugi contemporáneo.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
    ('33333333-3333-3333-3333-333333333333', 'sofia.asistente@gmail.com', '$2b$10$wK1F5N17uG5M4t1Z5C5nTu7t77fV3L8W7eP7mB3h5j6k7l8m9n0o1', 'Sofía Valenzuela', 'attendee', 'Buscando desconectar de la rutina y procesar duelo reciente.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80')
ON CONFLICT (id) DO NOTHING;

-- 2. Los 5 Talleres Vivenciales de Desahogo & Éxodo
INSERT INTO workshops (id, slug, title, subtitle, description, catharsis_mechanism, target_need, duration_minutes, max_capacity, base_price, color_accent, hero_image_url, materials_summary, safety_guidelines)
VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    'caos-creativo',
    'Caos Creativo: Catarsis en Lienzo',
    'Libera la mente a través de la pintura gestual y el choque cromático.',
    'Una inmersión libre de juicios estéticos donde utilizas espátulas, manos y pigmentos densos para proyectar frustraciones, pesos emocionales y tensiones reprimidas sobre un lienzo de gran formato. Al final, transformas el caos en una pieza estructurada de redención personal.',
    'Pintura gestual no verbal y descarga psicomotriz sobre soporte rígido.',
    'Burnout laboral & Sobrecarga mental',
    150,
    10,
    65.00,
    '#E76F51',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    'Lienzo de algodón 80x60cm, pinturas acrílicas pesadas, pigmentos naturales, espátulas industriales, traje de protección.',
    'Uso obligatorio de overol y calzado cerrado. Espacio ventilado.'
),
(
    'a2222222-2222-2222-2222-222222222222',
    'kintsugi-resiliencia',
    'Kintsugi: La Belleza de las Fracturas',
    'Honra tus heridas reparando cerámica con oro y resina.',
    'Inspirado en la filosofía tradicional japonesa, este taller propone romper deliberadamente una pieza de cerámica que simbolice una pérdida, trauma o fractura emocional, para luego recomponerla pacientemente con adhesivo y polvo de mica dorada. Cada cicatriz dorada se convierte en un recordatorio de fortaleza.',
    'Ruptura simbólica ritualizada y reconstrucción contemplativa.',
    'Duelo, Ruptura y Reconstrucción',
    180,
    8,
    75.00,
    '#D4A373',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    'Taza o cuenco cerámico artesanal, mortero de fractura, resina epoxi no tóxica, polvo de oro/mica natural, lijas finas.',
    'Manejo de fragmentos afilados con guantes protectores de nitrilo.'
),
(
    'a3333333-3333-3333-3333-333333333333',
    'camara-de-la-rendicion',
    'La Cámara de la Rendición',
    'El arte de soltar el control en un espacio de silencio e introspección.',
    'Una experiencia de descompresión radical donde ingresas a un domo acústico aislado con luz tenue. A través de un diario guiado y un ritual de escritura destructiva (fuego o disolución en agua), nombras aquello que ya no puedes controlar ni sostener, permitiéndote la rendición como un acto de valentía y alivio.',
    'Desahogo epistolar, silenciamiento sensorial y quema/disolución catártica.',
    'Ansiedad de Control y Agotamiento Crónico',
    120,
    6,
    55.00,
    '#457B9D',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    'Diario de fibra de arroz artesanal, tinta china de caligrafía, urna de confinamiento, infusiones adaptógenas.',
    'Silencio absoluto durante el 70% de la experiencia. Dispositivos electrónicos bajo resguardo.'
),
(
    'a4444444-4444-4444-4444-444444444444',
    'anclaje-sensorial-aromaterapia',
    'Anclaje Sensorial & Alquimia Botánica',
    'Crea tu propio elixir de estabilidad nerviosa.',
    'El sistema olfativo está conectado directamente con la amígdala y la memoria emocional. En este taller sensorial exploras notas botánicas puras (incienso, cedro, bergamota, salvia blanca) para asociar un aroma a un estado de sosiego alcanzado mediante respiración coherente, llevándote a casa un spray aromático de anclaje rápido.',
    'Condicionamiento neurosensorial y anclaje somático olfativo.',
    'Ataques de Pánico e Hiperactivación Nerviosa',
    120,
    12,
    50.00,
    '#2A9D8F',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    'Aceites esenciales de grado terapéutico, hidrolatos florales, frasco de boticario ámbar de 50ml, etiquetas personalizadas.',
    'Prueba dérmica previa para descartar sensibilidades alérgicas a aceites botánicos.'
),
(
    'a5555555-5555-5555-5555-555555555555',
    'grito-y-ruptura-somatico',
    'Grito & Descompresión Somática',
    'Descarga física de la ira acumulada sin culpa ni juicio.',
    'La rabia reprimida se aloja en el diafragma, la mandíbula y la espalda baja. Con técnicas de bioenergética, percusión corporal y herramientas de descarga de alta resistencia (sacos sonoros y platos de yeso rompibles en cabina acústica), descargas la agresividad contenida para devolver el cuerpo a su estado basal de ligereza.',
    'Descarga somática bioenergética y catarsis motriz guiada.',
    'Ira Reprimida & Resentimiento Postraumático',
    90,
    8,
    60.00,
    '#9B2226',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    'Protectores auditivos de reducción pasiva, cojines de impacto bioenergético, losas de yeso mineral rompibles.',
    'Evaluación previa de articulaciones y monitorización constante de pulsaciones cardíacas.'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Sesiones de Ejemplo (Próximos días)
INSERT INTO sessions (id, workshop_id, facilitator_id, scheduled_at, end_at, location_name, capacity_override, status)
VALUES
    ('s1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', NOW() + INTERVAL '2 days' + INTERVAL '10 hours', NOW() + INTERVAL '2 days' + INTERVAL '12 hours 30 minutes', 'Estudio Éxodo - Sala de Lienzos', 10, 'published'),
    ('s2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '3 days' + INTERVAL '16 hours', NOW() + INTERVAL '3 days' + INTERVAL '19 hours', 'Taller Kintsugi - Mesa de Restauración', 8, 'published'),
    ('s3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', NOW() + INTERVAL '5 days' + INTERVAL '18 hours', NOW() + INTERVAL '5 days' + INTERVAL '20 hours', 'Cámara Domo Silenciosa', 6, 'published'),
    ('s4444444-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', NOW() + INTERVAL '6 days' + INTERVAL '11 hours', NOW() + INTERVAL '6 days' + INTERVAL '13 hours', 'Laboratorio Botánico Desahogo', 12, 'published'),
    ('s5555555-5555-5555-5555-555555555555', 'a5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '7 days' + INTERVAL '17 hours', NOW() + INTERVAL '7 days' + INTERVAL '18 hours 30 minutes', 'Cámara de Ruptura Acústica', 8, 'published')
ON CONFLICT (id) DO NOTHING;

-- 4. Reserva de Ejemplo (Sofía en Caos Creativo)
INSERT INTO bookings (id, session_id, user_id, status, payment_reference, paid_amount, checked_in_at)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'attended', 'STRIPE_TX_9872134', 65.00, NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- 5. Pulso Emocional de Sofía (Antes y Después del Taller)
INSERT INTO mood_logs (id, booking_id, user_id, phase, stress_level, mental_clarity, emotional_energy, dominant_emotion, short_note)
VALUES
    ('m1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'pre_session', 9, 3, 2, 'Sobrecargada y dispersa', 'Semana de trabajo agotadora, siento la mandíbula tensa y necesito soltar.')
ON CONFLICT (booking_id, phase) DO NOTHING;

INSERT INTO mood_logs (id, booking_id, user_id, phase, stress_level, mental_clarity, emotional_energy, dominant_emotion, short_note)
VALUES
    ('m2222222-2222-2222-2222-222222222222', 'b1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'post_session', 2, 9, 8, 'En paz y ligera', 'Manchar el lienzo sin reglas me devolvió el aire. Siento que me quité una coraza.')
ON CONFLICT (booking_id, phase) DO NOTHING;

-- 6. Recuerdo en Bóveda Digital (Foto del lienzo de Sofía)
INSERT INTO digital_vault (id, user_id, session_id, booking_id, item_type, title, media_url, caption, metadata, is_public_in_gallery)
VALUES
    (
        'v1111111-1111-1111-1111-111111111111',
        '33333333-3333-3333-3333-333333333333',
        's1111111-1111-1111-1111-111111111111',
        'b1111111-1111-1111-1111-111111111111',
        'canvas_photo',
        'Marea Negra y Oro',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
        'Mi lienzo tras 2 horas de catarsis. El negro inicial se transformó en destellos de luz.',
        '{"palette": ["Negro Humo", "Carmesí", "Oro Líquido"], "tecnica": "Espátula agresiva y manos"}'::jsonb,
        TRUE
    )
ON CONFLICT (id) DO NOTHING;
