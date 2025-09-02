# Documentación de Configuración del Proyecto Angular (Notas)

Este documento explica los archivos de configuración clave que no admiten comentarios en línea o donde conviene una explicación adicional centralizada.

- Proyecto: Angular 20 con componentes standalone, SSR/prerender, detección de cambios sin Zone.js, Supabase y JSONPlaceholder.

---

## angular.json
Contiene la configuración del workspace y los "targets" (build/serve/test/prerender). Claves principales:

- projects.<appName>.architect.build
  - builder: '@angular-devkit/build-angular:browser'
  - options
    - outputPath: carpeta de salida para artefactos web
    - index / main / polyfills: archivos de entrada
    - assets / styles / scripts: recursos estáticos globales
    - budgets: límites de tamaño para bundles
  - configurations
    - production: optimizaciones, budgets estrictos, source maps deshabilitados

- projects.<appName>.architect.serve
  - builder: '@angular-devkit/build-angular:dev-server' (servidor de desarrollo, HMR)

- projects.<appName>.architect.test
  - builder: '@angular-devkit/build-angular:karma' (si aplica)

- projects.<appName>.architect.prerender / server
  - Integración SSR/prerender con '@angular/ssr'
  - prerender genera HTML estático a partir de rutas definidas en `app.routes.server.ts`

Notas:
- En Angular 20/SSR moderno, el prerender se gestiona con `@angular/ssr` y rutas de servidor (`ServerRoute`).
- No modificar budgets a la ligera: ayudan a detectar crecimientos de bundle.

---

## package.json
Define scripts y dependencias.

- scripts típicos
  - start / serve: arranca servidor de desarrollo
  - build: compila la app para producción
  - test: ejecuta tests unitarios
  - prerender / build:ssr: genera HTML estático para rutas configuradas

- dependencies
  - @angular/*: paquetes del framework (core, router, platform-browser, ssr)
  - rxjs: programación reactiva
  - zone.js: opcional según modo; el proyecto usa `provideZonelessChangeDetection()` para prescindir de Zone en runtime
  - @supabase/supabase-js: cliente JS para Supabase

- devDependencies
  - @angular-devkit/*, TypeScript, herramientas de build/lint/test

Notas:
- Ajusta versiones de Angular y TS en bloque para evitar incompatibilidades.
- No subir claves de Supabase al repositorio.

---

## tsconfig.json (raíz)
Opciones base de TypeScript y del compilador de Angular.

- compilerOptions
  - strict: true — modo estricto de TS
  - noImplicitOverride, noImplicitReturns, noFallthroughCasesInSwitch — calidad de código
  - skipLibCheck: true — acelera compilación, ignora tipos dentro de node_modules
  - isolatedModules: true — óptimo para toolchains modernas
  - experimentalDecorators: true — soporte de decoradores (Angular)
  - importHelpers: true — reduce tamaño usando tslib
  - target: 'ES2022' — nivel de JS emitido
  - module: 'preserve' — deja el sistema de módulos para que el bundler lo resuelva

- angularCompilerOptions
  - strictTemplates: true — chequeo estricto de plantillas
  - strictInjectionParameters, strictInputAccessModifiers, typeCheckHostBindings — seguridad en DI y bindings

- references: apunta a `tsconfig.app.json` y `tsconfig.spec.json`

---

## tsconfig.app.json
Extiende del raíz para la app.

- compilerOptions
  - outDir: './out-tsc/app' — salida intermedia
  - types: ['node'] — tipos disponibles en tiempo de compilación
- include/exclude
  - include: 'src/**/*.ts'
  - exclude: 'src/**/*.spec.ts' — los tests quedan fuera del build de app

---

## tsconfig.spec.json
Configuración para tests.

- compilerOptions
  - outDir: './out-tsc/spec'
  - types: ['jasmine'] — tipos de framework de testing
- include
  - src/**/*.ts — incluye archivos de test y código fuente para ejecutar specs

---

## SSR y prerender (resumen)

