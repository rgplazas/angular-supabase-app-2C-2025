// Archivo: inicio.ts — Página de bienvenida.
// Muestra posts desde una API externa (ApiService). La plantilla usa Angular 20 control flow (@if/@for).
// Notas: top 10 posts para rendimiento; manejo de loading/error en UI.
import { Component, OnInit } from '@angular/core'; // Component: decorador para componentes standalone; OnInit: interfaz que habilita ngOnInit()
import { CommonModule } from '@angular/common'; // Directivas/pipes comunes (NgIf, NgFor, DatePipe, etc.) usadas en el template
import { RouterModule } from '@angular/router'; // Habilita directivas de ruteo (routerLink, routerLinkActive, RouterOutlet)
import { ApiService, Post } from '../../services/api.service'; // ApiService: llamadas a API externa; Post: tipo para tipado estricto
import { PostCardComponent } from '../../components/post-card/post-card'; // Componente hijo para renderizar una tarjeta de post

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterModule, PostCardComponent], // Declaramos módulos/standalone components disponibles en la plantilla
  templateUrl: './inicio.html',
  styleUrl: './inicio.css' // Estilos específicos del componente
})
export class InicioComponent implements OnInit { // implements OnInit: permite usar el hook de inicialización ngOnInit()
  // Lista de posts que mostraremos en la página
  posts: Post[] = [];
  // Estado de carga para mostrar un spinner o mensaje de "cargando"
  loading = true;
  // Mensaje de error en caso de que falle la petición
  error = '';

  // Inyectamos el servicio que se comunica con la API externa
  constructor(private apiService: ApiService) {} // DI de Angular: se inyecta ApiService como dependencia

  ngOnInit(): void { // Hook de ciclo de vida: se ejecuta una vez al inicializar el componente (tipo void)
    // Hook del ciclo de vida que se ejecuta una vez al iniciar el componente
    this.loadPosts();
  }

  loadPosts(): void { // Orquesta la carga de posts y el manejo de estados de UI
    // 1) Encendemos el estado de carga
    this.loading = true;
    // 2) Llamamos al servicio, que devuelve un Observable (flujo de datos asíncrono)
    this.apiService.getPosts().subscribe({ // Nos suscribimos con un observer: next (éxito) y error (fallo)
      next: (posts) => {
        // 3) Si sale bien, guardamos los datos (sólo 10 por rendimiento)
        this.posts = posts.slice(0, 10); // Crea una copia con los primeros 10 elementos
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar posts:', error);
        // 4) Si algo falla, mostramos un mensaje amigable
        this.error = 'Error al cargar los posts desde la API'; // Mensaje visible en la UI
        this.loading = false;
      }
    });
  }
}
