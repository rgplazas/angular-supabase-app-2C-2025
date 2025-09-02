// Importa el tipo `Routes` que define el arreglo de rutas de Angular
import { Routes } from '@angular/router'; // Tipo para definir arreglos de rutas
// Componentes de página usados en el ruteo de nivel superior
import { InicioComponent } from './pages/inicio/inicio'; // Página de inicio/bienvenida
import { DashboardComponent } from './pages/dashboard/dashboard'; // Página de tablero/CRUD

// Definición de rutas públicas de la aplicación (cliente)
export const routes: Routes = [
  // Ruta por defecto: al entrar a la app mostramos la página de Inicio
  { path: '', component: InicioComponent },
  // Redirección: /inicio -> raíz para no duplicar contenido
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  // Ruta para el tablero de tareas (CRUD con Supabase)
  { path: 'dashboard', component: DashboardComponent },
  // Wildcard: cualquier ruta no definida redirige a Inicio
  { path: '**', redirectTo: '' }
];
