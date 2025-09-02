// API para bootstrap de aplicaciones también utilizada en entorno de servidor (SSR)
import { bootstrapApplication } from '@angular/platform-browser'; // API de bootstrap también reutilizada en SSR
// Componente raíz a renderizar en el servidor
import { App } from './app/app'; // Componente raíz
// Configuración específica para SSR/prerender (providers adicionales del server)
import { config } from './app/app.config.server'; // Config específica del servidor (SSR/prerender)

// Exportamos una función factory que arranca la app con la config del servidor
const bootstrap = () => bootstrapApplication(App, config); // Devuelve una función para que el runtime SSR la ejecute

// El adaptador SSR espera un export default con la función de bootstrap
export default bootstrap; // Export default requerido por el adaptador SSR
