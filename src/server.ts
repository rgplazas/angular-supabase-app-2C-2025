// Utilidades de Angular para ejecutar SSR en Node y conectar con Express
import {
  AngularNodeAppEngine, // Motor principal que sabe renderizar Angular en Node
  createNodeRequestHandler, // Adaptador para exponer el server como handler reutilizable
  isMainModule, // Helper para detectar si este archivo es el entrypoint
  writeResponseToNodeResponse, // Escribe la respuesta SSR en el objeto Response de Express
} from '@angular/ssr/node';
// Framework web para Node.js
import express from 'express';
// Utilidad para construir rutas del sistema de archivos de manera segura
import { join } from 'node:path';

// Carpeta donde Angular coloca los archivos estáticos del cliente tras el build
const browserDistFolder = join(import.meta.dirname, '../browser');

// Instancia de la aplicación Express y motor SSR de Angular
const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Ejemplos de endpoints REST con Express se pueden definir aquí.
 * Descomenta y ajusta según necesidades de API propias.
 *
 * Ejemplo:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Maneja la petición de API
 * });
 * ```
 */

/**
 * Sirve archivos estáticos generados por Angular desde /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y', // Cachea por 1 año (hash en nombre de archivo evita colisiones)
    index: false, // No servir index.html por estáticos; lo maneja el SSR abajo
    redirect: false, // No redirigir directorios
  }),
);

/**
 * Maneja cualquier otra petición renderizando la aplicación Angular (SSR)
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(), // Si Angular responde, escribirla; si no, pasar al siguiente middleware
    )
    .catch(next);
});

/**
 * Arranca el servidor si este módulo es el entrypoint principal.
 * Escucha en el puerto `PORT` (si existe) o 4000 por defecto.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`); // Log informativo
  });
}

/**
 * Handler de requests reutilizable por Angular CLI (dev-server/build) o Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
