// Archivo: src/supabase.config.ts — NO versionar. Contiene credenciales locales de Supabase.
// Copiar desde supabase.config.example.ts (o desde README de tu proyecto) y completar con tus valores.
// Recomendación: mantener este archivo fuera del control de versiones (.gitignore).

// Nota: En aplicaciones Angular (browser) no se debe leer process.env directamente.
// Define aquí los valores locales, o usa fileReplacements en angular.json para prod/staging.
export const SUPABASE_URL = 'https://bstgnsikogqvruilkhhp.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGduc2lrb2dxdnJ1aWxraGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MzkyODQsImV4cCI6MjA3MjQxNTI4NH0.mL0ClrsC4BXirBGuzGrIL3yAixoj_HfY0fCHzCbvXUY';

// Alternativas seguras:
// - Usar fileReplacements por ambiente (dev/prod) para inyectar otros valores en build.
// - En CI, generar este archivo con los valores correctos como paso previo a la build.
