-- Script SQL para configurar la base de datos de Supabase
-- Ejecutar en el SQL Editor de Supabase

-- 1. Crear la tabla tasks
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir todas las operaciones
-- NOTA: Esta política es permisiva para desarrollo/demostración
-- En producción, deberías usar políticas más restrictivas
CREATE POLICY "Enable all operations for tasks" ON tasks
FOR ALL USING (true) WITH CHECK (true);

-- 4. Verificar que la tabla se creó correctamente
SELECT * FROM tasks;

-- 5. Insertar algunos datos de ejemplo (opcional)
INSERT INTO tasks (title, description, completed) VALUES
('Tarea de ejemplo 1', 'Esta es una tarea de ejemplo para demostrar el funcionamiento', false),
('Tarea completada', 'Esta tarea ya está marcada como completada', true),
('Aprender Angular', 'Estudiar los conceptos básicos de Angular y componentes', false);
