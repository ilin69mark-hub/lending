-- Database Schema for ivan.ru Landing

-- Create database
-- CREATE DATABASE ivanolru;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table for cities
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    coords JSONB NOT NULL DEFAULT '{"lat": 0, "lng": 0}',
    status VARCHAR(20) NOT NULL DEFAULT 'free' CHECK (status IN ('free', 'taken', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for leads (заявки)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city_id INTEGER REFERENCES cities(id) ON DELETE SET NULL,
    city_name VARCHAR(100),
    reason VARCHAR(255),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'approved', 'rejected', 'completed')),
    source VARCHAR(50) DEFAULT 'website',
    notes TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    contacted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Table for dealers (дилеры)
CREATE TABLE IF NOT EXISTS dealers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    city_id INTEGER REFERENCES cities(id) ON DELETE SET NULL,
    contract_number VARCHAR(50),
    investment_amount DECIMAL(15, 2),
    monthly_revenue DECIMAL(15, 2),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    paused_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for admin users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'superadmin')),
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for lead status history
CREATE TABLE IF NOT EXISTS lead_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    notes TEXT,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for settings
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_city_name ON leads(city_name);
CREATE INDEX IF NOT EXISTS idx_dealers_status ON dealers(status);
CREATE INDEX IF NOT EXISTS idx_cities_status ON cities(status);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cities_updated_at
    BEFORE UPDATE ON cities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_dealers_updated_at
    BEFORE UPDATE ON dealers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Insert initial cities data
INSERT INTO cities (name, coords, status) VALUES
('Москва', '{"lat": 55.755826, "lng": 37.6173}', 'free'),
('Санкт-Петербург', '{"lat": 59.9311, "lng": 30.3609}', 'free'),
('Екатеринбург', '{"lat": 56.8389, "lng": 60.6057}', 'free'),
('Казань', '{"lat": 55.8304, "lng": 49.0661}', 'free'),
('Нижний Новгород', '{"lat": 56.2965, "lng": 43.9366}', 'free'),
('Челябинск', '{"lat": 55.1644, "lng": 61.4368}', 'free'),
('Самара', '{"lat": 53.2028, "lng": 50.1913}', 'free'),
('Уфа', '{"lat": 54.7352, "lng": 55.9835}', 'free'),
('Волгоград', '{"lat": 48.7194, "lng": 44.5018}', 'free'),
('Пермь', '{"lat": 58.0176, "lng": 56.2855}', 'free'),
('Воронеж', '{"lat": 51.672, "lng": 39.1843}', 'free'),
('Саратов', '{"lat": 51.5331, "lng": 45.9871}', 'free'),
('Краснодар', '{"lat": 45.0448, "lng": 38.9766}', 'free'),
('Тольятти', '{"lat": 53.5099, "lng": 49.4198}', 'free'),
('Ижевск', '{"lat": 56.8522, "lng": 53.2047}', 'free'),
('Барнаул', '{"lat": 53.3811, "lng": 83.7518}', 'free'),
('Ульяновск', '{"lat": 54.3053, "lng": 48.3745}', 'free'),
('Тюмень', '{"lat": 57.153, "lng": 65.5343}', 'free'),
('Иркутск', '{"lat": 52.2868, "lng": 104.2308}', 'free'),
('Владивосток', '{"lat": 43.1332, "lng": 131.9113}', 'free'),
('Кострома', '{"lat": 57.7679, "lng": 40.9268}', 'taken'),
('Псков', '{"lat": 57.8193, "lng": 28.3328}', 'taken'),
('Мурманск', '{"lat": 68.9695, "lng": 33.0827}', 'taken'),
('Калининград', '{"lat": 54.7224, "lng": 20.4619}', 'taken'),
('Сочи', '{"lat": 43.6037, "lng": 39.7368}', 'taken')
ON CONFLICT (name) DO NOTHING;

-- Create admin user (password: admin123)
INSERT INTO users (email, password_hash, name, role)
VALUES (
    'admin@ivan.ru',
    crypt('admin123', gen_salt('bf')),
    'Администратор',
    'superadmin'
)
ON CONFLICT (email) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
('site_title', '"Дилерство ivan.ru"', 'Название сайта'),
('telegram_chat_id', NULL, 'ID чата Telegram для уведомлений'),
('notification_enabled', 'true', 'Включить уведомления'),
('leads_per_page', '20', 'Заявок на странице')
ON CONFLICT (key) DO NOTHING;