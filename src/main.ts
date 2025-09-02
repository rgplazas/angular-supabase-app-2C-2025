// Importa la función para iniciar (bootstrap) una app Angular standalone en el navegador
import { bootstrapApplication } from '@angular/platform-browser'; // API para bootstrapping de apps standalone en el navegador
// Configuración global de la app: router, http, zoneless change detection, etc.
import { appConfig } from './app/app.config'; // Configuración/proveedores de la app (router, http, zoneless, etc.)
// Componente raíz que se montará en el DOM con el selector <app-root>
import { App } from './app/app'; // Componente raíz de la aplicación

// Inicia la aplicación con el componente raíz y la configuración indicada
bootstrapApplication(App, appConfig) // Inicializa la aplicación en el DOM (selector <app-root>)
  // Captura cualquier error ocurrido durante el proceso de arranque
  .catch((err) => console.error(err)); // Manejo básico de errores de bootstrap
