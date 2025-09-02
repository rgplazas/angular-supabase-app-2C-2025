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

## 🏗️ Generar este proyecto desde cero (para enseñar)

Comandos típicos que puedes mostrar en clase para construir una app similar:

1) Crear proyecto Angular (opcionalmente con SSR):
```bash
ng new angular-supabase-app --ssr
```

2) Entrar al proyecto e instalar dependencias extra:
```bash
cd angular-supabase-app
npm install @supabase/supabase-js tslib -D @types/node
```

3) Generar páginas (standalone):
```bash
ng g c app/pages/inicio --standalone --flat=false
ng g c app/pages/dashboard --standalone --flat=false
```

4) Generar componentes reutilizables:
```bash
ng g c app/components/post-card --standalone --flat=false
ng g c app/components/task-item --standalone --flat=false
```

5) Generar servicios:
```bash
ng g s app/services/api --flat
ng g s app/services/supabase --flat
```

6) Definir rutas en `src/app/app.routes.ts` y proveer `provideHttpClient()` en `app.config.ts` si es necesario.

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
