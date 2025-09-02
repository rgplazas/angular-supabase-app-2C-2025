// Archivo: dashboard.ts — Página de gestión de tareas (CRUD) usando SupabaseService.
// Propósito: alta, listado, actualización y eliminación de tareas con Supabase.
// Notas: se usa control flow de Angular 20 (@if/@for) con track por id y validación mínima.
// Importa el decorador de componente y el hook OnInit
import { Component, OnInit } from '@angular/core';
// Migración Angular 20: eliminamos CommonModule y FormsModule (template-driven)
// Usamos Reactive Forms por compatibilidad con signals y mejor tipado/validación
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  // Dependencias disponibles en la plantilla (standalone)
  // Quitamos CommonModule/FormsModule; añadimos ReactiveFormsModule
  imports: [ReactiveFormsModule, RouterModule, TaskItemComponent],
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
  
  // Reactive Form para crear una nueva tarea (sustituye a ngModel)
  newTaskForm: FormGroup;
  
  // Flag para prevenir envíos duplicados mientras se procesa
  isSubmitting = false;

  // Inyección del servicio y del FormBuilder para construir el FormGroup
  constructor(private supabaseService: SupabaseService, private fb: FormBuilder) {
    // Definición del formulario reactivo con validaciones
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      completed: [false]
    });
  }

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
    // Marcar controles como tocados para mostrar errores si existen
    this.newTaskForm.markAllAsTouched();
    if (this.newTaskForm.invalid) {
      alert('Por favor, corrige los errores del formulario');
      return;
    }

    try {
      this.isSubmitting = true;
      // Obtener payload del formulario
      const payload = this.newTaskForm.value as { title: string; description: string; completed: boolean };
      const result = await this.supabaseService.addTask(payload);
      if (result) {
        this.tasks.unshift(result);
        this.resetForm();
      } else {
        alert('Error al crear la tarea');
      }
    } catch (error) {
      console.error('Error al crear tarea:', error);
      alert('Error al crear la tarea');
    } finally {
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
    this.newTaskForm.reset({ title: '', description: '', completed: false });
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
