// Importa tipo de configuración y utilidad para fusionar configuraciones
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core'; // Utilidad para combinar configs y tipo base
// Providers específicos del entorno de servidor (SSR/prerender)
import { provideServerRendering, withRoutes } from '@angular/ssr'; // Providers específicos de SSR
// Configuración compartida entre cliente y servidor
import { appConfig } from './app.config'; // Configuración común a cliente y servidor
// Rutas exclusivas para el servidor (por ejemplo prerender wildcard)
import { serverRoutes } from './app.routes.server'; // Rutas especiales para el servidor (prerender/SSR)

// Configuración adicional SOLO para el entorno de servidor (SSR/prerender).
const serverConfig: ApplicationConfig = {
  providers: [
    // Habilita el motor de render del servidor y registra las rutas específicas del server
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

// Combinamos la configuración compartida (appConfig) con la específica del servidor.
// Beneficio: no duplicamos providers y mantenemos coherencia entre cliente y servidor.
export const config = mergeApplicationConfig(appConfig, serverConfig);
