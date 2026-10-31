-- =============================================================================
-- DESAHOGO & ÉXODO - PLATAFORMA DE TALLERES VIVENCIALES
-- Esquema de Base de Datos PostgreSQL
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- Tipos Enumerados (Enums)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('attendee', 'facilitator', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE session_status AS ENUM ('draft', 'published', 'in_progress', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'attended', 'cancelled', 'no_show');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pulse_phase AS ENUM ('pre_session', 'post_session');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vault_item_type AS ENUM (
        'canvas_photo', 
        'kintsugi_photo', 
        'journal_entry', 
        'aromatherapy_formula', 
        'audio_note', 
        'transformation_card'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- -----------------------------------------------------------------------------
-- Tabla: users
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    role user_role DEFAULT 'attendee',
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla: workshops (Catálogo de experiencias)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    catharsis_mechanism TEXT NOT NULL, -- Explicación del método (ej. Pintura gestual, reparación dorada, desahogo escrito)
    target_need VARCHAR(100) NOT NULL, -- ej. 'Burnout laboral', 'Duelo & Pérdida', 'Liberación de Rabia', 'Ansiedad'
    duration_minutes INT NOT NULL DEFAULT 120,
    max_capacity INT NOT NULL DEFAULT 12,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 45.00,
    color_accent VARCHAR(20) DEFAULT '#E06D53', -- Terracota, Oro Kintsugi, Índigo, etc.
    hero_image_url TEXT,
    materials_summary TEXT,
    safety_guidelines TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla: sessions (Ediciones programadas)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
    facilitator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    end_at TIMESTAMP WITH TIME ZONE NOT NULL,
    location_name VARCHAR(150) NOT NULL DEFAULT 'Espacio Desahogo - Sala Principal',
    capacity_override INT,
    status session_status DEFAULT 'published',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla: bookings (Reservas y asistencia)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status booking_status DEFAULT 'confirmed',
    payment_reference VARCHAR(100),
    paid_amount DECIMAL(10, 2) NOT NULL,
    checked_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_session_booking UNIQUE (session_id, user_id)
);

-- -----------------------------------------------------------------------------
-- Tabla: mood_logs (Métricas Pre y Post Catarsis)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mood_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phase pulse_phase NOT NULL,
    stress_level INT NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
    mental_clarity INT NOT NULL CHECK (mental_clarity BETWEEN 1 AND 10),
    emotional_energy INT NOT NULL CHECK (emotional_energy BETWEEN 1 AND 10),
    dominant_emotion VARCHAR(60) NOT NULL,
    short_note TEXT,
    audio_note_url TEXT,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_phase_booking UNIQUE (booking_id, phase)
);

-- -----------------------------------------------------------------------------
-- Tabla: digital_vault (Bóveda de recuerdos y creaciones)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS digital_vault (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    item_type vault_item_type NOT NULL,
    title VARCHAR(150),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    metadata JSONB DEFAULT '{}'::jsonb, -- Datos específicos del taller (receta botánica, técnica de pincel, etc.)
    is_public_in_gallery BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Índices para optimización de consultas
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_sessions_workshop_date ON sessions(workshop_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_session ON bookings(session_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_phase ON mood_logs(user_id, phase);
CREATE INDEX IF NOT EXISTS idx_vault_user ON digital_vault(user_id);