- `src/app/app.config.server.ts`: combina `appConfig` con providers SSR mediante `mergeApplicationConfig`.
- `src/app/app.routes.server.ts`: define rutas de servidor. La wildcard `**` con `RenderMode.Prerender` permite generar HTML estático para todas las rutas.
- `src/app/app.config.ts`: registra Router, transiciones, scroll, hidratación con reenvío de eventos y HttpClient basado en fetch.

---

## Supabase (seguridad y setup)

- Configurar `supabaseUrl` y `supabaseKey` en `src/app/services/supabase.service.ts` usando variables de entorno o un archivo seguro.
- Crear tabla `tasks` ejecutando `database-setup.sql` y políticas RLS.
- No exponer claves sensibles en el repositorio.

---

## Recomendaciones

- Mantener `strictTemplates` y `strict` activados para prevenir bugs.
- Usar señales e inputs tipados como en Angular 16+ para componentes (`input.required<T>()`).
- Documentar cambios de configuración relevantes en este archivo para el equipo.

---

## angular.json (detalles comunes de targets/opciones)

Los targets más relevantes dentro de `projects.<appName>.architect`:

- build (browser)
  - optimization: true/false — minificación y optimizaciones de build
  - outputHashing: 'all' — cache busting de assets y bundles
  - sourceMap: true/false — mapas de fuente para depuración
  - budgets: límites de tamaño; ejemplo útil:
    - type: initial, maximumWarning: '500kb', maximumError: '1mb'
  - fileReplacements: permite reemplazar archivos por ambiente (ej: environments)

- serve (dev-server)
  - open: abre el navegador al iniciar
  - port/host: configuración de red para desarrollo

- test (si aplica Karma)
  - codeCoverage: genera reporte de cobertura

- server (SSR)
  - builder: '@angular-devkit/build-angular:server' — construye el bundle para Node/SSR
  - main: entrada de servidor (generalmente `server.ts`/`main.server.ts`)

- prerender
  - builder: '@angular-devkit/build-angular:prerender' — prerenderiza rutas
  - options.routes: rutas a prerender; en Angular 20 suele derivar de `ServerRoute` (wildcard)

Notas:
- En setups modernos con `@angular/ssr`, `prerender` utiliza las rutas definidas en `src/app/app.routes.server.ts`.
- Revisa que `assets`, `styles` y `scripts` contengan lo necesario (favicon, global.css, etc.).

---

## package.json (scripts típicos y recomendaciones)

Scripts comunes (los nombres pueden variar según el esqueleto del proyecto):

- dev / start: inicia el servidor de desarrollo (Vite/Angular dev server)
- build: compila para producción (browser)
- build:ssr: compila bundles de browser + server para SSR
- prerender: genera HTML estático de rutas (usa `app.routes.server.ts`)
- test: ejecuta unit tests
- lint: ejecuta el linter (si está configurado)

Buenas prácticas:
- Mantener alineadas las versiones de Angular y TypeScript.
- Evitar ejecutar comandos que puedan exponer claves; usar variables de entorno.

---

## Configuración segura de Supabase (credenciales)

Objetivo: evitar hardcodear claves y que terminen versionadas.

Archivos involucrados:
- `src/supabase.config.ts` (no versionar):
  - Proporciona `SUPABASE_URL` y `SUPABASE_ANON_KEY` para el runtime del browser.
  - Está listado en `.gitignore` para evitar subirlo.
- `supabase.config.example.ts` (versionado):
  - Plantilla de ejemplo para que cada dev copie a `src/supabase.config.ts`.

Pasos de configuración local:
1. Copiar `supabase.config.example.ts` a `src/supabase.config.ts`.
2. Rellenar `SUPABASE_URL` (p. ej. `https://<id>.supabase.co`) y `SUPABASE_ANON_KEY`.
3. Verificar que `.gitignore` contiene `src/supabase.config.ts`.

Uso en código:
- `src/app/services/supabase.service.ts` importa desde `../../supabase.config`.

Opciones por ambiente (build):
- Usar `fileReplacements` en `angular.json` para reemplazar `src/supabase.config.ts` por variantes de `prod/staging` durante la build si se desea.

CI/CD:
- Generar `src/supabase.config.ts` en un paso previo a `ng build`, inyectando valores desde el sistema de secretos del CI.
