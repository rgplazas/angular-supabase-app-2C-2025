// Importa el decorador de componente para definir un componente standalone
import { Component } from '@angular/core'; // Decorador y utilidades de componentes
// Importa el anclaje de vistas y directivas de ruteo para navegación
import { RouterOutlet, RouterModule } from '@angular/router'; // RouterOutlet: punto de anclaje de vistas; RouterModule: directivas routerLink/routerLinkActive

// Declaración del componente raíz de la aplicación (standalone)
@Component({
  // Etiqueta HTML que usaremos para montar la app en index.html
  selector: 'app-root',
  // Módulos/Componentes disponibles en el template (no hay NgModule)
  imports: [RouterOutlet, RouterModule], // Se declara lo que el template puede usar (standalone)
  // Ruta a la plantilla principal con navbar y <router-outlet>
  templateUrl: './app.html', // Plantilla principal con navbar y <router-outlet>
  // Hoja de estilos asociada al layout principal
  styleUrl: './app.css' // Estilos del layout principal
})
export class App {
  // Propiedad de ejemplo que puede usarse para bindings o pruebas unitarias
  title = 'angular-supabase-app'; // Título interno (ej. para pruebas o binding futuro)
}
