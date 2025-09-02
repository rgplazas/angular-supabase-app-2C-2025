# 🎓 Guion de Clase: Angular + Supabase + API Externa

Duración sugerida: 90–120 min
Nivel: Inicial–Intermedio
Repositorio base: `angular-supabase-app`

## 🎯 Objetivos de Aprendizaje
- Comprender la estructura de un proyecto Angular con componentes standalone.
- Consumir una API externa con `HttpClient` y RxJS.
- Configurar Supabase y realizar CRUD sobre la tabla `tasks`.
- Entender comunicación padre–hijo (`@Input`/`@Output`) y rutas básicas.

## 📦 Materiales y Preparación
- Node 20.x, Angular CLI instalado.
- Cuenta en Supabase.
- Proyecto clonado y dependencias instaladas.
- Archivos de apoyo: `SETUP.md`, `README.md`, `database-setup.sql`.

## 🧭 Agenda con tiempos y checkpoints

1) Apertura y objetivos (5 min)
- Presentación del flujo general (diagrama en `README.md`).
- Checkpoint A: alumnos confirman prerrequisitos instalados.

2) Estructura del proyecto (10 min)
- Recorrer `README.md` → “Mapa del Proyecto”.
- Mostrar `app.routes.ts`, `app.config.ts`, `app.ts`.
- Checkpoint B: preguntas rápidas sobre rutas y bootstrap.

3) Consumo de API externa (15 min)
- Ver `ApiService` y `InicioComponent`.
- Ejecutar app y observar posts.
- Checkpoint C: todos ven posts en `/inicio`.

4) Componentes y comunicación (15 min)
- `PostCardComponent` (@Input) y `TaskItemComponent` (@Output).
- Demostración de eventos hacia el padre en Dashboard.
- Checkpoint D: alumnos identifican Inputs/Outputs en código.

5) Configurar Supabase (20–25 min)
- `SETUP.md`: crear proyecto, copiar `supabase.config.example.ts` a `src/supabase.config.ts`.
- Completar `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `src/supabase.config.ts` (archivo no versionado; está en `.gitignore`).
- Ejecutar `database-setup.sql`.
- Explicar RLS y política de desarrollo.
- Checkpoint E: credenciales guardadas, tabla creada.

6) CRUD de tareas en Dashboard (15–20 min)
- Revisar `DashboardComponent` y `SupabaseService`.
- Crear, listar, completar y eliminar.
- Checkpoint F: cada alumno crea/borra una tarea.

7) Cierre y evaluación (5–10 min)
- Repaso de conceptos clave.
- Preguntas y próximos pasos.

## 🧪 Actividades guiadas (paso a paso)

- Tarea 1: Agregar validación extra al formulario de tareas (min-length descripción).
- Tarea 2: Mostrar contador de tareas pendientes/completadas (si no existe, calcular en el componente).
- Tarea 3: Agregar manejo de error visual si falla Supabase (banner en Dashboard).

## 🐛 Troubleshooting en vivo
- Errores de tipos (tslib/@types/node): ver `SETUP.md` → Solución de problemas.
- 401/403 desde Supabase: revisar URL/anon key, ejecutar `database-setup.sql`.
- Módulos Angular faltantes: `npm install`.

## 📘 Referencias dentro del repo
- `src/app/pages/dashboard/dashboard.ts`: flujo CRUD y estados UI.
- `src/app/components/task-item/task-item.ts`: @Output y eventos.
- `src/app/components/post-card/post-card.ts`: @Input y presentación.
- `src/app/services/api.service.ts`: HttpClient y Observables.
- `src/app/services/supabase.service.ts`: operaciones con Supabase.
- `src/app/app.routes.ts`: rutas y redirecciones.
- `README.md` → Mapa del proyecto, diagrama.
- `SETUP.md` → Guía paso a paso e instalación.

## 📝 Evaluación rápida (exit ticket)
- ¿Qué diferencia hay entre `@Input` y `@Output`?
- ¿Dónde se configuran las rutas en este proyecto?
- ¿En qué archivo se definen `SUPABASE_URL` y `SUPABASE_ANON_KEY`? (Respuesta esperada: `src/supabase.config.ts`)
- ¿Cómo probarías un error de red en la vista de posts?

## 🧩 Extensiones opcionales (para otra clase)
- Añadir edición de título/descripción.
- Filtro de tareas (todas/pendientes/completadas).
- Paginación de posts o lazy loading.

---
Este guion se apoya en comentarios didácticos ya incluidos en el código y la documentación de `SETUP.md` y `README.md`. Ajusta tiempos según el ritmo del grupo.
