export const initialWorkshops = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    slug: 'caos-creativo',
    title: 'Caos Creativo: Catarsis en Lienzo',
    subtitle: 'Libera la mente a través de la pintura gestual y el choque cromático.',
    description: 'Una inmersión libre de juicios estéticos donde utilizas espátulas, manos y pigmentos densos para proyectar frustraciones y pesos emocionales sobre un lienzo de gran formato. Al final, transformas el caos en una pieza estructurada de redención personal.',
    catharsis_mechanism: 'Pintura gestual no verbal y descarga psicomotriz sobre soporte rígido.',
    target_need: 'Burnout laboral & Sobrecarga mental',
    duration_minutes: 150,
    max_capacity: 10,
    base_price: 65.0,
    color_accent: '#E76F51',
    hero_image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    materials_summary: 'Lienzo de algodón 80x60cm, pinturas acrílicas pesadas, espátulas industriales, overol de protección.',
    safety_guidelines: 'Uso obligatorio de overol y calzado cerrado. Espacio ventilado.'
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    slug: 'kintsugi-resiliencia',
    title: 'Kintsugi: La Belleza de las Fracturas',
    subtitle: 'Honra tus heridas reparando cerámica con oro y resina.',
    description: 'Inspirado en la filosofía tradicional japonesa, este taller propone romper deliberadamente una pieza de cerámica que simbolice una pérdida o fractura emocional, para luego recomponerla pacientemente con resina y polvo dorado. Cada cicatriz dorada se convierte en un talismán de fortaleza.',
    catharsis_mechanism: 'Ruptura simbólica ritualizada y reconstrucción contemplativa.',
    target_need: 'Duelo, Ruptura y Reconstrucción',
    duration_minutes: 180,
    max_capacity: 8,
    base_price: 75.0,
    color_accent: '#D4A373',
    hero_image_url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    materials_summary: 'Cuenco cerámico artesanal, mortero de fractura, resina epoxi no tóxica, polvo de oro/mica natural.',
    safety_guidelines: 'Manejo de fragmentos afilados con guantes protectores de nitrilo.'
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    slug: 'camara-de-la-rendicion',
    title: 'La Cámara de la Rendición',
    subtitle: 'El arte de soltar el control en un espacio de silencio e introspección.',
    description: 'Una experiencia de descompresión radical donde ingresas a un domo acústico aislado con luz tenue. A través de un diario guiado y un ritual de escritura destructiva, nombras aquello que ya no puedes sostener, entregándote a la rendición como un acto de alivio.',
    catharsis_mechanism: 'Desahogo epistolar, silenciamiento sensorial y quema/disolución catártica.',
    target_need: 'Ansiedad de Control y Agotamiento Crónico',
    duration_minutes: 120,
    max_capacity: 6,
    base_price: 55.0,
    color_accent: '#457B9D',
    hero_image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    materials_summary: 'Diario de fibra de arroz artesanal, tinta china, urna de confinamiento, infusiones adaptógenas.',
    safety_guidelines: 'Silencio absoluto durante el 70% de la experiencia. Dispositivos electrónicos bajo resguardo.'
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    slug: 'anclaje-sensorial-aromaterapia',
    title: 'Anclaje Sensorial & Alquimia Botánica',
    subtitle: 'Crea tu propio elixir de estabilidad nerviosa.',
    description: 'El sistema olfativo conecta directamente con la amígdala y la memoria emocional. En este taller sensorial exploras notas botánicas puras para asociar un aroma a un estado de calma profunda alcanzado mediante respiración coherente, llevándote a casa un spray aromático de anclaje rápido.',
    catharsis_mechanism: 'Condicionamiento neurosensorial y anclaje somático olfativo.',
    target_need: 'Ataques de Pánico e Hiperactivación Nerviosa',
    duration_minutes: 120,
    max_capacity: 12,
    base_price: 50.0,
    color_accent: '#2A9D8F',
    hero_image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    materials_summary: 'Aceites esenciales puros (incienso, cedro, bergamota), hidrolatos botánicos, frascos ámbar 50ml.',
    safety_guidelines: 'Prueba dérmica previa para descartar sensibilidades alérgicas a aceites botánicos.'
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    slug: 'grito-y-ruptura-somatico',
    title: 'Grito & Descompresión Somática',
    subtitle: 'Descarga física de la ira acumulada sin culpa ni juicio.',
    description: 'La rabia reprimida se aloja en el diafragma, la mandíbula y la espalda. Con técnicas de bioenergética, percusión corporal y herramientas de descarga de alta resistencia en cabina acústica, descargas la agresividad contenida para devolver el cuerpo a su estado de liviandad.',
    catharsis_mechanism: 'Descarga somática bioenergética y catarsis motriz guiada.',
    target_need: 'Ira Reprimida & Resentimiento',
    duration_minutes: 90,
    max_capacity: 8,
    base_price: 60.0,
    color_accent: '#9B2226',
    hero_image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    materials_summary: 'Protectores auditivos de reducción pasiva, cojines de impacto, losas de yeso mineral rompibles.',
    safety_guidelines: 'Evaluación previa articular y monitorización de ritmo cardíaco.'
  }
];

