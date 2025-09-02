# Angular 20 Migration Notes

Fecha: 2025-09-02 13:37 (-03)

## Objetivos
- Migrar a Angular 20 con componentes standalone, control flow (@if/@for), y señales para inputs.
- Compatibilidad SSR con hidratación e inyección sin zonas (zoneless).
- Documentación profesional por archivo y dependencias.

## Cambios Clave Realizados
- Componentes a standalone verificados en `src/app/` (p.ej. `App`, `DashboardComponent`, `InicioComponent`).
- Control flow actualizado en plantillas:
  - `src/app/pages/dashboard/dashboard.html`: `@if/@for` con `track` por `id`.
  - `src/app/pages/inicio/inicio.html`: `@if/@for` con `track` por `id`.
  - `src/app/components/task-item/task-item.html`: `@if` y acceso a señales (`task()`).
- Señales para @Input():
  - `PostCardComponent` (`src/app/components/post-card/post-card.ts`): `post = input.required<Post>()` y template con `post()...`.
  - `TaskItemComponent` (`src/app/components/task-item/task-item.ts`): `task = input.required<Task>()` y template con `task()...`.
- Pruebas unitarias actualizadas a standalone y señales:
  - `post-card.spec.ts`: usa `PostCardComponent` y `fixture.componentRef.setInput('post', ...)`.
  - `task-item.spec.ts`: usa `TaskItemComponent` y `setInput('task', ...)`.
  - `dashboard.spec.ts`: usa `DashboardComponent`.
  - `inicio.spec.ts`: usa `InicioComponent`.
- SSR/zoneless: `app.config.server.ts` y `app.config.ts` (ya con `provideServerRendering` y zoneless + hidratación en la app).
- Documentación: encabezados explicativos añadidos en .ts/.html clave y `DEPENDENCIES.md` con detalles de libs.
- Credenciales Supabase: externalizadas en `src/supabase.config.ts` (no versionado, en `.gitignore`). `SupabaseService` importa `SUPABASE_URL` y `SUPABASE_ANON_KEY` desde allí.

## Pendientes / Próximos pasos
- Actualizar a Material You (M3) si el proyecto usa Angular Material (theme tokens, density, palettes).
- Verificar/ajustar `angular.json` y `tsconfig*.json` con comentarios finales.
- Completar documentación restante en CSS/SCSS con encabezados breves.
- Ejecutar tests y registrar resultados en esta nota (build ya validado).

## Notas de Compatibilidad
- Inputs con señales: consumir en template como `prop()`; en tests establecer con `fixture.componentRef.setInput('prop', value)`.
- `@if/@for`: reemplazan `*ngIf/*ngFor`; `@for (item of items; track item.id) { ... }`.
- Standalone: los componentes se importan en `imports: [...]` de cada `@Component` y en tests directamente en `imports`.

## Checklist de Validación
- [x] Plantillas migradas a `@if/@for` en páginas clave.
- [x] Componentes con `@Input` migrados a `signal input()` donde aplica.
- [x] Especs standalone y con `setInput` donde corresponde.
- [ ] Material M3 actualizado (si aplica) y documentado.
- [x] `angular.json` y `tsconfig*.json` revisados y comentados.
- [x] Build producción `ng build -c production` exitoso.
- [ ] Tests `npm test` exitosos (sin watch) y flakiness revisado.

## Resultados de Validación
- Build producción: OK (2025-09-02 13:49 -03). Artefactos en `dist/angular-supabase-app/`.

## Configuración explicada
- `angular.json`:
  - `build`: builder `@angular/build:application` con SSR (`server: src/main.server.ts`, `outputMode: server`, `ssr.entry: src/server.ts`). Estilos globales en `src/styles.css` y assets desde `public/`. Producción con `outputHashing: all` y budgets conservadores.
  - `serve`: builder `@angular/build:dev-server` apuntando a las configuraciones `build` de producción/desarrollo.
  - `test`: builder `@angular/build:karma` usando `tsconfig.spec.json`, `src/styles.css` y assets `public/`. Sin `karma.conf.js`, se parametriza por CLI (`--browsers=ChromeHeadless`, `--watch=false`).
- `tsconfig.json`:
  - `strict` activado y checks adicionales (`noImplicitReturns`, `noFallthroughCasesInSwitch`, etc.). Target `ES2022`, `module: preserve`, `isolatedModules` y `experimentalDecorators` habilitados. Angular Compiler estricto (`strictTemplates`, `strictInjectionParameters`).
- `tsconfig.app.json`:
  - Extiende el root, `outDir` app y `types: ["node"]`. Incluye `src/**/*.ts` y excluye `*.spec.ts`.
- `tsconfig.spec.json`:
  - Extiende el root, `outDir` spec y `types: ["jasmine"]`. Incluye `src/**/*.ts`.

## Referencias
- Angular v20 docs: control flow, signals, standalone, SSR/hydration.
- Ejemplos en este repo: ver rutas y componentes en `src/app/`.
