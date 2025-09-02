// Importa tipos/utilidades para definir rutas específicas del lado servidor (SSR/prerender)
import { RenderMode, ServerRoute } from '@angular/ssr'; // Tipos/utilidades para rutas del lado servidor

// Rutas usadas EXCLUSIVAMENTE durante SSR/prerender.
// Objetivo: indicar qué rutas deben renderizarse en build como HTML estático.
export const serverRoutes: ServerRoute[] = [
  {
    // Ruta wildcard: coincide con cualquier URL no más específica
    path: '**', // Coincide con cualquier ruta; útil para sitios estáticos
    // Modo de render: prerender en tiempo de build (no renderizar bajo demanda)
    renderMode: RenderMode.Prerender // Genera HTML estático en build (no bajo demanda)
  }
];