export const initialSessions = [
  {
    id: 's1111111-1111-1111-1111-111111111111',
    workshop_id: 'a1111111-1111-1111-1111-111111111111',
    workshop_title: 'Caos Creativo: Catarsis en Lienzo',
    facilitator_name: 'Dra. Elena Santillán',
    scheduled_at: new Date(Date.now() + 2 * 86400000 + 10 * 3600000).toISOString(),
    end_at: new Date(Date.now() + 2 * 86400000 + 12.5 * 3600000).toISOString(),
    location_name: 'Estudio Éxodo - Sala de Lienzos',
    capacity: 10,
    booked_count: 7,
    status: 'published'
  },
  {
    id: 's2222222-2222-2222-2222-222222222222',
    workshop_id: 'a2222222-2222-2222-2222-222222222222',
    workshop_title: 'Kintsugi: La Belleza de las Fracturas',
    facilitator_name: 'Carlos Mendoza',
    scheduled_at: new Date(Date.now() + 3 * 86400000 + 16 * 3600000).toISOString(),
    end_at: new Date(Date.now() + 3 * 86400000 + 19 * 3600000).toISOString(),
    location_name: 'Taller Kintsugi - Mesa de Restauración',
    capacity: 8,
    booked_count: 5,
    status: 'published'
  },
  {
    id: 's3333333-3333-3333-3333-333333333333',
    workshop_id: 'a3333333-3333-3333-3333-333333333333',
    workshop_title: 'La Cámara de la Rendición',
    facilitator_name: 'Dra. Elena Santillán',
    scheduled_at: new Date(Date.now() + 5 * 86400000 + 18 * 3600000).toISOString(),
    end_at: new Date(Date.now() + 5 * 86400000 + 20 * 3600000).toISOString(),
    location_name: 'Cámara Domo Silenciosa',
    capacity: 6,
    booked_count: 4,
    status: 'published'
  },
  {
    id: 's4444444-4444-4444-4444-444444444444',
    workshop_id: 'a4444444-4444-4444-4444-444444444444',
    workshop_title: 'Anclaje Sensorial & Alquimia Botánica',
    facilitator_name: 'Dra. Elena Santillán',
    scheduled_at: new Date(Date.now() + 6 * 86400000 + 11 * 3600000).toISOString(),
    end_at: new Date(Date.now() + 6 * 86400000 + 13 * 3600000).toISOString(),
    location_name: 'Laboratorio Botánico Desahogo',
    capacity: 12,
    booked_count: 8,
    status: 'published'
  },
  {
    id: 's5555555-5555-5555-5555-555555555555',
    workshop_id: 'a5555555-5555-5555-5555-555555555555',
    workshop_title: 'Grito & Descompresión Somática',
    facilitator_name: 'Carlos Mendoza',
    scheduled_at: new Date(Date.now() + 7 * 86400000 + 17 * 3600000).toISOString(),
    end_at: new Date(Date.now() + 7 * 86400000 + 18.5 * 3600000).toISOString(),
    location_name: 'Cámara de Ruptura Acústica',
    capacity: 8,
    booked_count: 6,
    status: 'published'
  }
];

export const initialVault = [
  {
    id: 'v1111111-1111-1111-1111-111111111111',
    user_id: '33333333-3333-3333-3333-333333333333',
    user_name: 'Sofía Valenzuela',
    workshop_slug: 'caos-creativo',
    workshop_title: 'Caos Creativo: Catarsis en Lienzo',
    item_type: 'canvas_photo',
    title: 'Marea Negra y Destellos de Oro',
    media_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    caption: 'Mi lienzo tras 2 horas de catarsis. El dolor inicial se transformó en pura luz.',
    metadata: {
      palette: ['Negro Carbón', 'Carmesí', 'Oro Líquido'],
      technique: 'Espátula visceral y huella dactilar'
    },
    pre_pulse: {
      stress_level: 9,
      mental_clarity: 3,
      dominant_emotion: 'Sobrecarga y angustia'
    },
    post_pulse: {
      stress_level: 2,
      mental_clarity: 9,
      dominant_emotion: 'Paz y liviandad profunda'
    },
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'v2222222-2222-2222-2222-222222222222',
    user_id: '33333333-3333-3333-3333-333333333333',
    user_name: 'Sofía Valenzuela',
    workshop_slug: 'kintsugi-resiliencia',
    workshop_title: 'Kintsugi: La Belleza de las Fracturas',
    item_type: 'kintsugi_photo',
    title: 'Cuenco Roto en Siete Cicatrices',
    media_url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80',
    caption: 'Aprender que las heridas no se esconden, se iluminan.',
    metadata: {
      gold_purity: 'Polvo de mica 24k',
      pieces_reconstructed: 7
    },
    pre_pulse: {
      stress_level: 8,
      mental_clarity: 4,
      dominant_emotion: 'Fragilidad'
    },
    post_pulse: {
      stress_level: 3,
      mental_clarity: 8,
      dominant_emotion: 'Dignidad y entereza'
    },
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];
