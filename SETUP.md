# 🚀 Guía de Configuración Paso a Paso

## ✅ Verificación Rápida

Después de la instalación, puedes verificar que todo funciona:

1. **API Externa**: La página de inicio debería mostrar posts de JSONPlaceholder
2. **Ruteo**: Navegar entre "Inicio" y "Dashboard" debería funcionar
3. **Supabase**: Configuración requerida para el ABM de tareas

## 🧰 Prerrequisitos

- Node.js LTS 20.x (Windows: https://nodejs.org)
- npm (se instala con Node)
- Angular CLI (global):
  ```bash
  npm i -g @angular/cli
  ```
- Editor recomendado: VS Code

Comprobar versiones:
```bash
node -v
npm -v
ng version
```

## 📦 Instalación del proyecto

Dentro de la carpeta del proyecto `angular-supabase-app/`:
```bash
npm install
```

Si aparecen errores de tipos/ayudantes:
```bash
npm install tslib
npm install -D @types/node
```

Dependencia Supabase (si no estuviera):
```bash
npm install @supabase/supabase-js
```

## ▶️ Ejecutar en desarrollo

```bash
npm start
# o
ng serve
```

Abrir: http://localhost:4200

## 📋 Configuración de Supabase

### Paso 1: Crear cuenta y proyecto
1. Ir a [https://supabase.com](https://supabase.com)
2. Crear una cuenta gratuita
3. Crear un nuevo proyecto
4. Esperar a que se complete la configuración (1-2 minutos)

### Paso 2: Obtener credenciales
1. En tu proyecto de Supabase, ir a **Settings** → **API**
2. Copiar:
   - **Project URL** (ejemplo: `https://abc123.supabase.co`)
   - **Project API keys** → **anon** key (clave pública)

### Paso 3: Configurar credenciales en la aplicación (archivo no versionado)
1. Copiar `supabase.config.example.ts` a `src/supabase.config.ts`.
2. Editar `src/supabase.config.ts` y completar:
   ```ts
   export const SUPABASE_URL = 'https://abc123.supabase.co';
   export const SUPABASE_ANON_KEY = 'tu-clave-anonima-aqui';
   ```
3. Confirmar que `.gitignore` incluye `src/supabase.config.ts`.
4. Nota: `SupabaseService` ya importa estas constantes; no es necesario editar el servicio.

### Paso 4: Crear la tabla
1. En Supabase, ir a **SQL Editor**
2. Copiar y ejecutar el contenido de `database-setup.sql`
3. ¡Listo! El ABM de tareas ya debería funcionar

## 🧑‍🏫 Guía didáctica: construir la app desde cero (flow de clase)

Objetivo: al finalizar, el grupo habrá construido una app Angular 20 standalone con:
- Página Inicio que consume una API externa (JSONPlaceholder) y usa un componente presentacional `PostCardComponent`.
- Página Dashboard con ABM de tareas en Supabase, Reactive Forms y un componente hijo `TaskItemComponent` con señales.
- Control flow moderno `@if/@for` y mejores prácticas de arquitectura.

### 0) Preparación (5 min)
- Explicar arquitectura del proyecto (`src/app/pages/`, `src/app/components/`, `src/app/services/`).
- Aclarar conceptos: standalone components, control flow `@if/@for`, señales para `@Input`, Reactive Forms.

### 1) Crear proyecto base con SSR (5 min)
```bash
ng new angular-supabase-app --ssr
cd angular-supabase-app
npm install @supabase/supabase-js tslib -D @types/node
```
Checklist: correr `ng serve` y ver http://localhost:4200.

### 2) Ruteo y layout mínimo (10 min)
- Definir rutas `app.routes.ts`: `/inicio`, `/dashboard`.
- Navbar simple en la shell para navegar entre páginas.

### 3) Generar páginas standalone (10 min)
```bash
ng g c app/pages/inicio --standalone --flat=false
ng g c app/pages/dashboard --standalone --flat=false
```
- Explicar `imports: [...]` en `@Component` y cómo exponer directivas/pipes necesarios.
- En Angular 20, usar control flow `@if/@for` (no `*ngIf/*ngFor`).

### 4) Componentes presentacionales (15 min)
```bash
ng g c app/components/post-card --standalone --flat=false
ng g c app/components/task-item --standalone --flat=false
```
- `PostCardComponent`: input con señales `post = input.required<Post>()` y template que lee `post()`.
- `TaskItemComponent`: input con señales `task = input.required<Task>()`, outputs `deleteTask` y `toggleComplete`.
- Pipes/directivas: importar solo lo necesario (p.ej. `DatePipe` standalone en `TaskItemComponent`).

### 5) Servicios (15 min)
```bash
ng g s app/services/api --flat
ng g s app/services/supabase --flat
```
- `ApiService`: usa HttpClient para pedir posts a JSONPlaceholder. Mostrar tipado `Post` y manejo básico de errores.
- `SupabaseService`: inicializa el cliente de Supabase y expone métodos `getTasks`, `addTask`, `deleteTask`, `updateTaskCompleted`.

### 6) Configuración de credenciales (5 min)
- Copiar `supabase.config.example.ts` a `src/supabase.config.ts` y completar `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
- Confirmar que `src/supabase.config.ts` está en `.gitignore`.

### 7) Base de datos en Supabase (5 min)
- En SQL Editor, ejecutar el contenido de `database-setup.sql`.
- Explicar RLS y la política de ejemplo.

### 8) Implementar Inicio (15 min)
- En `InicioComponent` (`src/app/pages/inicio/inicio.ts`):
  - Inyectar `ApiService`, cargar posts en `ngOnInit` y manejar estados `loading/error`.
  - Renderizar lista con `@for (post of posts; track post.id)` y `PostCardComponent`.

### 9) Implementar Dashboard con Reactive Forms (25 min)
- En `DashboardComponent` (`src/app/pages/dashboard/dashboard.ts`):
  - Importar `ReactiveFormsModule` y crear `newTaskForm` (controles `title`, `description`, `completed`).
  - Validaciones con `Validators.required/minLength`.
  - Cargar tareas con `SupabaseService.getTasks()`.
  - Crear métodos: `onSubmit`, `onDeleteTask`, `onToggleComplete`, y getters `pendingTasks`/`completedTasks`.
- En `dashboard.html`:
  - Sustituir `ngModel` por `[formGroup]` y `formControlName`.
  - Mostrar errores con `@if (newTaskForm.get('title')?.invalid && ...?.touched)`.
  - Listar tareas con `@for` y usar `<app-task-item [task]="task" (deleteTask)=... (toggleComplete)=...>`.

### 10) Control flow moderno y señales (10 min)
- Recalcar lectura de señales en template: `task()` / `post()`.
- `@if`/`@for` con `track` para rendimiento.

### 11) SSR y DX (5 min)
- `ng serve` para dev; opcionalmente mostrar `npm run build` y cómo servir SSR producido.
- Nota de deprecations de Node (p. ej. punycode) y cómo diagnosticarlas/mitigarlas.

### 12) Pruebas rápidas (opcionales) (5 min)
- Idea: tests de componentes standalone y `fixture.componentRef.setInput` para señales.

### 13) Cierre y verificación (5 min)
- Revisar checklist de funcionalidades.
- Preguntas y próximos pasos (estilos, Material, auth, etc.).

## 🎯 Funcionalidades por Probar

### 📄 Página Inicio (`/inicio`)
- ✅ **Navegación**: Cambiar entre páginas con la navbar
- ✅ **API Externa**: Ver posts cargados desde JSONPlaceholder
- ✅ **Responsive**: Probar en diferentes tamaños de pantalla
- ✅ **Componentes**: `PostCardComponent` mostrando datos con @Input

### 📊 Página Dashboard (`/dashboard`)
- ✅ **Formulario**: Crear nuevas tareas con validación
- ✅ **ABM Supabase**: Agregar, listar y eliminar tareas
- ✅ **Componente hijo**: `TaskItemComponent` con @Input/@Output
- ✅ **Estados**: Loading, error y datos cargados
- ✅ **Interactividad**: Marcar tareas como completadas

## 🔍 Verificación de Requisitos

### Angular Básico ✅
- [x] Dos componentes: `TaskItemComponent`, `PostCardComponent`
- [x] @Input() y @Output() implementados
- [x] *ngFor para listas de tareas y posts
- [x] *ngIf para estados de carga y errores
- [x] Formulario con validación (required, minlength)
- [x] Ruteo: `/inicio` y `/dashboard`

### Supabase ✅
- [x] Conexión configurada
- [x] Tabla `tasks` con estructura completa
- [x] Agregar registros (CREATE)
- [x] Listar registros (READ)
- [x] Eliminar registros (DELETE)
- [x] Actualizar registros (UPDATE - marcar completado)

### API Externa ✅
- [x] JSONPlaceholder configurado
- [x] Servicio Angular con HttpClient
- [x] Datos mostrados en cards/tabla

## 🎨 Características Extra Implementadas

- **Diseño responsive** con CSS Grid y Flexbox
- **Estados de UI** (loading, error, vacío)
- **Validaciones de formulario** con feedback visual
- **Navegación sticky** con estados activos
- **Estadísticas** de tareas (total, pendientes, completadas)
- **Confirmaciones** para acciones destructivas
- **Animaciones CSS** y efectos hover
- **Estructura modular** y componentes reutilizables

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
# o
ng serve

# Compilar para producción
npm run build

# Generar nuevos componentes
ng generate component nombre-componente

# Ejecutar tests
npm test
```

## 🐛 Solución de Problemas

### La página de inicio no carga posts
- **Causa**: Problema de conectividad a internet
- **Solución**: Verificar conexión, JSONPlaceholder es un servicio público

### El dashboard no guarda tareas
- **Causa**: Credenciales de Supabase no configuradas
- **Solución**: Seguir los pasos de configuración arriba

### Error de compilación
- **Causa**: Dependencias faltantes
- **Solución**: Ejecutar `npm install`

### Errores de tipos (Angular/RxJS/tslib)
- **Causa**: Falta `tslib` o definiciones Node
- **Solución**:
  ```bash
  npm install tslib
  npm install -D @types/node
  ```

### 401/403 al llamar Supabase
- **Causa**: URL/anon key incorrectas o RLS/políticas
- **Solución**: Verificar credenciales y ejecutar `database-setup.sql`

### Problemas de estilo
- **Causa**: CSS no se está aplicando
- **Solución**: Verificar que `ng serve` esté ejecutándose

---

¡Tu aplicación Angular + Supabase + API está lista! 🎉
