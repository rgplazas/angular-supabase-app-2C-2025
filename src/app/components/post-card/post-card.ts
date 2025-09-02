/*
  Notas para el profesor — PostCardComponent (Angular 20)
  ---------------------------------------------------------------------------
  1) ¿Por qué usamos inputs con señales en vez de @Input()?
     - Señales = reactividad fina y predecible, ideales para zoneless/SSR.
     - `input.required<T>()` fuerza en compilación que el padre provea el dato.
     - En plantilla se accede invocando la señal: `post().title`.

     Antes (imperativo con @Input):
       @Input() post!: Post;                  // Asignación directa de propiedad
       <!-- template --> {{ post.title }}     // Lectura implícita

     Ahora (reactivo con señales):
       post = input.required<Post>();         // Fuente reactiva
       <!-- template --> {{ post().title }}   // Lectura explícita de la señal

  2) Imperativo vs Reactivo (definiciones simples para clase)
     - Imperativo: "decimos cómo y cuándo" cambiar el estado.
       Ej.: setear propiedades y disparar detección manual.
     - Reactivo: "declaramos relaciones"; la vista reacciona a cambios.
       Ej.: señales/observables propagan cambios automáticamente al template.

  3) Beneficios prácticos para mostrar:
     - Mejor rendimiento (menos trabajo de change detection global).
     - DX sólida: errores tempranos si falta el input (required).
     - Test más simples: `fixture.componentRef.setInput('post', valor)`.
*/
// Componente presentacional: `post-card` — muestra los datos de un Post en formato de tarjeta.
// Contexto Angular 20: se emplean señales para entradas (`input.required<T>()`),
// por lo que en el template se accede con la forma `post().campo` (invocando la señal).
import { Component, input } from '@angular/core'; // Importa el decorador de componentes y la API de señales de Angular.
import { Post } from '../../services/api.service'; // Tipo de datos `Post` consumido desde el servicio de API externa.

@Component({
  // `selector`: nombre del elemento HTML que representa al componente.
  selector: 'app-post-card',
  // `imports`: componentes/módulos necesarios porque este componente es standalone.
  imports: [],
  // `templateUrl`: archivo de la plantilla asociada.
  templateUrl: './post-card.html',
  // `styleUrl`: hoja de estilos específica del componente (scoped por Angular).
  styleUrl: './post-card.css'
})
export class PostCardComponent {
  /**
   * Entrada como señal obligatoria (`required`):
   * - Tipo fuerte `Post` para IntelliSense y validación en compilación.
   * - Al ser señal, el template debe invocarla: `post()` para leer el valor.
   * - Beneficio: reactividad fina sin zonas; cambios en `post` actualizan la vista.
   */
  post = input.required<Post>();
}

/*
  Tipos de señales y ejemplos concretos (Angular 20)
  ---------------------------------------------------------------------------
  Importante: estos ejemplos son ilustrativos y están comentados; no afectan
  el runtime del componente. Sirven para explicar en clase.

  1) signal<T>(inicial): señal mutable (estado local del componente)
     // import { signal } from '@angular/core';
     // const likes = signal(0);
     // likes();       // lectura → 0
     // likes.set(1);  // escritura → 1
     // likes.update(v => v + 1); // 2

  2) input<T>() vs input.required<T>(): entradas como señales
     // import { input } from '@angular/core';
     // opcional con valor por defecto
     // readonly highlight = input(false);
     // requerido: el padre debe proveer
     // readonly post = input.required<Post>();
     // Lectura en plantilla: {{ post().title }}

  3) computed(() => expr): señal derivada (memoizada)
     // import { computed, signal } from '@angular/core';
     // const firstName = signal('Ada');
     // const lastName  = signal('Lovelace');
     // const fullName  = computed(() => `${firstName()} ${lastName()}`);
     // fullName(); // 'Ada Lovelace' — se recalcula solo cuando cambian sus dependencias

  4) effect(() => { ... }): efecto colateral reactivo
     // import { effect, signal } from '@angular/core';
     // const count = signal(0);
     // effect(() => { console.log('Nuevo valor:', count()); });
     // count.set(1); // dispara el efecto y loguea 'Nuevo valor: 1'

  5) Lectura en plantillas vs en TypeScript
     // En plantilla: SIEMPRE invocar la señal → {{ post().title }}
     // En TypeScript: invocar para leer → const p = this.post();
     //                set/update para escribir en señales mutables.

  6) Patrón típico en componentes presentacionales
     // - Entradas: input()/input.required() para datos a mostrar.
     // - Derivados: computed() para formateos (p. ej., títulos, contadores).
     // - Efectos: effect() para side-effects (p. ej., analytics/logging), con moderación.
*/
