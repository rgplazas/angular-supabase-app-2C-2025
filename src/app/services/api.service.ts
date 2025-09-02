// Importa el decorador para declarar un servicio inyectable
import { Injectable } from '@angular/core';
// Cliente HTTP de Angular para realizar peticiones REST
import { HttpClient } from '@angular/common/http';
// Tipo para representar flujos asíncronos que emiten valores (RxJS)
import { Observable } from 'rxjs';

// Servicio para consumir la API pública JSONPlaceholder (lectura de posts/usuarios)
// Conceptos didácticos:
// - @Injectable y providedIn: 'root' para alcance global del servicio
// - Uso de HttpClient con tipado genérico para respuestas JSON
// - Observables como contrato asíncrono en Angular

// Interfaces que modelan las respuestas de la API
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// Declaramos el servicio como singleton a nivel de aplicación
@Injectable({
  providedIn: 'root' // Angular creará una única instancia accesible vía DI en toda la app
})
export class ApiService {
  // URL base de JSONPlaceholder usada para construir endpoints
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // Inyectamos HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) { }

  // Obtener todos los posts
  getPosts(): Observable<Post[]> {
    // La firma genérica <Post[]> tipa la respuesta JSON como arreglo de Post
    // Retorna un Observable; el componente decide cuándo suscribirse
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  // Obtener un post por id
  getPost(id: number): Observable<Post> {
    // Interpolación de ruta con el parámetro id; respuesta tipada como Post
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    // Devuelve Observable que emitirá el array de usuarios al suscribirse
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Obtener un usuario por id
  getUser(id: number): Observable<User> {
    // Devuelve Observable con el usuario solicitado (cuando la petición finalice)
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
