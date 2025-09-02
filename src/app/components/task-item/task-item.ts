/*
  Notas para el profesor — TaskItemComponent (Angular 20)
  ---------------------------------------------------------------------------
  1) Propósito y patrón
     - Componente presentacional (ítem de lista) que muestra una `Task`.
     - Se comunica con el padre mediante outputs (delete/toggle), manteniendo
       el estado fuente en el contenedor (padre).

  2) Inputs con señales vs @Input()
     - Usamos `input.required<Task>()` para exigir que el padre provea la tarea.
     - Lectura en plantilla con invocación: `task().campo` (reactividad fina).
     - Beneficios: rendimiento (zoneless), DX (errores tempranos), testabilidad
       (fixture.componentRef.setInput(...)).

  3) Imperativo vs Reactivo (resumen)
     - Imperativo: asignar propiedades y “decir cuándo” actualizar.
     - Reactivo: declarar relaciones; la vista reacciona a cambios en señales.

  4) Comunicación hijo → padre
     - `@Output()` emite eventos con el mínimo payload necesario (id, completed),
       y el padre orquesta la mutación real (single source of truth arriba).
*/
// Archivo: task-item.ts — Componente presentacional para una tarea (ítem de lista).
// Propósito: mostrar datos de una `Task` y notificar acciones al padre (toggle/delete).
// Notas Angular 20: usamos señales para inputs (`input.required<T>()`) y control flow moderno en el HTML.
// Lectura de señales en TS/HTML: se invoca como función `task()`.
import { Component, Output, EventEmitter, input } from '@angular/core'; // Component API, outputs y señales de input
import { CommonModule } from '@angular/common'; // Directivas/pipes base (ngIf, ngFor, date, etc.) que se usan en la plantilla
import { Task } from '../../services/supabase.service'; // Tipo de dominio Task proveniente del servicio de datos

@Component({
  // selector: nombre del elemento HTML que representa el componente en plantillas del padre
  selector: 'app-task-item',
  // imports: como componente standalone, declaramos dependencias de plantilla (directivas/pipes)
  imports: [CommonModule],
  // templateUrl: archivo de la vista asociada
  templateUrl: './task-item.html',
  // styleUrl: hoja de estilos scoped al componente
  styleUrl: './task-item.css'
})
export class TaskItemComponent {
  // Input como señal requerida: el padre DEBE proveer la Task
  // Lectura: this.task() / {{ task()... }} — garantiza reactividad fina sin zonas
  task = input.required<Task>();
  // Output: evento para pedir al padre que elimine la tarea (se emite el id)
  @Output() deleteTask = new EventEmitter<number>();
  // Output: evento para alternar el estado de completado; se emite payload con id y nuevo valor
  @Output() toggleComplete = new EventEmitter<{id: number, completed: boolean}>();

  // Handler de clic en "Eliminar"
  onDelete() {
    // Leemos la señal `task` (invocación) para obtener el valor actual
    const t = this.task();
    // Validación defensiva: solo emitimos si hay id válido
    if (t?.id) {
      // Emitimos el id al padre; éste realizará la eliminación real (single source of truth arriba)
      this.deleteTask.emit(t.id);
    }
  }

  // Handler de clic en "Marcar completada/pendiente"
  onToggleComplete() {
    // Leemos la señal `task` para derivar el nuevo estado
    const t = this.task();
    if (t?.id) {
      // Emitimos un comando (intención) al padre con el id y el booleano invertido
      this.toggleComplete.emit({
        id: t.id,
        completed: !t.completed
      });
    }
  }
}
