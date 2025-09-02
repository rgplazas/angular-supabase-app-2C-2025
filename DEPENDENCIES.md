# DEPENDENCIES.md

Resumen de dependencias y devDependencies del proyecto, con notas relevantes para Angular 20, SSR e integración con Supabase.

## Dependencias

- @angular/common ^20.2.0
  - Utilidades comunes de Angular (directivas, pipes, etc.). Requerido por todos los componentes.
- @angular/compiler ^20.2.0
  - Compilación de templates. Compatible con el control flow de Angular 20 (@if/@for, @switch).
- @angular/core ^20.2.0
  - Núcleo del framework. En este proyecto usamos standalone APIs y zoneless change detection.
- @angular/forms ^20.2.0
  - Formularios template-driven y validaciones (usado en `dashboard.html`).
- @angular/platform-browser ^20.2.0
  - Soporte para apps que corren en el navegador. Incluye APIs de bootstrap standalone.
- @angular/platform-server ^20.2.0
  - Soporte para SSR (server-side rendering) junto con `@angular/ssr`.
- @angular/router ^20.2.0
  - Enrutador. Proyecto usa `withViewTransitions` y `withInMemoryScrolling`.
- @angular/ssr ^20.2.0
  - Integración SSR/Hydration. En este proyecto habilitado con `provideClientHydration(withEventReplay())` y `provideServerRendering()`.
- @supabase/supabase-js ^2.56.1
  - SDK oficial para Supabase. Usado por `SupabaseService` para CRUD de tareas.
- express ^5.1.0
  - Servidor para SSR en producción (script `serve:ssr:*`).
- rxjs ~7.8.0
  - Librería de programación reactiva. Usada por `ApiService.getPosts()` y suscripciones.
- tslib ^2.8.1
  - Helpers TypeScript (decorators, spread, etc.). Requerido por Angular 20.

## DevDependencies

- @angular/build ^20.2.0
  - Builders oficiales (browser, server, prerender) para Angular 20.
- @angular/cli ^20.2.0
  - CLI para desarrollo, generación y builds.
- @angular/compiler-cli ^20.2.0
  - Herramientas CLI de compilación AOT y type-checking de plantillas.
- @types/express ^5.0.1
  - Tipos TypeScript para Express 5.
- @types/jasmine ~5.1.0
  - Tipos para Jasmine (tests).
- @types/node ^20.19.11
  - Tipos para Node.js (necesario para SSR y tooling).
- jasmine-core ~5.9.0
  - Framework de testing.
- karma ~6.4.0, karma-chrome-launcher ~3.2.0, karma-coverage ~2.2.0, karma-jasmine ~5.1.0, karma-jasmine-html-reporter ~2.1.0
  - Tooling para ejecutar tests en navegador y reportes de cobertura.
- typescript ~5.9.2
  - Compilador TS compatible con Angular 20.

## Notas de Migración a Angular 20

- Control Flow: Se migraron plantillas de `*ngIf/*ngFor` a `@if/@for` con `track` por `id` cuando aplica (`inicio.html`, `dashboard.html`, `task-item.html`).
- SSR/Hydration: Configurado en `src/app/app.config.ts` y `src/app/app.config.server.ts`.
- Zoneless: Habilitado `provideZonelessChangeDetection()` para performance.
- HttpClient con Fetch: `provideHttpClient(withFetch())` para mejor integración con plataformas modernas.

## Buenas prácticas adoptadas

- Standalone components y `bootstrapApplication`.
- Router con view transitions y scroll restoration.
- Comentarios de cabecera en archivos clave (`inicio.ts/html`, `dashboard.ts/html`, `task-item.ts/html`).

Si agregas nuevas dependencias, por favor documentarlas aquí y explicar su uso y versión mínima compatible con Angular 20.
