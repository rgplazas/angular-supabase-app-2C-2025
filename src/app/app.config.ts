// Importa el tipo base de configuración y proveedores globales de Angular
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core'; // Config de la app y listeners globales de error; modo sin Zone.js
// Proveedores del enrutador y funciones auxiliares para features opcionales
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router'; // Router y extras: scroll + transiciones
// Proveedor del cliente HTTP y estrategia basada en Fetch API
import { provideHttpClient, withFetch } from '@angular/common/http'; // Cliente HTTP usando fetch API

// Importa la definición de rutas de la aplicación
import { routes } from './app.routes'; // Tabla de rutas de la app
// Hidratación del lado del cliente para SSR/prerender y reenvío de eventos capturados
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'; // Hidratación en cliente para SSR/prerender con reenvío de eventos

// Configuración raíz de la aplicación: lista de proveedores globales
export const appConfig: ApplicationConfig = {
  providers: [
    // Registra listeners globales para errores no capturados en el navegador
    provideBrowserGlobalErrorListeners(), // Captura errores globales y reporta al handler de Angular
    // Habilita la detección de cambios sin Zone.js (mejor rendimiento, tests simplificados)
    provideZonelessChangeDetection(), // Habilita CD sin Zone.js (mejor perf, tests más simples)
    // Configura el router con rutas y extras opcionales
    provideRouter(
      routes, // Registra rutas
      // Activa transiciones nativas entre vistas (cuando el navegador lo soporte)
      withViewTransitions(), // Animación CSS de transición entre vistas (Chrome compatible)
      // Gestiona el scroll al navegar (restaura posición y soporta anclas)
      withInMemoryScrolling({ // Control de scroll entre navegaciones
        anchorScrolling: 'enabled', // Permite anclas #id
        scrollPositionRestoration: 'enabled' // Restaura posición al navegar hacia atrás
      })
    ), 
    // Habilita hidratación del HTML prerenderizado/SSR y reenvía eventos capturados
    provideClientHydration(withEventReplay()), // Hidratación SSR y reenvío de eventos capturados antes de hidratar
    // Provee HttpClient configurado para usar la API Fetch del navegador
    provideHttpClient(withFetch()) // Usa fetch en lugar de XHR
  ]
};
