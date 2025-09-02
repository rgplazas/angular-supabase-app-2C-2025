// Archivo de configuración de ejemplo para Supabase
// Pasos:
// 1) Copia este archivo y renómbralo a 'supabase.config.ts'
// 2) Reemplaza los valores con tus credenciales reales
// 3) NO subas 'supabase.config.ts' al control de versiones (está en .gitignore)

// IMPORTANTE: El servicio `SupabaseService` espera constantes con estos nombres:
//   SUPABASE_URL y SUPABASE_ANON_KEY
// Por eso exportamos dos constantes, no un objeto.

export const SUPABASE_URL = 'https://tu-proyecto.supabase.co'; // Project URL (Settings > API)
export const SUPABASE_ANON_KEY = 'tu-clave-anonima-aqui';      // anon/public API key

// ¿Dónde encuentro estas credenciales?
// 1. Ve a https://supabase.com y abre tu proyecto
// 2. Navega a Settings > API
// 3. Copia:
//    - Project URL  → SUPABASE_URL
//    - Project API keys → anon/public → SUPABASE_ANON_KEY
