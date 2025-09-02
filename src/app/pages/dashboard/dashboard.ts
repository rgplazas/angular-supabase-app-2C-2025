// Archivo: dashboard.ts — Página de gestión de tareas (CRUD) usando SupabaseService.
// Propósito: alta, listado, actualización y eliminación de tareas con Supabase.
// Notas: se usa control flow de Angular 20 (@if/@for) con track por id y validación mínima.
// Importa el decorador de componente y el hook OnInit
import { Component, OnInit } from '@angular/core';
// Módulo con directivas/pipes básicos usados en la plantilla
import { CommonModule } from '@angular/common';
// Módulo para two-way binding y validaciones template-driven
import { FormsModule } from '@angular/forms';
// Módulo de router para enlaces (routerLink)
import { RouterModule } from '@angular/router';
// Servicio de Supabase y el tipo de entidad Task para tipado estricto
import { SupabaseService, Task } from '../../services/supabase.service';
// Componente hijo para renderizar cada tarea y emitir eventos
import { TaskItemComponent } from '../../components/task-item/task-item';

// Decorador de componente standalone con sus metadatos
@Component({
  // Selector del componente
  selector: 'app-dashboard',
  // Dependencias disponibles en la plantilla (módulos y componentes standalone)
  imports: [CommonModule, FormsModule, RouterModule, TaskItemComponent],
  // Ruta al template HTML
  templateUrl: './dashboard.html',
  // Ruta a la hoja de estilos
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  // Lista de tareas que se renderizan en la UI
  tasks: Task[] = [];
  // Indicador de estado de carga para feedback de usuario
  loading = true;
  // Mensaje de error visible cuando algo falla (config o red)
  error = '';
  
  // Estado del formulario para crear una nueva tarea
  newTask = {
    // Título requerido de la nueva tarea
    title: '',
    // Descripción requerida de la nueva tarea
    description: '',
    // Estado inicial sin completar
    completed: false
  };
  
  // Flag para prevenir envíos duplicados mientras se procesa
  isSubmitting = false;

  // Inyección del servicio que encapsula llamadas a Supabase
  constructor(private supabaseService: SupabaseService) {}

  // Hook de ciclo de vida: cargar tareas al inicializar el componente
  ngOnInit() {
    // Disparar la carga inicial de datos desde la BD
    this.loadTasks();
  }

  // Carga las tareas desde la base usando el servicio; maneja loading/error
  async loadTasks() {
    try {
      // Encender spinner/estado de carga
      this.loading = true;
      // Pedir tareas al servicio (await a una llamada asíncrona)
      this.tasks = await this.supabaseService.getTasks();
      // Limpiar cualquier error previo
      this.error = '';
    } catch (error) {
      // Log técnico para debugging
      console.error('Error al cargar tareas:', error);
      // Mensaje amigable para la interfaz
      this.error = 'Error al cargar las tareas. Verifica la configuración de Supabase.';
    } finally {
      // Siempre apagar loading aunque haya error
      this.loading = false;
    }
  }

  // Maneja el envío del formulario de alta de tareas
  async onSubmit() {
    // Validación mínima: ambos campos son requeridos
    if (!this.newTask.title.trim() || !this.newTask.description.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      // Evitar múltiples envíos mientras se procesa
      this.isSubmitting = true;
      // Llamada al servicio para persistir la nueva tarea
      const result = await this.supabaseService.addTask(this.newTask);
      
      if (result) {
        // Insertar al inicio para feedback inmediato
        this.tasks.unshift(result);
        // Limpiar el formulario a valores por defecto
        this.resetForm();
      } else {
        // Si no hay resultado, notificar error genérico
        alert('Error al crear la tarea');
      }
    } catch (error) {
      // Log del error para diagnóstico
      console.error('Error al crear tarea:', error);
      alert('Error al crear la tarea');
    } finally {
      // Habilitar nuevamente el botón de enviar
      this.isSubmitting = false;
    }
  }

  // Maneja la eliminación de una tarea; confirma antes de ejecutar
  async onDeleteTask(taskId: number) {
    // Confirmación para acciones destructivas
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return;
    }

    try {
      // Solicitar eliminación al servicio
      const success = await this.supabaseService.deleteTask(taskId);
      
      if (success) {
        // Sacar la tarea eliminada del arreglo en memoria
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      } else {
        alert('Error al eliminar la tarea');
      }
    } catch (error) {
      // Log y feedback al usuario
      console.error('Error al eliminar tarea:', error);
      alert('Error al eliminar la tarea');
    }
  }

  // Cambia el estado de completada/no completada de una tarea
  async onToggleComplete(event: {id: number, completed: boolean}) {
    try {
      // Persistir el cambio en la base
      const success = await this.supabaseService.updateTaskCompleted(event.id, event.completed);
      
      if (success) {
        // Actualizar el estado en memoria para reflejo inmediato en UI
        const taskIndex = this.tasks.findIndex(task => task.id === event.id);
        if (taskIndex !== -1) {
          // Actualizamos el estado de la tarea en memoria para reflejar en UI
          this.tasks[taskIndex].completed = event.completed;
        }
      } else {
        alert('Error al actualizar la tarea');
      }
    } catch (error) {
      // Log y feedback al usuario
      console.error('Error al actualizar tarea:', error);
      alert('Error al actualizar la tarea');
    }
  }

  // Restablece el formulario a sus valores por defecto
  private resetForm() {
    this.newTask = {
      title: '',
      description: '',
      completed: false
    };
  }

  // Getter derivado: tareas completadas
  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  // Getter derivado: tareas pendientes
  get pendingTasks() {
    return this.tasks.filter(task => !task.completed);
  }
}
